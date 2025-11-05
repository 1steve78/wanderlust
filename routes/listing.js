const express =require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAysnc = require("../utils/wrapAsync.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");



//index route
router.get("/", wrapAysnc(async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}));
//new route
router.get("/new",isLoggedIn,(req,res)=>{
    res.render("listings/new.ejs");
});
//show route
router.get("/:id",wrapAysnc(async (req,res)=>{
    let {id} =req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",
        populate:{
            path: "author",
        },
    }).populate("owner");
    if(!listing){
        req.flash("error","Listing doesn't exist");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
}));


//create route
router.post("/", 
    validateListing,
    wrapAysnc(async (req,res,next)=>{
        
        const newlisting = new Listing(req.body.listing);
        newlisting.owner= req.user._id;
        await newlisting.save();
        req.flash("success","New Listing Created!");
        res.redirect("/listings");
    })
    
);
//edit route
router.get("/:id/edit",isLoggedIn,
    isOwner,
    wrapAysnc(async (req,res)=>{
    let {id} =req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing doesn't exist");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
}));
//update route
router.put("/:id", isLoggedIn,isOwner,validateListing,wrapAysnc(async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
    
}));
//delete route
router.delete("/:id",isLoggedIn,
    isOwner,
    wrapAysnc(async (req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success"," Listing Deleted!");
    res.redirect("/listings");
}));

module.exports = router;
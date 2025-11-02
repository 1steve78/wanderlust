const express =require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAysnc = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} =require("../schema.js");

const validateListing = (req,res,next)=>{
    let {error}= listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400,error);
    }else{
        next();
    }
};

//index route
router.get("/", wrapAysnc(async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}));
//new route
router.get("/new",(req,res)=>{
    res.render("listings/new.ejs");
});
//show route
router.get("/:id",wrapAysnc(async (req,res)=>{
    let {id} =req.params;
    const listing = await Listing.findById(id).populate("reviews");
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
        await newlisting.save();
        req.flash("success","New Listing Created!");
        res.redirect("/listings");
    })
    
);
//edit route
router.get("/:id/edit",wrapAysnc(async (req,res)=>{
    let {id} =req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing doesn't exist");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
}));
//update route
router.put("/:id", wrapAysnc(async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
    
}));
//delete route
router.delete("/:id", wrapAysnc(async (req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success"," Listing Deleted!");
    res.redirect("/listings");
}));

module.exports = router;
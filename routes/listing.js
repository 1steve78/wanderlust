const express =require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAysnc = require("../utils/wrapAsync.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const listingController = require("../controllers/listings.js");


//index route & create route 
router
    .route("/")
    .get( wrapAysnc(listingController.index))
    .post(
    isLoggedIn,
    upload.single('listing[image]'),
    validateListing,
    wrapAysnc(listingController.createListing)
    );
    

//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);

//category search
router.get("/category/:category", wrapAysnc(async (req, res) => {
    const { category } = req.params;

    const filteredListings = await Listing.find({ category });

    res.render("listings/index.ejs", {
        allListings: filteredListings,
        category
    });
}));


//search
router.get("/search", wrapAysnc(async (req, res) => {
    const { q } = req.query;

    // If query is empty, redirect to all listings
    if (!q || q.trim() === "") {
        return res.redirect("/listings");
    }

    const listings = await Listing.find({
        title: { $regex: q, $options: "i" }
    });

    res.render("listings/search.ejs", {
        listings,
        q
    });
}));

//show ,update & delete route
router.route("/:id")
    .get(wrapAysnc(listingController.showListing))
    .put( isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAysnc(listingController.updateListing))
    .delete(isLoggedIn,isOwner,wrapAysnc(listingController.destroyListing));


//edit route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAysnc(listingController.renderEditForm));



module.exports = router;
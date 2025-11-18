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
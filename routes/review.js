const express =require("express");
const router = express.Router({mergeParams:true});
const wrapAysnc = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} =require("../middleware.js");

const reviewController=require("../controllers/reviews.js");
const { destroyListing } = require("../controllers/listings.js");

//Post Review route

router.post("/" ,validateReview, isLoggedIn,wrapAysnc(reviewController.createReview));

//Delete  Review Route

router.delete("/:reviewId", isLoggedIn,isReviewAuthor,wrapAysnc(reviewController.destroyReview));

module.exports = router;
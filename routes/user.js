const express =require("express");
const router = express.Router({mergeParams:true});
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {savedRedirectedUrl}=require("../middleware.js");

const userController = require("../controllers/users.js");

router.route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup))

// for login demo username is yasin and password is kaisan_ba and other one is demo and pass is kaisan_ba

router.route("/login")
    .get( userController.renderLoginForm)
    .post(savedRedirectedUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),userController.login)


router.get("/logout",userController.logout);

module.exports = router;
const express =require("express");
const router = express.Router({mergeParams:true});
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {savedRedirectedUrl}=require("../middleware.js");

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});
// for login demo username is yasin and password is kaisan_ba and other one is demo and pass is kaisan_ba
router.post("/signup",wrapAsync(async(req,res)=>{
    try{
        let {username , email,password} =req.body;
        const newUser = new User({email,username});
        const registeredUser= await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to Wanderlust");
        res.redirect("/listings");
        });
        
    } catch(e){
        req.flash(e.message);
        res.redirect("/signup");
    }
    
}));

router.get("/login", (req,res)=>{
    res.render("users/login.ejs");
});

router.post("/login",savedRedirectedUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),async (req,res)=>{
    req.flash("success","Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
});

router.get("/logout",(req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","you are logged out now");
        res.redirect("/listings");
    })
});

module.exports = router;
const express = require("express")
const passport = require("passport")
const router = express.Router()
const User = require("../models/user")


router.get("/register", (req, res) => {
    res.render("user/register")
})


router.post("/register", async (req, res) => {
    const { email, username, password } = req.body;
    const newUser = new User({ email, username });
    const registerUser = await User.register(newUser, password)
    req.login(registerUser, (err) => {
        if (err) {
            next(err);
        } else {
            req.flash("success", "successfully register")
            res.redirect("/story")
        }
    })
})


router.get("/login", (req, res) => {
    res.render("user/login")
})


router.post("/login", passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), (req, res) => {
    req.flash("success", "welcome back")
    res.redirect("/story")
})


router.get("/logout", (req, res) => {
    req.logOut()
    req.flash("success", "successfully logout")
    res.redirect("/story")
})




module.exports = router
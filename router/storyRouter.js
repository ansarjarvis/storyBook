const express = require("express")
const router = express.Router()
const Story = require("../models/story")
const catchAsync = require("../utilities/catchAsyncError")
const storyValidator = require("../middleware/middlewares").storyValidator
const isLoggedIn = require("../middleware/middlewares").isLoggedIn




router.get("/", (req, res) => {
    res.render("home")
})


router.get("/story", catchAsync(async (req, res, next) => {
    const stories = await Story.find({})
    res.render("story/index", { stories })
}))


router.get("/story/new", isLoggedIn, (req, res) => {
    res.render("story/new")
})

router.post("/story", isLoggedIn, storyValidator, catchAsync(async (req, res, next) => {
    const newStory = new Story(req.body);
    newStory.author = req.user._id
    await newStory.save()
    req.flash("success", "story added successfully")
    res.redirect(`/story/${newStory._id}`)
}))

router.get("/story/:id", catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const foundStory = await Story.findById(id).populate("author")
    if (!foundStory) {
        req.flash("error", "story dont exit yet")
        res.redirect("/story")
    } else {
        res.render("story/show", { foundStory })
    }
}))

router.get("/story/:id/edit", isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    const foundStory = await Story.findById(id)
    res.render("story/edit", { foundStory })
}))

router.put("/story/:id", isLoggedIn, storyValidator, catchAsync(async (req, res) => {
    const { id } = req.params;
    const foundStory = await Story.findByIdAndUpdate(id, req.body)
    req.flash("success", "you successfully edit the story")
    res.redirect(`/story/${foundStory._id}`)
}))

router.delete("/story/:id", isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Story.findByIdAndDelete(id)
    req.flash("success", "story successfully deleted")
    res.redirect("/story")
}))


router.get("/userstories", (req, res) => {
    req.flash("error", " Sorry , This page is currently under maintenance. Its advisable to keep all of your stories PUBLIC")
    res.redirect("/profile")
})



module.exports = router;
const express = require("express")
const router = express.Router()
const Story = require("../models/story")
const catchAsync = require("../utilities/catchAsyncError")
const storyValidator = require("../middleware/middlewares")




router.get("/", (req, res) => {
    res.render("home")
})


router.get("/story", catchAsync(async (req, res, next) => {
    const stories = await Story.find({})
    res.render("story/index", { stories })
}))


router.get("/story/new", (req, res) => {
    res.render("story/new")
})

router.post("/story", storyValidator, catchAsync(async (req, res, next) => {
    const newStory = new Story(req.body);
    console.log(newStory)
    await newStory.save()
    req.flash("success", "story added successfully")
    res.redirect(`/story/${newStory._id}`)
}))

router.get("/story/:id", catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const foundStory = await Story.findById(id)
    res.render("story/show", { foundStory })
}))

router.get("/story/:id/edit", catchAsync(async (req, res) => {
    const { id } = req.params;
    const foundStory = await Story.findById(id)
    res.render("story/edit", { foundStory })
}))

router.put("/story/:id", storyValidator, catchAsync(async (req, res) => {
    const { id } = req.params;
    const foundStory = await Story.findByIdAndUpdate(id, req.body)
    req.flash("success", "you successfully edit the story")
    res.redirect(`/story/${foundStory._id}`)
}))

router.delete("/story/:id", catchAsync(async (req, res) => {
    const { id } = req.params;
    await Story.findByIdAndDelete(id)
    req.flash("success", "story successfully deleted")
    res.redirect("/story")
}))


module.exports = router;
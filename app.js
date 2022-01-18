const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const Story = require("./models/story")
const engine = require("ejs-mate")
const app = express()
const { stripTag, sliceString } = require("./helper")
const methodOverride = require("method-override")



mongoose.connect("mongodb://localhost:27017/storyDB")
    .then(() => {
        console.log("database connection successfull")
    })
    .catch((err) => {
        console.log("ooopps , database connection failed")
        console.log(err)
    })


app.use((req, res, next) => {
    res.locals.removeTag = stripTag;
    res.locals.slice = sliceString;
    next();
})


app.use(express.static(path.join(__dirname, "public")))
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.engine("ejs", engine)
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))



app.get("/", (req, res) => {
    res.render("home")
})

app.get("/story", async (req, res) => {
    const stories = await Story.find({})
    res.render("story/index", { stories })
})

app.get("/story/new", (req, res) => {
    res.render("story/new")
})

app.post("/story", async (req, res) => {
    const newStory = new Story(req.body);
    await newStory.save()
    res.redirect(`/story/${newStory._id}`)
})

app.get("/story/:id", async (req, res) => {
    const { id } = req.params;
    const foundStory = await Story.findById(id)
    res.render("story/show", { foundStory })
})

app.get("/story/:id/edit", async (req, res) => {
    const { id } = req.params;
    const foundStory = await Story.findById(id)
    res.render("story/edit", { foundStory })
})

app.put("/story/:id", async (req, res) => {
    const { id } = req.params;
    const foundStory = await Story.findByIdAndUpdate(id, req.body)
    res.redirect(`/story/${foundStory._id}`)
})

app.delete("/story/:id", async (req, res) => {
    const { id } = req.params;
    await Story.findByIdAndDelete(id)
    res.redirect("/story")
})



app.listen(3000, () => {
    console.log("server live at port 3000")
})
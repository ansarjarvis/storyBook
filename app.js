const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose")
const engine = require("ejs-mate")
const { stripTag, sliceString } = require("./helper")
const methodOverride = require("method-override")
const storyRouter = require("./router/storyRouter")
const session = require("express-session")
const flash = require("connect-flash")




mongoose.connect("mongodb://localhost:27017/storyDB")
    .then(() => {
        console.log("database connection successfull")
    })
    .catch((err) => {
        console.log("ooopps , database connection failed")
        console.log(err)
    })


// middleware for local(technicallly global) variable 



const sessionConfig = {
    secret: "thisistopsecret",
    resave: false,
    saveUninitialized: false,
}

app.use(session(sessionConfig))
app.use(flash())
app.use(express.static(path.join(__dirname, "public")))
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.engine("ejs", engine)
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use((req, res, next) => {
    res.locals.removeTag = stripTag;
    res.locals.slice = sliceString;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})



app.use("/", storyRouter)


// error handler middleware function

app.use((err, req, res, next) => {
    const { status = 400 } = err;
    if (!err.message) {
        err.message = "something went wrong"
    }
    res.status(status).render("error", { err })
})


app.listen(3000, () => {
    console.log("server live at port 3000")
})
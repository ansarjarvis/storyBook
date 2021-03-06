if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose")
const engine = require("ejs-mate")
const { stripTag, sliceString } = require("./helper")
const methodOverride = require("method-override")
const storyRouter = require("./router/storyRouter")
const userRouter = require("./router/userRouter")
const session = require("express-session")
const flash = require("connect-flash")
const passport = require("passport")
const localStrategy = require("passport-local")
const User = require("./models/user")
const mongoSenitize = require("express-mongo-sanitize")
const helmet = require("helmet")
const MongoStore = require("connect-mongo")
const AppError = require("./utilities/errorclass")



const dbUrl = process.env.DBURL || "mongodb://localhost:27017/storyDB"
mongoose.connect(dbUrl)
    .then(() => {
        console.log("database connection successfull")
    })
    .catch((err) => {
        console.log("ooopps , database connection failed")
        console.log(err)
    })


const secretKey = process.env.SECRET || "thisistopsecret"

const sessionConfig = {
    store: MongoStore.create({
        mongoUrl: dbUrl
    }),
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
}

app.use(session(sessionConfig))
app.use(flash())
app.use(express.static(path.join(__dirname, "public")))
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(mongoSenitize())
app.use(helmet({ contentSecurityPolicy: false }));
app.engine("ejs", engine)
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))


// configure our passport 

app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())



// middleware for local(technicallly global) variable 


app.use((req, res, next) => {
    res.locals.removeTag = stripTag;
    res.locals.slice = sliceString;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentLoggedInUser = req.user;
    next();
})



app.use("/", storyRouter)
app.use("/", userRouter)
app.use("*", (req, res) => {
    throw new AppError(400, "Page not found")
})

// error handler middleware function

app.use((err, req, res, next) => {
    const { status = 400 } = err;
    if (!err.message) {
        err.message = "something went wrong"
    }
    res.status(status).render("error", { err })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server live at  port ${port}`)
})
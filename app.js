const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const app = express()


mongoose.connect("mongodb://localhost:27017/storyDB")
    .then(() => {
        console.log("database connection successfull")
    })
    .catch((err) => {
        console.log("ooopps , database connection failed")
        console.log(err)
    })


app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))



app.get("/", (req, res) => {
    res.send("this is home")
})



app.listen(3000, () => {
    console.log("server live at port 3000")
})
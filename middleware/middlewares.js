const storyValidatorSchema = require("../joi-validator/story-validationSchema")
const AppError = require("../utilities/errorclass")


const storyValidator = (req, res, next) => {
    const result = storyValidatorSchema.validate(req.body)
    if (result.error) {
        const msg = result.error.details.map((el) => {
            return el.message
        }).join(",")
        throw new AppError(400, msg)
    } else {
        next()
    }
}


const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", " you must be logged in")
        res.redirect("/login")
    } else {
        next()
    }
}









module.exports.isLoggedIn = isLoggedIn

module.exports.storyValidator = storyValidator;
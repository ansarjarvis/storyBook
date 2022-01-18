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

module.exports = storyValidator;
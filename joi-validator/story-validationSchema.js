const Joi = require("joi")


const storyValidatorSchema = Joi.object({
    storyTitle: Joi.string()
        .required(),
    storyMode: Joi.string()
        .required(),
    storyDescription: Joi.string()
        .required()

})

module.exports = storyValidatorSchema
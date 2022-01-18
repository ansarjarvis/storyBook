const Joi = require("joi")


const storyValidatorSchema = Joi.object({
    storyTilte: Joi.string()
        .required()
        .min(1)
        .max(50),
    storyMode: Joi.string()
        .required(),
    storyDescription: Joi.string()
        .required()

})

module.exports = storyValidatorSchema
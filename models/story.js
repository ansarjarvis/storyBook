const mongoose = require("mongoose")

const storySchema = new mongoose.Schema({
    storyTitle: {
        type: String,
        required: true,
        uppercase: true,
    },
    storyMode: {
        type: String,
        required: true,
        enum: ["public", "private"]
    },
    storyDescription: {
        type: String,
        required: true,
        minlength: 2
    }
})

const Story = mongoose.model("Story", storySchema);

module.exports = Story;
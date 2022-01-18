const mongoose = require("mongoose")
const Story = require("./models/story")

mongoose.connect("mongodb://localhost:27017/storyDB")
    .then(() => {
        console.log("database connection successfull")
    })
    .catch((err) => {
        console.log("ooopps , database connection failed")
        console.log(err)
    })


const stories = [
    {
        storyTitle: "1st story",
        storyMode: "public",
        storyDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti repudiandae, voluptates maxime non quos pariatur obcaecati magnam ipsum quia. Magnam optio aliquam vitae hic repellat eos sequi dolorem reprehenderit magni."
    },
    {
        storyTitle: "2nd story",
        storyMode: "public",
        storyDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti repudiandae, voluptates maxime non quos pariatur obcaecati magnam ipsum quia. Magnam optio aliquam vitae hic repellat eos sequi dolorem reprehenderit magni."
    },
    {
        storyTitle: "3rd story",
        storyMode: "public",
        storyDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti repudiandae, voluptates maxime non quos pariatur obcaecati magnam ipsum quia. Magnam optio aliquam vitae hic repellat eos sequi dolorem reprehenderit magni."
    },
    {
        storyTitle: "4th story",
        storyMode: "public",
        storyDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti repudiandae, voluptates maxime non quos pariatur obcaecati magnam ipsum quia. Magnam optio aliquam vitae hic repellat eos sequi dolorem reprehenderit magni."
    }
]

const seedingStories = async () => {
    const allStory = await Story.insertMany(stories);
    console.log(allStory)
}

seedingStories();
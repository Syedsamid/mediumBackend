import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    contain:{
        type: String,
        required: true,
    },
    conclusion:{
        type: String,
        required: true,
    },
    likes:{
        type: Number,
        required: true,
    },
    bannerImage:{
        type: String,
        required: true,
    }
})
const blogModel  = mongoose.model("Blog",blogSchema,"blogs")

export default blogModel
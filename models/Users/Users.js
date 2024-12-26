import mongoose  from "mongoose"

const userSchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    bio:{
        type: String,
        unique: true,
    },
    DOB:{
        type: String,
    },
    follers:{
        type: Number,
    },
    following:{
        type: Number,
    },
    profile_Pic:{
        type: String,
        unique: true,
    },
    banner:{
        type: String,
    }

});
const userModel  = mongoose.model("User",userSchema,"users")

export default userModel
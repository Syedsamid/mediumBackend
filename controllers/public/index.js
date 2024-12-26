import express from "express"
import userModel from "../../models/Users/Users.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register",async(req,res)=>{
    try {
        let userdata = req.body;
        // Duplicate checking

        let userEmail = userdata.email;

        let checkDuplicate = await userModel.findOne({email:userEmail})

        if(checkDuplicate){
            return res.status(400).json({msg:"User is already registred ! please login"})
        }
        
        console.log(userdata);
        console.log(userdata.password);
        let haspwd = await bcrypt.hash(userdata.password,10)
        console.log(haspwd);
        userdata.password = haspwd; 
        await userModel.create(userdata)

        let secretKey = "SAMID";


        let sendtoken = jwt.sign({checkDuplicate},secretKey,{expiresIn: "1hr"});
        console.log(sendtoken)


        res.status(200).json({msg:"new user data added to your database",token: sendtoken})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.post("/login",async(req,res)=>{
    try {
    let {email,password} = req.body;


    let checkUser = await userModel.findOne({email});
    if(!checkUser){
        return res.status(400).json({msg:"Invalid Email"})
    }
    console.log(checkUser);

    let hashPassword = checkUser.password

    let checkPassword = await bcrypt.compare(password,hashPassword)

    if(!checkPassword){
        return res.status(400).json({msg: "Invalid Password"})
    }
    res.status(200).json({msg: "Users Logged in successfully"})

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

export default router
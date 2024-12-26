import express from "express"
import config from "config"
import bcrypt from "bcryptjs";

import userModel from "../../models/Users/Users.js";

const jwt = config.get("JWT_TOKEN")
const router = express.Router();


router.post("/register",async(req,res)=>{
    try {
        let userdata = req.body;
        // Duplicate checking

        let userEmail = userdata.email;

        let checkDuplicate = await userModel.find({email:userEmail})

        if(checkDuplicate){
            return res.status(400).json({msg:"User is already registred ! please login"})
        }

        console.log(userdata);
        console.log(userdata.password);
        let haspwd = await bcrypt.hash(userdata.password,10)
        console.log(haspwd);
        userdata.password = haspwd; 
        await userModel.create(userdata)
        res.status(200).json({msg:"new user data added to your database"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.get("/singleuser/:id",async(req,res)=>{
    try {
        let userId = req.params.id;
        let getdata = await userModel.find({_id:userId})
        res.status(200).json(getdata)
        

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.get("/getalluser",async(req,res)=>{
    try {
        let allusers = await userModel.find({})
        res.status(200).json(allusers)
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.put("/updateuser/:id",async(req,res)=>{
    try {
        let userId = req.params.id;
        let userData = req.body;
        await userModel.updateOne({_id:userId},{$set:userData})
        res.status(200).json({msg:"admin data updated successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.delete("/deleteoneuser/:id",async(req,res)=>{
    try {
        let userId = req.params.id;
        await userModel.deleteOne({_id:userId})
        res.status(200).json({msg:"user you selected is deleted"})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.delete("/deletealluser",async(req,res)=>{
    try {
        let userData = await userModel.deleteMany({})
        res.status(200).json({msg: "All the Users are deleted"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})



export default router
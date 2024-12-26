import express from "express"
import config from "config"
import bcrypt from "bcryptjs";

import adminModel from "../../models/Admins/Admins.js";

const jwt = config.get("JWT_TOKEN")
const router = express.Router();

router.post("/register",async(req,res)=>{
    try {
        let admindata = req.body;
        console.log(admindata.password);
        let haspwd = await bcrypt.hash(admindata.password,10)
        console.log(haspwd);
        admindata.password = haspwd; 
        await adminModel.create(admindata)
        res.status(200).json({msg:"Add new user to Admin DataBase"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.get("/oneadmin/:id",async(req,res)=>{
    try {
        let adminId = req.params.id;
        let getdata = await adminModel.find({_id:adminId})
        res.status(200).json(getdata)
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.get("/getalladmins",async(req,res)=>{
    try {
        let alladmins = await adminModel.find({})
        res.status(200).json(alladmins)
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.put("/updateadmin/:id",async(req,res)=>{
    try {
        let adminId = req.params.id;
        let adminData = req.body;
        await adminModel.updateOne({_id:adminId},{$set:adminData})
        res.status(200).json({msg:"admin data updated successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.delete("/deleteone/:id",async(req,res)=>{
    try {
        let adminId = req.params.id;
        await adminModel.deleteOne({_id:adminId})
        res.status(200).json({msg:"admin you selected is deleted"})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.delete("/deletealladmins",async(req,res)=>{
    try {
        let adminData = await adminModel.deleteMany({})
        res.status(200).json({msg: "All the Admins are deleted"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})



export default router
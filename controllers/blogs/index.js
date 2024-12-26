import express from "express"
import config from "config"

import blogModel from "../../models/Blogs/blogs.js"

const jwt = config.get("JWT_TOKEN")
const router = express.Router();

router.post("/",async(req,res)=>{
    try {
        let blogData = req.body;
        console.log(blogData);    
        await blogModel.create(blogData)
        res.status(200).json({mes:"Blog added succesful"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.get("/:id",async(req,res)=>{
    try {
        let blogId = req.params.id;
        let getdata = await blogModel.findOne({_id:blogId})
        res.status(200).json(getdata)
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.get("/",async(req,res)=>{
    try {
        let allblogs = await blogModel.find()
        res.status(200).json(allblogs)
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.put("/:id",async(req,res)=>{
    try {
        let blogId = req.params.id;
        let blogData = req.body;
        await blogModel.updateOne({_id:blogId},{$set:blogData})
        res.status(200).json({msg:"Blog is updated successful"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.delete("/:id",async(req,res)=>{
    try {
        let blogId = req.params.id;
        await blogModel.deleteOne({_id:blogId})
        res.status(200).json({msg:"The Blogs you selected is deleted"})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.delete("/",async(req,res)=>{
    try {
        let blogData = await blogModel.deleteMany({})
        res.status(200).json({msg: "All the blogs are deleted"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})



export default router
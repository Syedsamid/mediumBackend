import express from "express"
import config from "config"

import userRouter from "./controllers/users/index.js";
import adminRouter from "./controllers/admins/index.js";
import blogRouter from "./controllers/blogs/index.js";

import "./utils/dbConnect.js"

const app = express();
const PORT = config.get("PORT")

app.use(express.json());

app.get("/",(req,res)=>{
    try {
        res.status(200).json({msg:"hello samid"})

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})
app.use("/users",userRouter)
app.use("/admins",adminRouter)
app.use("/blogs",blogRouter)

app.listen(PORT,()=>{
    console.log(`server is running at PORT no ${PORT}`);
})

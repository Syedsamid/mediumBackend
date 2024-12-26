import { mergeConfig } from "axios";
import jwt from "jsonwebtoken"

function decryptData() {
    try {
        let userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic2FtaWQiLCJhZ2UiOjIzLCJwd2QiOiIwOTg3NjU0MzIxIiwiaWF0IjoxNzM1MTk1NDU4LCJleHAiOjE3MzUxOTkwNTh9.nLxVu4_gHtv0dBuBjJ13pxpzX3ji2BfrgJAIrpRL8HA"
        let secretKey = "SAMID";

        // let token = mergeConfig.get("TOKEN")
        // let KEY = mergeConfig.get("KEY")

        // let checkData = jwt.verify(token,KEY)

        let verify = jwt.verify(userToken,secretKey);
        if(!verify){
            return console.log("User not verifieed, Please login");
        }        
        console.log("User verified logiin");
    } catch (error) {
        console.log(error);
    }
}
decryptData()
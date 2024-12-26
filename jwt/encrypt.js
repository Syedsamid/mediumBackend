import jwt from "jsonwebtoken"
import config from "config"

function encrpytData(){
    try {
        console.log("hello");
        let userData = {
            name: "samid",
            age: 23,
            pwd: "0987654321"
        }

        let secretKey = "SAMID";

        let token = jwt.sign(userData,secretKey,{ expiresIn: "1h"})
        console.log(token);

    } catch (error) {
        console.log(error);
    }
}
encrpytData()
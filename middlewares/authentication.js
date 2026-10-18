import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()
export default function authenticateUser(req,res,next){
        const header = req.header("Authorization")
        

        if(header){
            const token = header.replace("Bearer " , "")
            


            jwt.verify(token ,  process.env.I_computers_secret_Key , 
                (error , decoded)=>{
                    if(decoded == null){
                        res.json({
                            message : "Invalid token ! please login again"
                        })
                    }else{
                        req.User = decoded;
                        next()
                    }
                }
            )

        }else{
            next()
        }
        
    }

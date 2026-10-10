import jwt from "jsonwebtoken";
export default function authenticateUser(req,res,next){
        const header = req.header("Authorization")
        

        if(header){
            const token = header.replace("Bearer " , "")
            


            jwt.verify(token , "I-computers-secret-Key" , 
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

import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export async function createUser(req, res) {
  try {

    const passwordHash = bcrypt.hashSync(req.body.password , 10)
    

    const newUser = new user({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: passwordHash,
    });

    await newUser.save();
    res.status(200).json({
      massage: "user created Sucessfully",
    });
  } catch (error) {
    res.status(401).json({
      massage: "error creating user",
    });
  }
}

export async function loginUser(req, res) {
  try {
    const User = await user.findOne({
      email: req.body.email,
    });

    

    if (User == null) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
        const isPasswordCorrect = bcrypt.compareSync(req.body.password ,  User.password)
      if(isPasswordCorrect){

          const payload = {
            email : User.email,
            firstName : User.firstName,
            lastName : User.lastName,
            isAdmin : User.isAdmin,
            isBlocked : User.isBlocked,
            isEmailVerified : User.isEmailVerified,
            image : User.image

          }

          const token = jwt.sign(payload , "I-computers-secret-Key" , {
            expiresIn : "48h"
          })
          res.json({
            token : token
          })




      }else{
        res.status(401).json({
            message : "Invalid Password"
        })
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Error finding user",
    });
  }
}

export function isAdmin(req){
  if(req.User == null){
    return false
  }
  if(req.User.isAdmin){
    return true
  }else{
    return false
  }
}

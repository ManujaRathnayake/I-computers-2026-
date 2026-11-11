import express from "express";
import updateUserDate, { changePassword, createUser, getUserDate, loginUser } from "../Controllers/userController.js";


const userRouter = express.Router();

userRouter.post("/" , createUser)
userRouter.post("/login" , loginUser)
userRouter.get("/me" , getUserDate)
userRouter.put("/" , updateUserDate)
userRouter.put("/password" , changePassword)


export default userRouter;
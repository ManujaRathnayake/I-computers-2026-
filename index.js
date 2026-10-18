import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./Routers/userRouter.js";
import jwt from "jsonwebtoken";
import authenticateUser from "./middlewares/authentication.js";
import productRouter from "./Routers/productRouter.js";
import dotenv from "dotenv";


dotenv.config()
const app = express();
const mongodbURI = process.env.MONGO_URI
mongoose.connect(mongodbURI).then(
    ()=>{
        console.log("connected to mongoDB")
    }
)

app.use(cors())
app.use(express.json())

app.use(authenticateUser)

app.use("/api/users" , userRouter)
app.use("/api/products" ,productRouter)

let port = 3000;

app.listen(port, () => {
  console.log("server is running on port " + port);
});


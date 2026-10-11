import express from "express";
import mongoose from "mongoose";

import userRouter from "./Routers/userRouter.js";
import jwt from "jsonwebtoken";
import authenticateUser from "./middlewares/authentication.js";
import productRouter from "./Routers/productRouter.js";

const app = express();
const mongodbURI = "mongodb+srv://Admin:1234@cluster0.nq5mdel.mongodb.net/?appName=Cluster0";
mongoose.connect(mongodbURI).then(
    ()=>{
        console.log("connected to mongoDB")
    }
)

app.use(express.json())

app.use(authenticateUser)

app.use("/users" , userRouter)
app.use("/products" ,productRouter)

let port = 3000;

app.listen(port, () => {
  console.log("server is running on port " + port);
});


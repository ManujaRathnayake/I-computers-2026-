import express from "express";
import Student from "../models/student.js";
import { createStudent, deletestudent, getStudent } from "../Controllers/studentController.js";

const StudentRouter = express.Router();

StudentRouter.get("/", getStudent )

StudentRouter.post("/", createStudent)


StudentRouter.delete("/", deletestudent)

export default StudentRouter;

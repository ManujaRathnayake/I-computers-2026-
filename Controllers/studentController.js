import Student from "../models/student.js";

export function createStudent(req, res) {
  if (req.User == null) {
    res.status(401).json({
      message: "Unautherized access you need to login before creating student",
    });
    return;
  }

  if (!req.User.isAdmin) {
    res.status(404).json({
      message: "Only Admins can create Students",
    });
    return;
  }

  const newStudent = new Student({
    name: req.body.name,
    age: req.body.age,
    city: req.body.city,
  });

  newStudent.save().then(() => {
    res.status(200).json({
      massage: "Student created Succefully",
    });
  });
} // post method

//Async await Function

// export async function createStudentasync(req,res){
//     try{
//         console.log(req.body)
//             const newStudent = new Student({
//                 name : req.body.name,
//                 age : req.body.age,
//                 city : req.body.city
//             });
//     await newStudent.save(){
//         res.json({
//                 massage : "Student created Succefully"
//             })
//     }

//     }catch(error){
//         console.log(error.massage)
//     }
// }

export function getStudent(req, res) {
  Student.find().then((students) => {
    res.json(students);
  });
} // get method

// Get method with Async await Function

// export async function getstudentasync(req,res){
//     try{
//         await Student.find();
//         {
//             res.json({
//                 massage : "Student Getting Succefully"
//             })
//         }

//     }catch(error){
//         console.log(error.massage)
//     }
// }

export function deletestudent(req, res) {
  console.log("delete req Receved !");
} // Delete method

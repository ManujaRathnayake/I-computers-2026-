import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


export default function LoginPage(){
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const navigate = useNavigate();

    

    function handleLogin(){

        axios.post(import.meta.env.VITE_API_URL +  "/users/login" ,  {
        email : email,
        password : password
    }).then((Response)=>{
        toast.success("Login Succesfull")
        localStorage.setItem("token" , Response.data.token)

        if(Response.data.isAdmin){
            //redirect to Admin Dashboard
            navigate("/admin")



        }else{
            //Homapage
            navigate("/")


        }

    }).catch((error)=>{
        toast.error(error.response.data.message)
    });
    }
    return(
        <div className="w-full h-screen flex justify-center items-center bg-[url('/login-bg.jpg')] bg-center bg-cover ">
            <div className="w-[50%] h-full ">
                
            </div>
            <div className="w-[50%] h-full  flex justify-center items-center">
                <div className="w-[400px] h-[500px] backdrop-blur-lg rounded-xl shadow-2xl flex flex-col justify-center items-center">
                    <h1 className="text-4xl font-bold mb-8 text-gray-100">Sign in</h1>
                    <input 
                    onChange={
                        (e)=>{
                             setEmail(e.target.value)
                        }
                    }
                    value={email}
                    type="email"  placeholder="Username" className="w-3/4 p-3 mb-6 rounded-lg border border-secondary focus:outline-none text-white"/>
                    <input 
                    onChange={
                        (e)=>{
                            setPassword(e.target.value)
                        }
                    }
                    value={password}
                    type="password"  placeholder="password" className="w-3/4 p-3 mb-6 rounded-lg border border-secondary focus:outline-none text-white"/>
                    <p href="#" className="text-sm text-white text-right">Forgot password? <Link to="/forgot-password" className="text-blue-500 font-bold hover:text-blue-600">Click here</Link></p>
                    <button onClick={handleLogin} className="w-3/4 p-3 mb-6 rounded-lg rounded-xl shadow-2xl text-center cursor-pointer bg-[#6d7c4a] mt-5 text-white font-bold">Login</button>
                    <p href="#" className="text-sm text-white text-right">Don't have an Account? <Link to="/Register" className="text-blue-500 font-bold hover:text-blue-600">Register</Link></p>
                </div>
            </div>
        </div>
    )
}
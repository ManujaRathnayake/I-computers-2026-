import { useState } from "react";
import uploadMedia from "./mediaUpload";

        

        export default function Testpage(){
    // const [emotion , setEmotion] = useState("Happy")
    const [file , setFile ] = useState(null);

    async function handleUpload (){
        try{

            const url = await uploadMedia(file);
            console.log(url)


        }catch(error){
            console.log(error)
        }
        
        // send to Supabase
    }
    return(
        // <div className="w-full h-screen flex flex-col justify-center items-center">
        //     <div className="w-[300px] h-[300px] border-[6px] flex justify-center items-center">
        //         {emotion}
        //     </div>

        //     <div className="w-[300px] flex flex-row justify-center">
        //         <button onClick={
        //             ()=>{
        //                 setEmotion("Happy")
        //             }
        //         } className="bg-accent w-[70px] h-[30px] text-white m-1 rounded-sm">Happy</button>
        //         <button onClick={
        //             ()=>{
        //                 setEmotion("sad")
        //             }
        //         } className="bg-accent w-[70px] h-[30px] text-white m-1 rounded-sm">Sad</button>
        //         <button onClick={
        //             ()=>{
        //                 setEmotion("Angry")
        //             }
        //         } className="bg-accent w-[70px] h-[30px] text-white m-1 rounded-sm">Angry</button>
        //     </div>
        // </div>
    
        <div className="w-full h-screen flex justify-center items-center">
            <input onChange={
                (e)=>{
                    setFile(e.target.files[0])
                }
            } 
            type="file" />
            
            


            <button onClick={handleUpload}
            
            className="bg-secondary text-primary px-4 py-2 ">
                upload
            </button>
        </div>
    
    
    
    )







}

// URL -  https://piralnwecllcnlawvwae.supabase.co/rest/v1/
// Anon URL - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpcmFsbndlY2xsY25sYXd2d2FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIzMTU5ODIsImV4cCI6MjEwNzg5MTk4Mn0.KmT3cqoQj8PZVLfabvrnhF586LT78o2Jqh6RZ0HNtg4
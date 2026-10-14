import { useState } from "react";

export default function Testpage(){
    const [emotion , setEmotion] = useState("Happy")

    return(
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className="w-[300px] h-[300px] border-[6px] flex justify-center items-center">
                {emotion}
            </div>

            <div className="w-[300px] flex flex-row justify-center">
                <button onClick={
                    ()=>{
                        setEmotion("Happy")
                    }
                } className="bg-accent w-[70px] h-[30px] text-white m-1 rounded-sm">Happy</button>
                <button onClick={
                    ()=>{
                        setEmotion("sad")
                    }
                } className="bg-accent w-[70px] h-[30px] text-white m-1 rounded-sm">Sad</button>
                <button onClick={
                    ()=>{
                        setEmotion("Angry")
                    }
                } className="bg-accent w-[70px] h-[30px] text-white m-1 rounded-sm">Angry</button>
            </div>
        </div>
    )







}

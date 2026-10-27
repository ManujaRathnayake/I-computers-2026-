import { useState } from "react"

export default function ImageSlideShow(props){
    const [activeImage , setActiveImage] = useState(0)

    const images = props.images || []

    return(
        <div className="w-[500px] h-[600px] gap-2  flex flex-col ">
            <img src={images[activeImage]} alt="" className="w-full aspect-square object-cover" />
            <div className="h-[100px] w-full flex items-center justify-center">
                {
                    images.map(
                        (item , index)=>{
                            return(
                               <img 
                               onClick={
                                ()=>{
                                    setActiveImage(index)
                                }
                               }
                                className={`w-[90px] h-[90px] cursor-pointer rounded-lg ${index === activeImage ? "border-4 border-accent" : ""}`}
                               
                               key={index} src={item}  /> 
                               
                            )
                        }
                    )
                }
            </div>

        </div>
    )
}
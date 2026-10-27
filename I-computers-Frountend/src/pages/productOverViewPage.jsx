import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../utils/Api"
import toast from "react-hot-toast"
import LoadingAnimation from "../components/loadinganimation"
import ImageSlideShow from "../components/imageslideshow"
import getFormattedPrice from "../utils/priceformat"
import { addToCart, getcart } from "../utils/cart"

export default function ProductOverViewPage(){
    const parameters = useParams()
    const navigate = useNavigate()
    const [product , setProduct] = useState(null)
    const [status , setStatus] = useState("Loading...")

    //Loading , Success , Error

    useEffect(
        ()=>{

            api.get("/products/" + parameters.productId).then(
                (Response)=>{
                    setProduct(Response.data)
                    setStatus("Sucess")
                }
            ).catch(
                (error)=>{
                    toast.error(error?.Response?.data?.message)
                    setStatus("error")
                }
            )

            
        },[]
    )



    return(
        <>
        
        <div className="w-full h-full flex justify-center items-center">
            

            {
                //Loading
                status == "Loading..." && <LoadingAnimation/>
            }


            {
                //Error
                status == "error" && <h1> Failed to load products ! please try again later </h1>
            }


            {
                //sucess
                status == "Sucess" && <div className="w-full h-full bg-white flex">

                    <div className="w-1/2 h-full  flex justify-center items-center"><ImageSlideShow images={product.images}/></div>
                    <div className="w-1/2 h-full  flex flex-col p-5">
                    <h1 className="text-3xl font-bold ">{product.name}
                        {
                        
                        product.altNames.map(
                            (alternativeName , index)=>{
                                return(
                                    <span key={index} className="text-3xl text-gray-400 ">| {alternativeName}</span>
                                )
                            }
                        )
                        
                        
                        }
                    </h1>
                    
                    <h2 className="text-sm text-gray-500 mt-[20px]">{product.productId}</h2>
                    <div className="mt-5 w-full flex flex-col">
                        <p className="text-accent font-semibold text-4xl">
                        {
                            getFormattedPrice(product.price)
                        }
                        
                        </p>
                        {
                            product.labelledPrice > product.price && 
                            <span className="text-xl text-gray-500 line-through ">
                                {
                                    getFormattedPrice(product.labelledPrice)
                                }
                            </span>
                        }
                        <div className="w-full mt-5 flex gap-10">
                            <span className="text-lg font-semibold">Brand : {product.brand}</span>
                            <span className="text-lg font-semibold">Model : {product.model}</span>

                        </div>
                        <div className="w-full mt-5 flex gap-10">
                            <span className="text-lg font-semibold">{product.catagory}</span>
                        </div>
                        <p className="text-lg mt-5">
                            {
                                product.description
                            }
                        </p>

                        <div className="flex mt-5 gap-5">
                        <button className="w-62.5 h-16 bg-green-500 text-white text-xl font-semibold rounded-lg cursor-pointer hover:bg-green-700 transition-colors duration-300"
                        onClick={
                            ()=>{
                                addToCart(product ,1)
                            }
                        }
                        
                        >Add to Cart</button>
                        <button 
                        onClick={
                            ()=>{
                                console.log(getcart())
                            }
                        }
                        className="w-62.5 h-16 bg-blue-500  text-white text-xl font-semibold rounded-lg cursor-pointer hover:bg-blue-700 transition-colors duration-300">Buy Now</button>
                        </div>
                    </div>
                    
                    </div>

                </div>

            }
        </div>
        
        </>
    )
}
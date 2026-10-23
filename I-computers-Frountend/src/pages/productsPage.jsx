import axios from "axios"
import { useEffect, useState } from "react"
import Productcard from "../components/productcard"

export default function ProductsPage(){

    const [products , setProducts] = useState([])
    const [isProductsAreLoadad , setIsProductsAreLoadad] = useState(false)

    useEffect(
        ()=>{
            if(!isProductsAreLoadad){
                axios.get(import.meta.env.VITE_API_URL + "/products").then(
                    (response)=>{
                        setProducts(response.data)
                        setIsProductsAreLoadad(true)
                    }
                ).catch(
                    (error)=>{
                        console.log(error)
                    }
                )
            }
            
        }
    ),[isProductsAreLoadad]


    return(
        <>
            <div className="w-full h-full flex justify-center gap-2 flex-wrap ">
                {
                    products.map(
                        (item)=>{
                            return(
                                <Productcard key={item.productId} product={item}/>
                            )
                        }
                    )
                }
            </div>
        
        
        
        
        </>
    )
}
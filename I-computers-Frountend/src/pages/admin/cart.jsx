import { useState } from "react"
import { addToCart, getcart } from "../../utils/cart"
import getFormattedPrice from "../../utils/priceformat"

export default function Cart(){

    const [cart, setCart] = useState(getcart())
    return(
        <>
        <div className="w-full h-full flex flex-col p-5 items-center">
            {
                cart.map(
                    (item)=>{
                        return(
                            // ප්‍රධාන සුදු කාඩ් එක
                            <div key={item.product.productId} className="bg-white w-[500px] h-[150px] gap-4 rounded-lg shadow-2xl flex p-2 m-1 items-center relative">
                                <img src={item.product.image} alt="" className="w-[100px] h-[100px] object-cover rounded-l-lg"/>
                                
                                <div className="h-full w-[400px] relative"> {/* මෙතැනට relative එකතු කරන්න */}
                                    <h1 className="text-lg font-semibold">{item.product.name}</h1>
                                    <p className="text-sm text-gray-300">{item.product.productId}</p>
                                    {
                                        item.product.labelledPrice > item.product.price && <span className="text-sm text-gray-300 line-through">{item.product.labelledPrice}</span>
                                    }
                                    <p className="text-sm font-semibold">
                                        {getFormattedPrice(item.product.price)}
                                    </p>
                                   
                                    {/* රතු කොටුව */}
                                    <div className="absolute w-[150px] h-full top-0 right-0 flex justify-end items-end p-2 flex-col ">
                                        <div className="w-[100px] h-[30px] border flex rounded-full items-center px-2 justify-between">
                                            <button 
                                            onClick={
                                                ()=>{
                                                    addToCart(item.product, -1)
                                                    setCart(getcart())
                                                }
                                            }
                                            className="text-2xl font-bold cursor-pointer hover:text-accent">-</button>
                                            <span 
                                           
                                            className="text-lg font-bold">{item.quantity}</span>
                                            <button 
                                             onClick={
                                                ()=>{
                                                    addToCart(item.product , +1)
                                                    setCart(getcart())
                                                }
                                            }
                                            className="text-2xl font-bold cursor-pointer hover:text-accent">+</button>
                                        </div>

                                        <p className="text-lg text-secondary mt-2">{getFormattedPrice(item.product.price * item.quantity)}</p>
                                        
                                    </div>
                                </div>
                            </div>
                        )
                    }
                )
            }
        </div>
        </>
    )
}
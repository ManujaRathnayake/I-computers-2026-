import { Link } from "react-router-dom"
import getFormattedPrice from "../utils/priceformat"

export default function Productcard(props){
    
    const products = props.product

    return(
        <Link 
            to={"/overview/" + products.productId} 
            state={products} 
            className="group w-[300px] h-[450px] rounded-2xl bg-white overflow-hidden cursor-pointer flex flex-col justify-between border border-gray-100 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-gray-200"
        >
            
            {/* Product Images */}
            <div className="relative w-full h-[300px] overflow-hidden bg-gray-50">
                
                <img 
                    src={products.images?.[1]} 
                    className="w-full h-full object-cover absolute top-0 left-0 bg-white transition-transform duration-500 group-hover:scale-105" 
                    alt={products.name} 
                />

                <img 
                    src={products.images?.[0]} 
                    className="w-full h-full object-cover absolute top-0 left-0 bg-white primary-image transition-all duration-500 group-hover:scale-105" 
                    alt={products.name} 
                />

                {/* Subtle gradient for a premium look */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
            </div>

            {/* Product Information */}
            <div className="flex flex-col flex-1 justify-between px-4 pt-4 pb-5">
                
                <h1 className="text-lg font-semibold text-gray-900 leading-snug line-clamp-2 transition-colors duration-300 group-hover:text-blue-600">
                    {products.name}
                </h1>

                <div className="w-full flex flex-col mt-3">
                    {
                        products.labelledPrice > products.price && 
                        <span className="text-sm text-gray-400 line-through mb-1">
                            {getFormattedPrice(products.labelledPrice)}
                        </span>
                    }

                    <span className="text-xl font-bold text-gray-950 tracking-tight">
                        {getFormattedPrice(products.price)}
                    </span>
                </div>

            </div>

        </Link>
    )
}
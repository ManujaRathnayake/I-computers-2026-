import { Link } from "react-router-dom"

export default function Productcard(props){
    
    const products = props.product

    return(
        <Link to={"/overview/" + products.productId} state={products} className="w-[300px] h-[450px] rounded-lg shadow-2xl m-10 p-2 bg-white overflow-hidden cursor-pointer flex flex-col hover:[&_.primary-image]:opacity-0 justify-between">
            
            <div className="relative w-[300px] h-[300px] bg-red">
               <img src={products.images?.[1]} className="w-[300px] h-[300px] object-cover absolute top-0 left-0 bg-white" alt="" />
               <img src={products.images?.[0]} className="w-[300px] h-[300px] object-cover absolute  top-0 left-0 bg-white primary-image transition-opacity duration-500" alt="" />
            </div>

            <h1 className="text-lg font-semibold mt-2 px-2">{products.name}</h1>
            <div className="w-full flex flex-col py-4">
                {
                    products.labelledPrice > products.price && <span className="text-gray-500 mt-2 px-4 line-through">{products.labelledPrice}</span>
                    
                }
                <span className="text-black font-bold mt-2 px-4">{products.price}</span>
            </div>

        </Link>
    )




}// if we create some new tags in React first letter should be Capital
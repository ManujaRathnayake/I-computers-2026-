import { Link } from "react-router-dom";
import { BsFillCloudPlusFill } from "react-icons/bs";

export default function AdminProductPage(){
    return(
        <div className="w-full h-full">
           <Link to="/admin/add-products" className="fixed text-2xl bottom-2 right-2 p-3 bg-accent rounded-full m-3 font-bold text-cyan-50 flex justify-center items-center shadow-2xl">
           <BsFillCloudPlusFill />  
           
           </Link> 



        </div>
    )
}
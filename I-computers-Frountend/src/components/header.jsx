import { Link } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa6";

export default function Header(){
    return(
        <>
        <header className="w-full h-[100px] bg-accent relative flex items-center justify-center  ">
            <Link to="/" className="w-[100px] h-full bg-white absolute left-10 flex justify-center items-center">
                <img src="/logo.png" alt="logo" />
            </Link>

            <div className="h-full flex justify-center items-center gap-10">
                <Link to="/" className="text-white text-lg font-semibold ">Home</Link>
                <Link to="/products" className="text-white text-lg font-semibold ">Products</Link>
                <Link to="/contact-us" className="text-white text-lg font-semibold ">Contact us</Link>
            </div>

            <Link to="/cart" className="w-[50px] h-[50px] text-white text-2xl absolute right-10 flex justify-center items-center">
                <FaCartArrowDown />
            
            </Link>
        </header>

        </>
    )
}
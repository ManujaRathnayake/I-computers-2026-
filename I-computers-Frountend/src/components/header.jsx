import { Link } from "react-router-dom";

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
        </header>

        </>
    )
}
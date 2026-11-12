import { Link, useLocation } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { VscOpenInProduct } from "react-icons/vsc";
import { LuContact } from "react-icons/lu";
import UserData from "./userData";

export default function BottomNavigationBar() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <div className="fixed bottom-0 left-0  text-white w-full h-[60px] bg-accent/95 backdrop-blur-sm border-t border-white/10 lg:hidden flex justify-around items-center shadow-lg z-50">
            <Link 
                to="/" 
                className="text-3xl transition-all duration-200 px-4 py-1.5 rounded-full"
            >
                <IoHomeOutline/>
            </Link>

            <Link 
                to="/products" 
                className="text-3xl  transition-all duration-200 px-4 py-1.5 rounded-full"
            >
                <VscOpenInProduct />
            </Link>

            <Link 
                to="/contact-us" 
                className="text-3xl transition-all duration-200 px-4 py-1.5 rounded-full"
            >
                <LuContact />
            </Link>
            <Link>
                 <UserData/>
            </Link>
        </div>
    );
}
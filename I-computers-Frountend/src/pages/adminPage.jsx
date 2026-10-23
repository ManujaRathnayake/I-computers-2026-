import { Link, Route, Routes } from "react-router-dom";
import AdminProductPage from "./admin/adminProductPage";
import AdminAddProductPage from "./admin/adminAddProductsPage";
import AdmineditProductPage from "./admin/adminEditProductPage";

export default function AdminPage(){
    return( 
        <div className="w-full h-screen flex  items-center bg-accent">
            {/* left side Div*/}
            <div className="w-[300px] h-full bg-accent text-white">

                <Link to="/admin/" className="block py-2 px-4">Orders </Link>
                <Link to="/admin/products" className="block py-2 px-4">Products</Link>
                <Link to="/admin/users" className="block py-2 px-4">Users</Link>
                <Link to="/admin/reviews" className="block py-2 px-4">Reviews</Link>

            </div> 
            


            {/* Right side Div*/}
            <div className="w-[calc(100%-300px)] h-full bg-primary border-[10px] border-accent rounded-2xl">

            <Routes>

                <Route path="/" element={<h1>Orders Dashboard</h1>}/>
                <Route path="/products" element={<AdminProductPage/>}/>
                <Route path="/add-products" element={<AdminAddProductPage/>}/>
                <Route path='/edit-product' element={<AdmineditProductPage/>}/>
                <Route path="/users" element={<h1>Products</h1>}/>
                <Route path="/reviews" element={<h1>reviews</h1>}/>

            </Routes>
            
            
            </div> 
        </div>
    )
}
import { Route, Routes } from "react-router-dom"
import Header from "../components/header"
import ProductsPage from "./productsPage"
import Contactus from "./contactUsPage"
import ProductOverViewPage from "./productOverViewPage"
import Cart from "./admin/cart"
export default function Homepage() {
  return (
    <div className="w-full h-screen bg-primary flex flex-col shrink-0">
      <Header />

      <div className="w-full h-[calc(100%-100px)]  overflow-y-scroll  text-black">
        <Routes>
          <Route path="/" element={<h1>Welcome to I computers</h1>}></Route>
          <Route path="/products" element={<ProductsPage/>}></Route>
          <Route path="/contact-us" element={<Contactus/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/overview/:productId" element={<ProductOverViewPage/>}></Route>
        </Routes>
      </div>
    </div>
  )
}
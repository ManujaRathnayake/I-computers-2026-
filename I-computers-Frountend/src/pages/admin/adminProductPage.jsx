import { Link } from "react-router-dom";
import { BsFillCloudPlusFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingAnimation from "../../components/loadinganimation";
import ProductDeleteModal from "../../components/productDeleteModel";
import { RiEdit2Fill } from "react-icons/ri";

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [isProductsAreLoaded , setIsProductsAreLoaded] = useState(false)

  useEffect(
    () => {
      if(!isProductsAreLoaded){
        const token = localStorage.getItem("token");

    axios
      .get(import.meta.env.VITE_API_URL + "/products", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setProducts(response.data);
        setIsProductsAreLoaded(true)
      })
      .catch((error) => {
        console.log(error);
      });
      }
    
  }, [isProductsAreLoaded]);

  
return (
  <div className="min-h-screen w-full rounded-lg bg-slate-50/80 p-4 sm:p-6 lg:p-8">
    <div className="mx-auto max-w-[1600px] space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-500">
            <span>Admin Dashboard</span>
            <span>/</span>
            <span className="text-indigo-600">Products</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Product Management
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your inventory, pricing, and product availability.
          </p>
        </div>

        <Link
          to="/admin/add-products"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5 hover:bg-indigo-700"
        >
          <BsFillCloudPlusFill className="text-lg" />
          Add New Product
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Products
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {products.length}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <BsFillCloudPlusFill className="text-2xl" />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-400">
            Products in your catalog
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Available Products
              </p>
              <h2 className="mt-2 text-3xl font-bold text-emerald-600">
                {products.filter((item) => item.isAvailable).length}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <span className="text-2xl">✓</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-400">
            Currently marked in stock
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Out of Stock
              </p>
              <h2 className="mt-2 text-3xl font-bold text-rose-600">
                {products.filter((item) => !item.isAvailable).length}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <span className="text-2xl">!</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-400">
            Products marked unavailable
          </p>
        </div>

      </div>

      {/* Product Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              All Products
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              View and manage your store inventory.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600 sm:self-auto">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            {products.length} products
          </div>
        </div>

        {isProductsAreLoaded ? (
          products.length > 0 ? (
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[1200px] border-collapse text-left">
                <thead>
                  <tr className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="px-5 py-4">Product</th>
                    <th className="px-5 py-4">Product ID</th>
                    <th className="px-5 py-4">Price</th>
                    <th className="px-5 py-4">Labelled Price</th>
                    <th className="px-5 py-4">Brand / Model</th>
                    <th className="px-5 py-4">Category</th>
                    <th className="px-5 py-4">Availability</th>
                    <th className="px-5 py-4 text-center">Stock</th>
                    <th className="px-5 py-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-sm">
                  {products.map((item) => (
                    <tr
                      key={item.productId}
                      className="group transition-colors hover:bg-indigo-50/30"
                    >
                      {/* Product Image and Name */}
                      <td className="px-5 py-4">
                        <div className="flex min-w-[220px] items-center gap-3">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                            <img
                              src={item.images?.[0] || "/placeholder.png"}
                              alt={item.name}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="max-w-[220px] truncate font-semibold text-slate-800">
                              {item.name}
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                              {item.brand || "Unbranded"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Product ID */}
                      <td className="px-5 py-4">
                        <span className="whitespace-nowrap rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-600">
                          {item.productId}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="whitespace-nowrap px-5 py-4">
                        <span className="font-bold text-slate-900">
                          ${item.price}
                        </span>
                      </td>

                      {/* Labelled Price */}
                      <td className="whitespace-nowrap px-5 py-4">
                        <span className="text-slate-400 line-through">
                          ${item.labelledPrice}
                        </span>
                      </td>

                      {/* Brand / Model */}
                      <td className="px-5 py-4">
                        <div className="min-w-[130px]">
                          <p className="font-medium text-slate-700">
                            {item.brand || "—"}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {item.model || "No model"}
                          </p>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-5 py-4">
                        <span className="inline-flex whitespace-nowrap rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                          {item.catagory}
                        </span>
                      </td>

                      {/* Availability */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${
                            item.isAvailable
                              ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200"
                              : "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              item.isAvailable
                                ? "bg-emerald-500"
                                : "bg-rose-500"
                            }`}
                          ></span>
                          {item.isAvailable ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>

                      {/* Stock */}
                      <td className="px-5 py-4 text-center">
                        <span
                          className={`inline-flex min-w-10 justify-center rounded-lg px-2.5 py-1.5 font-semibold ${
                            item.stock > 0
                              ? item.stock <= 5
                                ? "bg-amber-50 text-amber-700"
                                : "bg-slate-100 text-slate-700"
                              : "bg-rose-50 text-rose-700"
                          }`}
                        >
                          {item.stock}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">

                          <Link
                            to="/admin/edit-product"
                            state={item}
                            title="Edit product"
                            aria-label={`Edit ${item.name}`}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-100 bg-indigo-50 text-indigo-600 transition-all hover:border-indigo-200 hover:bg-indigo-600 hover:text-white"
                          >
                            <RiEdit2Fill className="text-lg" />
                          </Link>

                          <div
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-rose-100 bg-rose-50 text-rose-600 transition-colors hover:border-rose-200"
                            title="Delete product"
                          >
                            <ProductDeleteModal
                              product={item}
                              refresh={() => {
                                setIsProductsAreLoaded(false);
                              }}
                            />
                          </div>

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <BsFillCloudPlusFill className="text-3xl" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                No products yet
              </h3>
              <p className="mt-2 max-w-sm text-sm text-slate-500">
                Your product catalog is empty. Add your first product to get started.
              </p>
              <Link
                to="/admin/add-products"
                className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Add Your First Product
              </Link>
            </div>
          )
        ) : (
          <div className="flex min-h-[300px] items-center justify-center">
            <LoadingAnimation />
          </div>
        )}

        {/* Table Footer */}
        {isProductsAreLoaded && products.length > 0 && (
          <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/50 px-5 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p>
              Showing <span className="font-semibold text-slate-700">{products.length}</span> products
            </p>
            <p>Product inventory management</p>
          </div>
        )}
      </div>

    </div>
  </div>
);

}

        {/* {
            products.map(
                (item) =>{
                    console.log(item)

                    return <p key={item.productId}>
                        {item.productId}                    
                    </p>
                }
            )
        } */}

         
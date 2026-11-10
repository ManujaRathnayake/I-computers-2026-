import { useEffect, useState } from "react";
import axios from "axios";
import LoadingAnimation from "../../components/loadinganimation";
import getFormattedPrice from "../../utils/priceformat";
import { FaEye } from "react-icons/fa6";
import OrderDetailsModal from "../../components/OrderDetailsModal";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isordersAreLoaded, setIsOrdersAreLoaded] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!isordersAreLoaded) {
      const token = localStorage.getItem("token");

      axios
        .get(import.meta.env.VITE_API_URL + "/orders/" + pageSize + "/" + currentPage, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setOrders(response.data.orders);
          setTotalPages(response.data.totalPages || 0);
          setIsOrdersAreLoaded(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isordersAreLoaded]);

  return (
    <div className="min-h-screen w-full rounded-lg bg-slate-50/80 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-500">
              <span>Admin Dashboard</span>
              <span>/</span>
              <span className="text-indigo-600">Orders</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Order Management
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage Your Orders
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Orders
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {orders.length}
                </h2>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              All received orders
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Pending Orders
                </p>
                <h2 className="mt-2 text-3xl font-bold text-amber-600">
                  {orders.filter((item) => item.status === "Pending").length}
                </h2>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              Orders awaiting processing
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Completed / Delivered
                </p>
                <h2 className="mt-2 text-3xl font-bold text-emerald-600">
                  {orders.filter((item) => item.status === "Delivered").length}
                </h2>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              Successfully fulfilled orders
            </p>
          </div>
        </div>

        {/* Orders Section */}
        {!isordersAreLoaded ? (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <LoadingAnimation />
          </div>
        ) : orders.length > 0 ? (
          <>
            {/* Table Container */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    All Orders
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    View and manage your store orders.
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600 sm:self-auto">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  {orders.length} orders
                </div>
              </div>

              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[1200px] border-collapse text-left">
                  <thead>
                    <tr className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      <th className="px-5 py-4">Order ID</th>
                      <th className="px-5 py-4">Email</th>
                      <th className="px-5 py-4">First Name</th>
                      <th className="px-5 py-4">Last Name</th>
                      <th className="px-5 py-4">Phone Number</th>
                      <th className="px-5 py-4">Date</th>
                      <th className="px-5 py-4 text-center">Total</th>
                      <th className="px-5 py-4 text-center">Status</th>
                      <th className="px-5 py-4 text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 text-sm">
                    {orders.map((item) => (
                      <tr
                        key={item.orderId}
                        className="group transition-colors hover:bg-indigo-50/30"
                      >
                        {/* Order ID */}
                        <td className="px-5 py-4">
                          <span className="whitespace-nowrap rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-600">
                            {item.orderId}
                          </span>
                        </td>

                        {/* Email */}
                        <td className="whitespace-nowrap px-5 py-4 text-slate-900">
                          {item.email}
                        </td>

                        {/* First Name */}
                        <td className="whitespace-nowrap px-5 py-4 text-slate-700">
                          {item.firstName}
                        </td>

                        {/* Last Name */}
                        <td className="whitespace-nowrap px-5 py-4 text-slate-700">
                          {item.lastName}
                        </td>

                        {/* Phone Number */}
                        <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                          {item.phoneNumber}
                        </td>

                        {/* Date */}
                        <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                          {item.date ? new Date(item.date).toLocaleDateString() : "-"}
                        </td>

                        {/* Total */}
                        <td className="whitespace-nowrap px-5 py-4 text-center font-semibold text-slate-900">
                          {getFormattedPrice(item.total)}
                        </td>

                        {/* Status */}
                        <td className="whitespace-nowrap px-5 py-4 text-center">
                          <span className="inline-flex whitespace-nowrap rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                            {item.status}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 text-center flex justify-center items-center">
                        
                          <OrderDetailsModal order={item} refresh={()=> setIsOrdersAreLoaded(false)}/>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination Controls - Table එකෙන් සම්පූර්ණයෙන්ම පිටත */}
            <div className="w-full flex justify-end items-center gap-3 mt-4">
              <button 
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                    setIsOrdersAreLoaded(false);
                  }
                }}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
              >
                Previous
              </button>

              <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>

              <button 
                onClick={() => {
                  if (totalPages === 0 || currentPage < totalPages) {
                    setCurrentPage(currentPage + 1);
                    setIsOrdersAreLoaded(false);
                  }
                }} 
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
              >
                Next
              </button>

              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(parseInt(e.target.value));
                  setCurrentPage(1);
                  setIsOrdersAreLoaded(false);
                }}
                className="ml-4 px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
            No orders found.
          </div>
        )}
      </div>
    </div>
  );
}
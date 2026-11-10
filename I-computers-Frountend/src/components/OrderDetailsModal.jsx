import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa6";
import getFormattedPrice from "../utils/priceformat";

export default function OrderDetailsModal(props) {

    const [isModelOpen, setIsModelOpen] = useState(false);

    const order = props.order;
    const refresh = props.refresh;

    return (
        <>
            <FaEye
                onClick={() => setIsModelOpen(true)}
                className="text-2xl text-blue-500 cursor-pointer hover:text-blue-700 transition"
            />

            {isModelOpen && (
                <div className="w-screen h-screen fixed bg-gray-900/60 backdrop-blur-sm top-0 left-0 flex justify-center items-center z-[99] p-4">

                    <div className="w-full max-w-[600px] max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl relative">

                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-6 rounded-t-2xl flex justify-between items-center">

                            <div>
                                <h2 className="text-2xl font-bold text-white">
                                    Order Details
                                </h2>

                                <p className="text-blue-100 text-sm mt-1">
                                    Complete customer order information
                                </p>
                            </div>

                            <button
                                onClick={() => setIsModelOpen(false)}
                                className="w-9 h-9 rounded-full bg-white/20 text-white hover:bg-red-500 transition flex items-center justify-center text-xl font-bold cursor-pointer"
                            >
                                &times;
                            </button>

                        </div>

                        {/* Order ID */}
                        <div className="px-7 pt-6">

                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex justify-between items-center">

                                <div>
                                    <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider">
                                        Order ID
                                    </p>

                                    <h3 className="text-xl font-bold text-gray-800 mt-1">
                                        {order.orderId}
                                    </h3>
                                </div>

                                <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                                    <FaEye className="text-xl" />
                                </div>

                            </div>

                        </div>

                        {/* Customer Information */}
                        <div className="px-7 py-6">

                            <h3 className="text-gray-800 font-bold text-lg mb-4">
                                Customer Information
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <p className="text-xs text-gray-500 font-medium mb-1">
                                        Customer Name
                                    </p>

                                    <p className="text-gray-800 font-semibold">
                                        {order.firstName} {order.lastName}
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <p className="text-xs text-gray-500 font-medium mb-1">
                                        Phone Number
                                    </p>

                                    <p className="text-gray-800 font-semibold">
                                        {order.phoneNumber}
                                    </p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-xl sm:col-span-2">
                                    <p className="text-xs text-gray-500 font-medium mb-1">
                                        Customer Email
                                    </p>

                                    <p className="text-gray-800 font-semibold break-all">
                                        {order.email}
                                    </p>
                                </div>

                            </div>

                            {/* Order Items */}
                            <h3 className="text-gray-800 font-bold text-lg mt-7 mb-4">
                                Order Items
                            </h3>

                            <div className="w-full max-h-[400px] overflow-y-auto flex flex-col gap-3 overflow-y-scroll ">

                                {order.items.map((item, index) => {
                                    const product = item.product || item.Product || {};
                                    return (
                                        <div
                                            key={index}
                                            className="bg-white border border-gray-200 p-4 rounded-xl w-full flex justify-between items-center shadow-sm"
                                        >

                                            <div className="flex items-center gap-4">

                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-16 h-16 object-cover rounded-lg"
                                                />

                                                <div className="flex flex-col gap-1">

                                                    <span className="text-gray-800 font-semibold">
                                                        {product.name}
                                                    </span>

                                                    <span className="text-gray-600 text-sm">
                                                        Quantity: {item.quantity}
                                                    </span>

                                                    <span className="text-gray-600 text-sm">
                                                        Rs. {getFormattedPrice(product.price)}
                                                    </span>

                                                </div>

                                            </div>

                                            <div className="text-lg font-semibold text-gray-800">
                                                {getFormattedPrice(product.price * item.quantity)}
                                            </div>

                                        </div>
                                    );
                                })}

                            </div>

                            {/* Delivery Address */}
                            <h3 className="text-gray-800 font-bold text-lg mt-7 mb-4">
                                Delivery Address
                            </h3>

                            <div className="bg-gray-50 p-4 rounded-xl space-y-2">

                                <p className="text-gray-800 font-semibold">
                                    {order.addressLineOne}
                                </p>

                                {order.addressLineTwo && (
                                    <p className="text-gray-700">
                                        {order.addressLineTwo}
                                    </p>
                                )}

                                <p className="text-gray-700">
                                    {order.city}, {order.state} {order.postalcode}
                                </p>

                            </div>

                            {/* Order Summary */}
                            <h3 className="text-gray-800 font-bold text-lg mt-7 mb-4">
                                Order Summary
                            </h3>

                            <div className="bg-gray-50 p-5 rounded-xl flex justify-between items-center">

                                <div>
                                    <p className="text-xs text-gray-500 font-medium mb-2">
                                        Order Status
                                    </p>

                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700">
                                        {order.status}
                                    </span>
                                </div>

                                <div className="text-right">
                                    <p className="text-xs text-gray-500 font-medium mb-1">
                                        Total Amount
                                    </p>

                                    <p className="text-2xl font-extrabold text-blue-600">
                                        Rs. {getFormattedPrice(order.total)}
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* Footer */}
                        <div className="px-7 pb-6">

                            <button
                                onClick={() => setIsModelOpen(false)}
                                className="w-full bg-gray-900 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition duration-300 cursor-pointer"
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </>
    );
}
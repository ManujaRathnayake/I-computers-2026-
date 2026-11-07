import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import getFormattedPrice from "../utils/priceformat";
import { FaPhone } from "react-icons/fa6";

export default function OrderDetailsModal(props) {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const order = props.order;
  const refresh = props.refresh;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModelOpen(true)}
        className="p-2 rounded-lg text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors duration-150 cursor-pointer inline-flex items-center justify-center focus:outline-none"
        title="View Order Details"
      >
        <FaEye className="text-xl" />
      </button>

      {isModelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all duration-200">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden relative flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-slate-800">
                  Order Details
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  #{order.orderId}
                </span>
              </div>
              <button
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors duration-150 cursor-pointer text-sm font-semibold"
                onClick={() => setIsModelOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Order ID
                  </span>
                  <span className="text-sm font-semibold text-slate-700 font-mono truncate">
                    {order.orderId}
                  </span>
                </div>

                <div className="flex flex-col gap-1 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Customer Name
                  </span>
                  <span className="text-sm font-semibold text-slate-800">
                    {order.firstName} {order.lastName}
                  </span>
                </div>

                <div className="flex flex-col gap-1 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Email
                  </span>
                  <span className="text-sm text-slate-700 break-all font-medium">
                    {order.email}
                  </span>
                </div>

                <div className="flex flex-col   gap-1 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Phone
                  </span>
                  <span className="text-sm text-slate-700 font-medium">
                     
                    {order.phoneNumber}
                  </span>
                </div>
              </div>

              {/* Address Row */}
              <div className="flex flex-col gap-1 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Delivery Address
                </span>
                <span className="text-sm text-slate-700 flex overflow-x-scroll leading-relaxed ">
                  {order.addressLineOne}
                  {order.addressLineTwo ? `, ${order.addressLineTwo}` : ""}
                  {order.city ? `, ${order.city}` : ""}
                </span>
              </div>

              {/* Total Section */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50/70 border border-blue-100 mt-1">
                <span className="text-sm font-medium text-blue-900">
                  Total Amount
                </span>
                <span className="text-xl font-bold text-blue-700">
                  {getFormattedPrice(order.total)}
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setIsModelOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors duration-150 cursor-pointer shadow-sm"
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
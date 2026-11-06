import { useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/Api"; //

export default function CreateOrderModel(props) {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addressLineOne, setAddressLineOne] = useState("");
  const [addressLineTwo, setAddressLineTwo] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const cart = props.cart || [];

  async function createOrder() {
    try {
      const token = localStorage.getItem("token");
      
      const data = {
        firstName,
        lastName,
        addressLineOne,
        addressLineTwo,
        city,
        state,
        postalcode,
        phoneNumber,
        items: cart.map((item) => ({
          productId: item.product?.productId || item.productId,
          quantity: item.quantity,
        })),
      };

      await api.post("/orders", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Order Created Successfully");
      setIsModelOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred while creating the order");
    }
  }

  return (
    <>
      <button 
        onClick={() => setIsModelOpen(true)} 
        className="bg-accent text-xl rounded-xl px-4 text-white py-2 font-semibold"
      >
        Order Now
      </button>

      {isModelOpen && (
        <div className="fixed bg-black/70 w-screen h-screen top-0 left-0 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-[400px] max-h-[90vh] overflow-y-auto rounded-lg flex flex-col gap-4 p-5">
            <h1 className="text-2xl font-bold text-center">Shipping Details</h1>
            
            <input 
              type="text" 
              placeholder="First Name" 
              className="w-full border p-2 rounded" 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
            />
            <input 
              type="text" 
              placeholder="Last Name" 
              className="w-full border p-2 rounded" 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
            />
            <input 
              type="text" 
              placeholder="Address Line 1" 
              className="w-full border p-2 rounded" 
              value={addressLineOne} 
              onChange={(e) => setAddressLineOne(e.target.value)} 
            />
            <input 
              type="text" 
              placeholder="Address Line 2" 
              className="w-full border p-2 rounded" 
              value={addressLineTwo} 
              onChange={(e) => setAddressLineTwo(e.target.value)} 
            />
            <input 
              type="text" 
              placeholder="City" 
              className="w-full border p-2 rounded" 
              value={city} 
              onChange={(e) => setCity(e.target.value)} 
            />
            <input 
              type="text" 
              placeholder="State" 
              className="w-full border p-2 rounded" 
              value={state} 
              onChange={(e) => setState(e.target.value)} 
            />
            <input 
              type="text" 
              placeholder="Postal Code" 
              className="w-full border p-2 rounded" 
              value={postalcode} 
              onChange={(e) => setPostalcode(e.target.value)} 
            />
            <input 
              type="text" 
              placeholder="Phone Number" 
              className="w-full border p-2 rounded" 
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)} 
            />

            <div className="w-full flex flex-row justify-between items-center mt-2">
              <button 
                type="button"
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold" 
                onClick={() => setIsModelOpen(false)}
              >
                Cancel
              </button>
              <button 
                type="button"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold" 
                onClick={createOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
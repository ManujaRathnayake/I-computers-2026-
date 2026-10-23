import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

export default function ProductDeleteModal(props){

    const [isModelOpen , setIsModelOpen] = useState(false)
    const product = props.product
    const refresh = props.refresh

    function handleDelete() {
    const token = localStorage.getItem("token");

    axios
      .delete(import.meta.env.VITE_API_URL + "/products/" + product.productId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        toast.success("Product deleted successfully");
        setIsModelOpen(false); // සාර්ථක වූ පසු modal එක close කරන්න
        refresh();
      })
      .catch((error) => {
        toast.error("Failed to delete product");
        console.log(error); // typo එක නිවැරදි කරන ලදී
      });
  }

  return (
    <>
      <FaTrash
        onClick={() => setIsModelOpen(true)}
        className="text-2xl text-red-500 cursor-pointer"
      />

      {isModelOpen && (
        <div className="w-screen h-screen fixed bg-black/30 top-0 left-0 flex justify-center items-center flex-col">
          <div className="w-[500px] h-[300px] bg-white flex justify-center items-center flex-col gap-4 rounded-lg shadow-lg">
            <h1>
              Are you sure you want to delete product with {product.productId}?
            </h1>
            <div className="flex gap-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-700 text-white rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setIsModelOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

import uploadMedia from "../../mediaUpload";

export default function AdmineditProductPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [productId, setProductId] = useState(location.state?.productId || "");
  const [name, setName] = useState(location.state?.name || "");
  const [altNames, setAltNames] = useState(
    location.state?.altNames ? location.state.altNames.join(",") : ""
  );
  const [price, setPrice] = useState(location.state?.price || "");
  const [labelledPrice, setlabelledPrice] = useState(location.state?.labelledPrice || "");
  const [description, setDescription] = useState(location.state?.description || "");
  // දැනට ඇති පින්තූර සහ අලුතින් තෝරන files වෙන්ව තබා ගැනීම
  const [existingImages] = useState(location.state?.images || []);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [brand, setBrand] = useState(location.state?.brand || "");
  const [model, setModel] = useState(location.state?.model || "");
  const [catagory, setCatagory] = useState(location.state?.catagory || "");
  const [isAvailable, setisAvailability] = useState(location.state?.isAvailable || false);
  const [stock, setStock] = useState(location.state?.stock || "");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!location.state) {
      toast.error("No Data Found ! Please Select a product to edit");
      navigate("/admin/products");
    }
  }, [location.state, navigate]);

  // location.state නැතිනම් component එක render වීම වළක්වයි
  if (!location.state) return null;

  async function handleUpdate() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to perform this action");
        window.location.href = "/login";
        return;
      }

      setIsUpdating(true);

      let finalImages = existingImages;

      // අලුතින් files තෝරා ඇත්නම් පමණක් upload කරන්න
      if (selectedFiles && selectedFiles.length > 0) {
        const mediaUploadPromises = Array.from(selectedFiles).map((file) =>
          uploadMedia(file)
        );
        finalImages = await Promise.all(mediaUploadPromises);
      }

      const altNamesArray = altNames
        ? altNames.split(",").map((item) => item.trim())
        : [];

      const productData = {
        name,
        altNames: altNamesArray,
        price: Number(price),
        labelledPrice: Number(labelledPrice),
        description,
        images: finalImages,
        brand,
        model,
        catagory,
        isAvailable,
        stock: Number(stock),
      };

      await axios.put(
        import.meta.env.VITE_API_URL + "/products/" + productId,
        productData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update product! Please try again"
      );
    } finally {
      setIsUpdating(false);
    }
  }

  function handleCancel() {
    navigate("/admin/products");
  }

  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <div className="w-full h-[100px] bg-accent justify-between rounded-lg shadow-2xl text-white p-5 flex items-center sticky top-0">
        <h1 className="text-2xl font-semibold">Edit Products</h1>
        <div className="h-full flex items-center justify-center">
          <button
            onClick={handleUpdate}
            disabled={isUpdating}
            className="px-4 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50"
          >
            {isUpdating ? "Updating..." : "Update"}
          </button>
          <button
            onClick={handleCancel}
            className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>

      <div className="w-full flex flex-wrap bg-white overflow-scroll p-5 mt-8 shadow-2xl rounded-lg">
        <div className="w-1/4 p-2">
          <label className="block mb-2 font-semibold">Product ID</label>
          <input
            className="border border-gray-300 rounded-lg p-2 w-full bg-gray-100"
            value={productId}
            disabled={true}
          />
        </div>

        <div className="w-3/4 p-2">
          <label className="block mb-2 font-semibold">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        <div className="w-full p-2">
          <label className="block mb-2 font-semibold">
            Alt Names (Comma separated)
          </label>
          <input
            value={altNames}
            onChange={(e) => setAltNames(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        <div className="w-1/4 p-2">
          <label className="block mb-2 font-semibold">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        <div className="w-1/4 p-2">
          <label className="block mb-2 font-semibold">Labelled Price</label>
          <input
            type="number"
            value={labelledPrice}
            onChange={(e) => setlabelledPrice(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        <div className="w-1/4 p-2">
          <label className="block mb-2 font-semibold">Category</label>
          <select
            value={catagory}
            onChange={(e) => setCatagory(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          >
            <option value="Laptop">Laptop</option>
            <option value="Mobile">Mobile</option>
            <option value="Headphones">Headphones</option>
            <option value="Camera">Camera</option>
            <option value="others">Others</option>
          </select>
        </div>

        <div className="w-1/4 p-2">
          <label className="block mb-2 font-semibold">Images</label>
          <input
            type="file"
            multiple
            onChange={(e) => setSelectedFiles(e.target.files)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        <div className="w-full p-2">
          <label className="block mb-2 font-semibold">Description</label>
          <textarea
            className="border border-gray-300 rounded-lg p-2 w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="w-1/4 p-2">
          <label className="block mb-2 font-semibold">Brand</label>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          >
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="Sony">Sony</option>
            <option value="Dell">Dell</option>
            <option value="Asus">Asus</option>
          </select>
        </div>

        <div className="w-1/4 p-2">
          <label className="block mb-2 font-semibold">Model</label>
          <input
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        <div className="w-1/4 p-2">
          <label className="block mb-2 font-semibold">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        <div className="w-1/4 p-2">
          <label className="block mb-2 font-semibold">Available</label>
          <select
            value={isAvailable.toString()}
            onChange={(e) => setisAvailability(e.target.value === "true")}
            className="border border-gray-300 rounded-lg p-2 w-full"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>
    </div>
  );
}
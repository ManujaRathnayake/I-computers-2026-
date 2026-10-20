import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import uploadMedia from "../../mediaUpload";

export default function AdminAddProductPage() {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState("");
  const [price, setPrice] = useState("");
  const [labelledPrice, setlabelledPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [brand, setBrand] = useState("Apple");
  const [model, setModel] = useState("");
  const [catagory, setCatagory] = useState("Laptop");
  const [isAvailable, setisAvailability] = useState(true);
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSave() {
    try {
      const token = localStorage.getItem("token");
      if (token == null) {
        toast.error("You must be logged in to perform this action");
        window.location.href = "/login";
        return;
      }

      setIsLoading(true);

      const mediaUploadPromises = [];
      for (let i = 0; i < images.length; i++) {
        mediaUploadPromises.push(uploadMedia(images[i]));
      }

      const urls = await Promise.all(mediaUploadPromises);
      const altNamesArray = altNames ? altNames.split(",").map((item) => item.trim()) : [];

      const productData = {
        productId: productId,
        name: name,
        altNames: altNamesArray,
        price: Number(price),
        labelledPrice: Number(labelledPrice),
        description: description,
        images: urls,
        brand: brand,
        model: model,
        catagory: catagory,
        isAvailable: isAvailable,
        stock: Number(stock),
      };

      await axios.post(
        import.meta.env.VITE_API_URL + "/products",
        productData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("Product created successfully");
      navigate("/admin/products");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to save product! Please try again");
    } finally {
      setIsLoading(false);
    }
  }

  function handleCancel() {
    navigate("/admin/products");
  }

  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <div className="w-full h-[100px] bg-accent justify-between rounded-lg shadow-2xl text-white p-5 flex items-center sticky top-0">
        <h1 className="text-2xl font-semibold">Add New Product</h1>
        <div className="h-full flex items-center justify-center">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-4 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save"}
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
            className="border border-gray-300 rounded-lg p-2 w-full"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
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
          <label className="block mb-2 font-semibold">Alt Names (Comma separated)</label>
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
            onChange={(e) => setImages(e.target.files)}
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
            value={isAvailable}
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
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function AddFood() {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const IMGBB_KEY = import.meta.env.VITE_IMGBB_KEY;
  const API = import.meta.env.VITE_API_BASE;

  const onSubmit = async (data) => {
    if (!user) return toast.error("Login required");
    if (!data.image[0]) return toast.error("Image is required");

    try {
      toast.info("Uploading image...");
      const fd = new FormData();
      fd.append("image", data.image[0]);
      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`,
        fd
      );
      const imageUrl = imgbbRes.data.data.url;

      const token = await user.getIdToken();
      const payload = {
        name: data.name,
        imageUrl,
        quantity: data.quantity,
        pickupLocation: data.pickupLocation,
        expireDate: data.expireDate,
        notes: data.notes,
        donator: {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        },
        food_status: "Available",
      };

      const res = await fetch(`${API}/foods`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Food added successfully!");
        reset();
        navigate("/manage-foods");
      } else {
        const err = await res.json();
        toast.error(err.message || "Failed to add food");
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-green-50">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-2xl">
        <h2 className="mb-6 text-2xl font-bold text-center text-green-700">
          Add New Food 🍱
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Food Name
            </label>
            <input
              {...register("name", { required: true })}
              placeholder="e.g., Chicken Biryani"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

        
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <div className="flex items-center gap-3 px-3 py-2 border rounded-lg bg-gray-50">
              <FaCloudUploadAlt className="text-xl text-green-600" />
              <input
                type="file"
                accept="image/*"
                {...register("image", { required: true })}
                className="w-full text-gray-600"
              />
            </div>
          </div>

       
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              {...register("quantity", { required: true })}
              placeholder='e.g., "Serves 2 people"'
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

         
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Pickup Location
            </label>
            <input
              {...register("pickupLocation", { required: true })}
              placeholder="e.g., Dhanmondi 27, Dhaka"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Expire Date
            </label>
            <input
              type="date"
              {...register("expireDate", { required: true })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

        
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Additional Notes
            </label>
            <textarea
              {...register("notes")}
              placeholder="e.g., Vegetarian, contains nuts..."
              rows="3"
              className="w-full px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
            ></textarea>
          </div>

         
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white transition bg-green-600 rounded-lg hover:bg-green-700"
          >
            Add Food
          </button>
        </form>
      </div>
    </div>
  );
}

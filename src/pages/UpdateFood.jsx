import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function UpdateFood() {
  const { id } = useParams();
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [currentImage, setCurrentImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const API = import.meta.env.VITE_API_BASE;
  const IMGBB_KEY = import.meta.env.VITE_IMGBB_KEY;
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      if (!user) return;
      try {
        const token = await user.getIdToken();
        const res = await fetch(`${API}/foods/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return toast.error("Cannot load food details");
        const data = await res.json();

        setCurrentImage(data.imageUrl);
        reset({
          name: data.name,
          quantity: data.quantity,
          pickupLocation: data.pickupLocation,
          expireDate: data.expireDate?.slice(0, 10),
          notes: data.notes,
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load data");
      }
    })();
  }, [id, user, reset]);

  const onSubmit = async (d) => {
    try {
      setLoading(true);
      const token = await user.getIdToken();
      let imageUrl = currentImage;

      
      if (d.image?.[0]) {
        const fd = new FormData();
        fd.append("image", d.image[0]);
        toast.info("Uploading new image...");
        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`,
          fd
        );
        imageUrl = imgRes.data.data.url;
      }

      const updatedData = {
        name: d.name,
        quantity: d.quantity,
        pickupLocation: d.pickupLocation,
        expireDate: d.expireDate,
        notes: d.notes,
        imageUrl,
      };

      const res = await fetch(`${API}/foods/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        toast.success("Food updated successfully!");
        nav("/manage-foods");
      } else toast.error("Failed to update food.");
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-green-50">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-2xl">
        <h2 className="mb-6 text-2xl font-bold text-center text-green-700">
          Update Food 🍱
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Food Name
            </label>
            <input
              {...register("name")}
              placeholder="Food name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

       
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              {...register("quantity")}
              placeholder="e.g., Serves 2 people"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

         
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Pickup Location
            </label>
            <input
              {...register("pickupLocation")}
              placeholder="e.g., Dhanmondi, Dhaka"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

         
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Expire Date
            </label>
            <input
              type="date"
              {...register("expireDate")}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              {...register("notes")}
              placeholder="Add additional info..."
              rows="3"
              className="w-full px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
            ></textarea>
          </div>

          {currentImage && (
            <div className="mt-3">
              <p className="mb-1 text-sm font-medium text-gray-700">
                Current Image
              </p>
              <img
                src={previewImage || currentImage}
                alt="Current food"
                className="object-cover w-full h-48 mb-2 border rounded-lg"
              />
            </div>
          )}

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Upload New Image (optional)
            </label>
            <div className="flex items-center gap-3 px-3 py-2 border rounded-lg bg-gray-50">
              <FaCloudUploadAlt className="text-xl text-green-600" />
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                onChange={(e) =>
                  setPreviewImage(
                    e.target.files[0]
                      ? URL.createObjectURL(e.target.files[0])
                      : null
                  )
                }
                className="w-full text-gray-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white font-semibold rounded-lg ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 transition"
            }`}
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

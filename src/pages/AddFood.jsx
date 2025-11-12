import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AddFood(){
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const IMGBB_KEY = import.meta.env.VITE_IMGBB_KEY;
  const API = import.meta.env.VITE_API_BASE;

  const onSubmit = async (data) => {
    if (!user) return toast.error("Login required");
    if (!data.image[0]) return toast.error("Image required");

    try {
      toast.info("Uploading image...");
      const fd = new FormData();
      fd.append("image", data.image[0]);
      const imgbbRes = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, fd);
      const imageUrl = imgbbRes.data.data.url;

      const token = await user.getIdToken();
      const payload = {
        name: data.name,
        imageUrl,
        quantity: data.quantity,
        pickupLocation: data.pickupLocation,
        expireDate: data.expireDate,
        notes: data.notes,
        donator: { name: user.displayName, email: user.email, photoURL: user.photoURL },
        food_status: "Available"
      };

      const res = await fetch(`${API}/foods`, {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        toast.success("Food added");
        reset();
        navigate("/manage-foods");
      } else {
        const err = await res.json();
        toast.error(err.message || "Failed to add");
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    }
  };

  return (
    <div style={{padding:20}}>
      <h2>Add Food</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{display:"grid",gap:10,maxWidth:600}}>
        <input {...register("name",{required:true})} placeholder="Food Name" />
        <input type="file" {...register("image",{required:true})} accept="image/*" />
        <input {...register("quantity",{required:true})} placeholder='Quantity (e.g., "Serves 2")' />
        <input {...register("pickupLocation",{required:true})} placeholder="Pickup Location" />
        <input type="date" {...register("expireDate",{required:true})} />
        <textarea {...register("notes")} placeholder="Additional Notes" />
        <button type="submit">Add Food</button>
      </form>
    </div>
  );
}

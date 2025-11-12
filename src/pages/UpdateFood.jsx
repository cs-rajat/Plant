import React, {useEffect} from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

export default function UpdateFood(){
  const { id } = useParams();
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const API = import.meta.env.VITE_API_BASE;
  const nav = useNavigate();

  useEffect(()=>{
    (async ()=>{
      if (!user) return;
      const token = await user.getIdToken();
      const res = await fetch(`${API}/foods/${id}`, { headers: { Authorization: `Bearer ${token}` }});
      if (!res.ok) return toast.error("Cannot load");
      const data = await res.json();
      reset({
        name: data.name,
        quantity: data.quantity,
        pickupLocation: data.pickupLocation,
        expireDate: data.expireDate?.slice(0,10),
        notes: data.notes
      });
    })();
  },[id,user]);

  const onSubmit = async (d) => {
    const token = await user.getIdToken();
    const res = await fetch(`${API}/foods/${id}`, {
      method: "PATCH",
      headers: { "Content-Type":"application/json", Authorization:`Bearer ${token}`},
      body: JSON.stringify(d)
    });
    if (res.ok) { toast.success("Updated"); nav("/manage-foods"); }
    else toast.error("Failed");
  };

  return (
    <div style={{padding:20}}>
      <h2>Update Food</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{display:"grid",gap:10,maxWidth:600}}>
        <input {...register("name")} />
        <input {...register("quantity")} />
        <input {...register("pickupLocation")} />
        <input type="date" {...register("expireDate")} />
        <textarea {...register("notes")} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

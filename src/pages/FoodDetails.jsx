import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

export default function FoodDetails(){
  const { id } = useParams();
  const { user } = useAuth();
  const [food, setFood] = useState(null);
  const [asking, setAsking] = useState({location:"", reason:"", contactNo:""});
  useEffect(()=> {
    // get details (server route requires token)
    const fetchData = async ()=>{
      const token = user && await user.getIdToken();
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/foods/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      const data = await res.json();
      setFood(data);
    };
    fetchData();
  },[id, user]);

  const submitRequest = async ()=>{
    if (!user) { toast.error("Please login to request"); return; }
    const token = await user.getIdToken();
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/requests`, {
      method: "POST",
      headers: { "Content-Type":"application/json", Authorization:`Bearer ${token}` },
      body: JSON.stringify({ foodId: id, ...asking })
    });
    if (res.ok) { toast.success("Request submitted"); setAsking({location:"",reason:"",contactNo:""}); }
    else toast.error("Failed");
  };

  if (!food) return <div>Loading...</div>;
  return (
    <div style={{padding:20}}>
      <h2>{food.name}</h2>
      <img src={food.imageUrl} style={{width:320,height:200,objectFit:"cover"}}/>
      <p>{food.quantity} — {food.pickupLocation}</p>
      <p>Donator: {food.donator?.name} ({food.donator?.email})</p>
      <p>Notes: {food.notes}</p>

      <h3>Request Food</h3>
      <input placeholder="Location" value={asking.location} onChange={e=>setAsking(s=>({...s,location:e.target.value}))} />
      <textarea placeholder="Why need food" value={asking.reason} onChange={e=>setAsking(s=>({...s,reason:e.target.value}))} />
      <input placeholder="Contact No" value={asking.contactNo} onChange={e=>setAsking(s=>({...s,contactNo:e.target.value}))} />
      <button onClick={submitRequest}>Submit Request</button>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";

export default function AvailableFoods() {
  const [foods, setFoods] = useState(null);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_BASE;
  const nav = useNavigate();

  useEffect(()=> {
    (async ()=>{
      try {
        const res = await fetch(`${API}/foods`);
        const data = await res.json();
        setFoods(data);
      } catch(e){ console.error(e); }
      setLoading(false);
    })();
  },[]);

  if (loading) return <Loader />;
  return (
    <div style={{padding:20}}>
      <h2>Available Foods</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:16}}>
        {foods?.map(f=>(
          <div key={f._id} style={{border:"1px solid #ddd",padding:12}}>
            <img src={f.imageUrl} alt={f.name} style={{width:"100%",height:150,objectFit:"cover"}} />
            <h3>{f.name}</h3>
            <p>{f.quantity}</p>
            <p>Pickup: {f.pickupLocation}</p>
            <p>Expires: {new Date(f.expireDate).toLocaleDateString()}</p>
            <p>Donor: {f.donator?.name}</p>
            <button onClick={()=> nav(`/food/${f._id}`)}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}

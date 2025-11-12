import React, {useEffect, useState} from "react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function ManageMyFoods(){
  const { user } = useAuth();
  const [foods, setFoods] = useState([]);
  const API = import.meta.env.VITE_API_BASE;

  useEffect(()=>{
    (async ()=>{
      if (!user) return;
      const token = await user.getIdToken();
      const res = await fetch(`${API}/foods`);
      const data = await res.json();
      setFoods(data.filter(f => f.donator?.email === user.email));
    })();
  }, [user]);

  const handleDelete = async (id) => {
    if (!user) return toast.error("Login required");
    if (!confirm("Are you sure to delete?")) return;
    const token = await user.getIdToken();
    const res = await fetch(`${API}/foods/${id}`, { method:"DELETE", headers:{ Authorization:`Bearer ${token}` }});
    if (res.ok) {
      toast.success("Deleted");
      setFoods(foods.filter(f => f._id !== id));
    } else toast.error("Failed to delete");
  };

  return (
    <div style={{padding:20}}>
      <h2>Manage My Foods</h2>
      <div>
        {foods.map(f => (
          <div key={f._id} style={{border:"1px solid #ddd", padding:12, marginBottom:10}}>
            <h3>{f.name}</h3>
            <p>{f.quantity} — Pickup: {f.pickupLocation}</p>
            <Link to={`/update-food/${f._id}`}><button>Update</button></Link>
            <button onClick={()=>handleDelete(f._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

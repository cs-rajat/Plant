import React, {useState} from "react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

export default function RequestModal({ foodId, onClose, onSubmitted }) {
  const { user } = useAuth();
  const API = import.meta.env.VITE_API_BASE;
  const [form, setForm] = useState({ location:"", reason:"", contactNo:"" });

  const submit = async () => {
    if (!user) return toast.error("Login required");
    const token = await user.getIdToken();
    const payload = {
      foodId,
      location: form.location,
      reason: form.reason,
      contactNo: form.contactNo
    };
    const res = await fetch(`${API}/requests`, {
      method: "POST",
      headers: { "Content-Type":"application/json", Authorization:`Bearer ${token}` },
      body: JSON.stringify(payload)
    });
    if (res.ok) { toast.success("Request submitted"); onClose(); if (onSubmitted) onSubmitted(); }
    else toast.error("Failed");
  };

  return (
    <div style={{position:"fixed",left:0,top:0,right:0,bottom:0, background:"rgba(0,0,0,0.4)", display:"flex", alignItems:"center", justifyContent:"center"}}>
      <div style={{background:"#fff",padding:16,width:360}}>
        <h3>Request Food</h3>
        <input placeholder="Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} />
        <textarea placeholder="Why need food" value={form.reason} onChange={e=>setForm({...form,reason:e.target.value})} />
        <input placeholder="Contact No" value={form.contactNo} onChange={e=>setForm({...form,contactNo:e.target.value})} />
        <div style={{display:"flex",gap:8,marginTop:8}}>
          <button onClick={submit}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

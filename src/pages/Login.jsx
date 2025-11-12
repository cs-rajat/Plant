import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.config";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export default function Login(){
  const [form, setForm] = useState({ email:"", password:"" });
  const nav = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      toast.success("Logged in");
      nav(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google");
      nav(from, { replace: true });
    } catch (err) { toast.error(err.message); }
  };

  return (
    <div style={{padding:20,maxWidth:420,margin:"auto"}}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{display:"grid",gap:8}}>
        <input type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
        <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
        <button type="submit">Login</button>
      </form>
      <div style={{marginTop:10}}>
        <button onClick={handleGoogle} style={{background:"#db4437",color:"#fff"}}>Login with Google</button>
      </div>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}

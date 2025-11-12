import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.config";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export default function Register(){
  const [form, setForm] = useState({ name:"", photoURL:"", email:"", password:"" });
  const nav = useNavigate();

  const validatePassword = (pwd) => /[A-Z]/.test(pwd) && /[a-z]/.test(pwd) && pwd.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(form.password)) return toast.error("Password needs uppercase, lowercase & 6+ chars");
    try {
      const result = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(result.user, { displayName: form.name, photoURL: form.photoURL });
      toast.success("Registered");
      nav("/");
    } catch (err) { toast.error(err.message); }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google");
      nav("/");
    } catch (err) { toast.error(err.message); }
  };

  return (
    <div style={{padding:20,maxWidth:420,margin:"auto"}}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={{display:"grid",gap:8}}>
        <input required placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <input required placeholder="Photo URL" value={form.photoURL} onChange={e=>setForm({...form,photoURL:e.target.value})} />
        <input required type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input required type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
        <button type="submit">Register</button>
      </form>
      <div style={{marginTop:10}}>
        <button onClick={handleGoogle} style={{background:"#db4437",color:"#fff"}}>Sign up with Google</button>
      </div>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

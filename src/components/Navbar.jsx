import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar(){
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return (
    <nav style={{padding:12, borderBottom:"1px solid #eee"}}>
      <Link to="/" style={{marginRight:12}}>PlateShare</Link>
      <Link to="/foods" style={{marginRight:12}}>Available Foods</Link>
      {user ? (
        <>
          <Link to="/add-food" style={{marginRight:12}}>Add Food</Link>
          <Link to="/manage-foods" style={{marginRight:12}}>Manage My Foods</Link>
          <button onClick={async ()=>{ await logout(); nav("/"); }}>Logout</button>
        </>
      ):(
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = async () => {
    await logout();
    nav("/");
  };

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
      {/* Left side (Logo + Mobile Menu) */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>

          {/* Mobile Menu */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><Link to="/">Home</Link></li>
            <li><Link to="/foods">Available Foods</Link></li>

            {user && (
              <>
                <li><Link to="/add-food">Add Food</Link></li>
                <li><Link to="/manage-foods">Manage My Foods</Link></li>
                <li><Link to="/my-requests">My Food Requests</Link></li>
              </>
            )}
          </ul>
        </div>

        {/* Brand Logo */}
        <Link to="/" className="btn btn-ghost normal-case text-xl font-bold">
          🍽️ PlateShare
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-[16px]">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/foods">Available Foods</Link></li>

          {user && (
            <>
              <li><Link to="/add-food">Add Food</Link></li>
              <li><Link to="/manage-foods">Manage My Foods</Link></li>
              <li><Link to="/my-requests">My Food Requests</Link></li>
            </>
          )}
        </ul>
      </div>

      {/* Right side - User/Profile Dropdown */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full border">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="User" />
                ) : (
                  <div className="bg-gray-300 w-10 h-10 rounded-full" />
                )}
              </div>
            </div>

            {/* Dropdown menu */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/my-requests">My Food Requests</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-sm btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = async () => {
    await logout();
    nav("/");
  };

  const activeClass =
    "text-green-600 font-semibold border-b-2 border-green-600";
  const normalClass =
    "text-gray-700 hover:text-green-600 transition duration-200";

  return (
    <div className="sticky top-0 z-50 px-4 bg-white shadow-md navbar md:px-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-white rounded-box w-56"
          >
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/foods"
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                Available Foods
              </NavLink>
            </li>

            {!user && (
              <li>
                <Link
                  to="/login"
                  className="mt-2 text-white btn btn-sm btn-primary"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>

        <Link
          to="/"
          className="text-xl font-bold text-green-600 normal-case btn btn-ghost md:text-2xl"
        >
          🍽️ PlateShare
        </Link>
      </div>

      <div className="hidden navbar-center lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4 text-[16px]">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/foods"
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              Available Foods
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
              data-tip={user.displayName || "User"}
            >
              <div className="w-10 border rounded-full">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="User" />
                ) : (
                  <div className="w-10 h-10 bg-gray-300 rounded-full" />
                )}
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-white rounded-box w-56"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/add-food">Add Food</Link>
              </li>
              <li>
                <Link to="/manage-foods">Manage My Foods</Link>
              </li>
              <li>
                <Link to="/my-requests">My Food Requests</Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/login"
            className="text-white transition bg-green-600 btn btn-sm hover:bg-green-700"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

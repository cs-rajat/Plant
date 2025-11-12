import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../firebase.config";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    photoURL: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();

  const validatePassword = (pwd) =>
    /[A-Z]/.test(pwd) && /[a-z]/.test(pwd) && pwd.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(form.password))
      return toast.error(
        "Password must include uppercase, lowercase & be 6+ characters long"
      );

    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      await updateProfile(result.user, {
        displayName: form.name,
        photoURL: form.photoURL,
      });
      toast.success("Account created successfully!");
      nav("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed in with Google");
      nav("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-green-50">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
        <h2 className="mb-6 text-2xl font-bold text-center text-green-700">
          Create Your Account 🍽️
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              required
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Photo URL
            </label>
            <input
              required
              type="text"
              placeholder="https://example.com/photo.jpg"
              value={form.photoURL}
              onChange={(e) => setForm({ ...form, photoURL: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              required
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="relative">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              required
              type={showPassword ? "text" : "password"}
              placeholder="••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[34px] text-gray-500 hover:text-green-600 transition"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            <p className="mt-1 text-xs text-gray-500">
              Must include uppercase, lowercase & 6+ characters
            </p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 mt-2 text-white font-semibold rounded-lg ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 transition"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={handleGoogle}
            className="flex items-center justify-center w-full gap-2 py-2 transition border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            <FcGoogle className="text-xl" />
            <span>Sign up with Google</span>
          </button>
        </div>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-green-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

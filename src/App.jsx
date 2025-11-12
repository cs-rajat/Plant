import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AvailableFoods from "./pages/AvailableFoods";
import AddFood from "./pages/AddFood";
import ManageMyFoods from "./pages/ManageMyFoods";
import UpdateFood from "./pages/UpdateFood";
import FoodDetails from "./pages/FoodDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import MyRequests from "./pages/MyRequests";


export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/foods" element={<AvailableFoods />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-requests" element={<PrivateRoute><MyRequests /></PrivateRoute>} />


        <Route path="/food/:id" element={<PrivateRoute><FoodDetails /></PrivateRoute>} />
        <Route path="/add-food" element={<PrivateRoute><AddFood /></PrivateRoute>} />
        <Route path="/manage-foods" element={<PrivateRoute><ManageMyFoods /></PrivateRoute>} />
        <Route path="/update-food/:id" element={<PrivateRoute><UpdateFood /></PrivateRoute>} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <ToastContainer />
    </>
  );
}

import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AvailableFoods from "./pages/AvailableFoods";
import FoodDetails from "./pages/FoodDetails";
import AddFood from "./pages/AddFood";
import ManageFoods from "./pages/ManageFoods";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";

export default function App(){
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/foods" element={<AvailableFoods />} />
        <Route path="/food/:id" element={
          <PrivateRoute><FoodDetails/></PrivateRoute>
        } />
        <Route path="/add-food" element={
          <PrivateRoute><AddFood/></PrivateRoute>
        } />
        <Route path="/manage-foods" element={
          <PrivateRoute><ManageFoods/></PrivateRoute>
        } />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
       <Footer /> 
      <ToastContainer />
    </AuthProvider>
  );
}

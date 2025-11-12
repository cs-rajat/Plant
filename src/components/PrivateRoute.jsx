import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        
        <div className="w-10 h-10 mb-4 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
        <p className="font-medium text-gray-600">Checking authorization...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

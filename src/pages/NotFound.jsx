import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "80vh",
      textAlign: "center",
      padding: "20px"
    }}>
      <motion.img
        src="https://media.giphy.com/media/UoeaPqYrimha6rdTFV/giphy.gif"
        alt="404 Not Found"
        style={{ maxWidth: "300px", marginBottom: "20px" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      />
      
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ fontSize: "2rem", marginBottom: "10px" }}
      >
        404 - Page Not Found
      </motion.h1>
      
      <p style={{ color: "#666", maxWidth: "400px", marginBottom: "20px" }}>
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
      
      <motion.div whileHover={{ scale: 1.05 }}>
        <Link to="/" style={{
          textDecoration: "none",
          backgroundColor: "#007bff",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "8px"
        }}>
          ⬅️ Back to Home
        </Link>
      </motion.div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#f8f9fa",
        textAlign: "center",
        padding: "20px",
        marginTop: "40px",
        borderTop: "1px solid #ddd"
      }}
    >
      <div>
        <h3>🍽️ PlateShare</h3>
        <p>Connecting communities through food sharing ❤️</p>
      </div>

      <div style={{ margin: "10px 0" }}>
        <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a> |{" "}
        <a href="https://x.com" target="_blank" rel="noreferrer">X</a> |{" "}
        <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
      </div>

      <p style={{ fontSize: "14px", color: "#555" }}>
        © {new Date().getFullYear()} PlateShare. All Rights Reserved.
      </p>
    </footer>
  );
}

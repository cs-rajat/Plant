import React from "react";

export default function Footer() {
  return (
    <footer style={{background:"#f8f9fa", padding:20, textAlign:"center", marginTop:40}}>
      <h3>🍽️ PlateShare</h3>
      <p>Connecting communities through food sharing.</p>
      <div>
        <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a> |{" "}
        <a href="https://x.com" target="_blank" rel="noreferrer">X</a> |{" "}
        <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
      </div>
      <div style={{marginTop:8, color:"#666"}}>© {new Date().getFullYear()} PlateShare</div>
    </footer>
  );
}

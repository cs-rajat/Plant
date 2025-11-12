import React from "react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="py-10 mt-20 text-center border-t border-green-200 bg-gradient-to-r from-green-50 to-green-100">
    
      <h3 className="mb-2 text-2xl font-bold text-green-700">🍽️ PlateShare</h3>
      <p className="mb-6 text-gray-600">
        Connecting communities through food sharing.
      </p>

      
      <div className="flex justify-center gap-6 mb-6">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          className="text-xl text-gray-600 transition transform hover:text-green-600 hover:scale-110"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://x.com"
          target="_blank"
          rel="noreferrer"
          className="text-xl text-gray-600 transition transform hover:text-green-600 hover:scale-110"
        >
          <FaXTwitter />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="text-xl text-gray-600 transition transform hover:text-green-600 hover:scale-110"
        >
          <FaInstagram />
        </a>
      </div>

      <div className="text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="font-medium">PlateShare</span> — All rights reserved.
      </div>
    </footer>
  );
}

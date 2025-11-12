// src/components/Loader.jsx
import React from "react";

export default function Loader({
  size = "md",
  text = "Loading...",
  className = "",
}) {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  const spinnerSize = sizes[size] || sizes.md;

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
      role="status"
      aria-live="polite"
    >
      <svg
        className={`${spinnerSize} animate-spin text-green-600`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>

      {text && <div className="text-sm text-gray-600">{text}</div>}

      <span className="sr-only">{text}</span>
    </div>
  );
}

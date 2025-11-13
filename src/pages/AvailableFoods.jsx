import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";

export default function AvailableFoods() {
  const [foods, setFoods] = useState(null);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_BASE;
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/foods`);
        const data = await res.json();
        setFoods(data);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <Loader text="Loading available foods..." size="lg" />;

  return (
    <div className="min-h-screen px-6 py-10 md:px-12 lg:px-20 bg-green-50">
      <h2 className="mb-10 text-3xl font-bold text-center text-green-700">
        Available Foods 🍱
      </h2>

      {foods?.length === 0 ? (
        <div className="text-lg text-center text-gray-600">
          No foods available at the moment 😔
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {foods?.map((f) => (
            <div
              key={f._id}
              className="overflow-hidden transition-transform transform bg-white border border-gray-200 shadow-md rounded-xl hover:shadow-lg hover:-translate-y-1"
            >
              <img
                src={f.imageUrl}
                alt={f.name}
                className="object-cover w-full h-48"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {f.name}
                </h3>
                <p className="text-sm text-gray-600">{f.quantity}</p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-700">Pickup:</span>{" "}
                  {f.pickupLocation}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-700">Expires:</span>{" "}
                  {new Date(f.expireDate).toLocaleDateString()}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  {f.donator?.photoURL ? (
                    <img
                      src={f.donator.photoURL}
                      alt="donor"
                      className="w-8 h-8 border rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-300 rounded-full" />
                  )}
                  <p className="text-sm text-gray-700">
                    {f.donator?.name || "Anonymous"}
                  </p>
                </div>
                <button
                  onClick={() => nav(`/food/${f._id}`)}
                  className="w-full py-2 mt-3 text-white transition bg-green-600 rounded-lg hover:bg-green-700"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

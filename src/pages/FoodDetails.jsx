import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

export default function FoodDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const API = import.meta.env.VITE_API_BASE;
  const [food, setFood] = useState(null);

  const [asking, setAsking] = useState({
    location: "",
    reason: "",
    contactNo: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = user && (await user.getIdToken());
      const res = await fetch(`${API}/foods/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      setFood(data);
    };
    fetchData();
  }, [id, user, API]);

  const submitRequest = async () => {
    if (!user) {
      toast.error("Please login to request");
      return;
    }

    if (!asking.location || !asking.reason || !asking.contactNo) {
      toast.error("All fields are required");
      return;
    }

    const token = await user.getIdToken();
    const res = await fetch(`${API}/requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ foodId: id, ...asking }),
    });

    if (res.ok) {
      toast.success("Request submitted");
      setAsking({ location: "", reason: "", contactNo: "" });
    } else toast.error("Failed");
  };

  if (!food)
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Loading...
      </div>
    );

  return (
    <div className="max-w-5xl px-4 py-10 mx-auto">
      {/* Food Card */}
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <img
            src={food.imageUrl}
            alt={food.name}
            className="object-cover w-full rounded-xl h-72 shadow-md"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">{food.name}</h2>

          <p className="text-gray-700">
            <span className="font-semibold">Quantity:</span> {food.quantity}
          </p>

          <p className="text-gray-700">
            <span className="font-semibold">Pickup Location:</span>{" "}
            {food.pickupLocation}
          </p>

          <p className="text-gray-700">
            <span className="font-semibold">Donator:</span> {food.donator?.name}{" "}
            ({food.donator?.email})
          </p>

          <p className="text-gray-700">
            <span className="font-semibold">Notes:</span>{" "}
            {food.notes || "No additional notes"}
          </p>
        </div>
      </div>

      {/* Request Form */}
      <div className="p-6 mt-10 bg-white border rounded-xl shadow-md">
        <h3 className="mb-4 text-2xl font-semibold text-gray-800">
          Request This Food
        </h3>

        <div className="grid gap-4">
          <input
            type="text"
            placeholder="Your Location"
            value={asking.location}
            onChange={(e) =>
              setAsking((s) => ({ ...s, location: e.target.value }))
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <textarea
            rows="4"
            placeholder="Why do you need this food?"
            value={asking.reason}
            onChange={(e) =>
              setAsking((s) => ({ ...s, reason: e.target.value }))
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="text"
            placeholder="Contact Number"
            value={asking.contactNo}
            onChange={(e) =>
              setAsking((s) => ({ ...s, contactNo: e.target.value }))
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={submitRequest}
            className="w-full py-3 mt-2 font-semibold text-white transition bg-green-600 rounded-lg hover:bg-green-700"
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
}

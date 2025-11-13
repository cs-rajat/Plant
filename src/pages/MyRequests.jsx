import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function MyRequests() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      const token = await user.getIdToken();

      // Step 1: Fetch All Foods
      const foodsRes = await fetch(`${API}/foods`);
      const allFoods = await foodsRes.json();
      const myFoods = allFoods.filter((f) => f.donator?.email === user.email);

      // Step 2: Fetch Requests for Each Food
      let allReqs = [];
      for (const f of myFoods) {
        const res = await fetch(`${API}/requests/${f._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          allReqs = [
            ...allReqs,
            ...data.map((r) => ({
              ...r,
              foodName: f.name,
              foodId: f._id, // ⬅ Required for updating food status
            })),
          ];
        }
      }

      setRequests(allReqs);
      setLoading(false);
    };

    load();
  }, [user]);

  // ===========================
  // ✔ Accept & Reject Handler
  // ===========================
  const handleAction = async (requestId, status, foodId) => {
    const token = await user.getIdToken();

    const confirm = await Swal.fire({
      title: `Confirm ${status}?`,
      text: `Are you sure you want to mark this request as ${status}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (!confirm.isConfirmed) return;

    // Step 1 — Update Request
    const res = await fetch(`${API}/requests/${requestId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      toast.error("Failed to update request");
      return;
    }

    // Step 2 — If accepted, also mark food as donated
    if (status === "accepted") {
      const foodRes = await fetch(`${API}/foods/${foodId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "donated" }),
      });

      if (!foodRes.ok) {
        toast.error("Request accepted but failed to update food status");
        return;
      }
    }

    toast.success(`Request ${status}`);

    // Update UI instantly
    setRequests((prev) =>
      prev.map((r) => (r._id === requestId ? { ...r, status } : r))
    );
  };

  if (loading)
    return (
      <div className="flex items-center justify-center py-20 text-lg">
        Loading...
      </div>
    );

  return (
    <div className="max-w-6xl px-4 py-10 mx-auto">
      <h2 className="mb-6 text-3xl font-bold text-gray-800">
        My Food Requests
      </h2>

      {requests.length === 0 ? (
        <p className="p-4 text-gray-600 bg-white border rounded-lg shadow-sm">
          No requests yet.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white border rounded-lg shadow-md">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="px-4 py-3 font-semibold text-gray-700">Food</th>
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Requester
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Location
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Reason
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Contact
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {requests.map((r) => (
                <tr
                  key={r._id}
                  className="transition border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{r.foodName}</td>
                  <td className="px-4 py-3">{r.requester?.name}</td>
                  <td className="px-4 py-3">{r.location}</td>
                  <td className="px-4 py-3">{r.reason}</td>
                  <td className="px-4 py-3">{r.contactNo}</td>

                  <td className="px-4 py-3">
                    {r.status === "pending" && (
                      <span className="px-3 py-1 text-sm font-medium text-yellow-700 bg-yellow-200 rounded-full">
                        Pending
                      </span>
                    )}
                    {r.status === "accepted" && (
                      <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-200 rounded-full">
                        Accepted
                      </span>
                    )}
                    {r.status === "rejected" && (
                      <span className="px-3 py-1 text-sm font-medium text-red-700 bg-red-200 rounded-full">
                        Rejected
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {r.status === "pending" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleAction(r._id, "accepted", r.foodId)
                          }
                          className="px-3 py-1 text-sm text-white transition bg-green-600 rounded hover:bg-green-700"
                        >
                          Accept
                        </button>

                        <button
                          onClick={() =>
                            handleAction(r._id, "rejected", r.foodId)
                          }
                          className="px-3 py-1 text-sm text-white transition bg-red-600 rounded hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-600 capitalize">
                        {r.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

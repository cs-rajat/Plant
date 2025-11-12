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
      // fetch all foods added by this user
      const foodsRes = await fetch(`${API}/foods`);
      const allFoods = await foodsRes.json();
      const myFoods = allFoods.filter(
        (f) => f.donator?.email === user.email
      );

      // now load requests for each food
      let allReqs = [];
      for (const f of myFoods) {
        const res = await fetch(`${API}/requests/${f._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          allReqs = [...allReqs, ...data.map((r) => ({ ...r, foodName: f.name }))];
        }
      }
      setRequests(allReqs);
      setLoading(false);
    };
    load();
  }, [user]);

  const handleAction = async (id, status) => {
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

    const res = await fetch(`${API}/requests/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      toast.success(`Request ${status}`);
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status } : r))
      );
    } else toast.error("Failed");
  };

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>My Food Requests</h2>

      {requests.length === 0 ? (
        <p>No requests yet.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            border="1"
            cellPadding="8"
            style={{ borderCollapse: "collapse", width: "100%" }}
          >
            <thead>
              <tr style={{ background: "#f2f2f2" }}>
                <th>Food</th>
                <th>Requester</th>
                <th>Location</th>
                <th>Reason</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r._id}>
                  <td>{r.foodName}</td>
                  <td>{r.requester?.name}</td>
                  <td>{r.location}</td>
                  <td>{r.reason}</td>
                  <td>{r.contactNo}</td>
                  <td>{r.status}</td>
                  <td>
                    {r.status === "pending" ? (
                      <>
                        <button
                          onClick={() => handleAction(r._id, "accepted")}
                          style={{ marginRight: 5 }}
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleAction(r._id, "rejected")}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span>{r.status}</span>
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

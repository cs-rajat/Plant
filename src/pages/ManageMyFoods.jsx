import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Swal from "sweetalert2"; 

export default function ManageMyFoods() {
  const { user } = useAuth();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    (async () => {
      if (!user) return;
      try {
        const res = await fetch(`${API}/foods`);
        const data = await res.json();
        setFoods(data.filter((f) => f.donator?.email === user.email));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  const handleDelete = async (id) => {
    if (!user) return toast.error("Login required");

    
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This food item will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return; // user canceled

    try {
      const token = await user.getIdToken();
      const res = await fetch(`${API}/foods/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        Swal.fire("Deleted!", "Your food has been removed.", "success");
        setFoods((prev) => prev.filter((f) => f._id !== id));
      } else {
        Swal.fire("Failed", "Could not delete the food.", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong!", "error");
      console.error(err);
    }
  };

  if (loading) return <Loader text="Loading your foods..." size="lg" />;

  return (
    <div className="min-h-screen px-6 py-10 md:px-12 lg:px-20 bg-green-50">
      <h2 className="mb-10 text-3xl font-bold text-center text-green-700">
        Manage My Foods 🍱
      </h2>

      {foods.length === 0 ? (
        <div className="text-lg text-center text-gray-600">
          You haven’t added any food yet.
          <br />
          <Link
            to="/add-food"
            className="inline-block px-4 py-2 mt-4 text-white transition bg-green-600 rounded-lg hover:bg-green-700"
          >
            Add Food
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {foods.map((f) => (
            <div
              key={f._id}
              className="overflow-hidden transition-all bg-white border border-gray-200 shadow-md rounded-xl hover:shadow-lg"
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
                <p className="text-sm text-gray-600">Quantity: {f.quantity}</p>
                <p className="text-sm text-gray-600">
                  Pickup: {f.pickupLocation}
                </p>
                <p className="text-sm text-gray-600">
                  Expire: {new Date(f.expireDate).toLocaleDateString()}
                </p>
                {f.notes && (
                  <p className="text-xs italic text-gray-500">
                    Note: {f.notes}
                  </p>
                )}

                <div className="flex justify-between mt-4">
                  <Link
                    to={`/update-food/${f._id}`}
                    className="px-3 py-1 text-sm text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(f._id)}
                    className="px-3 py-1 text-sm text-white transition bg-red-500 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

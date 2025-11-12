import React from "react";
import { Link } from "react-router-dom";
import { useFeaturedFoods } from "../hooks/useFeaturedFoods";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

export default function Home() {
  const { data, isLoading } = useFeaturedFoods();

  return (
    <div className="px-6 py-10 md:px-12 lg:px-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4 text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
          Share Surplus Food. Help Your Community.
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600">
          Post extra meals and connect with neighbours who need food.
        </p>
        <Link to="/foods">
          <button className="px-6 py-2 mt-3 text-white transition-all bg-green-600 rounded-lg shadow hover:bg-green-700">
            View All Foods
          </button>
        </Link>
      </motion.div>

      {/* Featured Foods Section */}
      <section className="mt-12">
        <h2 className="mb-4 text-2xl font-semibold text-center text-gray-800">
          Featured Foods
        </h2>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader />
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data?.map((f) => (
              <motion.div
                key={f._id}
                whileHover={{ scale: 1.03 }}
                className="overflow-hidden transition-all bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md"
              >
                <img
                  src={f.imageUrl}
                  alt={f.name}
                  className="object-cover w-full h-40"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {f.name}
                  </h3>
                  <p className="text-sm text-gray-600">{f.quantity}</p>
                  <Link to={`/food/${f._id}`}>
                    <button className="w-full py-2 mt-2 text-white transition bg-green-500 rounded-md hover:bg-green-600">
                      View Details
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-6 text-center">
          <Link to="/foods">
            <button className="px-6 py-2 text-green-600 transition border border-green-600 rounded-lg hover:bg-green-600 hover:text-white">
              Show All
            </button>
          </Link>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="p-8 mt-16 shadow-sm bg-green-50 rounded-2xl">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
          How It Works
        </h2>
        <ol className="max-w-xl mx-auto space-y-3 text-gray-700 list-decimal list-inside">
          <li>
            <span className="font-medium">Post Food —</span> Share info and image.
          </li>
          <li>
            <span className="font-medium">Find Food —</span> Browse available
            items and request.
          </li>
          <li>
            <span className="font-medium">Collect —</span> Donor accepts, collect
            at pickup location.
          </li>
        </ol>
      </section>

      {/* Mission Section */}
      <section className="mt-16 space-y-3 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          Reduce food waste and help the local community with surplus meals.
        </p>
      </section>
    </div>
  );
}

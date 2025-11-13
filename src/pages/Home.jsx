import React from "react";
import { Link } from "react-router-dom";
import { useFeaturedFoods } from "../hooks/useFeaturedFoods";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import hero from "../assets/hero.jpg";

export default function Home() {
  const { data, isLoading } = useFeaturedFoods();

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const stats = [
    { label: "Meals Shared", value: 1250 },
    { label: "Active Donors", value: 320 },
    { label: "Communities Helped", value: 75 },
  ];

  return (
    <div className="text-gray-800 bg-gray-50">
      {/* HERO SECTION */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img
          src={hero}
          alt="food sharing"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 px-6 space-y-4 text-center text-white"
        >
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            Share Surplus Food <br /> Help Your Community 🍲
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-200 md:text-xl">
            Together we can reduce food waste and make sure no one goes hungry.
          </p>
          <Link to="/foods">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 mt-4 font-semibold text-white transition bg-green-600 rounded-lg shadow-md hover:bg-green-700"
            >
              View Foods
            </motion.button>
          </Link>
        </motion.div>
      </section>

     
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 bg-white shadow-sm"
      >
        <div className="grid max-w-5xl gap-8 mx-auto text-center sm:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="p-4"
            >
              <h3 className="mb-2 text-4xl font-bold text-green-600">
                {stat.value.toLocaleString()}
              </h3>
              <p className="font-medium text-gray-700">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

    
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="px-6 py-16 md:px-12 lg:px-20"
      >
        <h2 className="mb-10 text-3xl font-semibold text-center text-gray-800">
          Featured Foods
        </h2>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader />
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {data?.slice(0, 6).map((f, i) => (
              <motion.div
                key={f._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
                className="overflow-hidden transition-all bg-white border border-gray-200 shadow-lg rounded-2xl hover:shadow-xl"
              >
                <div className="relative">
                  <img
                    src={f.imageUrl}
                    alt={f.name}
                    className="object-cover w-full h-48 rounded-t-2xl"
                  />
                  <span className="absolute px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-full shadow-md right-3 top-3">
                    {f.quantity}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {f.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {f.description ||
                      "Delicious food shared by our community."}
                  </p>

                  <Link to={`/food/${f._id}`}>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-2 mt-2 font-medium text-white transition bg-green-600 rounded-lg hover:bg-green-700"
                    >
                      View Details
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link to="/foods">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 text-green-600 transition border border-green-600 rounded-lg hover:bg-green-600 hover:text-white"
            >
              Show All
            </motion.button>
          </Link>
        </div>
      </motion.section>

      {/* HOW IT WORKS */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="px-6 py-20 md:px-12 lg:px-20 bg-green-50 rounded-t-3xl"
      >
        <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">
          How It Works
        </h2>
        <ol className="max-w-xl mx-auto space-y-3 text-lg text-gray-700 list-decimal list-inside">
          <li>
            <span className="font-semibold text-green-700">Post Food —</span>{" "}
            Share details and image.
          </li>
          <li>
            <span className="font-semibold text-green-700">Find Food —</span>{" "}
            Browse available meals and request what you need.
          </li>
          <li>
            <span className="font-semibold text-green-700">Collect —</span>{" "}
            Donor accepts your request; collect it from pickup point.
          </li>
        </ol>
      </motion.section>

      {/* MISSION */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="px-6 py-16 text-center md:px-12"
      >
        <h2 className="mb-3 text-3xl font-semibold">Our Mission 🌍</h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          We aim to reduce food waste and help local communities by sharing
          surplus meals with those in need — promoting sustainability and
          compassion.
        </p>
      </motion.section>
    </div>
  );
}

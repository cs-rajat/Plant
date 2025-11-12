import React from "react";
import { Link } from "react-router-dom";
import { useFeaturedFoods } from "../hooks/useFeaturedFoods";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

export default function Home() {
  const { data, isLoading } = useFeaturedFoods();

  return (
    <div  style={{padding:20}}>
      <motion.div initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} transition={{duration:0.6}}>
        <h1>Share surplus food. Help your community.</h1>
        <p>Post extra meals and connect with neighbours who need food.</p>
        <Link to="/foods"><button>View All Foods</button></Link>
      </motion.div>

      <section style={{marginTop:30}}>
        <h2>Featured Foods</h2>
        {isLoading ? <Loader /> : (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:16}}>
            {data?.map(f=>(
              <div key={f._id} style={{border:"1px solid #ddd",padding:12}}>
                <img src={f.imageUrl} alt={f.name} style={{width:"100%",height:150,objectFit:"cover"}} />
                <h3>{f.name}</h3>
                <p>{f.quantity}</p>
                <Link to={`/food/${f._id}`}><button>View Details</button></Link>
              </div>
            ))}
          </div>
        )}
        <div style={{textAlign:"center", marginTop:12}}>
          <Link to="/foods"><button>Show All</button></Link>
        </div>
      </section>

      <section style={{marginTop:40}}>
        <h2>How it works</h2>
        <ol>
          <li>Post Food — Share info and image.</li>
          <li>Find Food — Browse available items and request.</li>
          <li>Collect — Donor accepts, collect at pickup location.</li>
        </ol>
      </section>

      <section style={{marginTop:30}}>
        <h2>Our Mission</h2>
        <p>Reduce food waste and help the local community with surplus meals.</p>
      </section>
      
    </div>
  );
}

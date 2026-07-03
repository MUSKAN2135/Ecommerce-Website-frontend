// src/components/HeroSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import bgimg from '/slider-bg.png';

export default function HeroSection() {
  return (
    <div
      className=" flex items-center justify-start"
      style={{
        backgroundImage: `url(${bgimg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh"
      }}
    >
      <div className="container border-l-2 pl-5 mx-8 border-[#0097b2]">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-white mb-4 drop-shadow-md">
          Welcome to Trendymart
        </h2>
        <p className="text-gray-200 mb-6">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima fuga voluptatibus, ab quam exercitationem dolorum aliquam consectetur dolore!
        </p>
        <Link
          to="/shop"
          className="bg-[#0097b2] text-white py-2 px-6 rounded shadow-md hover:bg-transparent hover:text-white hover:border hover:border-[#0097b2] transition">
          Buy Now
        </Link>
      </div>
    </div>
  );
}

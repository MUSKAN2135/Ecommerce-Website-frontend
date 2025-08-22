// src/components/HeroSection.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-32 lg:pt-40">
      <div className="border-l-2 mt-[40px] border-[#0097b2] pl-4 md:pl-6">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-gray-300 mb-4">
          Welcome to Trendymart
        </h2>
        <p className="text-gray-500 md:w-3/5 mb-6">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima fuga voluptatibus, ab quam exercitationem dolorum aliquam consectetur dolore!
        </p>
        <Link
          to="/shop"
          className="bg-[#0097b2] text-white py-2 px-6 rounded shadow-md hover:bg-transparent hover:text-gray-400 hover:border hover:border-[#0097b2] transition">
          Buy Now
        </Link>
      </div>
    </div>
  );
}

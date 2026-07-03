// src/components/Section.jsx
import React from "react";
import bg from "/background.png";
import leaf3 from "/leaf3.png";

export default function Section() {
  return (
    <div className="container mx-auto flex flex-col md:flex-row justify-center items-center bg-cover bg-center rounded-lg my-18"
      style={{ backgroundImage: `url(${bg})`}}>
      <div className="container max-w-lg text-center md:text-left text-white px-15 py-22 relative z-[3]">
        <p className="text-yellow-400 font-semibold mb-2 animate-pulse">
          Get 30% OFF
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl italic font-bold mb-3">
          Trendy Mart
        </h1>
        <p className="text-sm sm:text-base md:text-md leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Eius animi magnam facilis!
        </p>
        <img
          src={leaf3}
          alt="leaf"
          className="absolute bottom-0 right-0 w-40 sm:w-52 md:w-60 object-contain pointer-events-none"
        />
      </div>
    </div>
  );
}

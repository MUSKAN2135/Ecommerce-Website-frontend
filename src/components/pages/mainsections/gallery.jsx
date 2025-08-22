// src/components/Gallery.jsx
import React from "react";
import newsbg from "/title.background.png";
import leafbg from "/leaf3.png";

const images = [
  "/womenshoes.jpg",
  "/menswear.jpg",
  "/womenwear.jpg",
  "/shoes.jpg",
  "/mensss.jpeg",
];

export default function Gallery() {
  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-14">
      {/* Heading with Leaf */}
      <div className="relative flex items-center justify-center mb-12 z-[-3]">
        <img
          src={leafbg}
          alt="leaf"
          className="absolute -left-10 sm:-left-16 md:-left-24 lg:-left-32 top-1/2 -translate-y-1/2 w-20 sm:w-28 md:w-36 lg:w-44 opacity-90 pointer-events-none"
        />
        <div
          className="h-24 md:h-28 w-full flex items-center justify-center relative"
          style={{ backgroundImage: `url(${newsbg})`, backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
          <h2 className="text-white text-2xl sm:text-2xl md:text-3xl font-semibold drop-shadow-lg z-[3]">
            Gallery
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-4">
          <img
            src={images[0]}
            alt="Left Top"
            className="w-full h-48 sm:h-56 md:h-60 lg:h-64 object-cover rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
          />
          <img
            src={images[1]}
            alt="Left Bottom"
            className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="space-y-4 md:row-span-2">
          <img
            src={images[2]}
            alt="Center"
            className="w-full h-64 sm:h-72 md:h-full lg:h-full object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="space-y-4">
          <img
            src={images[3]}
            alt="Right Top"
            className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
          />
          <img
            src={images[4]}
            alt="Right Bottom"
            className="w-full h-48 sm:h-56 md:h-60 lg:h-64 object-cover rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
}

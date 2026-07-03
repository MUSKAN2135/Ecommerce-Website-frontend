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
    <div className="container mx-auto py-14 lg:px-44 px-10">
      {/* Heading */}
      <div className="relative flex items-center justify-center mb-12 z-[-3]">
        <img
          src={leafbg}
          alt="leaf"
          className="absolute -left-10 sm:-left-16 md:-left-24 lg:-left-32 top-1/2 -translate-y-1/2 w-20 sm:w-28 md:w-36 lg:w-44 opacity-90 pointer-events-none"
        />
        <div
          className="h-24 md:h-28 w-full flex items-center justify-center relative"
          style={{
            backgroundImage: `url(${newsbg})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}>
          <h2 className="text-white text-2xl sm:text-2xl md:text-3xl font-semibold drop-shadow-lg z-[3]" data-aos="zoom-out" data-aos-duration="1500">
            Gallery
          </h2>
        </div>
      </div>

      {/* Grid Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:h-[500px] h-auto">
        {/* Left column */}
        <div className="flex flex-col gap-2">
          <img
            src={images[0]}
            alt="Left Top"
            className="w-full md:h-48 h-auto md:object-cover object-contain rounded-2xl hover:scale-105 transition-transform duration-300"
            data-aos="fade-right" data-aos-duration="3000"
          />
          <img
            src={images[1]}
            alt="Left Bottom"
            className="w-full md:h-64 h-auto md:object-cover object-contain rounded-2xl hover:scale-105 transition-transform duration-300"
            data-aos="zoom-in-right" data-aos-duration="3000"
          />
        </div>

        {/* Center big image*/}
        <div data-aos="zoom-in" data-aos-duration="2000">
          <img
            src={images[2]}
            alt="Center"
            className="w-full md:h-[470px] h-auto md:object-cover object-contain rounded-2xl hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-2">
          <img
            src={images[3]}
            alt="Right Top"
            className="w-full md:h-64 h-auto md:object-cover object-contain rounded-2xl hover:scale-105 transition-transform duration-300"
            data-aos="fade-left" data-aos-duration="3000"
          />
          <img
            src={images[4]}
            alt="Right Bottom"
            className="w-full md:h-48 h-auto md:object-cover object-contain rounded-2xl hover:scale-105 transition-transform duration-300"
            data-aos="zoom-in-left" data-aos-duration="3000"
          />
        </div>
      </div>
    </div>
  );
}


// src/components/Section.jsx
import React from "react";
import bg from "/background.png";
import leaf3 from "/leaf3.png";

export default function Section() {
  return (
    <>
      <div
        className="overflow-hidden my-18 flex flex-col md:flex-row justify-center items-center bg-cover bg-center rounded-lg relative z-[-3]"
        style={{ backgroundImage: `url(${bg})`, minHeight: "40vh" }}>
        <div className="max-w-lg max-w-md text-center md:text-left text-white px-4 sm:px-6 md:px-8 py-8 md:py-16 z-10">
          <p className="text-yellow-400 font-semibold mb-2 animate-pulse">
            Get 30% OFF
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl italic font-bold mb-3">
            Trendy Mart
          </h1>
          <p className="text-sm sm:text-base md:text-md leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius animi magnam facilis!
          </p>
        </div>
        <div className="absolute md:relative right-0 md:right-12 bottom-0 md:bottom-0 flex justify-center md:justify-end w-full md:w-auto">
          <img src={leaf3} alt="leaf" className="w-48 sm:w-56 md:w-60 object-contain" />
        </div>
      </div>
    </>
  );
}

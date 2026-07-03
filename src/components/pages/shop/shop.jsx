import React from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import Sidebar from "./sidebar";
import shopbg from "/banner.png";
import ShopProducts from "./AllshopProducts";
import { Link } from "react-router-dom";
import Section from "../mainsections/section";

export default function Shop() {
  return (
    <>
      <Navbar />
      {/* Banner Section */}
      <div
        style={{ backgroundImage: `url(${shopbg})`, backgroundPosition: "bottom", backgroundSize: "cover", height: "60vh", backgroundRepeat: "no-repeat", }} className="flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          Shop
        </h1>
      </div>
      {/* Breadcrumb */}
      <div className="text-lg text-gray-600 m-6">
        <Link to="/" className="hover:text-[#0097b2] transition duration-200">
          Home
        </Link>
        /
        <Link to="/shop" className="text-[#0097b2] transition duration-200">
          Shop
        </Link>
      </div>
      {/* Main Content */}
      <div className=" mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <Sidebar />
          </div>
          {/* Products */}
          <div className="w-full lg:w-3/4">
            <ShopProducts />
          </div>
        </div>
      </div>

      <Section />
      <Footer />
    </>
  );
}

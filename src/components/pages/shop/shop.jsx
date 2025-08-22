import React from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import Sidebar from "./sidebar";
import shopbg from "/banner.png";
import ShopProducts from "./AllshopProducts";
import { Link } from "react-router-dom";

export default function Shop() {
  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundImage: `url(${shopbg})`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "60vh",
        }}
        className="flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          Shop
        </h1>
      </div>
      <div className="text-lg text-gray-600 m-6">
        <Link to="/" className="hover:text-[#0097b2] transition duration-200">  Home</Link>
        / <Link to="/shop" className="text-[#0097b2] transition duration-200"> Shop</Link>
      </div>
      <div className="flex flex-col md:justify-between justify-center lg:flex-row px-4 py-8 mx-auto gap-6">
        <div className="w-full lg:w-1/4">
          <Sidebar />
        </div>
        <div className="w-full lg:w-3/4">
          <ShopProducts />
        </div>
      </div>
      <Footer />
    </>
  );
}

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import bg from "/banner.png";
import ShopProducts from "../shop/AllshopProducts";


export default function ProductDetails() {
    const { id } = useParams();
    return (
        <>
            <Navbar />
            <div
                className="flex justify-center items-center"
                style={{
                    backgroundImage: `url(${bg})`,
                    backgroundPosition: "bottom",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    height: "50vh",
                }}>
                <h1 className="text-3xl font-bold text-center text-white z-10 mb-10">Product Details</h1>
            </div>
            <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <ShopProducts productId={id} /> {/* show only single product */}
            </div>
            <Footer />
        </>
    );
}

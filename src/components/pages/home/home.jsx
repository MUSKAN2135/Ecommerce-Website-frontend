import { useState } from "react";
import Footer from "../footer/footer";
import Herosection from "../mainsections/hero";
import Navbar from "../navbar/navbar";
import bgimg from '/slider-bg.png'
import Newsletter from "../mainsections/news";
import Gallery from "../mainsections/gallery";
import Section from "../mainsections/section";
import Allproducts from "../productslist/allproducts";
import newsbg from "/title.background.png";
import Crew from "../mainsections/crew";

export default function Home() {
    return (
        <div className="overflow-hidden">
            <div style={{ backgroundImage: `url(${bgimg})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", height: "100vh" }}>
                <div>
                    <Navbar />
                </div>
                <div>
                    <Herosection />
                </div>
            </div>
            <div className="m-8">
                <div className="h-24 md:h-28 w-full flex items-center justify-center relative" style={{ backgroundImage: `url(${newsbg})`, backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
                    <h2 className="text-white text-xl md:text-2xl font-semibold drop-shadow-lg z-[3]">
                        Shop Featured Products
                    </h2>
                </div>
                <Allproducts />
            </div>
            <Section />
            <Gallery />
            <Newsletter />
            <Crew />
            <Footer />
        </div>
    )
}

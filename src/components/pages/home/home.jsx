import { useState } from "react";
import Footer from "../footer/footer";
import Herosection from "../mainsections/hero";
import Navbar from "../navbar/navbar";
import Newsletter from "../mainsections/news";
import Gallery from "../mainsections/gallery";
import Section from "../mainsections/section";
import Allproducts from "../productslist/allproducts";
import Crew from "../mainsections/crew";

export default function Home() {
    return (
        <div style={{overflowX: "hidden"}}>
            <Navbar />
            <Herosection />
            <Allproducts />
            <Section />
            <Gallery />
            <Newsletter />
            <Crew />
            <Footer />
        </div>
    )
}

import React from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import bg from '/banner.png'

export default function Blog() {
    const images = [
        {
            src: "/party_western_dress.webp",
            title: "The Science Behind Long-Lasting Perfumes",
            description:
                "This blog post delves into the fascinating world of fragrance families, discussing the characteristics.",
            author: "Magnifico_admin",
            date: "September 28, 2024",
        },
        {
            src: "/sneaker.webp",
            title: "Discover Elegant Fragrance Blends",
            description:
                "Explore how different notes create a perfect balance to enhance your personality.",
            author: "Magnifico_admin",
            date: "October 5, 2024",
        },
        {
            src: "/images.jpeg",
            title: "Discover Elegant Fragrance Blends",
            description:
                "Explore how different notes create a perfect balance to enhance your personality.",
            author: "Magnifico_admin",
            date: "October 5, 2024",
        }, {
            src: "/jwell.webp",
            title: "Discover Elegant Fragrance Blends",
            description:
                "Explore how different notes create a perfect balance to enhance your personality.",
            author: "Magnifico_admin",
            date: "October 5, 2024",
        }, {
            src: "/mens wear.webp",
            title: "Discover Elegant Fragrance Blends",
            description:
                "Explore how different notes create a perfect balance to enhance your personality.",
            author: "Magnifico_admin",
            date: "October 5, 2024",
        }, {
            src: "/mensss.jpeg",
            title: "Discover Elegant Fragrance Blends",
            description:
                "Explore how different notes create a perfect balance to enhance your personality.",
            author: "Magnifico_admin",
            date: "October 5, 2024",
        },
    ];

    return (
        <>
            <Navbar />
            <div style={{ backgroundImage: `url(${bg})`, backgroundPosition: "bottom", backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "60vh", }} className="flex items-center justify-center">
                <h1 className="text-4xl font-bold text-white drop-shadow-lg">Blog</h1>
            </div>
            <div className="py-10 px-4">
                <div className="max-w-6xl mx-auto grid md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-6">
                    {images.map((item, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <img src={item.src} alt={`card-${i}`} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-gray-800 hover:text-[#0097b2] transition">
                                    {item.title}
                                </h2>
                                <p className="text-gray-600 text-sm mt-2">{item.description}</p>

                                {/* Footer */}
                                <div className="flex justify-between items-center mt-4 text-sm text-gray-500 border-t pt-2">
                                    <div className="flex items-center gap-2">
                                        {item.author}
                                    </div>
                                    <span>{item.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

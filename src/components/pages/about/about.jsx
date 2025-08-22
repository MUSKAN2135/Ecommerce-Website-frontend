import React from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import aboutbg from '/banner.png'

const About = () => {
    return (
        <>
            <Navbar className="mb-24" />
            <div>
                {/* Page Title Section */}
                <div style={{ backgroundImage: `url(${aboutbg})`, backgroundPosition: "bottom", backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "60vh", }} className="flex items-center justify-center">
                    <h2 className="text-4xl font-bold text-white">ABOUT US</h2>
                </div>
                <button className="text-lg text-gray-600 m-6 block">
                    <Link to="/" className="hover:text-[#0097b2] transition duration-200">Home</Link> /
                    <Link to="/aboutUs" className="text-[#0097b2] transition duration-200"> About Us</Link>
                </button>
                {/* About Content */}
                <div className="max-w-6xl mx-auto py-24 px-6 grid md:grid-cols-2 gap-12">
                    {/* Who We Are */}
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Who We Are</h3>
                        <div className="w-12 h-1 bg-teal-500 mb-4"></div>
                        <p className="text-gray-700 mb-4">
                            TrendyMart is a modern e-commerce platform focused on delivering fashionable
                            and affordable clothing, accessories, and lifestyle products.
                        </p>
                        <p className="text-gray-700">
                            Our mission is to create a seamless shopping experience through a curated
                            selection of high-quality products, fast delivery, and excellent customer support.
                        </p>
                    </div>

                    {/* Why Choose Us */}
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Why Choose Us</h3>
                        <div className="w-12 h-1 bg-teal-500 mb-4"></div>
                        <p className="text-gray-700 mb-4">
                            We focus on user-friendly design, secure payment options, and fast customer service.
                            Whether you're looking for the latest fashion or great deals, we’ve got you covered.
                        </p>
                        <p className="text-gray-700">
                            Our team is passionate about delivering value and innovation in every order.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default About;
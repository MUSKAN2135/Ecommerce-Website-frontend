// src/pages/Blog.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import bg from "/banner.png";
import { getAllblog } from "../../redux/blogslice";
import Newsletter from "../mainsections/news";

export default function Blog() {
    const dispatch = useDispatch();
    const { blog, loading, error } = useSelector((state) => state.blog);

    // Load blogs on mount
    useEffect(() => {
        dispatch(getAllblog());
    }, [dispatch]);

    return (
        <>
            <Navbar />
            {/* Banner */}
            <div
                style={{
                    backgroundImage: `url(${bg})`,
                    backgroundPosition: "bottom",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    height: "50vh",
                }}
                className="flex items-center justify-center"
            >
                <h1 className="text-4xl font-bold text-white drop-shadow-lg">Blog</h1>
            </div>

            {/* Blog List */}
            <div className="py-10 px-4">
                <div className="max-w-6xl mx-auto">
                    {loading && <p className="text-center text-gray-500">Loading blogs...</p>}
                    {error && <p className="text-center text-red-500">{error}</p>}
                    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:px-0 px-20  gap-6">
                        {blog.length > 0 ? (
                            blog.map((item, i) => (
                                <div
                                    key={item._id || i}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                    <img
                                        src={`http://localhost:3000${item.image}`}
                                        alt={item.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h2 className="text-lg font-semibold text-gray-800 hover:text-[#0097b2] transition">
                                            {item.title}
                                        </h2>
                                        <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                                            {item.content}
                                        </p>

                                        {/* Footer */}
                                        <div className="flex justify-between items-center mt-4 text-sm text-gray-500 border-t pt-2">
                                            <div className="flex items-center gap-2">
                                                {item.author || (item.user && item.user.username)}
                                            </div>
                                            <span>
                                                {new Date(item.createdAt).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            !loading && <p className="text-center text-gray-500">No blogs found</p>
                        )}
                    </div>
                </div>
            </div>
            <Newsletter />
            <Footer />
        </>
    );
}

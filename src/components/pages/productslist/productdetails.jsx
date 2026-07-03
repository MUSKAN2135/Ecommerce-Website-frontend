// ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import bg from "/banner.png";
import { getProductById } from "../../redux/productslice";
import { FaHeart, FaRegHeart, FaRegStar, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { addProductToWishlist, getAllWishlists, removeProductFromWishlist } from "../../redux/wishlistslice";
import { createAddToCart, getAllCarts } from "../../redux/addtocartslice";

export default function ProductDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [updatingCart, setUpdatingCart] = useState({});
    const { selectedProduct, loading, error } = useSelector(state => state.products);
    const { wishlists } = useSelector(state => state.wishlist);
    const { token } = useSelector(state => state.users);

    useEffect(() => {
        if (id) dispatch(getProductById(id));
        if (token) {
            dispatch(getAllWishlists());
            dispatch(getAllCarts());
        }
    }, [dispatch, id, token]);

    const toggleWishlist = async (pId) => {
        if (!token) return toast.error("Please login to manage Wishlist");
        const wishlist = wishlists[0];
        const exists = wishlist?.items?.some((item) => item.product._id === pId);

        try {
            if (!exists) {
                await dispatch(addProductToWishlist(pId)).unwrap();
                toast.success("Added to Wishlist");
            } else {
                await dispatch(removeProductFromWishlist({ wishlistId: wishlist._id, productId: pId })).unwrap();
                toast.info("Removed from Wishlist");
            }
            dispatch(getAllWishlists());
        } catch (err) {
            toast.error(err?.message || "Something went wrong");
        }
    };

    const addToCart = async (pId) => {
        if (!token) return toast.error("Please login to add products to cart");
        try {
            setUpdatingCart(prev => ({ ...prev, [pId]: true }));
            await dispatch(createAddToCart(pId)).unwrap();
            toast.success("Product added to cart");
            dispatch(getAllCarts());
        } catch (err) {
            toast.error(err?.message || "Something went wrong");
        } finally {
            setUpdatingCart(prev => ({ ...prev, [pId]: false }));
        }
    };

    const renderStars = (rating, pId) => {
        const stars = [];
        const filled = Math.round(rating || 0);
        for (let i = 0; i < 5; i++) {
            stars.push(
                i < filled ? (
                    <FaStar key={`${pId}-star-${i}`} className="text-yellow-500" />
                ) : (
                    <FaRegStar key={`${pId}-star-${i}`} className="text-gray-400" />
                )
            );
        }
        return stars;
    };

    if (loading) return <p className="text-center text-gray-500 text-lg">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!selectedProduct) return <p className="text-center text-gray-500">No product found</p>;

    const p = selectedProduct;

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
            <div className="max-w-5xl mx-auto bg-white rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-10 my-12">
                {/* Left Side - Product Image */}
                <div className="flex justify-center items-center w-full ">
                    <img
                        src={`http://localhost:3000${p.image}`}
                        alt={p.Name}
                        className="w-100 h-80 max-w-md rounded-xl shadow-md"
                    />
                </div>
                {/* Right Side*/}
                <div className="flex flex-col justify-evenly">
                    <h2 className="text-3xl font-bold mb-4">{p.Name}</h2>
                    <div className="flex items-center mb-2">
                        <div className="flex">{renderStars(p.review?.rating || 0, p._id)}</div>
                        <p className="ml-2 text-sm text-gray-600">
                            {p.review?.comment || "No reviews yet"}
                        </p>
                    </div>
                    <p className="text-gray-600 mb-4">{p.description}</p>
                    <p className="text-2xl font-semibold text-green-600 mb-6">${p.price}</p>
                    <p className="text-sm text-gray-500 mb-6">Category: {p.category?.name || "No Category"}</p>

                    <div className="flex items-center justify-center gap-4 mt-auto">
                        <button
                            className="bg-[#0097b2] flex-1 text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#007f94] disabled:opacity-50"
                            onClick={() => addToCart(p._id)}
                            disabled={updatingCart[p._id]}>
                            {updatingCart[p._id] ? "Adding..." : "Add to Cart"}
                        </button>
                        <button
                            className={`p-2 text-2xl rounded-full hover:bg-gray-100 transition ${!token ? "opacity-50 cursor-not-allowed" : ""}`}
                            onClick={() => toggleWishlist(p._id)}>
                            {wishlists[0]?.items?.some((w) => w.product._id === p._id)
                                ? <FaHeart className="text-red-500" />
                                : <FaRegHeart />}
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

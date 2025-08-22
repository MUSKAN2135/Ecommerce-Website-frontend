import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getcategoryById } from "../../redux/categoryslice";
import { createAddToCart, getAllCarts } from "../../redux/addtocartslice";
import { addProductToWishlist, getAllWishlists, removeProductFromWishlist } from "../../redux/wishlistslice";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function CategoryPage() {
  const { id } = useParams(); // category ID from URL
  const dispatch = useDispatch();
  const { selectedcategory, loading, error } = useSelector((state) => state.categories);
  const { token } = useSelector((state) => state.users);
  const { wishlists } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [updatingCart, setUpdatingCart] = useState({});

  useEffect(() => {
    if (id) dispatch(getcategoryById(id));
    if (token) {
      dispatch(getAllWishlists());
      dispatch(getAllCarts());
    }
  }, [dispatch, id, token]);

  const addToCart = async (productId) => {
    if (!token) return toast.error("Please login to add products to cart");

    try {
      setUpdatingCart((prev) => ({ ...prev, [productId]: true }));
      await dispatch(createAddToCart(productId)).unwrap();
      toast.success("Product added to cart");
      dispatch(getAllCarts());
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setUpdatingCart((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const toggleWishlist = async (productId) => {
    if (!token) return toast.error("Please login to manage wishlist");

    const wishlistItem = wishlists[0]; // assuming single wishlist
    const exists = wishlistItem?.products?.some((p) => p._id === productId);

    try {
      if (!exists) {
        await dispatch(addProductToWishlist({ product: productId })).unwrap();
        toast.success("Added to Wishlist");
      } else {
        await dispatch(removeProductFromWishlist({ wishlistId: wishlistItem._id, productId })).unwrap();
        toast.info("Removed from Wishlist");
      }
      dispatch(getAllWishlists());
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    }
  };

  if (loading) return <p className="text-center py-10 text-gray-500">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!selectedcategory) return <p className="text-center py-10 text-gray-500">Category not found</p>;

  const { name, products } = selectedcategory;

  return (
    <>
      <Navbar />

      {/* Category Header */}
      <div className="py-10 px-4 bg-gray-100 text-center">
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="text-gray-600 mt-2">{products?.length || 0} products</p>
        <button className="mt-4 text-lg text-gray-600">
          <Link to="/" className="hover:text-[#0097b2] transition duration-200">Home</Link> / 
          <Link to={`/category/${id}`} className="text-[#0097b2] ml-1">{name}</Link>
        </button>
      </div>

      {/* Products Grid */}
      <div className="py-10 px-4 max-w-6xl mx-auto grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {products && products.length > 0 ? (
          products.map((p) => (
            <div key={p._id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col justify-between">
              <div className="h-48 flex justify-center items-center mb-4">
                <img src={p.image} alt={p.Name} className="max-h-full object-contain" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 line-clamp-2">{p.Name}</h2>
              <p className="text-green-600 text-lg font-bold mt-2">${p.price}</p>

              {/* Buttons */}
              <div className="flex justify-between items-center mt-4">
                <button
                  className="bg-[#0097b2] text-white px-4 py-2 rounded hover:bg-[#007f94] disabled:opacity-50"
                  onClick={() => addToCart(p._id)}
                  disabled={updatingCart[p._id]}
                >
                  {updatingCart[p._id] ? "Adding..." : "Add to Cart"}
                </button>

                <p
                  className={`text-xl cursor-pointer ${!token ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => toggleWishlist(p._id)}
                >
                  {wishlists[0]?.products?.some((w) => w._id === p._id) ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No products in this category</p>
        )}
      </div>

      <Footer />
    </>
  );
}

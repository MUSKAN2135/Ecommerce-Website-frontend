// ShopProducts.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaRegStar, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/productslice";
import { addProductToWishlist, getAllWishlists, removeProductFromWishlist } from "../../redux/wishlistslice";
import { createAddToCart, getAllCarts } from "../../redux/addtocartslice";
import { toast } from "react-toastify";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function ShopProducts() {
  const dispatch = useDispatch();
  const [updatingCart, setUpdatingCart] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0);
  const productsPerPage = 8;
  const pagesPerGroup = 3;
  const { products, loading: productLoading, error: productError } = useSelector(state => state.products);
  const { wishlists } = useSelector(state => state.wishlist);
  const { token } = useSelector(state => state.users);
  const [filteredProducts, setFilteredProducts] = useState([]);


  useEffect(() => {
    dispatch(getAllProducts());
    if (token) {
      dispatch(getAllWishlists());
      dispatch(getAllCarts());
    }
  }, [dispatch, token]);

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

  // Pagination
  const displayedProducts = products.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startPage = pageGroup * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
  const Next = () => { if (endPage < totalPages) setPageGroup(prev => prev + 1); };
  const Prev = () => { if (startPage > 1) setPageGroup(prev => prev - 1); };

  if (productLoading) return <p className="text-center text-gray-500 text-lg">Loading...</p>;
  if (productError) return <p className="text-center text-red-500">{productError}</p>;

  return (
    <div className="flex-1 px-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProducts.map(p => (
          <div key={p._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col">
            <div className="w-full h-full px-2 pt-2">
              <img src={`http://localhost:3000${p.image}`} alt={p.Name} className="h-60 w-full rounded-md object-cover" />
            </div>
            <div className="flex flex-col flex-grow p-3">
              <Link to={`/productdetail/${p._id}`}>
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 hover:text-[#0097b2] line-clamp-2">{p.Name}</h2>
              </Link>

              <div className="flex items-center mt-2">
                <div className="flex">{renderStars(p.review?.rating || 0, p._id)}</div>
                <p className="ml-2 text-xs sm:text-sm text-gray-600 truncate">
                  {p.review?.comment || "No reviews yet"}
                </p>
              </div>

              <p className="text-green-600 text-sm sm:text-lg font-bold mt-2">${p.price}</p>
              <p className="text-xs sm:text-sm text-gray-500 capitalize mt-1">{p.category?.name || "No Category"}</p>

              <div className="flex items-center justify-between mt-auto pt-4">
                <button
                  className="bg-[#0097b2] cursor-pointer flex-1 text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base hover:bg-[#007f94] disabled:opacity-50"
                  onClick={() => addToCart(p._id)}
                  disabled={updatingCart[p._id]}>
                  {updatingCart[p._id] ? "Adding..." : "Add to Cart"}
                </button>
                <button
                  className={`ml-3 p-2 cursor-pointer text-lg sm:text-xl rounded-full hover:bg-gray-100 transition ${!token ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => toggleWishlist(p._id)}>
                  {wishlists[0]?.items?.some((w) => w.product._id === p._id) ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 gap-2 flex-wrap">
          <button onClick={Prev} className="px-3 py-1 rounded hover:bg-gray-300">
            <MdKeyboardArrowLeft />
          </button>
          {pageNumbers.map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${currentPage === page ? "bg-[#0097b2] text-white" : "bg-gray-100 hover:bg-gray-200"}`}>
              {page}
            </button>
          ))}
          <button onClick={Next} className="px-3 py-1 rounded hover:bg-gray-300">
            <MdKeyboardArrowRight />
          </button>
        </div>
      )}
    </div>
  );
}
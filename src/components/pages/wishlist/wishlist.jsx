import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import {
  deleteWishlist,
  getAllWishlists,
  removeProductFromWishlist,
} from "../../redux/wishlistslice";
import { RxCross2 } from "react-icons/rx";
import { createAddToCart, getAllCarts } from "../../redux/addtocartslice";
import { toast } from "react-toastify";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlists, loading, error } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [updatingCart, setUpdatingCart] = useState({});
  const { token } = useSelector((state) => state.users);

  useEffect(() => {
    if (token) {
      dispatch(getAllWishlists());
      dispatch(getAllCarts());
    }
  }, [dispatch, token]);

  const handleRemoveProduct = (wishlistId, productId) => {
    dispatch(removeProductFromWishlist({ wishlistId, productId }))
      .unwrap()
      .then(() => {
        toast.success("Product removed from wishlist");
        dispatch(getAllWishlists());
      })
      .catch((err) => toast.error(err?.message || "Failed to remove product"));
  };

  const handleClearWishlist = () => {
    if (!wishlists.length) return;
    wishlists.forEach((wl) => {
      dispatch(deleteWishlist(wl._id));
    });
    toast.success("Wishlist cleared successfully");
    dispatch(getAllWishlists());
  };

  const addToCart = async (productId) => {
    if (!token) {
      toast.error("Please login to add products to cart");
      return;
    }
    try {
      setUpdatingCart((prev) => ({ ...prev, [productId]: true }));
      await dispatch(createAddToCart(productId)).unwrap();
      toast.success("Product added to cart");
      dispatch(getAllCarts());
      setUpdatingCart((prev) => ({ ...prev, [productId]: false }));
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
      setUpdatingCart((prev) => ({ ...prev, [productId]: false }));
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-44 text-center text-gray-600">
        <h2 className="text-2xl font-bold m-6">My Wishlist</h2>
      </div>
      <div className="mx-auto p-6 min-h-[80vh]">
        {loading ? (
          <p className="text-center py-10">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500 mt-10">Error: {error}</p>
        ) : token && wishlists?.length > 0 ? (
          <>
            <table className="w-full mb-6">
              <tbody>
                {wishlists?.map((item) =>
                  item.items.map((prod) => (
                    <tr key={prod.product._id} className="border-b">
                      <td className="py-4">
                        <button
                          onClick={() =>
                            handleRemoveProduct(item._id, prod.product._id)
                          }
                          className="text-red-500"
                        >
                          <RxCross2 />
                        </button>
                      </td>

                      <td className="py-4 flex items-center space-x-4">
                        <img
                          src={`http://localhost:3000${prod.product?.image}`}
                          alt={prod.product?.Name || "Product"}
                          className="w-16 h-16 object-cover rounded-full"
                        />
                        <span>{prod.product?.Name}</span>
                      </td>
                      <td className="p-4">{prod.product?.price} $</td>
                      <td className="py-4 text-white">
                        <button
                          className="bg-[#0097b2] cursor-pointer text-white px-4 py-2 rounded hover:bg-[#007f94] disabled:opacity-50"
                          onClick={() => addToCart(prod.product._id)}
                          disabled={updatingCart[prod.product?._id]}
                        >
                          {updatingCart[prod.product?._id]
                            ? "Adding..."
                            : "Add to Cart"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <div className="text-center mt-6">
              <button
                onClick={handleClearWishlist}
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
                Clear Wishlist
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600 mt-10">
            {token || wishlists.items.length === 0 
              ? "Your wishlist is empty."
              : "Please login to view your wishlist."}
          </p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;

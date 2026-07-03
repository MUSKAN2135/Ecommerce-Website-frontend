// src/pages/Shoppingcart.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCarts, deleteCartItem, updateCartQuantity } from "../../redux/addtocartslice";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import shopbg from '/banner.png';
import Section from "../mainsections/section";

export default function Shoppingcart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.users);
  const [quantities, setQuantities] = useState({});
  const [updating, setUpdating] = useState({});

  // Fetch cart on login
  useEffect(() => {
    if (token) dispatch(getAllCarts());
  }, [dispatch, token]);

  // Initialize quantities
  useEffect(() => {
    if (cart?.items?.length > 0) {
      const initialQuantities = {};
      cart.items.forEach(item => {
        if (item?.product?._id) {
          initialQuantities[item.product._id] = item.quantity || 1;
        }
      });
      setQuantities(initialQuantities);
    }
  }, [cart]);

  const handleQuantityChange = (productId, value) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: value === "" ? "" : Math.max(1, Number(value))
    }));
  };

  const handleQuantityUpdate = async (productId) => {
    let quantity = Number(quantities[productId]) || 1;
    setQuantities(prev => ({ ...prev, [productId]: quantity }));
    setUpdating(prev => ({ ...prev, [productId]: true }));
    try {
      await dispatch(updateCartQuantity({ cartId: cart._id, productId, quantity })).unwrap();
      toast.success("Quantity updated");
      await dispatch(getAllCarts()); // ✅ fresh cart reload
    } catch (error) {
      toast.error(error || "Could not update quantity");
    } finally {
      setUpdating(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await dispatch(deleteCartItem({ cartId: cart._id, productId })).unwrap();
      await dispatch(getAllCarts()); // ✅ fresh cart reload
      toast.success("Product removed from cart");
    } catch (error) {
      toast.error(error || "Could not remove product");
    }
  };

  const handleClearCart = async () => {
    if (!cart?.items) return;
    try {
      for (const item of cart.items) {
        if (item?.product?._id)
          await dispatch(deleteCartItem({ cartId: cart._id, productId: item.product._id })).unwrap();
      }
      await dispatch(getAllCarts()); // ✅ fresh cart reload
      toast.success("Cart cleared");
    } catch (error) {
      toast.error(error || "Could not clear cart");
    }
  };

  const handleCheckout = () => {
    if (!cart?.items || cart.items.length === 0) return toast.error("Cart is empty");
    navigate("/checkout");
  };

  const totalPrice = cart?.items?.reduce(
    (sum, item) => sum + ((Number(item?.product?.price) || 0) * (Number(quantities[item?.product?._id] ?? item?.quantity) || 1)), 0
  );

  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundImage: `url(${shopbg})`,
          backgroundPosition: 'bottom',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: '60vh'
        }}
        className="flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">Your Cart</h1>
      </div>
      <div className="text-lg text-gray-600 m-6">
        <Link to="/" className="hover:text-[#0097b2] transition duration-200">Home</Link> /
        <span className="text-[#0097b2]"> ShoppingCart</span>
      </div>

      <div className="py-10 px-4 min-h-[50vh] overflow-hidden">
        {loading ? (
          <p className="text-center py-10">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500 mt-10">Error: {error}</p>
        ) : token && cart?.items?.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 gap-4">
              {cart.items.map((item, index) => (
                item?.product?._id && (
                  <div key={`${item.product._id}-${index}`} className="flex items-center justify-between p-4 bg-white shadow rounded">
                    <div className="flex items-center gap-4">
                      <img
                        src={`http://localhost:3000${item.product.image}`}
                        alt={item.product.Name}
                        className="h-20 w-20 object-contain"
                      />
                      <div>
                        <h2 className="font-semibold">{item.product.Name}</h2>
                        <p className="text-green-600 font-bold">
                          ${((Number(item.product.price) || 0) * (Number(quantities[item.product._id] ?? item.quantity) || 1)).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={1}
                        value={quantities[item.product._id] ?? item.quantity}
                        onChange={(e) => handleQuantityChange(item.product._id, e.target.value)}
                        className="w-16 p-1 border rounded text-center"
                      />
                      <button
                        onClick={() => handleQuantityUpdate(item.product._id)}
                        className="bg-[#0097b2] text-white px-3 py-1 rounded hover:bg-[#007f94] disabled:opacity-50"
                        disabled={updating[item.product._id]} >
                        {updating[item.product._id] ? "Updating..." : "Update"}
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(item.product._id)}
                        className="text-gray-600 hover:text-red-700 p-2" >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                )
              ))}
            </div>

            <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-lg font-semibold">
                Total: <span className="text-green-600">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex gap-4">
                {cart.items.length > 0 && (
                  <div>
                    <button
                      onClick={handleClearCart}
                      className="hover:bg-[#0097b2] border border-[#0097b2] text-gray-700 hover:text-white px-4 py-2 rounded cursor-pointer transition duration-150 ease-in-out">
                      Clear Cart
                    </button>
                    <button
                      onClick={handleCheckout}
                      className="bg-[#0097b2] hover:bg-[#007f94] text-white px-4 py-2 rounded cursor-pointer transition duration-150 ease-in-out">
                      Checkout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            {token  ? "Your cart is empty" : "Please login to view your cart."}
          </p>
        )}
      </div>
      <Section/>
      <Footer />
    </>
  );
}

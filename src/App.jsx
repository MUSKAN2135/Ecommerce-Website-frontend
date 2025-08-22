import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ToastContainer } from "react-toastify";
import Home from "./components/pages/home";
import Signup from "./components/pages/signup/signup";
import Login from "./components/pages/login/login";
import ProductDetails from "./components/pages/productslist/productdetails";
import Shop from "./components/pages/shop/shop";
import About from "./components/pages/about/about";
import Contact from "./components/pages/contact/contact";
import Blog from "./components/pages/blog/blog";
import Checkout from "./components/pages/shipping/shipping";
import Wishlist from "./components/pages/wishlist/wishlist";
import Shoppingcart from "./components/pages/cart/shoppingcart";
import Admindashboard from "./components/admin panel/dashboard";
import Products from "./components/redux/products";
import { ProtectedRoute } from "./components/protectedroute/route";
import Users from "./components/redux/users";

export default function App() {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        {/* Public Pages */}
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productdetail/:id" element={<ProductDetails />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/aboutUs" element={<About />} />
        <Route path="/contactUs" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* <Route path="/category/:id" element={<CategoryPage />} /> */}

        {/* User-Only Pages */}
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute >
              <Wishlist />
            </ProtectedRoute>} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Shoppingcart />
            </ProtectedRoute>} />

        {/* Admin-Only Pages */}
        <Route
          path="/allusers"
          element={
            <ProtectedRoute role="Admin">
              <Users />
            </ProtectedRoute>} />
        <Route
          path="/allproducts"
          element={
            <ProtectedRoute role="Admin">
              <Products />
            </ProtectedRoute>} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="Admin">
              <Admindashboard />
            </ProtectedRoute>} />
      </Routes>
    </>
  );
}

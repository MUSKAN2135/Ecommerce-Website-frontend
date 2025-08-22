// src/components/Allproducts.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/productslice";

export default function Allproducts({ display = 4 }) {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      // shuffle array and pick 'display' number of products
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      setRandomProducts(shuffled.slice(0, display));
    }
  }, [products, display]);

  if (loading) return <p className="text-center text-gray-500 text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {randomProducts.map((p) => (
        <div key={p._id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col">
          <div className="h-full w-full flex justify-center items-center mb-2">
            <img
              src={`http://localhost:3000${p.image}`} // backend URL
              alt={p.Name}
              className="h-60 w-80"
            />
          </div>
          <Link to={`/productdetail/${p._id}`}>
            <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 line-clamp-2">{p.Name}</h2>
          </Link>
          <p className="text-green-600 text-lg font-bold mt-2">${p.price}</p>
        </div>
      ))}
    </div>
  );
}

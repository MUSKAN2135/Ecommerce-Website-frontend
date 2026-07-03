import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import newsbg from "/title.background.png";
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
    <div className="m-7">
      <div className="h-24 w-full flex items-center justify-center" style={{ backgroundImage: `url(${newsbg})`, backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
        <h2 className="text-white text-xl md:text-2xl font-semibold drop-shadow-lg z-[3]"  data-aos="zoom-out" data-aos-duration="1500">
          Shop Featured Products
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:px-22 py-8 md:px-0 px-4">
        {randomProducts.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 flex flex-col overflow-hidden">
            {/* Product Image */}
            <div className="relative w-full h-56">
              <img
                src={`http://localhost:3000${p.image}`}
                alt={p.Name}
                className="w-full h-full object-cover rounded-t-2xl"
              />
            </div>
            {/* Content */}
            <div className="flex flex-col flex-grow p-4">
              <Link to={`/productdetail/${p._id}`}>
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 hover:text-[#0097b2] line-clamp-2">
                  {p.Name}
                </h2>
              </Link>
              {/* Price */}
              <p className="text-green-600 text-lg font-bold mt-2">
                ${p.price}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 capitalize mt-1">
                {p.category?.name}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

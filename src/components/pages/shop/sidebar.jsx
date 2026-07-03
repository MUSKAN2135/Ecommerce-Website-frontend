import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllcategories} from "../../redux/categoryslice";
import { getAllProducts } from "../../redux/productslice";

export default function Sidebar({ setFilteredProducts }) {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.categories); // categories slice
  const { products } = useSelector(state => state.products); // products slice

  const [openItem, setOpenItem] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);

  useEffect(() => {
    dispatch(getAllcategories());
    dispatch(getAllProducts());
  }, [dispatch]);

  const toggleDropdown = (item) => {
    setOpenItem(openItem === item ? null : item);
  };

  const handleCategoryClick = (categoryId) => {
    const filtered = products.filter(p => p.category?._id === categoryId);
    setFilteredProducts(filtered);
  };

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
    const filtered = products.filter(p => Math.round(p.review?.rating || 0) === rating);
    setFilteredProducts(filtered);
  };

  return (
    <div className="w-full h-full bg-cyan-950 text-white p-4 sm:p-6 shadow-lg rounded-md">
      <h2 className="text-xl font-semibold mb-6">Filters</h2>
      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Categories</h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat._id} className="rounded">
              <div
                className="flex justify-between items-center cursor-pointer hover:bg-cyan-900/50 p-2 rounded"
                onClick={() => toggleDropdown(cat.name)}>
                <span className="text-sm sm:text-base">{cat.name}</span>
              </div>
              {openItem === cat.name && cat.subCategories?.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {cat.subCategories.map((sub) => (
                    <li
                      key={sub._id}
                      className="p-2 text-sm bg-cyan-900/30 rounded cursor-pointer hover:bg-cyan-900/60"
                      onClick={() => handleCategoryClick(sub._id)}>
                      {sub.name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h2 className="py-3 text-xl font-medium">Rating:</h2>
        {[5, 4, 3, 2, 1].map((star) => (
          <label
            key={star}
            className="flex items-center mb-2 cursor-pointer"
            onClick={() => handleRatingClick(star)}
          >
            <input
              type="radio"
              name="rating"
              checked={selectedRating === star}
              readOnly
              className="w-4 h-4 text-[#0097b2] bg-gray-100 border-gray-300 focus:ring-[#0097b2]"
            />
            <span className="ml-2 text-sm">{star} star{star > 1 ? "s" : ""}</span>
          </label>
        ))}
      </div>

      {/* Apply Filters Button */}
      <button
        className="w-full bg-[#0097b2] text-white py-2 rounded hover:bg-[#007f94] transition duration-150 font-medium text-sm sm:text-base"
        onClick={() => setFilteredProducts(products)}
      >
        Reset Filters
      </button>
    </div>
  );
}

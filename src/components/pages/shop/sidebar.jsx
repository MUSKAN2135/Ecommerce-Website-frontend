import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function Sidebar() {
  const [openItem, setOpenItem] = useState(null);

  const toggleDropdown = (item) => {
    setOpenItem(openItem === item ? null : item);
  };

  const menu = [
    { name: "Men", sub: ["Shirts", "Shoes", "Accessories"] },
    { name: "Women", sub: ["Dresses", "Accessories", "Jewelry", "Shoes"] },
  ];

  return (
    <div className="w-full md:w-70 h-full bg-cyan-950 text-white p-4 sm:p-6 shadow-lg rounded-md">
      <h2 className="text-xl font-semibold mb-6">Filters</h2>
      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Categories</h3>
        <ul className="space-y-2">
          {menu.map((item, idx) => (
            <li key={idx} className="rounded">
              <div
                className="flex justify-between items-center cursor-pointer hover:bg-cyan-900/50 p-2 rounded"
                onClick={() => toggleDropdown(item.name)}
              >
                <span className="text-sm sm:text-base">{item.name}</span>
                {openItem === item.name ? (
                  <MdOutlineKeyboardArrowDown className="text-xl" />
                ) : (
                  <MdOutlineKeyboardArrowRight className="text-xl" />
                )}
              </div>
              {openItem === item.name && (
                <ul className="mt-2 space-y-1">
                  {item.sub.map((subItem, i) => (
                    <li
                      key={i}
                      className="p-2 text-sm bg-cyan-900/30 rounded cursor-pointer hover:bg-cyan-900/60"
                    >
                      {subItem}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Price */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Price</h3>
        <input
          type="range"
          min="0"
          max="1000"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        <p className="mt-2 text-sm">Up to $1000</p>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h2 className="py-3 text-xl font-medium">Rating:</h2>
        {[1, 2, 3, 4, 5].map((star) => (
          <label key={star} className="flex items-center mb-2">
            <input
              type="radio"
              name="rating"
              className="w-4 h-4 text-[#0097b2] bg-gray-100 border-gray-300 focus:ring-[#0097b2] dark:focus:ring-[#0097b2] dark:ring-offset-gray-800"
            />
            <span className="ml-2 text-sm">{star} star{star > 1 ? "s" : ""}</span>
          </label>
        ))}
      </div>

      {/* Apply Filters Button */}
      <button className="w-full bg-[#0097b2] text-white py-2 rounded hover:bg-[#007f94] transition duration-150 font-medium text-sm sm:text-base">
        Apply Filters
      </button>
    </div>
  );
}
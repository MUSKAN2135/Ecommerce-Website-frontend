import React, { useState } from "react";
import AdminNavbar from "./adminbar";

export const Admindashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const overview = [
    { p: "Earnings", value: "$628" },
    { p: "Shares", value: "3423" },
    { p: "Likes", value: "1256" },
    { p: "Rating", value: "9.6" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminNavbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isMenuOpen ? "ml-60" : "ml-0"
        }`}
      >
        <div className="mt-20 px-6">
          <h1 className="text-3xl font-bold mb-8 text-[#0097b2]">
            Dashboard Overview
          </h1>

          {/* Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {overview.map((item, id) => (
              <div
                key={id}
                className="bg-white p-6 shadow-lg rounded-2xl text-center border-t-4 border-[#0097b2] hover:shadow-xl transition"
              >
                <p className="text-gray-500 font-medium">{item.p}</p>
                <p className="text-2xl font-bold text-[#0097b2] mt-2">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Result Chart */}
          <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
            <p className="font-semibold mb-4 text-[#0097b2] text-lg">
              Result Chart
            </p>
            <div className="h-56 bg-gray-50 flex items-center justify-center text-gray-400 rounded-lg border">
              [Chart Placeholder]
            </div>
          </div>

          {/* Traffic & Tasks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <p className="font-semibold mb-4 text-[#0097b2] text-lg">
                Traffic
              </p>
              <div className="h-40 bg-gray-50 flex items-center justify-center text-gray-400 rounded-lg border">
                [Area Graph]
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <p className="font-semibold mb-4 text-[#0097b2] text-lg">
                Tasks
              </p>
              <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
                <li>Lorem ipsum dolor sit amet</li>
                <li>Consectetur adipiscing elit</li>
                <li>Sed do eiusmod tempor</li>
                <li>Ut labore et dolore magna</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admindashboard;

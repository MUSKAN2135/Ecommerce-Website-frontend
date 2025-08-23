import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosSearch, IoMdContact } from 'react-icons/io';
import { LiaBarsSolid } from 'react-icons/lia';
import { RxCross2 } from 'react-icons/rx';
import { MdOutlineDashboard } from "react-icons/md";
import { RiHome5Line } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";
import { BsCardChecklist } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { PiStorefront } from 'react-icons/pi';
import { logout } from "../redux/userslice";

export default function AdminNavbar({ isMenuOpen, setIsMenuOpen }) {
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.users); // 👈 get currentUser from Redux

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      {/* Topbar */}
      <div className={`flex justify-between px-4 py-4 bg-cyan-950 text-white shadow-md fixed top-0 right-0 z-10 transition-all duration-300 ${isMenuOpen ? 'left-60 w-[calc(100%-15rem)]' : 'left-0 w-full'}`}>
        <div className="flex w-full items-center justify-between mb-4 lg:mb-0">
          <div className="text-2xl cursor-pointer mr-2" onClick={toggleMenu}>
            {isMenuOpen ? <RxCross2 className="md:block hidden" /> : <LiaBarsSolid className="block" />}
          </div>

          {/* Admin avatar */}
          <div className="flex items-center space-x-4 ml-auto">
            {currentUser ? (
              currentUser.Avatar ? (
                <img
                  src={`http://localhost:3000${currentUser.Avatar}`}
                  alt={currentUser.UserName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )
                : (
                  <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white">
                    {currentUser.name?.charAt(0).toUpperCase()}
                  </div>
                )
            ) : null}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`h-screen bg-cyan-950 shadow-lg text-white w-60 fixed top-0 z-10 transition-all duration-300 ${isMenuOpen ? 'left-0' : '-left-60'}`}>
        {isMenuOpen && (
          <div className="flex items-center justify-center text-center text-xl">
            <RiHome5Line />
            <h2 className="text-xl font-bold px-2 py-6">Admin Panel</h2>
            <RxCross2 className="m-5 text-xl block md:hidden" onClick={toggleMenu} />
          </div>
        )}

        <ul className="space-y-2">
          <li>
            <Link to="/dashboard" className="flex items-center space-x-2 px-4 py-3 bg-[#0097b2]/20">
              <MdOutlineDashboard /> <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/allusers" className="flex items-center space-x-2 px-4 py-3 hover:bg-[#0097b2]/20">
              <FaUser /> <span>Users</span>
            </Link>
          </li>
          <li>
            <Link to="/allproducts" className="flex items-center space-x-2 px-4 py-3 hover:bg-[#0097b2]/20">
              <PiStorefront /> <span>Products</span>
            </Link>
          </li>
          <li>
            <Link to="/allorders" className="flex items-center space-x-2 px-4 py-3 hover:bg-[#0097b2]/20">
              <BsCardChecklist /> <span>Orders</span>
            </Link>
          </li>

          {/* Logout Button */}
          <li>
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 px-4 py-3 bg-[#0097b2]  rounded hover:bg-[#007a92] transition">
              <AiOutlineLogout /> <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

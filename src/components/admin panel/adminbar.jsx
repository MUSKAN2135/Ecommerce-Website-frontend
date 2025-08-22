// src/components/AdminNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosSearch, IoMdContact } from 'react-icons/io';
import { LiaBarsSolid } from 'react-icons/lia';
import { RxCross2 } from 'react-icons/rx';
import { MdOutlineDashboard } from "react-icons/md";
import { RiHome5Line, RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";
import { BsCardChecklist } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { PiStorefront } from 'react-icons/pi'

export default function AdminNavbar({ isMenuOpen, setIsMenuOpen }) {
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Topbar */}
      <div className={`flex justify-between px-4 py-4 bg-gray-200 shadow-md fixed top-0 right-0 z-10 transition-all duration-300 ${isMenuOpen ? 'left-60 w-[calc(100%-15rem)]' : 'left-0 w-full'}`}>
        <div className="flex w-full items-center justify-between mb-4 lg:mb-0">
          <div className="text-2xl cursor-pointer mr-2" onClick={toggleMenu}>
            {isMenuOpen ? (
              <RxCross2 className="md:block hidden" onClick={toggleMenu} />
            ) : (
              <LiaBarsSolid className="block" onClick={toggleMenu} />
            )}
          </div>
          <div className="relative w-full md:block hidden lg:max-w-md">
            <IoIosSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-600" />
            <input
              placeholder="Search"
              className="py-2 pl-8 pr-4 text-sm w-full border border-gray-400 text-black rounded-md"
            />
          </div>
          <div className='block'>
            <Link to="/contact" className="hover:text-[#0097b2] cursor-pointer ml-auto">
              <IoMdContact className="text-2xl text-gray-600" />
            </Link>
          </div>
        </div>
      </div>
      {/* Sidebar */}
      <div className={`h-screen bg-cyan-950 shadow-lg text-white w-60 fixed top-0 z-10 transition-all duration-300 ${isMenuOpen ? 'left-0' : '-left-60'}`}>
        {isMenuOpen &&
          <div className="flex items-center justify-center text-center text-xl">
            <RiHome5Line />
            <h2 className="text-xl font-bold px-2 py-6">Admin Panel</h2>
            <RxCross2 className='m-5 text-xl block md:hidden' onClick={toggleMenu} />
          </div>}
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
          <li>
            <Link to="/login" className="flex items-center space-x-2 px-4 py-3 bg-[#0097b2] mx-3">
              <AiOutlineLogout /> <span>Logout</span>
            </Link>
          </li>
          {isMenuOpen &&
            <li className="block lg:hidden px-4 pb-4">
              <div className="relative">
                <IoIosSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full py-2 pl-8 pr-4 text-sm rounded bg-white text-black border border-gray-400"
                />
              </div>
            </li>}
        </ul>
      </div>
    </>
  );
}

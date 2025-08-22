import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxCross2 } from 'react-icons/rx'
import { LiaBarsSolid } from 'react-icons/lia'
import { TfiShoppingCart } from 'react-icons/tfi'
import { IoIosSearch } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegHeart, FaUser, FaUserCircle } from 'react-icons/fa'
import { logout } from '../../redux/userslice'  // <--- import logout action

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentUser, token } = useSelector((state) => state.users)
  const searchQuery = useSelector((state) => state.products.searchQuery)  
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navlinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Blog", path: "/blog" },
    { name: "About Us", path: "/aboutUs" },
    { name: "Contact", path: "/contactUs" }
  ]

  const [dropdownStates, setDropdownStates] = useState({
    shop: false,
    user: false,
  })

  const handleMouseEnter = (params) => {
    setDropdownStates((prev) => ({ ...prev, [params]: true }))
  }
  const handleMouseLeave = (params) => {
    setDropdownStates((prev) => ({ ...prev, [params]: false }))
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/') 
  }

  return (
    <div className='flex flex-col justify-center fixed top-0 left-0 z-10 w-full'>
      <div className="bg-cyan-950 flex px-6 py-2 lg:justify-around justify-between items-center text-white">
        <div className="logo">
          <h2 className='md:text-3xl sm:text-xl text-lg font-[Mono] text-yellow-600'>TrendyMart</h2>
        </div>

        <div className='lg:hidden block' onClick={toggleMenu}>
          {isMenuOpen ?
            <RxCross2 className='font-bold cursor-pointer transition duration-150 ease-in-out text-xl ' />
            :
            <LiaBarsSolid className='cursor-pointer transition duration-150 ease-in-out text-xl ' />
          }
        </div>

        <div className='lg:flex hidden items-center md:mr-3 mr-0'>
          <IoIosSearch className='mr-[-30px] cursor-pointer text-gray-500 transition duration-150 ease-in-out text-xl ' />
          <input placeholder='Search over here' className='lg:w-100 md:w-70 text-gray-500 outline-none border py-2 pl-10 rounded-md ' />
        </div>

        <div className="icons flex items-center md:py-3 lg:flex hidden">
          <Link to="/wishlist"> <FaRegHeart className='m-2 cursor-pointer hover:text-yellow-600 transition duration-150 ease-in-out ' /></Link>
          <Link to="/cart"> <TfiShoppingCart className='m-2 cursor-pointer hover:text-yellow-600 transition duration-150 ease-in-out ' /></Link>

          {/* User Dropdown */}
          <div className="relative"
            onMouseEnter={() => handleMouseEnter('user')}
            onMouseLeave={() => handleMouseLeave('user')}>
            {token && currentUser?.Avatar ?
              <img src={`http://localhost:3000${currentUser.Avatar}`} alt="avatar" className="w-8 h-8 rounded-full mx-6 cursor-pointer" />
              :
              <p className='mx-6 hover:text-yellow-600 cursor-pointer transition duration-150 ease-in-out' ><FaUserCircle /></p>
            }
            {dropdownStates.user && (
              <div className="absolute right-0 left-0 mr-4 w-40 shadow-lg bg-[#0097b2] text-black rounded transition duration-150 ease-in-out">
                {!token && (
                  <div>
                    <Link to="/signup" className="block p-3 hover:text-white hover:bg-[#0097b2] cursor-pointer">Signup</Link>
                    <hr className='text-gray-300' />
                    <Link to="/login" className="block p-3 hover:text-white hover:bg-[#0097b2] cursor-pointer">Login</Link>
                  </div>
                )}
                {token && (
                  <div>
                    <Link to="/signup" className="block p-3 hover:text-white hover:bg-[#0097b2] cursor-pointer">Signup</Link>
                    <hr className='text-gray-300' />
                    <Link to="/login" className="block p-3 hover:text-white hover:bg-[#0097b2] cursor-pointer">Login</Link>
                    <hr className='text-gray-300' />
                    <p className="block p-3 cursor-pointer hover:text-white hover:bg-[#0097b2]" onClick={handleLogout}>Logout</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <hr className='text-yellow-600' />
      <div className="topbar py-2 bg-cyan-950 flex lg:justify-around justify-between items-center text-white">
        <div className='flex pt-3 lg:block hidden'>
          {navlinks.map((link, index) => (
            <Link key={index} to={link.path} className='mx-10 mb-2 hover:text-[#0097b2] cursor-pointer transition duration-150 ease-in-out'>
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {isMenuOpen &&
        <div className="nav-link bg-cyan-900/40 text-white py-5 shadow-lg transition duration-150">
          <div className='flex items-center justify-center md:mr-3 mr-0'>
            <IoIosSearch className='mr-[-30px] cursor-pointer text-gray-500 transition duration-150 ease-in-out text-xl ' />
            <input placeholder='Search over here' className='w-100 text-gray-500 outline-none border py-2 pl-10 rounded-md ' />
          </div>
          <div className='flex flex-col'>
            {navlinks.map((link, i) => (
              <Link key={i} to={link.path} className='mx-10 mb-2 hover:text-[#0097b2] cursor-pointer transition duration-150 ease-in-out'>
                {link.name}
              </Link>
            ))}
          </div>
          <div className="icons flex justify-center mx-3">
            <Link to='/cart' className='w-40 rounded-md flex items-center justify-center p-3 bg-[#0097b2] hover:bg-[transparent] hover:border hover:border-[#0097b2] m-2'> <TfiShoppingCart className='mx-2 cursor-pointer hover:text-yellow-600 transition duration-150 ease-in-out ' />Cart</Link>
            <Link to='/myaccount' className='w-40 rounded-md flex items-center p-3 m-2 hover:bg-[transparent] hover:border hover:border-[#0097b2] cursor-pointer transition duration-150 ease-in-out bg-[#0097b2]' ><FaUser className='mx-2' />My Account</Link>
          </div>
        </div>
      }
    </div>
  )
}

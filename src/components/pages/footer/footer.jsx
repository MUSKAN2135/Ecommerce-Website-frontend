import { FaFacebookF, FaInstagram, FaLinkedin, FaPhone, FaTwitter } from 'react-icons/fa6'
import { IoLocationSharp } from 'react-icons/io5'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { Link } from 'react-router-dom'
import footbg from '/footer-bg.png'

export default function Footer() {
    const links = [
        { name: "Login", path: "/login" },
        { name: "Wishlist", path: "/wishlist" },
        { name: "FAQs", path: "/FAQs" },
        { name: "Contact", path: "/contact" }
    ];
    const navItems = [
        { name: "Home", path: "/" },
        { name: "Shop", path: "/shop" },
        { name: "Blog", path: "/blog" },
        { name: "About Us", path: "/aboutUs" }
    ];

    return (
        <div className='w-auto' style={{ backgroundImage: `url(${footbg})`, backgroundRepeat:"no-repeat", backgroundSize:"cover", width: "100%" }}>
            <div className="text-white md:flex items-center sm:flex-wrap md:justify-center leading-10 md:px-0 py-12 pb-10">
                <div className="py-5 md:px-0 lg:w-70 md:w-100 md:mx-0 mx-3">
                    <div className="logo">
                        <h2 className='text-4xl font-[Mono] text-yellow-600 py-4'>TrendyMart</h2>
                    </div>
                    <p className='p-2 leading-7 text-gray-300'>
                        Gentle textures, mindful design
                        Crafted to soothe, styled to charm
                        Made to feel, made to last.
                    </p>
                    <div className='foot-icons flex'>
                        <FaFacebookF className='p-2 text-3xl shadow-md rounded-full m-2 bg-white text-black' />
                        <FaTwitter className='p-2 text-3xl shadow-md rounded-full m-2 bg-white text-black' />
                        <FaLinkedin className='p-2 text-3xl shadow-md rounded-full m-2 bg-white text-black' />
                        <FaInstagram className='p-2 text-3xl shadow-md rounded-full m-2 bg-white text-black' />
                    </div>
                </div>
                <div className="py-5 md:px-0 lg:w-45 md:w-55 w-auto md:mx-0 mx-3">
                    <h2 className='text-white text-xl'>Company</h2>
                    <ul>
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                to={link.path}
                                className="w-25 group hover:text-yellow-600 transition duration-300 cursor-pointer flex items-center">
                                <MdOutlineKeyboardArrowRight className="text-2xl text-white p-1 hidden group-hover:block" />
                                {link.name}
                            </Link>
                        ))}
                    </ul>

                </div>
                <div className="py-5 md:px-0 lg:w-45  md:w-55 w-auto md:mx-0 mx-3">
                    <h2 className='text-white text-xl'>Services</h2>
                    <ul>
                        {navItems.map((item, i) => (
                            <Link
                                key={i}
                                to={item.path}
                                className="group w-25 hover:text-yellow-600 transition duration-300 cursor-pointer flex items-center" >
                                <MdOutlineKeyboardArrowRight className="text-white p-1 text-2xl hidden group-hover:block" />
                                {item.name}
                            </Link>
                        ))}
                    </ul>
                </div>
                <div className="py-5 md:px-0 lg:w-70 md:w-100 md:mx-0 mx-3">
                    <h2 className='text-white text-xl'>Contact</h2>
                    <div>
                        <p>4517 Washington Ave. Manchester, Kentucky 39495</p>
                        <div className='flex items-center'>
                            <IoLocationSharp className='bg-[#0097b2] h-10 w-10 p-2 mr-2 rounded-full' />
                            <p className='p-1'>4517 Washington Ave. Manchester</p>
                        </div>
                        <div className='flex items-center'>
                            <FaPhone className='bg-[#0097b2] h-10 w-10 p-2 mr-2 rounded-full' />
                            <div className='p-1'>
                                <p className=''>+923015128480
                                    <span>Mon-Sat: 9AM-12PM</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className='w-full text-cyan-800' />
            </div>
        </div>
    )
}

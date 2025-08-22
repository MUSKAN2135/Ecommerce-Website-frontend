import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaEye, FaEyeSlash, FaFile, FaKey, FaPhone, FaUser, FaHome } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../redux/userslice';

const Signup = () => {
  const [formData, setFormData] = useState({
    UserName: '',
    Email: '',
    Password: '',
    Phone: '',
    Address: '',
    Avatar: null,
    Role: 'User', // default role user
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isAdminSignup, setIsAdminSignup] = useState(false); // 👈 toggle admin/user
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.users);

  // handle input/file change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.entries({
        ...formData,
        Role: isAdminSignup ? "Admin" : "User", 
      }).forEach(([key, val]) => {
        if (val) formDataToSend.append(key, val);
      });
      await dispatch(signupUser(formDataToSend)).unwrap();
      toast.success("Signup successful!");
      navigate("/login");
    } catch (err) {
      console.error("Frontend signup error:", err);
      toast.error(err?.response?.data?.msg || "Failed to signup");
    }
  };

  return (
    <div className="border-t-8 border-[#0097b2] min-h-screen bg-gray-50 py-8 font-playfair">
      <div className="container mx-auto px-4">
        <button className="text-lg text-gray-600 mb-6 block">
          <Link to="/home" className="hover:text-[#0097b2] transition duration-200">Home</Link> /
          <Link to="/signup" className="text-[#0097b2] transition duration-200"> Signup</Link>
        </button>

        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-center text-3xl font-semibold mb-6 text-[#0097b2]">
            {isAdminSignup ? "Create Admin Account" : "Create an Account"}
          </h2>

          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Username */}
            <div>
              <label className="block font-medium mb-1 text-gray-700">UserName</label>
              <div className="flex">
                <span className="p-3 bg-[#0097b2] text-white rounded-l flex items-center"><FaUser /></span>
                <input
                  type="text"
                  name="UserName"
                  value={formData.UserName}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  required
                  className="w-full p-2 border border-[#0097b2] rounded-r focus:outline-none focus:ring-2 focus:ring-[#D9C2A7]"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium mb-1 text-gray-700">Email</label>
              <div className="flex">
                <span className="p-3 bg-[#0097b2] text-white rounded-l flex items-center"><FaEnvelope /></span>
                <input
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full p-2 border border-[#0097b2] rounded-r focus:outline-none focus:ring-2 focus:ring-[#D9C2A7]"
                />
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block font-medium mb-1 text-gray-700">Password</label>
              <div className="flex relative">
                <span className="p-3 bg-[#0097b2] text-white rounded-l flex items-center"><FaKey /></span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="Password"
                  value={formData.Password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full p-2 border border-[#0097b2] rounded-r focus:outline-none focus:ring-2 focus:ring-[#D9C2A7]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block font-medium mb-1 text-gray-700">Phone</label>
              <div className="flex">
                <span className="p-3 bg-[#0097b2] text-white rounded-l flex items-center"><FaPhone /></span>
                <input
                  type="tel"
                  name="Phone"
                  value={formData.Phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                  className="w-full p-2 border border-[#0097b2] rounded-r focus:outline-none focus:ring-2 focus:ring-[#D9C2A7]"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block font-medium mb-1 text-gray-700">Address</label>
              <div className="flex">
                <span className="p-3 bg-[#0097b2] text-white rounded-l flex items-center"><FaHome /></span>
                <input
                  type="text"
                  name="Address"
                  value={formData.Address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  required
                  className="w-full p-2 border border-[#0097b2] rounded-r focus:outline-none focus:ring-2 focus:ring-[#D9C2A7]"
                />
              </div>
            </div>

            {/* Avatar */}
            <div>
              <label className="block font-medium mb-1 text-gray-700">Avatar</label>
              <div className="flex">
                <span className="p-3 bg-[#0097b2] text-white rounded-l flex items-center"><FaFile /></span>
                <input
                  type="file"
                  name="Avatar"
                  onChange={handleChange}
                  accept="image/*"
                  className="w-full p-2 border border-[#0097b2] rounded-r focus:outline-none focus:ring-2 focus:ring-[#D9C2A7]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-center mt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full cursor-pointer bg-[#0097b2] text-white font-medium py-2 rounded-md hover:bg-[#D9C2A7] hover:text-white transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Loading...
                  </span>
                ) : (
                  isAdminSignup ? 'Signup as Admin' : 'Signup'
                )}
              </button>
            </div>
          </form>

          {/* toggle link */}
          <div className="text-center mt-6">
            <p
              className="cursor-pointer text-blue-600 underline hover:text-blue-800"
              onClick={() => setIsAdminSignup(!isAdminSignup)}
            >
              {isAdminSignup ? "Switch to User Signup" : "Admin Signup?"}
            </p>
          </div>

          <div className="text-center mt-6">
            Already have an account?
            <Link to="/login" className="text-[#D9C2A7] underline ml-1 hover:text-[#C1A88F] transition duration-200">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

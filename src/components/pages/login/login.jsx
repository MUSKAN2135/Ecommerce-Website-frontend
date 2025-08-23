import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaKey, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { loginUser } from "../../redux/userslice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [formData, setFormData] = useState({ Email: "", Password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.users);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(loginUser(formData)).unwrap();

      toast.success("Login successful!");

      // Navigate based on role
      if (res.user?.Role === "Admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(err || "Invalid credentials");
    }
  };

  return (
    <div className="border-t-8 border-[#0097b2] min-h-screen bg-gray-50 py-8 font-playfair">
      <button className="text-lg text-gray-600 mb-6 block">
        <Link to="/" className="hover:text-[#0097b2] transition duration-200">Home</Link> /
        <Link to="/login" className="text-[#0097b2] transition duration-200"> Login</Link>
      </button>
      <div className="flex flex-col items-center justify-center mt-24 px-4">
        <div className="md:w-96 w-full p-5 bg-white rounded-lg shadow-lg">
          <h2 className="mb-6 text-center text-2xl font-semibold">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label>Email</label>
              <div className="flex">
                <div className="p-3 bg-[#0097b2] text-white rounded-l">
                  <FaUser />
                </div>
                <input
                  type="email"
                  placeholder="Enter your Email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-[#0097b2] rounded-r"
                />
              </div>
            </div>
            <div className="mb-2 relative">
              <label>Password</label>
              <div className="flex">
                <div className="p-3 bg-[#0097b2] text-white rounded-l flex items-center">
                  <FaKey />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  name="Password"
                  value={formData.Password}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-[#0097b2]"
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3 py-2 cursor-pointer flex items-center"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0097b2] text-white py-2 rounded mt-5"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <div className="text-center mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 underline ml-1">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminNavbar from "../admin panel/adminbar";
import { deleteuser, getAllusers, updateuser } from "./userslice";
import { toast } from "react-toastify";
import { MdDeleteOutline } from "react-icons/md";
import { LuPencil } from "react-icons/lu";

const Users = () => {
    const dispatch = useDispatch();
    const { users = [], loading } = useSelector((state) => state.users);
    const [form, setForm] = useState({
        UserName: "",
        Email: "",
        Avatar: "",
        Phone: "",
    });
    const [showEditUser, setShowEditUser] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        dispatch(getAllusers());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "Avatar" && files && files.length > 0) {
            setForm((prev) => ({ ...prev, Avatar: files[0] }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                UserName: form.UserName,
                Email: form.Email,
                Phone: form.Phone,
            };
            await dispatch(updateuser({ id: form._id, data})).unwrap();
            toast.success("User updated successfully");
            setShowEditUser(false);
            setForm({ UserName: "", Email: "", Avatar: "", Phone: "" });
            dispatch(getAllusers());
        } catch (err) {
            console.error("Update user error:", err);
            toast.error(err?.response?.data?.msg || "Failed to update user");
        }
    };


    const handleEdit = (user) => {
        setForm({
            _id: user._id,
            UserName: user.UserName,
            Email: user.Email,
            Avatar: user.Avatar,
            Phone: user.Phone,
        });
        setShowEditUser(true);
    };

    const handleDelete = async (id) => {
        try {
            await dispatch(deleteuser(id)).unwrap();
            toast.success("User deleted successfully");
            dispatch(getAllusers());
        } catch (err) {
            toast.error(err?.response?.data?.msg || "Failed to delete user");
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <AdminNavbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <div
                className={`flex-1 mt-20 px-2 sm:px-4 transition-all duration-300 ${isMenuOpen ? "lg:ml-60" : "ml-0"
                    }`} >
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                    <h1 className="text-xl sm:text-2xl font-bold">All Users</h1>
                </div>

                {/* Table */}
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="overflow-x-auto bg-white shadow rounded-lg">
                        <table className="min-w-full text-left text-sm">
                            <thead className="bg-[#0097b2] text-white text-xs sm:text-sm">
                                <tr>
                                    <th className="px-2 sm:px-4 py-2 sm:py-3">Avatar</th>
                                    <th className="px-2 sm:px-4 py-2 sm:py-3">UserName</th>
                                    <th className="px-2 sm:px-4 py-2 sm:py-3">Email</th>
                                    <th className="px-2 sm:px-4 py-2 sm:py-3">Role</th>
                                    <th className="px-2 sm:px-4 py-2 sm:py-3">Phone</th>
                                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-xs sm:text-sm">
                                {users.map((user) => (
                                    <tr
                                        key={user._id}
                                        className="border-b hover:bg-gray-50 transition">
                                        <td className="px-2 sm:px-4 py-2">
                                            <img
                                                src={`http://localhost:3000${user.Avatar}`}
                                                alt="avatar"
                                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border"
                                            />
                                        </td>
                                        <td className="px-2 sm:px-4 py-2">{user.UserName}</td>
                                        <td className="px-2 sm:px-4 py-2">{user.Email}</td>
                                        <td className={`px-2 sm:px-4 py-2 ${user.Role === "Admin" ? "text-red-600 font-bold" : "text-green-600"}`}>
                                            {user.Role}
                                        </td>
                                        <td className="px-2 sm:px-4 py-2">{user.Phone}</td>
                                        <td className="px-2 sm:px-4 py-2 flex justify-center gap-2">
                                            <LuPencil
                                                onClick={() => handleEdit(user)}
                                                className="cursor-pointer text-lg sm:text-xl"
                                            />
                                            <MdDeleteOutline
                                                onClick={() => handleDelete(user._id)}
                                                className="cursor-pointer text-lg sm:text-xl"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Edit Form */}
                {showEditUser && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-2">
                        <div className="bg-white w-full max-w-lg md:max-w-2xl rounded shadow-lg p-4 sm:p-6">
                            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
                                Edit User
                            </h2>
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4" encType="multipart/form-data">
                                {/* Username */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">
                                        UserName
                                    </label>
                                    <input
                                        type="text"
                                        name="UserName"
                                        value={form.UserName}
                                        onChange={handleChange}
                                        placeholder="Enter username"
                                        required
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0097b2]"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="Email"
                                        value={form.Email}
                                        onChange={handleChange}
                                        placeholder="Enter email"
                                        required
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0097b2]"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        name="Phone"
                                        value={form.Phone}
                                        onChange={handleChange}
                                        placeholder="Enter phone number"
                                        required
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0097b2]"
                                    />
                                </div>

                                {/* Avatar */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">
                                        Avatar
                                    </label>
                                    <input
                                        type="file"
                                        name="Avatar"
                                        accept="image/*"
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0097b2]"
                                    />
                                </div>
                                {/* Buttons */}
                                <div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowEditUser(false)}
                                        className="px-3 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm sm:text-base">
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm sm:text-base">
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Users;

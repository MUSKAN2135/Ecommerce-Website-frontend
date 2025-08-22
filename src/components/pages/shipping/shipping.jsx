import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllshipping,
    createshipping,
    updateshipping,
    deleteshipping,
} from "../../redux/shippingslice";
import { FaTruck, FaEdit, FaTrash } from "react-icons/fa";

export default function Checkout() {
    const dispatch = useDispatch();
    const { shipping, loading, error } = useSelector((state) => state.shipping);

    const [formData, setFormData] = useState({});
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        dispatch(getAllshipping());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            dispatch(updateshipping({ id: editId, data: formData }));
        } else {
            dispatch(createshipping(formData));
        }
        setFormData({ name: "", address: "", city: "", postalCode: "", country: "" });
        setEditId(null);
    };

    const handleEdit = (item) => {
        setEditId(item._id);
        setFormData({
            name: item.name,
            address: item.address,
            city: item.city,
            postalCode: item.postalCode,
            country: item.country,
        });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this address?")) {
            dispatch(deleteshipping(id));
        }
    };

    return (
        <div className="p-6 min-h-screen bg-gradient-to-br from-cyan-50 to-cyan-100">
            <div className="flex items-center gap-2 mb-6">
                <FaTruck className="text-cyan-700 text-3xl" />
                <h1 className="text-3xl font-bold text-cyan-900">Manage Shipping</h1>
            </div>

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-2xl shadow-lg mb-8 border border-cyan-100"
            >
                <h2 className="text-lg font-semibold text-cyan-800 mb-4">
                    {editId ? "✏️ Update Address" : "➕ Add New Address"}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        value={formData.address}
                        onChange={(e) =>
                            setFormData({ ...formData, address: e.target.value })
                        }
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                        required
                    />
                    <input
                        type="text"
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Postal Code"
                        value={formData.postalCode}
                        onChange={(e) =>
                            setFormData({ ...formData, postalCode: e.target.value })
                        }
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Country"
                        value={formData.country}
                        onChange={(e) =>
                            setFormData({ ...formData, country: e.target.value })
                        }
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="mt-5 bg-cyan-600 hover:bg-cyan-800 text-white px-6 py-2 rounded-xl shadow transition-all"
                >
                    {editId ? "Update Address" : "Add Address"}
                </button>
            </form>

            {/* LIST */}
            {loading && <p className="text-cyan-700">Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            <div className="grid gap-4">
                {shipping.length === 0 && !loading ? (
                    <p className="text-gray-600 italic">No shipping addresses found.</p>
                ) : (
                    shipping.map((item) => (
                        <div
                            key={item._id}
                            className="flex justify-between items-center bg-white shadow-md p-5 rounded-xl border border-gray-200 hover:shadow-lg transition"
                        >
                            <div>
                                <p className="font-bold text-lg text-cyan-800">{item.name}</p>
                                <p className="text-gray-700">{item.address}</p>
                                <p className="text-sm text-gray-500">
                                    {item.city}, {item.postalCode}, {item.country}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="flex items-center gap-1 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition"
                                >
                                    <FaEdit /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="flex items-center gap-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                                >
                                    <FaTrash /> Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

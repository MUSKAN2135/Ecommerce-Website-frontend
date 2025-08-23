import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllshipping,
  getshippingById,
  createshipping,
  updateshipping,
  deleteshipping,
} from "../../redux/shippingslice";
import { FaTruck, FaEdit, FaTrash } from "react-icons/fa";
import Navbar from "../navbar/navbar";
import { toast } from "react-toastify";

export default function Checkout() {
  const dispatch = useDispatch();
  const { shipping, loading, error } = useSelector((state) => state.shipping);
  const { currentUser } = useSelector((state) => state.users);

  const initialForm = {
    name: "",
    state: "",
    city: "",
    street: "",
    phone: "",
    country: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [userShipping, setUserShipping] = useState([]);

  // Fetch all shipping addresses for current user
  useEffect(() => {
    if (currentUser) dispatch(getAllshipping());
  }, [dispatch, currentUser]);

  // Update local userShipping whenever Redux shipping changes
  useEffect(() => {
    if (currentUser) setUserShipping(shipping.filter(s => s.userId === currentUser._id));
  }, [shipping, currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return toast.error("Please login first.");

    const dataWithUser = { ...formData, userId: currentUser._id };

    try {
      if (editId) {
        await dispatch(updateshipping({ id: editId, data: dataWithUser })).unwrap();
        toast.success("Shipping updated successfully!");
      } else {
        await dispatch(createshipping(dataWithUser)).unwrap();
        toast.success("Shipping added successfully!");
      }
      setFormData(initialForm);
      setEditId(null);
      dispatch(getAllshipping());
    } catch (err) {
      toast.error(err?.message || "Something went wrong!");
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await dispatch(getshippingById(id)).unwrap();
      setEditId(res._id);
      setFormData({
        name: res.name || "",
        state: res.state || "",
        city: res.city || "",
        street: res.street || "",
        phone: res.phone || "",
        country: res.country || "",
      });
    } catch (err) {
      toast.error(err?.message || "Failed to fetch address!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await dispatch(deleteshipping(id)).unwrap();
        toast.success("Shipping deleted successfully!");
        dispatch(getAllshipping());
      } catch (err) {
        toast.error(err?.message || "Delete failed!");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-4 md:p-6 min-h-screen mt-33">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-6">
          <FaTruck className="text-[#0097b2] text-3xl" />
          <h1 className="text-3xl font-bold text-[#0097b2]">Manage Shipping</h1>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 md:p-6 rounded-2xl shadow-lg mb-8 border border-[#0097b2]/30"
        >
          <h2 className="text-lg md:text-xl font-semibold text-[#0097b2] mb-4">
            {editId ? "Update Address" : "Add New Address"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["name", "phone", "state", "city", "street", "country"].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field] || ""}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                className="p-3 border border-[#0097b2]/50 rounded-lg focus:ring-2 focus:ring-[#0097b2] outline-none"
                required
              />
            ))}
          </div>
          <button
            type="submit"
            className="mt-5 w-full sm:w-auto bg-[#0097b2] hover:bg-[#007a8c] text-white px-6 py-2 rounded-2xl shadow transition-all"
          >
            {editId ? "Update Address" : "Add Address"}
          </button>
        </form>

        {/* LIST */}
        {loading && <p className="text-[#0097b2]">Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        <div className="grid gap-4">
          {userShipping.length === 0 && !loading ? (
            <p className="text-gray-600 italic">No shipping addresses found</p>
          ) : (
            userShipping.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white shadow-md p-5 rounded-2xl border border-[#0097b2]/20 hover:shadow-lg transition"
              >
                <div className="mb-3 sm:mb-0">
                  <p className="font-bold text-lg text-[#0097b2]">{item.name}</p>
                  <p className="text-gray-700">{item.state}</p>
                  <p className="text-sm text-gray-500">
                    {item.city}, {item.street}, {item.country}
                  </p>
                  <p className="text-gray-700">{item.phone}</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleEdit(item._id)}
                    className="flex items-center gap-1 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl transition"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex items-center gap-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

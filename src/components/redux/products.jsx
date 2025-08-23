import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "./productslice";
import AdminNavbar from "../admin panel/adminbar";
import { LuPencil } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";

const Products = () => {
    const dispatch = useDispatch();
    const { products = [], loading } = useSelector((state) => state.products);
    const [form, setForm] = useState({ Name: "", description: "", image: null, price: "", review: "", category: "" });
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    const handleChange = (e) => {
        if (e.target.name === "image") {
            setForm({ ...form, image: e.target.files[0] });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(form).forEach((key) => formData.append(key, form[key]));
        if (form._id) {
            dispatch(updateProduct({ id: form._id, data: formData }))
                .unwrap()
            try {
                toast.success("Product updated successfully")
            }
            catch (err) {
                toast.error(err.message || "Update failed")
            }
        } else {
            dispatch(createProduct(formData))
                .unwrap()
            try {
                toast.success("Product added successfully")
            }
            catch {
                toast.error(err.message || "Add failed")
            }
        }

        setForm({ Name: "", description: "", image: null, price: "", review: "", category: "" });
        setShowAddProduct(false);
    };

    const handleEdit = (product) => {
        setForm({
            _id: product._id,
            Name: product.Name || "",
            description: product.description || "",
            image: null,
            price: product.price || "",
            review: product.review || "",
            category: product.category || "",
        });
        setShowAddProduct(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(deleteProduct(id)).unwrap()
            try {
                toast.success("Product deleted successfully")
            }
            catch (err) {
                toast.error(err.message || "Delete failed")
            }
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <AdminNavbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <div className={`flex-1 p-6 transition-all duration-300 ${isMenuOpen ? "sm:ml-60" : "ml-0"}`}>
                <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                    <h1 className="text-3xl font-bold text-gray-800">Product Dashboard</h1>
                    <button
                        onClick={() => {
                            setForm({ Name: "", description: "", image: null, price: "", review: "", category: "" });
                            setShowAddProduct(true);
                        }}
                        className="px-5 py-2 bg-[#0097b2] text-white rounded-md hover:bg-[#007a92] transition"
                    >
                        Add Product
                    </button>
                </div>

                {loading ? (
                    <p className="text-center text-gray-500 mt-20">Loading products...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2 sm:px-8">
                        {products.map((product) => (
                            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                                {product.image && (
                                    <img src={`http://localhost:3000${product.image}`} alt={product.Name} className="w-full h-48 object-cover" />
                                )}
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold text-gray-800">{product.Name}</h2>
                                    <p className="text-gray-600 font-medium mt-1">${product.price}</p>
                                    <p className="text-gray-500 mt-2 line-clamp-3">{product.description}</p>
                                    <div className="flex justify-end gap-3 mt-4">
                                        <LuPencil
                                            onClick={() => handleEdit(product)}
                                            className="text-blue-600 cursor-pointer hover:text-blue-800"
                                        />
                                        <MdDeleteOutline
                                            onClick={() => handleDelete(product._id)}
                                            className="text-red-600 cursor-pointer hover:text-red-800"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {showAddProduct && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                            <h2 className="text-xl font-bold mb-4">{form._id ? "Edit Product" : "Add Product"}</h2>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <input type="text" name="Name" placeholder="Name" value={form.Name} onChange={handleChange} className="border px-3 py-2 rounded" required />
                                <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} className="border px-3 py-2 rounded" required />
                                <input type="file" name="image" onChange={handleChange} className="border px-3 py-2 rounded" accept="image/*" />
                                <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} className="border px-3 py-2 rounded" />
                                <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border px-3 py-2 rounded" />
                                <div className="flex justify-end gap-3 mt-4">
                                    <button type="button" onClick={() => setShowAddProduct(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-200 transition">Cancel</button>
                                    <button type="submit" className="px-4 py-2 bg-[#0097b2] text-white rounded hover:bg-[#007a92] transition">{form._id ? "Update" : "Add"}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;

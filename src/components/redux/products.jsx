import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, deleteProduct, getAllProducts, updateProduct, } from "./productslice";
import AdminNavbar from "../admin panel/adminbar";
import { Link, useParams } from "react-router-dom";
import { LuPencil } from "react-icons/lu";
import { MdDeleteForever, MdDeleteOutline } from "react-icons/md";

const Products = () => {
    const dispatch = useDispatch();
    const { products = [], loading } = useSelector((state) => state.products);
    const [form, setForm] = useState({
        Name: "",
        description: "",
        image: null,
        price: "",
        review: "",
        category: "",
    });
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    const handleChange = (e) => {
        if (e.target.name === "image") {
            // file upload
            setForm({ ...form, image: e.target.files[0] });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (form._id) {
            dispatch(updateProduct({ id: form._id, data: formData }));
        } else {
            dispatch(createProduct(formData));
        }

        setForm({
            Name: "",
            description: "",
            image: null,
            price: "",
            review: "",
            category: "",
        });
        setShowAddProduct(false);
    };

    const handleEdit = (product) => {
        setForm({
            _id: product._id,
            Name: product.Name || "",
            description: product.description || "",
            image: null, // file nahi set hoti edit me
            price: product.price || "",
            review: product.review || "",
            category: product.category || "",
        });
        setShowAddProduct(true);
    };

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    };

    return (
        <div className="flex h-screen">
            <AdminNavbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <div
                className={`flex-1 m-4 sm:m-10 transition-all duration-300 ${isMenuOpen ? "sm:ml-60" : "ml-0"}`} >
                <h1 className="text-2xl font-bold mb-6">Product Dashboard</h1>
                <button
                    onClick={() => {
                        setForm({
                            Name: "",
                            description: "",
                            image: null,
                            price: "",
                            review: "",
                            category: "",
                        });
                        setShowAddProduct(true);
                    }}
                    className='w-40 rounded-md flex items-center justify-center p-3  bg-[#0097b2] hover:bg-[transparent] hover:border hover:border-[#0097b2] m-2'>
                    Add Product
                </button>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div key={product._id} className="border p-4 rounded shadow">
                                {product.image && (
                                    <img
                                        src={product.image}
                                        alt={product.Name}
                                        className="w-full h-48 object-contain mb-3"
                                    />
                                )}
                                <h2 className="font-semibold text-lg">{product.Name}</h2>
                                <p className="text-gray-600">${product.price}</p>
                                {/* <div className="flex justify-between">
                                    <p className="text-gray-600">{product.category}</p>
                                    <p className="text-gray-600">{product.review} reviews</p>
                                </div> */}
                                <p className="text-gray-600">{product.description}</p>
                                <div className="mt-3 flex justify-between gap-4">
                                    <LuPencil
                                        onClick={() => handleEdit(product)}
                                        className="text-blue-500 cursor-pointer" />
                                    <MdDeleteOutline
                                        onClick={() => handleDelete(product._id)}
                                        className="text-red-500 cursor-pointer" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {showAddProduct && (
                    <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md">
                            <h2 className="text-xl font-bold mb-4">
                                {form._id ? "Edit Product" : "Add Product"}
                            </h2>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    name="Name"
                                    placeholder="Name"
                                    value={form.Name}
                                    onChange={handleChange}
                                    className="border px-3 py-2 rounded"
                                    required
                                />
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Price"
                                    value={form.price}
                                    onChange={handleChange}
                                    className="border px-3 py-2 rounded"
                                    required />
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleChange}
                                    className="border px-3 py-2 rounded"
                                    accept="image/*" />
                                <input
                                    type="text"
                                    name="category"
                                    placeholder="Category"
                                    value={form.category}
                                    onChange={handleChange}
                                    className="border px-3 py-2 rounded" />
                                <textarea
                                    name="description"
                                    placeholder="Description"
                                    value={form.description}
                                    onChange={handleChange}
                                    className="border px-3 py-2 rounded" />
                                <div className="flex justify-end gap-4 mt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddProduct(false)}
                                        className='w-40 rounded-md flex items-center justify-center p-3  bg-gray-300 hover:bg-gray-200 hover:border hover:border-[#0097b2] m-2'>                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className='w-40 rounded-md flex items-center justify-center p-3  bg-[#0097b2] hover:bg-[transparent] hover:border hover:border-[#0097b2] m-2'>
                                        {form._id ? "Update" : "Add"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};

export default Products;

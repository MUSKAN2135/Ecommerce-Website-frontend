import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllorders, updateOrder, deleteOrder } from './ordersslice';
import AdminNavbar from '../admin panel/adminbar';
import { MdDeleteOutline } from 'react-icons/md';

export const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    dispatch(getAllorders());
  }, [dispatch]);

  const handleStatusUpdate = (order) => {
    const newStatus = order.status === 'Delivered' ? 'Pending' : 'Delivered';
    dispatch(updateOrder({ id: order._id, data: { status: newStatus } }));
  };

  const openDeleteModal = (id) => {
    setSelectedOrderId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteOrder(selectedOrderId));
    setShowDeleteModal(false);
    setSelectedOrderId(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedOrderId(null);
  };

  return (
    <div className='flex flex-col md:flex-row min-h-screen bg-gray-50'>
      <AdminNavbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className={`flex-1 p-4 md:p-6 transition-all duration-300 ${isMenuOpen ? 'md:ml-60' : 'ml-0'}`}>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Orders</h2>

        {loading && <p className="text-gray-500">Loading orders...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        <div className="overflow-x-auto shadow rounded-lg bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr className="text-left text-sm uppercase font-medium text-gray-600">
                <th className="px-4 py-3 border">Order ID</th>
                <th className="px-4 py-3 border">User</th>
                <th className="px-4 py-3 border">Total</th>
                <th className="px-4 py-3 border">Status</th>
                <th className="px-4 py-3 border">Date</th>
                <th className="px-4 py-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders?.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border text-sm font-medium text-gray-700">{order._id}</td>
                    <td className="px-4 py-3 border text-sm text-gray-600">
                      {order.userName || order.user?.name || 'N/A'}
                    </td>
                    <td className="px-4 py-3 border text-sm text-gray-600">${order.total}</td>
                    <td className="px-4 py-3 border text-sm">
                      <button
                        onClick={() => handleStatusUpdate(order)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-200 ${
                          order.status === 'Delivered'
                            ? 'bg-green-200 text-green-800 hover:bg-green-300'
                            : 'bg-yellow-200 text-yellow-800 hover:bg-yellow-300'
                        }`}
                      >
                        {order.status || 'Pending'}
                      </button>
                    </td>
                    <td className="px-4 py-3 border text-sm text-gray-600">
                      {new Date(order.createdAt || order.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 border text-center">
                      <MdDeleteOutline
                        onClick={() => openDeleteModal(order._id)}
                        className="mx-auto text-red-500 cursor-pointer text-lg hover:text-red-700 transition-colors duration-200"
                        title="Delete Order"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 py-6">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this order?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

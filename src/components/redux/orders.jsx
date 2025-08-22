import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from './ordersslice';
import { Link } from 'react-router-dom';
import AdminNavbar from './adminbar';

const Orders = () => {
  const dispatch = useDispatch();
  const { list: orders, loading, error } = useSelector((state) => state.orders);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className='flex h-full'>
      <AdminNavbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className={`flex-1 m-5 transition-all duration-300 ${isMenuOpen ? 'ml-60' : 'ml-5'}`}>
        <h2 className="text-2xl font-semibold mb-4">Orders</h2>
        {loading && <p className="text-gray-500">Loading orders...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 text-left text-sm uppercase font-medium text-gray-600">
                <th className="px-4 py-2 border">Order ID</th>
                <th className="px-4 py-2 border">User</th>
                <th className="px-4 py-2 border">Total</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders?.length > 0 ? (
                orders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{order.id}</td>
                    <td className="px-4 py-2 border">{order.user }</td>
                    <td className="px-4 py-2 border">${order.total}</td>
                    <td className="px-4 py-2 border">
                      <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs">
                        {order.status || 'Delivered'}
                      </span>
                    </td>
                    <td className="px-4 py-2 border">
                      {order.date || new Date().toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-4">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;

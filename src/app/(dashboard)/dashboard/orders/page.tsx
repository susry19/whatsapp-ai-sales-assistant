"use client";

import { useState, useEffect } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then(res => res.json())
      .then(data => {
        if (data.orders) setOrders(data.orders);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
              <tr>
                <th scope="col" className="px-6 py-3">Order ID</th>
                <th scope="col" className="px-6 py-3">Customer</th>
                <th scope="col" className="px-6 py-3">Total Amount</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-4 text-center">Loading...</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-4 text-center">No orders found.</td></tr>
              ) : (
                orders.map((o) => (
                  <tr key={o.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{o.id.slice(0,8)}</td>
                    <td className="px-6 py-4">{o.customer?.name || o.customer?.phone}</td>
                    <td className="px-6 py-4">${o.totalAmount}</td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold">{o.status}</span>
                    </td>
                    <td className="px-6 py-4">{new Date(o.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

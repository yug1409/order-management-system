import { useEffect, useState } from "react";
import { getOrders, updateStatus } from "../api/adminApi";

const statuses = [
  "Order Received",
  "Preparing",
  "Out for Delivery",
  "Delivered",
];

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  //  fetch orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await getOrders();
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  //  update status (instant UI update + API call)
  const handleChange = async (id, status) => {
    try {
      // optimistic UI update (feels faster)
      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, status } : o
        )
      );

      await updateStatus(id, status);
    } catch (err) {
      console.error("Status update failed:", err);
      fetchOrders(); // fallback
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-lg">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Admin Panel
      </h1>

      <table className="w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Customer</th>
            <th className="p-3 border">Phone</th>
            <th className="p-3 border">Address</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Update</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="text-center border-t">
              <td className="p-3 border">
                {order.customerName}
              </td>

              <td className="p-3 border">
                {order.phone}
              </td>

              <td className="p-3 border">
                {order.address}
              </td>

              <td className="p-3 border font-medium">
                {order.status}
              </td>

              <td className="p-3 border">
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleChange(order._id, e.target.value)
                  }
                  className="border px-2 py-1 rounded"
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

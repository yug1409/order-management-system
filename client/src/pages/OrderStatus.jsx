import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import socket from "../socket";

export default function OrderStatus() {
  const { id } = useParams();

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`/orders/${id}`);
        setStatus(res.data.status);
      } catch (err) {
        console.error("Failed to fetch order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();

    const handleStatusUpdate = (data) => {
      if (data.orderId === id) {
        setStatus(data.status);
      }
    };

    socket.on("orderStatus", handleStatusUpdate);

    return () => {
      socket.off("orderStatus", handleStatusUpdate);
    };
  }, [id]);

  if (loading) return <p className="p-6">Loading order status...</p>;

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Order Status</h1>

      <p className="text-xl font-semibold text-green-600">{status}</p>

      <p className="text-gray-500 mt-2">
        You will receive live updates here.
      </p>
    </div>
  );
}

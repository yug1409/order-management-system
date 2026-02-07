import axios from "./axios";

export const getOrders = () => axios.get("/admin/orders");

export const updateStatus = (id, status) =>
  axios.patch(`/admin/orders/${id}/status`, { status });

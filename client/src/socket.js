import { io } from "socket.io-client";

const socket = io("https://order-management-system-1-whdy.onrender.com", {
  transports: ["websocket"],
});

export default socket;

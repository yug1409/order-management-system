import "dotenv/config";
import http from "http";
import app from "./app.js";
import connectDB from "./config/db.js";
import { initSocket } from "./sockets/order.socket.js";

const start = async () => {
  await connectDB();

  const server = http.createServer(app);

  initSocket(server);

  server.listen(process.env.PORT || 5000, () =>
    console.log("Server running")
  );
};

start();

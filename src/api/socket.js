import { io } from "socket.io-client";

// Initialize socket connection
const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:4000", {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Socket connection event handlers
socket.on("connect", () => {
  console.log("Socket connected successfully");
});

socket.on("disconnect", () => {
  console.log("Socket disconnected");
});

socket.on("connect_error", (error) => {
  console.error("Socket connection error:", error);
});

export default socket;

const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      credentials: true,
    },
  });
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("Auth required"));
    try {
      const secret = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;
      const decoded = jwt.verify(token, secret);
      socket.userId = decoded.id; // payload-i perdor `id`
      next();
    } catch {
      return next(new Error("Invalid token"));
    }
  });
  io.on("connection", (socket) => {
    socket.join(`user_${socket.userId}`);
    socket.on("disconnect", () => {});
  });
  return io;
};
const getIO = () => {
  if (!io) throw new Error("Socket.IO not initialized");
  return io;
};
const sendNotification = (userId, data) => {
  if (io) io.to(`user_${userId}`).emit("notification", data);
};
module.exports = { initSocket, getIO, sendNotification };
    
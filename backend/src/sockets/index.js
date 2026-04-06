const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
let io;

const initSocket = (server) => {
    io = new Server(server, { cors: { origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true } });
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) return next(new Error('Auth required'));
        try { socket.userId = jwt.verify(token, process.env.JWT_ACCESS_SECRET).userId; next(); }
        catch { return next(new Error('Invalid token')); }
    });
    io.on('connection', (socket) => {
        socket.join(`user_${socket.userId}`);
        socket.on('disconnect', () => {});
    });
    return io;
};
const getIO = () => { if (!io) throw new Error('Socket.IO not initialized'); return io; };
const sendNotification = (userId, data) => { if (io) io.to(`user_${userId}`).emit('notification', data); };
module.exports = { initSocket, getIO, sendNotification };

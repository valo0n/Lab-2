const { prisma } = require("../config/database");
const { sendNotification } = require("../sockets");

module.exports = {
  // Krijon njoftim në DB dhe e dërgon live përmes Socket.IO te përdoruesi
  notify: async (userId, { type = "info", title, message = null }) => {
    const notification = await prisma.notification.create({
      data: { user_id: userId, type, title, message },
    });
    try {
      sendNotification(userId, notification); // emit real-time
    } catch (_) {
      // nëse socket s'është gati, njoftimi prapë ruhet në DB
    }
    return notification;
  },
};

const app = require("./src/app");
const http = require("http");
const { initSocket } = require("./src/sockets");
const { connectDB } = require("./src/config/database");
const connectMongoDB = require("./src/config/mongodb");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

initSocket(server);

const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MySQL connected");

    await connectMongoDB();
    console.log("✅ MongoDB connected");

    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

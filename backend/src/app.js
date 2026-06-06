const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Routes
const routes = require("./routes");
app.use("/api", routes);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Serve frontend static files (if frontend build exists) so client routes like
// /signin and /signup work when the app is hosted from the same server.
const fs = require("fs");
const frontendDist = path.join(__dirname, "..", "..", "frontend", "dist");
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get("*", (req, res, next) => {
    // don't interfere with API routes
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(frontendDist, "index.html"));
  });
} else {
  // Pa build frontend-i: te '/' shfaq nje mesazh qe backend-i po punon
  app.get("/", (req, res) => {
    res.json({
      status: "OK",
      message: "Clicon backend is running 🚀",
      health: "/api/health",
    });
  });
}

// Error handling
const { errorHandler, notFound } = require("./middleware/errorHandler");
app.use(notFound);
app.use(errorHandler);

module.exports = app;

const jwt = require("jsonwebtoken");
const { prisma } = require("../config/database");

const accessTokenSecret = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(401).json({ message: "Access denied. No token." });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, accessTokenSecret);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        avatar_url: true,
        is_active: true,
      },
    });

    if (!user || !user.is_active)
      return res
        .status(401)
        .json({ message: "User not found or deactivated." });

    req.user = user;
    req.userId = user.id;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError")
      return res
        .status(401)
        .json({ message: "Token expired.", code: "TOKEN_EXPIRED" });
    return res.status(401).json({ message: "Invalid token." });
  }
};

const authorize =
  (...requiredPermissions) =>
  async (req, res, next) => {
    try {
      if (!req.user)
        return res.status(401).json({ message: "Authentication required." });

      // Get user's permissions through roles
      const userRoles = await prisma.userRole.findMany({
        where: { user_id: req.user.id },
        include: {
          role: {
            include: {
              role_permissions: {
                include: { permission: true },
              },
            },
          },
        },
      });

      const userPermissions = new Set();
      userRoles.forEach((ur) => {
        ur.role.role_permissions.forEach((rp) => {
          userPermissions.add(rp.permission.name);
        });
      });

      if (!requiredPermissions.some((p) => userPermissions.has(p)))
        return res.status(403).json({ message: "Insufficient permissions." });

      req.userPermissions = userPermissions;
      next();
    } catch (error) {
      return res.status(500).json({ message: "Authorization failed." });
    }
  };

module.exports = { auth, authorize };

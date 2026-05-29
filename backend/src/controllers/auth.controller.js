const { prisma } = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  // POST /api/auth/register
  register: async (req, res, next) => {
    try {
      const { name, first_name, last_name, email, password } = req.body;

      // Lejojme ose "name" te plote ose first_name + last_name
      let fName = first_name;
      let lName = last_name;
      if (!fName && name) {
        const parts = name.trim().split(" ");
        fName = parts[0];
        lName = parts.slice(1).join(" ") || "-";
      }

      if (!email || !password) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Email dhe password jane te detyrueshme",
          });
      }

      // Check nese ekziston
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        return res
          .status(400)
          .json({ success: false, message: "Email tashme ekziston" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Krijo user
      const user = await prisma.user.create({
        data: {
          first_name: fName || "User",
          last_name: lName || "-",
          email,
          password_hash: hashedPassword,
          is_active: true,
        },
      });

      // Assign role "customer" (role_id = 2)
      await prisma.userRole.create({
        data: { user_id: user.id, role_id: 2 },
      });

      // Generate token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
      );

      res.status(201).json({
        success: true,
        message: "Llogaria u krijua me sukses",
        data: {
          user: {
            id: user.id,
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
          },
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/auth/login
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Email dhe password jane te detyrueshme",
          });
      }

      // Gjej userin
      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          user_roles: { include: { role: true } },
        },
      });

      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Email ose password gabim" });
      }

      // Kontrollo password (fusha eshte password_hash)
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res
          .status(401)
          .json({ success: false, message: "Email ose password gabim" });
      }

      // Merr rolet
      const roles = user.user_roles.map((ur) => ur.role.name);

      // Generate token
      const token = jwt.sign(
        { id: user.id, email: user.email, roles },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
      );

      res.json({
        success: true,
        message: "Login me sukses",
        data: {
          user: {
            id: user.id,
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            roles,
          },
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // POST /api/auth/refresh
  refreshToken: async (req, res, next) => {
    res.json({ message: "TODO: refresh" });
  },

  // POST /api/auth/logout
  logout: async (req, res, next) => {
    res.json({ success: true, message: "Logged out" });
  },
};

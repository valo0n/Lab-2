const { prisma } = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthChallenge = require("../models/nosql/AuthChallenge");

const accessTokenSecret =
  process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;
const challengeExpiryMs = 15 * 60 * 1000;

const createChallengeCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const createChallenge = async ({ userId, email, type }) => {
  const code = createChallengeCode();
  const codeHash = await bcrypt.hash(code, 10);

  await AuthChallenge.deleteMany({ email, type, used_at: null });
  await AuthChallenge.create({
    user_id: userId,
    email: email.toLowerCase(),
    type,
    code_hash: codeHash,
    expires_at: new Date(Date.now() + challengeExpiryMs),
  });

  return code;
};

const verifyChallenge = async ({ email, type, code }) => {
  const challenge = await AuthChallenge.findOne({
    email: email.toLowerCase(),
    type,
    used_at: null,
    expires_at: { $gt: new Date() },
  }).sort({ createdAt: -1 });

  if (!challenge) return null;

  const isMatch = await bcrypt.compare(code, challenge.code_hash);
  if (!isMatch) return null;

  challenge.used_at = new Date();
  await challenge.save();
  return challenge;
};

const devChallengeCode = (code) =>
  process.env.NODE_ENV === "development" ? { code } : {};

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
        return res.status(400).json({
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
          email_verified_at: null,
        },
      });

      // Assign role "customer" (role_id = 2)
      await prisma.userRole.create({
        data: { user_id: user.id, role_id: 2 },
      });

      const verificationCode = await createChallenge({
        userId: user.id,
        email: user.email,
        type: "email_verification",
      });

      // Generate token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        accessTokenSecret,
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
          ...devChallengeCode(verificationCode),
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
        return res.status(400).json({
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
        accessTokenSecret,
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
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          message: "Refresh token eshte i detyrueshem",
        });
      }

      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const token = jwt.sign(
        { id: decoded.id, email: decoded.email },
        accessTokenSecret,
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
      );

      res.json({ success: true, data: { token } });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Refresh token i pavlefshem",
      });
    }
  },

  // POST /api/auth/logout
  logout: async (req, res, next) => {
    res.json({ success: true, message: "Logged out" });
  },

  requestPasswordReset: async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });

      if (user) {
        const resetCode = await createChallenge({
          userId: user.id,
          email: user.email,
          type: "password_reset",
        });

        return res.json({
          success: true,
          message: "Nese email-i ekziston, kodi i resetimit u krijua",
          data: { ...devChallengeCode(resetCode) },
        });
      }

      res.json({
        success: true,
        message: "Nese email-i ekziston, kodi i resetimit u krijua",
      });
    } catch (error) {
      next(error);
    }
  },

  resetPassword: async (req, res, next) => {
    try {
      const { email, code, password } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Useri nuk u gjet",
        });
      }

      const challenge = await verifyChallenge({
        email,
        type: "password_reset",
        code,
      });

      if (!challenge) {
        return res.status(400).json({
          success: false,
          message: "Kodi i resetimit eshte i pavlefshem ose ka skaduar",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.update({
        where: { id: user.id },
        data: { password_hash: hashedPassword },
      });

      res.json({
        success: true,
        message: "Password u ndryshua me sukses",
      });
    } catch (error) {
      next(error);
    }
  },

  requestEmailVerification: async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });

      if (user) {
        const verificationCode = await createChallenge({
          userId: user.id,
          email: user.email,
          type: "email_verification",
        });

        return res.json({
          success: true,
          message: "Kodi i verifikimit u krijua",
          data: { ...devChallengeCode(verificationCode) },
        });
      }

      res.json({
        success: true,
        message: "Kodi i verifikimit u krijua",
      });
    } catch (error) {
      next(error);
    }
  },

  verifyEmail: async (req, res, next) => {
    try {
      const { email, code } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Useri nuk u gjet",
        });
      }

      const challenge = await verifyChallenge({
        email,
        type: "email_verification",
        code,
      });

      if (!challenge) {
        return res.status(400).json({
          success: false,
          message: "Kodi i verifikimit eshte i pavlefshem ose ka skaduar",
        });
      }

      await prisma.user.update({
        where: { id: user.id },
        data: { email_verified_at: new Date() },
      });

      res.json({
        success: true,
        message: "Email u verifikua me sukses",
      });
    } catch (error) {
      next(error);
    }
  },
};

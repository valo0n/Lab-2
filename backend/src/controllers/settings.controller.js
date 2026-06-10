const { prisma } = require("../config/database");

module.exports = {
  // GET /api/settings — të gjitha konfigurimet
  getAll: async (req, res, next) => {
    try {
      const settings = await prisma.setting.findMany({
        orderBy: { key_name: "asc" },
      });
      res.json({ success: true, data: settings });
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/settings/:key — përditëso vlerën e një setting-u
  update: async (req, res, next) => {
    try {
      const { key } = req.params;
      const { value } = req.body;
      const setting = await prisma.setting.update({
        where: { key_name: key },
        data: { value: String(value ?? "") },
      });
      res.json({ success: true, data: setting });
    } catch (error) {
      next(error);
    }
  },
};

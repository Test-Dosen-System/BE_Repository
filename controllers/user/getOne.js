const { User } = require("../../models");

module.exports = {
  getOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      const exist = await User.findOne({ where: { id } });

      if (!exist) {
        return res.status(404).json({
          status: false,
          message: "data not found",
        });
      }

      return res.status(200).json({
        status: true,
        message: "get data successful",
        data: {
          id: exist.id,
          name: exist.name,
          username: exist.username,
          email: exist.email,
          roles: exist.roles,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};

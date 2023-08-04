const { User } = require("../../models");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const sqlOptions = {
        attributes: ["id", "name", "email", "username", "roles"],
      };
      const exist = await User.findAll(sqlOptions);

      if (!exist) {
        return res.status(404).json({
          status: false,
          message: "data not found",
        });
      }

      return res.status(200).json({
        status: true,
        message: "get data successful",
        data: exist,
      });
    } catch (error) {
      next(error);
    }
  },
};

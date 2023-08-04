const { Soal } = require("../../models");

module.exports = {
  getOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      const exist = await Soal.findOne({ where: { id } });

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

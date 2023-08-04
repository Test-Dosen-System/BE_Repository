const { Soal } = require("../../models");

module.exports = {
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const exist = await Soal.findOne({ where: { id } });

      if (!exist) {
        return res.status(404).json({
          status: false,
          message: "data not found",
        });
      }

      const deleted = await Soal.destroy(
        {
          id,
        },
        { where: { id } }
      );

      return res.status(200).json({
        status: true,
        message: "delete data successful",
        data: deleted,
      });
    } catch (error) {
      next(error);
    }
  },
};

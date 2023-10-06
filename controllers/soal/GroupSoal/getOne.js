const { Groupsoal } = require("../../../models");

module.exports = {
  getOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await Groupsoal.findOne({ where: { id } });

      if (!data) {
        return res.status(404).json({
          status: false,
          message: "data not found",
        });
      }

      return res.status(200).json({
        status: true,
        message: "get data successful",
        data: {
          id: data.id,
          soal_panjang: data.soal_panjang,
          files: data.files,
          files2: data.files2,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};

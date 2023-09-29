const { Groupsoal } = require("../../../models");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const data = await Groupsoal.findAll();

      if (!data) {
        return res.status(404).json({
          status: false,
          message: "Data not found",
        });
      }

      return res.status(200).json({
        status: true,
        message: "Get data successful",
        data: {
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

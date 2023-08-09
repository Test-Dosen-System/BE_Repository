const { Soal } = require("../../models");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const sqlOptions = {
        attributes: [
          "id",
          "soal",
          "file",
          "jawaban_a",
          "jawaban_b",
          "jawaban_c",
          "jawaban_d",
          "jawaban_e",
          "jawaban_benar",
          "kategori_soal",
          "jenis_soal",
          "user_id",
        ],
      };
      const exist = await Soal.findAll(sqlOptions);

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

const { Groupsoal } = require("../../../models");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const data = await Groupsoal.findAll();

      if (data.length === 0) {
        return res.status(404).json({
          status: false,
          message: "Data not found",
        });
      }

      const resultData = data.map((item) => {
        const result = {
          id: item.id,
          soal_panjang: item.soal_panjang,
          files: item.files,
          files2: item.files2,
        };
        return result;
      });

      return res.status(200).json({
        status: true,
        message: "Get data successful",
        data: resultData,
      });
    } catch (error) {
      next(error);
    }
  },
};

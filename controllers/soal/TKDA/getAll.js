const { Soal, User } = require("../../../models");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const { kategori_soal = "TKDA" } = req.query;
      const data = await Soal.findAll({
        where: { kategori_soal },
        include: [{ model: User, as: "user" }],
      });

      if (!data) {
        return res.status(404).json({
          status: false,
          message: "data not found!",
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "get data successful",
        data: data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

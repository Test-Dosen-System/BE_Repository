const { Groupsoal } = require("../../../models");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

module.exports = {
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { soal_panjang } = req.body;
      const files = req.files["files"];
      const files2 = req.files["files2"];

      const findSoal = await Groupsoal.findOne({ where: { id } });

      if (!findSoal) {
        return res.status(404).json({
          status: false,
          message: "soal not found",
        });
      }

      const fileName1 = files[0].path.split("\\").pop().split("/").pop();
      const resultFileName1 = `http://${req.get(
        "host"
      )}/public/images/${fileName1}`;

      const fileName2 = files2[0].path.split("\\").pop().split("/").pop();
      const resultFileName2 = `http://${req.get(
        "host"
      )}/public/images/${fileName2}`;

      const updated = await Groupsoal.update(
        {
          soal_panjang,
          files: resultFileName1,
          files2: resultFileName2,
        },
        { where: { id } }
      );

      return res.status(200).json({
        status: true,
        message: "update successful",
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  },
};

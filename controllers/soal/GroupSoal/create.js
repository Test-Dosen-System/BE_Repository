const { Groupsoal } = require("../../../models");
const validator = require("fastest-validator");
const v = new validator();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

module.exports = {
  createGroupSoal: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split("Bearer ")[1];

      const verify = jwt.verify(token, JWT_SECRET);

      const { soal_panjang } = req.body;
      const files = req.files["files"];
      const files2 = req.files["files2"];

      const findSoal = await Groupsoal.findOne({ where: { soal_panjang } });

      if (findSoal) {
        return res.status(409).json({
          status: false,
          message: "soal already exist",
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

      const created = await Groupsoal.create({
        soal_panjang,
        files: resultFileName1,
        files2: resultFileName2,
      });

      return res.status(200).json({
        status: true,
        message: "group soal created successfully",
        data: {
          soal_panjang: created.soal_panjang,
          files: created.files,
          files2: created.files2,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};

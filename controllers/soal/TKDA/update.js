const { Soal } = require("../../../models");
const jwt = require("jsonwebtoken");
const validator = require("fastest-validator");
const v = new validator();
const { JWT_SECRET } = process.env;

module.exports = {
  updateSoal: async (req, res, next) => {
    try {
      const schema = {
        soal: "string",
        jawaban_a: "string",
        jawaban_b: "string",
        jawaban_c: "string",
        jawaban_d: "string",
        jawaban_e: "string|optional",
        jawaban_benar: "string",
        skor: "integer",
        part_soal: {
          type: "enum",
          values: [
            "ANALOGY",
            "LOGICAL REASONING",
            "ANALITICAL REASONING",
            "ARITMETIC",
            "NUMBER SERIES",
            "WORD PORBLEM",
            "FIGUR ANALYSIS AND SYNTHESIS",
            "SPATIAL REASONING",
          ],
        },
        durasi: "integer",
      };

      const validate = v.validate(req.body, schema);
      if (validate.length) {
        return res.status(400).json({
          status: false,
          message: "validasi salah!",
        });
      }

      const token = req.headers["authorization"].split("Bearer ")[1];
      const verify = jwt.verify(token, JWT_SECRET);

      const { id } = req.params;
      const {
        soal,
        jawaban_a,
        jawaban_b,
        jawaban_c,
        jawaban_d,
        jawaban_e,
        jawaban_benar,
        skor,
        kategori_soal = "TOEP",
        jenis_soal = "TEKS",
        part_soal,
        durasi,
        user_id = verify.id,
      } = req.body;

      const exist = await Soal.findOne({ where: { soal } });

      if (!exist) {
        return res.status(404).json({
          status: false,
          message: "data not found",
        });
      }

      const updated = await Soal.update(
        {
          soal,
          jawaban_a,
          jawaban_b,
          jawaban_c,
          jawaban_d,
          jawaban_e,
          jawaban_benar,
          skor,
          kategori_soal,
          jenis_soal,
          part_soal,
          durasi,
          user_id,
        },
        { where: { id } }
      );

      return res.status(200).json({
        status: true,
        message: "update data successful",
        data: {
          updated,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
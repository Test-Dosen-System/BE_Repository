const { Soal } = require("../../../models");
const validator = require("fastest-validator");
const v = new validator();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

module.exports = {
  createSoalTeks: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split("Bearer ")[1];

      const verify = jwt.verify(token, JWT_SECRET);

      const {
        soal,
        jawaban_a,
        jawaban_b,
        jawaban_c,
        jawaban_d,
        jawaban_benar,
        skor,
        kategori_soal = "TKDA",
        jenis_soal = "TEKS",
        part_soal,
        durasi,
        user_id = verify.id,
      } = req.body;

      const findSoal = await Soal.findOne({ where: { soal } });

      const rightAnswer = `jawaban_${jawaban_benar}`;

      const created = await Soal.create({
        soal,
        jawaban_a,
        jawaban_b,
        jawaban_c,
        jawaban_d,
        jawaban_benar: rightAnswer,
        skor,
        kategori_soal,
        jenis_soal,
        part_soal,
        durasi,
        user_id,
      });

      return res.status(201).json({
        status: true,
        message: "create soal successfully",
        data: created,
      });
    } catch (error) {
      next(error);
    }
  },
  createSoalGambar: async (req, res, next) => {
    try {
      const schema = {
        soal: "string|optional",
        jawaban_benar: "string",
        skor: { type: "number", convert: true },
        part_soal: {
          type: "enum",
          values: [
            "DUMMY ANALOGY",
            "DUMMY LOGICAL REASONING",
            "DUMMY ANALITICAL REASONING",
            "DUMMY ARITMETIC",
            "DUMMY NUMBER SERIES",
            "WORD PORBLEM",
            "FIGUR ANALYSIS AND SYNTHESIS",
          ],
        },
        durasi: { type: "number", convert: true },
      };

      const validate = v.validate(req.body, schema);

      if (validate.length) {
        return res.status(400).json({
          status: false,
          message: "validasi salah!",
        });
      }

      const token = req.headers.authorization.split("Bearer ")[1];

      const verify = jwt.verify(token, JWT_SECRET);

      const {
        soal,
        jawaban_benar,
        skor,
        kategori_soal = "TKDA",
        jenis_soal = "GAMBAR",
        part_soal,
        durasi,
        user_id = verify.id,
      } = req.body;

      const fileSoal = req.files["fileSoal"];
      const fileJawabanA = req.files["fileJawabanA"];
      const fileJawabanB = req.files["fileJawabanB"];
      const fileJawabanC = req.files["fileJawabanC"];
      const fileJawabanD = req.files["fileJawabanD"];

      const fileName1 = fileSoal[0].path.split("\\").pop().split("/").pop();
      const resultFileName1 = `http://${req.get(
        "host"
      )}/public/images/${fileName1}`;

      const fileName2 = fileJawabanA[0].path.split("\\").pop().split("/").pop();
      const resultFileName2 = `http://${req.get(
        "host"
      )}/public/images/${fileName2}`;

      const fileName3 = fileJawabanB[0].path.split("\\").pop().split("/").pop();
      const resultFileName3 = `http://${req.get(
        "host"
      )}/public/images/${fileName3}`;

      const fileName4 = fileJawabanC[0].path.split("\\").pop().split("/").pop();
      const resultFileName4 = `http://${req.get(
        "host"
      )}/public/images/${fileName4}`;

      const fileName5 = fileJawabanD[0].path.split("\\").pop().split("/").pop();
      const resultFileName5 = `http://${req.get(
        "host"
      )}/public/images/${fileName5}`;

      const rightAnswer = `jawaban_${jawaban_benar}`;

      const created = await Soal.create({
        soal,
        files: resultFileName1,
        jawaban_a: resultFileName2,
        jawaban_b: resultFileName3,
        jawaban_c: resultFileName4,
        jawaban_d: resultFileName5,
        jawaban_benar: rightAnswer,
        skor,
        kategori_soal,
        jenis_soal,
        part_soal,
        durasi,
        user_id,
      });

      return res.status(201).json({
        status: true,
        message: "create soal successful",
        data: created,
      });
    } catch (error) {
      next(error);
    }
  },
};

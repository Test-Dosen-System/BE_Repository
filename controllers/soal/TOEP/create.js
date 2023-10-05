const { Soal } = require("../../../models");
const validator = require("fastest-validator");
const v = new validator();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const path = require("path");

module.exports = {
  createSoalAudio: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split("Bearer ")[1];

      const verify = jwt.verify(token, JWT_SECRET);

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
        jenis_soal = "AUDIO",
        user_id = verify.id,
        part_soal,
        durasi,
      } = req.body;

      const fileSoal = req.file;

      const fileName = fileSoal.path.split("\\").pop().split("/").pop();
      const resultFileName = `http://${req.get(
        "host"
      )}/public/audio/${fileName}`;

      const rightAnswer = `jawaban_${jawaban_benar}`;

      const created = await Soal.create({
        soal,
        files: resultFileName,
        jawaban_a,
        jawaban_b,
        jawaban_c,
        jawaban_d,
        jawaban_e,
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
        jawaban_e,
        jawaban_benar,
        skor,
        kategori_soal = "TOEP",
        jenis_soal = "TEKS",
        part_soal,
        durasi,
        user_id = verify.id,
      } = req.body;

      const rightAnswer = `jawaban_${jawaban_benar}`;

      const created = await Soal.create({
        soal,
        jawaban_a,
        jawaban_b,
        jawaban_c,
        jawaban_d,
        jawaban_e,
        jawaban_benar: rightAnswer,
        skor,
        kategori_soal,
        jenis_soal,
        durasi,
        part_soal,
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
};

const { Soal } = require("../../models");
const validator = require("fastest-validator");
const v = new validator();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const path = require("path");

module.exports = {
  createSoal: async (req, res, next) => {
    try {
      const schema = {
        soal: "string",
        file: "string|optional",
        jawaban_a: "string",
        jawaban_b: "string",
        jawaban_c: "string",
        jawaban_d: "string",
        jawaban_e: "string|optional",
        jawaban_benar: "string",
        kategori_soal: {
          type: "enum",
          values: ["TOEP", "TKDA"],
        },
        jenis_soal: {
          type: "enum",
          values: ["TEKS", "GAMBAR", "AUDIO"],
        },
      };

      const validate = v.validate(req.body, schema);

      if (validate.length) {
        return res.status(400).json({
          status: false,
          message: validate,
        });
      }

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
        kategori_soal,
        jenis_soal,
        user_id = verify.id,
      } = req.body;

      const fileSoal = req.file;
      console.log(fileSoal.mimetype);

      const findSoal = await Soal.findOne({ where: { soal } });

      if (findSoal) {
        return res.status(409).json({
          status: false,
          message: "soal already exist",
        });
      }

      let resultFileName;

      if (fileSoal.mimetype == "image/png" || "image/jpeg" || "image/jpg") {
        const fileName = fileSoal.path.split("\\").pop().split("/").pop();
        resultFileName = `http://${req.get("host")}/public/images/${fileName}`;
      }

      if (fileSoal.mimetype == "audio/mpeg") {
        const fileName = fileSoal.path.split("\\").pop().split("/").pop();
        resultFileName = `http://${req.get("host")}/public/audio/${fileName}`;
      }

      const created = await Soal.create({
        soal,
        files: resultFileName,
        jawaban_a,
        jawaban_b,
        jawaban_c,
        jawaban_d,
        jawaban_e,
        jawaban_benar,
        kategori_soal,
        jenis_soal,
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

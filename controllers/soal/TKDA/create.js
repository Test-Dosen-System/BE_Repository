const { Soal } = require("../../../models");
const validator = require("fastest-validator");
const v = new validator();
const jwt = require("jsonwebtoken");
const imagekit = require("../../../utils/media-handling/image-kit");
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

      if (
        !fileSoal ||
        !fileJawabanA ||
        !fileJawabanB ||
        !fileJawabanC ||
        !fileJawabanD
      ) {
        return res.status(400).json({
          status: false,
          message: "file not found",
          data: null,
        });
      }

      const uploadFileSoal = fileSoal.map(async (file) => {
        try {
          const result = await imagekit.upload({
            file: file.buffer,
            fileName: file.originalname,
            useUniqueFileName: false,
          });
          return result;
        } catch (error) {
          throw error;
        }
      });

      const uploadFileJawabanA = fileJawabanA.map(async (file) => {
        try {
          const result = await imagekit.upload({
            file: file.buffer,
            fileName: file.originalname,
            useUniqueFileName: false,
          });
          return result;
        } catch (error) {
          throw error;
        }
      });

      const uploadFileJawabanB = fileJawabanB.map(async (file) => {
        try {
          const result = await imagekit.upload({
            file: file.buffer,
            fileName: file.originalname,
            useUniqueFileName: false,
          });
          return result;
        } catch (error) {
          throw error;
        }
      });

      const uploadFileJawabanC = fileJawabanC.map(async (file) => {
        try {
          const result = await imagekit.upload({
            file: file.buffer,
            fileName: file.originalname,
            useUniqueFileName: false,
          });
          return result;
        } catch (error) {
          throw error;
        }
      });

      const uploadFileJawabanD = fileJawabanD.map(async (file) => {
        try {
          const result = await imagekit.upload({
            file: file.buffer,
            fileName: file.originalname,
            useUniqueFileName: false,
          });
          return result;
        } catch (error) {
          throw error;
        }
      });

      const resultUploadFileSoal = await Promise.all(uploadFileSoal);
      const resultUploadFileA = await Promise.all(uploadFileJawabanA);
      const resultUploadFileB = await Promise.all(uploadFileJawabanB);
      const resultUploadFileC = await Promise.all(uploadFileJawabanC);
      const resultUploadFileD = await Promise.all(uploadFileJawabanD);
      console.log(resultUploadFileA[0].url);
      console.log(resultUploadFileSoal[0].url);
      console.log(resultUploadFileB[0].url);
      console.log(resultUploadFileC[0].url);
      console.log(resultUploadFileD[0].url);

      const rightAnswer = `jawaban_${jawaban_benar}`;
      console.log(rightAnswer);

      const created = await Soal.create({
        soal,
        files: resultUploadFileSoal[0].url,
        jawaban_a: resultUploadFileA[0].url,
        jawaban_b: resultUploadFileB[0].url,
        jawaban_c: resultUploadFileC[0].url,
        jawaban_d: resultUploadFileD[0].url,
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

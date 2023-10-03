const { Soal, Groupsoal } = require("../../../models");

module.exports = {
  getOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await Soal.findOne({
        where: { id },
        include: [{ model: Groupsoal, as: "soalpanjang" }],
      });

      if (!data) {
        return res.status(404).json({
          status: false,
          message: "data not found",
        });
      }

      const groupSoalData = data.Groupsoal
        ? {
            soal_panjang: data.Groupsoal.soal_panjang,
            files: data.Groupsoal.files,
            files2: data.Groupsoal.files2,
          }
        : null;

      let jawaban_benar_option = "";

      if (data.jawaban_benar === "jawaban_a") {
        jawaban_benar_option = data.jawaban_a;
      } else if (data.jawaban_benar === "jawaban_b") {
        jawaban_benar_option = data.jawaban_b;
      } else if (data.jawaban_benar === "jawaban_c") {
        jawaban_benar_option = data.jawaban_c;
      } else if (data.jawaban_benar === "jawaban_d") {
        jawaban_benar_option = data.jawaban_d;
      }

      const responseData = {
        id: data.id,
        soal: data.soal,
        files: data.files,
        jawaban_a: data.jawaban_a,
        jawaban_b: data.jawaban_b,
        jawaban_c: data.jawaban_c,
        jawaban_d: data.jawaban_d,
        jawaban_benar: jawaban_benar_option,
        skor: data.skor,
        kategori_soal: data.kategori_soal,
        jenis_soal: data.jenis_soal,
        part_soal: data.part_soal,
        durasi: data.durasi,
        soal_panjang: groupSoalData,
      };

      return res.status(200).json({
        status: true,
        message: "get data successful",
        data: responseData,
      });
    } catch (error) {
      next(error);
    }
  },
};

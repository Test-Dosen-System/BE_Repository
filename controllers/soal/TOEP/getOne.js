const { Soal } = require("../../../models");

module.exports = {
  getOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await Soal.findOne({ where: { id } });

      if (!data) {
        return res.status(404).json({
          status: false,
          message: "data not found",
        });
      }

      const responseData = data.map((item) => {
        let jawaban_benar_option = "";

        if (item.jawaban_benar === "jawaban_a") {
          jawaban_benar_option = item.jawaban_a;
        } else if (item.jawaban_benar === "jawaban_b") {
          jawaban_benar_option = item.jawaban_b;
        } else if (item.jawaban_benar === "jawaban_c") {
          jawaban_benar_option = item.jawaban_c;
        } else if (item.jawaban_benar === "jawaban_d") {
          jawaban_benar_option = item.jawaban_d;
        }

        return {
          id: item.id,
          soal: item.soal,
          jawaban_a: item.jawaban_a,
          jawaban_b: item.jawaban_b,
          jawaban_c: item.jawaban_c,
          jawaban_d: item.jawaban_d,
          jawaban_benar: jawaban_benar_option,
          skor: item.skor,
          kategori_soal: item.kategori_soal,
          jenis_soal: item.jenis_soal,
          part_soal: item.part_soal,
          durasi: item.durasi,
        };
      });

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

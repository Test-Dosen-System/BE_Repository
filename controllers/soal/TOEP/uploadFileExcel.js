const { Soal } = require("../../../models");
const xlsx = require("xlsx");

module.exports = {
  upload: async (req, res, next) => {
    try {
      const file = req.file;
      const { startCell, endCell, noSheet } = req.body;

      if (!file) {
        return res.status(404).send({
          status: false,
          message: "file not found",
        });
      }

      // Read file using xlsx
      const workBook = xlsx.readFile(file.path);
      const sheetName = workBook.SheetNames[noSheet];
      const workSheet = workBook.Sheets[sheetName];

      // Decode range
      const range = xlsx.utils.decode_range(`${startCell}:${endCell}`);

      const data = [];

      const keymap = {
        2: "soal",
        3: "jawaban_a",
        4: "jawaban_b",
        5: "jawaban_c",
        6: "jawaban_d",
        7: "jawaban_benar",
        8: "skor",
        9: "kategori_soal",
        10: "jenis_soal",
        11: "part_soal",
        12: "durasi",
        13: "files",
        14: "user_id",
      };

      // Loop through each row within the range
      for (let row = range.s.r; row <= range.e.r; row++) {
        let rowData = {};

        // Loop through each column within range
        for (let col = range.s.c; col <= range.e.c; col++) {
          console.log(col);
          let cellAddress = xlsx.utils.encode_cell({ r: row, c: col });
          let cellValue = workSheet[cellAddress]
            ? workSheet[cellAddress].v
            : "";

          rowData[keymap[col + 1]] = cellValue;
        }

        data.push(rowData);
      }

      const created = await Soal.bulkCreate(data);

      return res.status(201).json({
        status: true,
        message: "create data successful",
        data: created, //created,
      });
    } catch (error) {
      next(error);
    }
  },
};

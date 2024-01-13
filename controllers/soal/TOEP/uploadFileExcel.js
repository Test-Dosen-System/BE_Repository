const { Soal } = require("../../../models");
const xlsx = require("xlsx");

module.exports = {
  upload: async (req, res, next) => {
    try {
      const file = req.file;
      const {
        startCell,
        endCell,
        kategori_soal,
        noSheet,
        jenis_soal = "TOEP",
      } = req.body;

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
        8: ""
      };

      // Loop through each row within the range
      for (let row = range.s.r; row <= range.e.r; row++) {
        let rowData = {};
        console.log(rowData);

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
        data: created,
      });
    } catch (error) {
      next(error);
    }
  },
};

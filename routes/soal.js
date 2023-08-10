const express = require("express");
const router = express.Router();
const csoal = require("../controllers/soal");
const uploadImage = require("../middleware/storageImage");
const uploadFile = require("../middleware/storage");
const uploadAudio = require("../middleware/storageAudio");
const mid = require("../middleware/restrict");

router.post(
  "/create-soal-gambar",
  mid.mustAdmin,
  uploadImage.single("fileSoal"),
  csoal.create.createSoalGambar
);
router.post(
  "/create-soal-audio",
  mid.mustAdmin,
  uploadAudio.single("fileSoal"),
  csoal.create.createSoalAudio
);
router.post("/create-soal-teks", mid.mustAdmin, csoal.create.createSoalTeks);
router.post(
  "/import-file",
  uploadFile.single("file"),
  csoal.uploadFileExcel.upload
);
router.put("/update/:id", mid.mustAdmin, csoal.update.updateSoal);
router.get("/:id", mid.mustAdmin, csoal.getOne.getOne);
router.get("/", mid.mustAdmin, csoal.getAll.getAll);
router.delete("/delete/:id", mid.mustAdmin, csoal.destroy.delete);

module.exports = router;

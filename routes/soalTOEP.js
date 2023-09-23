const express = require("express");
const router = express.Router();
const csoal = require("../controllers/soal/TOEP");
const uploadImage = require("../middleware/storageImage");
const uploadFile = require("../middleware/storage");
const uploadAudio = require("../middleware/storageAudio");
const mid = require("../middleware/restrict");

router.post(
  "/create-soal-audio",
  mid.mustAdmin,
  uploadAudio.single("fileSoal"),
  csoal.create.createSoalAudio
);
router.post("/create-soal-teks", mid.mustAdmin, csoal.create.createSoalTeks);
router.put("/update/:id", mid.mustAdmin, csoal.update.updateSoal);
router.get("/:id", csoal.getOne.getOne);
router.get("/", csoal.getAll.getAll);
router.delete("/delete/:id", mid.mustAdmin, csoal.destroy.delete);
router.post(
  "/import-file",
  uploadFile.single("file"),
  csoal.uploadFileExcel.upload
);

module.exports = router;

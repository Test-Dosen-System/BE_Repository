const express = require("express");
const router = express.Router();
const csoal = require("../controllers/soal/TKDA");
const uploadImage = require("../middleware/storageImage");
const uploadFile = require("../middleware/storage");
const uploadAudio = require("../middleware/storageAudio");
const mid = require("../middleware/restrict");

router.post(
  "/create-soal-gambar",
  mid.mustAdmin,
  uploadImage.fields([
    { name: "fileSoal", maxCount: 1 },
    { name: "fileJawabanA", maxCount: 1 },
    { name: "fileJawabanB", maxCount: 1 },
    { name: "fileJawabanC", maxCount: 1 },
    { name: "fileJawabanD", maxCount: 1 },
  ]),
  csoal.create.createSoalGambar
);
router.post("/create-soal-teks", mid.mustAdmin, csoal.create.createSoalTeks);
router.get("/", csoal.getAll.getAll);
router.get("/:id", csoal.getOne.getOne);
router.delete("/delete/:id", mid.mustAdmin, csoal.destroy.delete);
router.put("/update/:id", mid.mustAdmin, csoal.update.updateSoal);

module.exports = router;

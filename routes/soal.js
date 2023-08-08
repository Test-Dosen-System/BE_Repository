const express = require("express");
const router = express.Router();
const csoal = require("../controllers/soal");
const upload = require("../middleware/storage");
const mid = require("../middleware/restrict");

router.post(
  "/create-soal-file",
  mid.mustAdmin,
  upload.single("fileSoal"),
  csoal.create.createSoalFile
);
router.post("/create-soal-teks", mid.mustAdmin, csoal.create.createSoalTeks);
router.put("/update/:id", mid.mustAdmin, csoal.update.updateSoal);
router.get("/:id", mid.mustAdmin, csoal.getOne.getOne);
router.get("/", mid.mustAdmin, csoal.getAll.getAll);
router.delete("/delete/:id", mid.mustAdmin, csoal.destroy.delete);

module.exports = router;

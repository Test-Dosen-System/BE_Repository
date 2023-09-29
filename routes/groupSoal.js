const express = require("express");
const router = express.Router();
const csoal = require("../controllers/soal/GroupSoal");
const uploadImage = require("../middleware/storageImage");
const uploadFile = require("../middleware/storage");
const uploadAudio = require("../middleware/storageAudio");
const mid = require("../middleware/restrict");

router.post(
  "/create-group-soal",
  mid.mustAdmin,
  uploadImage.fields([
    { name: "files", maxCount: 1 },
    { name: "files2", maxCount: 1 },
  ]),
  csoal.create.createGroupSoal
);
router.get("/", csoal.getAll.getAll);
router.get("/:id", csoal.getOne.getOne);
router.delete("/delete/:id", mid.mustAdmin, csoal.destroy.delete);
router.put("/update/:id", mid.mustAdmin, csoal.update.update);

module.exports = router;

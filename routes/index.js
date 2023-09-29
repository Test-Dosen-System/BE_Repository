const express = require("express");
const router = express.Router();
const user = require("./user");
const soalToep = require("./soalTOEP");
const soalTkda = require("./soalTKDA");
const groupSoal = require("./groupSoal");

router.use("/user", user);
router.use("/soal-toep", soalToep);
router.use("/soal-tkda", soalTkda);
router.use("/group-soal", groupSoal);

module.exports = router;

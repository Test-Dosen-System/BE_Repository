const express = require("express");
const router = express.Router();
const user = require("./user");
const soal = require("./soal");

router.use("/user", user);
router.use("/soal", soal);

module.exports = router;

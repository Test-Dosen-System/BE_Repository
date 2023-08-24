const express = require("express");
const router = express.Router();
const user = require("./user");
const soalToep = require("./soalTOEP");

router.use("/user", user);
router.use("/soal-toep", soalToep);

module.exports = router;

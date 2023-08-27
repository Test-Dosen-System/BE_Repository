const express = require("express");
const router = express.Router();
const user = require("./user");
const soalToep = require("./soalTOEP");
const soalTkda = require("./soalTKDA");

router.use("/user", user);
router.use("/soal-toep", soalToep);
router.use("/soal-tkda", soalTkda);

module.exports = router;

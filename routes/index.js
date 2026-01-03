const express = require("express");
const router = express.Router();
const user = require("./user");
const soalToep = require("./soalTOEP");
const soalTkda = require("./soalTKDA");
const groupSoal = require("./groupSoal");
const history = require("./history");
const customer = require("./customer");

router.use("/user", user);
router.use("/soal-toep", soalToep);
router.use("/soal-tkda", soalTkda);
router.use("/group-soal", groupSoal);
router.use("/history", history);
router.use("/customer", customer);

module.exports = router;

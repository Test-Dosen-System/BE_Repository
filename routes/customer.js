const express = require("express");
const router = express.Router();
const customerAuth = require("../controllers/customerAuth");

const mid = require("../middleware/restrict");

router.post("/register", customerAuth.register);
router.post("/login", customerAuth.login);
router.put("/update", mid.mustLogin, customerAuth.updateProfile);

module.exports = router;

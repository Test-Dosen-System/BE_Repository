const express = require("express");
const router = express.Router();
const customerAuth = require("../controllers/customerAuth");

router.post("/register", customerAuth.register);
router.post("/login", customerAuth.login);

module.exports = router;

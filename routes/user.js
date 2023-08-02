const express = require("express");
const router = express.Router();
const cuser = require("../controllers/user");

router.post("/register", cuser.create.create);
router.post("/login", cuser.login.login);
router.put("/update/:id", cuser.update.update);
router.get("/:id", cuser.getOne.getOne);

module.exports = router;

const express = require("express");
const router = express.Router();
const cuser = require("../controllers/user");

router.post("/register", cuser.create.create);
router.post("/login", cuser.login.login);
router.put("/update/:id", cuser.update.update);
router.put("/update-password", cuser.update.updatePassword);
router.get("/:id", cuser.getOne.getOne);
router.get("/", cuser.getAll.getAll);
router.delete("/delete/:id", cuser.destroy.delete);

module.exports = router;

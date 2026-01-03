const express = require("express");
const router = express.Router();
const chistory = require("../controllers/history");
const mid = require("../middleware/restrict");

router.post("/save", mid.mustLogin, chistory.saveResult);
router.get("/me", mid.mustLogin, chistory.getHistory);
router.get("/leaderboard", mid.mustLogin, chistory.getLeaderboard);
router.get("/stats", mid.mustLogin, chistory.getSummaryStats);

module.exports = router;

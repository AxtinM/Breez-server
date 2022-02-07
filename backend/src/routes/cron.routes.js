const express = require("express");
const router = express.Router();
const cronController = require("../controllers/cron.controller");

router.post("/cron", cronController);
module.exports = router;

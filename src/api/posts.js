const express = require("express");
import switchController from "../controllers/switchController.js";
const router = express.Router();

router.get("/switch", switchController);

module.exports = router;

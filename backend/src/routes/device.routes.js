const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth");
const {
  addDevice,
  getDevices,
  deleteDevice,
} = require("../controllers/device.controller");

router.get("/all", isAuth, getDevices);
router.post("/add", isAuth, addDevice);
router.delete("/delete", isAuth, deleteDevice);

module.exports = router;

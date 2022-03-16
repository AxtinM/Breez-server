const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth");
const {
  addDevice,
  getDevices,
  deleteDevice,
  changeDeviceStatus,
} = require("../controllers/device.controller");
const mqttClient = require("../services/mqttClient");

router.get("/all", isAuth, getDevices);
router.post("/add", isAuth, addDevice);
router.post("/delete", isAuth, deleteDevice);
router.post("/status", isAuth, changeDeviceStatus);

module.exports = router;

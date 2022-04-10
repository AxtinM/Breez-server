const User = require("../models/users.model");
const Breez = require("../models/device.model");
const mqttClient = require("../services/mqttClient");

module.exports.addDevice = async (req, res) => {
  try {
    const { name, mac } = req.body;
    const user = req.user;
    const device = await Breez({
      name,
      mac,
      user: user._id,
    });

    await device.save();
    user.devices.push(device);
    await user.save();

    res.send({
      success: true,
      message: "device added successfully!",
      device: device,
    });
  } catch (e) {
    res
      .status(400)
      .send({ success: false, message: "Internal Server Error! " });
  }
};

module.exports.getDevices = async (req, res) => {
  try {
    const user = req.user;
    const devices = await user.populate({ path: "devices", model: "Breez" });
    console.log(await Breez.find());
    res.status(200).send({ success: true, message: devices });
  } catch (e) {
    console.log(e);
  }
};

module.exports.deleteDevice = async (req, res) => {
  try {
    console.log("controller");
    const user = req.user;
    const device = await Breez.findOne({ mac: req.body.mac });
    if (user.devices !== []) {
      const devices = await user.devices.filter(
        (dev) => !dev.equals(device._id)
      );
      user.devices = devices;
    }

    const result = await Breez.deleteOne({ id: device._id });
    await user.save();
    res.send({
      success: true,
      message: "Device Deleted successfully!",
      devices: user.devices,
    });
  } catch (e) {
    res
      .status(400)
      .json({ success: false, message: "Internal Server Error: " + e.message });
  }
};

module.exports.changeDeviceStatus = (req, res) => {
  try {
    // const user = req.user;
    const { mac, num } = req.body;
    console.log("req : ", mac, " - ", num);
    pubTopic = "change/breez-" + mac;
    if (!mqttClient.publish(pubTopic, num)) {
      throw new Error("Publishing Unsucceeded!");
    }

    res.send({
      success: true,
      message: "Device Status updated successfully!",
    });
  } catch (e) {
    console.log(e);
    res.send({ success: false, message: "Internal Server Error: " + e });
  }
};

const User = require("../models/users.model");
const mqttClient = require("../services/mqttClient");

module.exports.addDevice = async (req, res) => {
  try {
    const { name, mac } = req.body;

    const user = await User.findById(req.user._id);
    oldDevices = user.devices || [];
    await User.findByIdAndUpdate(user._id, {
      devices: [...oldDevices, { name, mac }],
    });
    user.save();

    res.send({ success: true, message: "device added successfully!" });
  } catch (e) {
    res
      .status(400)
      .send({ success: false, message: "Internal Server Error! " });
  }
};

module.exports.getDevices = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).send({ success: true, message: user.devices });
  } catch (e) {
    console.log(e);
  }
};

module.exports.deleteDevice = async (req, res) => {
  try {
    const user = req.user;
    User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { devices: { mac: req.body.mac } } },
      (err, result) => {
        console.log(err, result);
      }
    );

    user.save();
    res.send({ success: true, message: "Device Deleted successfully!" });
  } catch (e) {
    res
      .status(400)
      .send({ success: false, message: "Internal Server Error: " + e.message });
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

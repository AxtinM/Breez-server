const User = require("../models/users.model");

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
    res.send({ success: true, message: user.devices });
  } catch (e) {
    console.log(e);
  }
};

module.exports.deleteDevice = async (req, res) => {
  try {
    const user = req.user;
    const response = await user.deleteOne({ mac: req.user.mac });
    if (response.deletedCount !== 0) {
      res.send({ success: true, message: "Device Deleted successfully!" });
    } else {
      res
        .status(400)
        .send({ success: false, message: "Could not delete device." });
    }
  } catch (e) {
    res.status(400).send({ success: false, message: e });
  }
};

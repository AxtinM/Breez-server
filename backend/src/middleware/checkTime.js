const Device = require("../models/device.model");

module.exports.checkTime = async (req, res, next) => {
  try {
    const openTime = new Date(req.body.time.openTime);
    const closeTime = new Date(req.body.time.closeTime);
    const mac = req.params.mac;
    const device = await Device.findOne({ mac: mac });

    const now = Date.now();

    if (device.openTime) {
      for (i = 0; i < device.closeTimes.length; i++) {
        if (device.closeTimes[i] - now < 0) {
          device.openTimes.pop(i);
          device.closeTimes.pop(i);
        }
      }
      await device.save();
    }
    req.device = device;
    req.openTime = openTime;
    req.closeTime = closeTime;
    delete req.body;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

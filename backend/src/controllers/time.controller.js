const mqttClient = require("../services/mqttClient");
const Breez = require("../models/device.model");

module.exports.timeAddController = (req, res) => {
  try {
    // must pass through checkTime middleware
    const openTime = req.openTime;
    const closeTime = req.closeTime;
    const nowTime = Date.now();
    const diffOpenDate = openTime.getTime() - nowTime;
    const diffCloseDate = closeTime.getTime() - openTime.getTime();
    if (diffOpenDate < 0 || diffCloseDate < 0) {
      throw new Error("You must provide correct timing");
    }
    const device = req.device;
    device.openTimes.push(openTime);
    device.closeTimes.push(closeTime);

    setTimeout(() => {
      console.log("Timer opened");
      device.status = true;
      mac = req.params.mac;
      res.send({ status: true, message: "Timer added successfully" });
      try {
        console.log("entered first timeout : ", typeof openTime);

        console.log("req : ", mac, " - 1");
        pubTopic = "change/breez-" + mac;

        mqttClient.publish(pubTopic, "1");
        setTimeout(() => {
          console.log("entered second timeout : ", closeTime);
          device.status = false;
          mqttClient.publish(pubTopic, "0");
        }, diffCloseDate);
      } catch (e) {
        console.log(e);
        res.send({ success: false, message: "Internal Server Error: " + e });
      }
    }, diffOpenDate);
  } catch (err) {
    res.send(err);
  }
};

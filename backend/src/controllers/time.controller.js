const mqttClient = require("../services/mqttClient");

module.exports.timeAddController = (req, res) => {
  try {
    const openTime = new Date(req.body.time.openTime);
    const closeTime = new Date(req.body.time.closeTime);
    const nowTime = Date.now();
    const diffOpenDate = openTime.getTime() - nowTime;
    const diffCloseDate = closeTime.getTime() - openTime.getTime();
    if (diffOpenDate < 0 || diffCloseDate < 0) {
      throw new Error("You must provide correct timing");
    }
    res.send({ status: true, message: "Timer added successfully" });

    setTimeout(() => {
      console.log("Timer opened");
      mac = req.params.mac;
      try {
        console.log("entered first timeout");
        console.log("req : ", mac, " - 1");
        pubTopic = "change/breez-" + mac;

        mqttClient.publish(pubTopic, "1");
        setTimeout(() => {
          console.log("entered second timeout");
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

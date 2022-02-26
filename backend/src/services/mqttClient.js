const mqtt = require("mqtt");
/**
 * setting up mqtt Server Connection
 */

const mqttClient = mqtt.connect(
  "mqtt://robotn-cloud-server.robotika.systems:1883",
  {
    username: "robotika",
    password: "robotika",
  }
);

/**
 * mqtt data flow handling
 */

mqttClient.on("connect", () => {
  console.log("Client connected ");
});

const pubTopic = "breez-F4:CF:A2:F6:6E:25";
mqttClient.subscribe(pubTopic);

mqttClient.on("message", (topic, msg) => {
  console.log("message from topic :  " + topic);
  console.log(msg.toString());
});

module.exports = mqttClient;

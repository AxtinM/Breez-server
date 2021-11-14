var mqtt = require("mqtt"),
  url = require("url");

// mqtt url
var mqtt_url = url.parse("mqtt://localhost:1883");

var client = mqtt.connect("mqtt://localhost:1883");

//for authed users
//var auth = (mqtt_url.auth || ':').split(':');

var url = "mqtt://" + mqtt_url.host;

//username: auth[0] + ":" + auth[0] if you are on a shared instance
var options = {
  port: mqtt_url.port,
  clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
  // username: auth[0],
  // password: auth[1],
};

// Create a client connection
var client = mqtt.connect(url, options);

client.on("connect", () => {
  // When connected

  // subscribe to a topic
  client.subscribe("plug/status", () => {
    // when a message arrives, do something with it
    client.on("message", (topic, message, packet) => {
      console.log("Received '" + message + "' on '" + topic + "'");
    });
  });

  // publish a message to a topic
  client.publish("plug/status", "1", () => {
    console.log("Message is published");
  });
});

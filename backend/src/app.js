require("dotenv").config();
const express = require("express");
const app = express();
var expressWs = require("express-ws")(app);
const logger = require("morgan");
const mqtt = require("mqtt");
const mqttClient = mqtt.connect("mqtt://localhost:1882");
var plug_status = 0;
const port = process.env.PORT;

app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mqttClient.on("connection", () => {
  console.log("client connected ");
});

mqttClient.subscribe("current/status", (err, granted) => {
  if (err) {
    console.log("error: " + err);
  } else {
    console.log("Client Connected " + granted);
  }
});

app.ws("/status", (ws, req) => {
  ws.on("message", (msg) => {
    console.log("Sent message over MQTT : " + msg);
    mqttClient.publish("current/change", msg);
  });
});

app.listen(port);

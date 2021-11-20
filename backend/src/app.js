require("dotenv").config();
const express = require("express");
const app = express();
const logger = require("morgan");
const mqtt = require("mqtt");
const mqttClient = mqtt.connect("mqtt://localhost:1883");
// const topic = "#";
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

mqttClient.publish("current/change", "1");
mqttClient.on("message", (topic, message) => {
  plug_status = message.toString();
  console.log("message from client : " + plug_status + " on " + topic);
});

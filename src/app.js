require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const mqtt = require("mqtt");
const mqttClient = mqtt.connect("mqtt://localhost:1883");
const topic = "status";
const plug_status = 0;

const app = express();
const PORT = process.env.PORT;

app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mqttClient.on("connection", () => {
  console.log("client connected ");
  mqttClient.subscribe(topic);
});

mqttClient.on("message", (topic, message) => {
  plug_status = JSON.parse(message);
  console.log("message from client :: " + plug_status);
});

mqttClient.on("offline", () => {
  console.log("mqtt offline");
  mqttClient.unsubscribe(topic);
});

// Get Status from Plug
app.get("/status", (req, res) => {
  if (mqttClient.connected()) {
    res.send(plug_status == 1 ? "Smart Plug Is ON !" : "Smart Plug Is OFF");
  } else {
    res.send("Smart Plug is Not Connected");
  }
});

// Switch Plug On/Off
app.get("/on", (req, res) => {
  if (plug_status == 1) {
    res.send("Smart Plug is Already On");
  } else {
    mqttClient.publish(topic, "1");
    res.send("Now Smart Plug is On");
  }
});

app.get("/off", (req, res) => {
  if (plug_status == 0) {
    res.send("Smart Plug is Already Off");
  } else {
    mqttClient.publish(topic, "0");
    res.send("Now Smart Plug is Off");
  }
});

app.listen(PORT, () => {
  console.info(`App listening on port ${PORT}`);
});

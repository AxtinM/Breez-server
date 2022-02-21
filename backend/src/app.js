require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
var expressWs = require("express-ws")(app);
const logger = require("morgan");
const mqtt = require("mqtt");
const router = require("./routes");

/**
 * cluster connection configuration
 */
require("./models/db");

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

const port = process.env.PORT;
const topic = process.env.TOPIC;

/**
 * App Configuration
 */

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);

/**
 * websocket connection (temporary with webpage testing)
 */

app.ws("/status", (ws, req) => {
  ws.on("message", (msg) => {
    console.log("Sent message over MQTT : " + msg);
    mqttClient.publish(topic, msg);
  });
});

/**
 * mqtt data flow handling
 */

mqttClient.on("connection", () => {
  console.log("client connected ");
});

mqttClient.subscribe(topic, (err, granted) => {
  if (err) {
    console.log("error: " + err);
  } else {
    console.log("Client Connected to topic", topic);
  }
});

app.listen(port, () => {
  console.log("listening on port " + port);
});

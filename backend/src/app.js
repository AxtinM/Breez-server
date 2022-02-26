require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
var expressWs = require("express-ws")(app);
const logger = require("morgan");
const router = require("./routes");

/**
 * cluster connection configuration
 */
require("./models/db");

const port = process.env.PORT;

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

// app.ws("/status", (ws, req) => {
//   ws.on("message", (msg) => {
//     console.log("Sent message over MQTT : " + msg);
//     mqttClient.publish(topic, msg);
//   });
// });

app.listen(port, () => {
  console.log("listening on port " + port);
});

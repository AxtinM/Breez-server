require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
var expressWs = require("express-ws")(app);
const expressSession = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const logger = require("morgan");
const mqtt = require("mqtt");
const router = require("./routes");
// const mqttClient = mqtt.connect("mqtt://localhost:1882");
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
 * Session Configuration
 */

const session = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: false,
};

if (app.get("env") === "production") {
  // Serve secure cookies, requires HTTPS
  session.cookie.secure = true;
}

/**
 * App configuration
 */

// app.use(expressSession(session));

// passport.use(strategy);
// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

/**
 * Passport Configuration
 */

// const strategy = new Auth0Strategy(
//   {
//     domain: process.env.AUTH0_DOMAIN,
//     clienID: process.env.AUTH0_CLIENT_ID,
//     clientSecret: precess.env.AUTH0_CLIENT_SECRET,
//     callbackURL: process.env.AUTH0_CALLBACK_URL,
//   },
//   function (accessToken, refreshToken, extraParams, profile, done) {
//     return done(null, profile);
//   }
// );

app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);
mqttClient.on("connection", () => {
  console.log("client connected ");
});

mqttClient.subscribe(topic, (err, granted) => {
  if (err) {
    console.log("error: " + err);
  } else {
    console.log("Client Connected " + granted);
  }
});

app.ws("/status", (ws, req) => {
  ws.on("message", (msg) => {
    console.log("Sent message over MQTT : " + msg);
    mqttClient.publish(topic, msg);
  });
});

app.listen(port);

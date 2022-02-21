const cronRouter = require("./cron.routes");
const authRouter = require("./auth.routes");
const deviceRouter = require("./device.routes");

const router = require("express").Router();

router.use("/", cronRouter);
router.use("/auth", authRouter);
router.use("/device", deviceRouter);

module.exports = router;

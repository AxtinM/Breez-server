const cronRouter = require("./cron.routes");
const authRouter = require("./auth.routes");
const router = require("express").Router();

router.use("/", cronRouter);

module.exports = router;
// export default router;

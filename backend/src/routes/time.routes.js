const router = require("express").Router();
const { timeAddController } = require("../controllers/time.controller");
const { isAuth } = require("../middleware/auth");
const { checkTime } = require("../middleware/checkTime");
router.post("/:mac/add", isAuth, checkTime, timeAddController);

module.exports = router;

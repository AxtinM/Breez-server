const router = require("express").Router();
const { timeAddController } = require("../controllers/time.controller");
const { isAuth } = require("../middleware/auth");
router.post("/:mac/add", isAuth, timeAddController);

module.exports = router;

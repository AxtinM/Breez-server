const cronService = require("../services/cron.service");
module.exports = function (req, res) {
  let cron_param = "";
  const obj = req.body;
  for (const key in obj) {
    if (obj[key]) {
      cron_param += " " + obj[key];
    } else {
      cron_param += " *";
    }
  }
  console.log(cron_param);
  cronService(cron_param);
  res.status(200).send(cron_param);
};

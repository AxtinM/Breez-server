const cron = require("node-cron");

module.exports = function (cron_str) {
  cron.schedule(cron_str, () => {
    console.log("cron job scheduled");
  });
};

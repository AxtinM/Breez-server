require("dotenv").config();
const express = require("express");
const logger = require("morgan");

// Routers
const postRouter = require("./api/posts");

const app = express();
const PORT = process.env.PORT;

app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/posts", postRouter);

app.listen(PORT, () => {
  console.info(`App listening on port ${PORT}`);
});

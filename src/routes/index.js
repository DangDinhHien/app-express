const newsRouter = require("./news");
const siteRouter = require("./site");
const coursesRouter = require("./courses");
const meRouter = require("./me");
const authRouter = require("./auth");
const usersRouter = require("./users");

function route(app) {
  app.use("/users", usersRouter);
  app.use("/me", meRouter);
  app.use("/news", newsRouter);
  app.use("/courses", coursesRouter);
  app.use("/", authRouter);
  app.use("/", siteRouter);
}

module.exports = route;

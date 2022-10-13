const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const path = require("path");
const methodOverride = require("method-override");
const errorHandler = require("./middleware/errorHandler");

// Config dotenv
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.API_PORT;

const route = require("./routes");
const db = require("./config/db");

app.use(methodOverride("_method"));

// Connect DB
db.connect();

// Setup static files
app.use(express.static(path.join(__dirname, "public")));

// Middleware handle encoded formdata/json with POST method
app.use(express.urlencoded());
app.use(express.json());

// HTTP Logger
app.use(morgan("combined"));

// Template
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

route(app);

// Error handling middleware, we delegate the handling to the centralized error handler
app.use(async (err, req, res, next) => {
  await errorHandler.errorHandler(err, res); //The error handler will send a response
});

app.listen(port, () => console.log(`Express server http://localhost:${port}`));

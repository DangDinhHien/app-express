const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const path = require("path");

const app = express();
const port = 3000;

const route = require("./routes");
const db = require("./config/db");

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

app.listen(port, () => console.log(`Express server http://localhost:${port}`));

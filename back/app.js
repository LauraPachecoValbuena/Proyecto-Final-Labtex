var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

//requiere la api.js---------->

var frontRouter = require("./routes/front");
var apiRouters = require("./routes/api");

var app = express();

const mongoConexion = require("./config/labtexdb");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//aqui usas las routes, (/api) es la primera parte de la url

app.use("/api", apiRouters);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;

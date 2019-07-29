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

//aqui usas las routes
// (/api) es la primera parte de la url
// app.use("/", frontRouters);
app.use("/api", apiRouters);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res) {
// set locals, only providing error in development
// res.locals.message = err.message;
// res.locals.error = req.app.get("env") === "development" ? err : {};

// render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;

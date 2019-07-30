var express = require("express");
var router = express.Router();

//requerirlas (sólo las rutas de back)
var apiUsersRouter = require("./apiUsers");
var apiAuthRouter = require("./apiAuth");
var apiGarmentsRouter = require("./apiGarments");

//llamarlas
// (/users) es la segunda parte de la url
router.use("/users", apiUsersRouter);
router.use("/auth", apiAuthRouter);
router.use("/garments", apiGarmentsRouter);

//exportar
module.exports = router;
//aqui van todas las rutas de tu carpeta routes
//ej: apiUsers,apiGarment, etc

//esta api.js va a app.js

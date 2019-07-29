var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var md5 = require("md5");
const mongodb = require("mongodb");

const userModel = require("../models/userModel");
const roleModel = require("../models/roleModel");

//estamos pididnedo que nos liste todos los usuarios.
router.get("/", async (req, res) => {
  //cuando tengas mas peticiones, consultas no será solo / puesto que habrá que distinguirlas.
  const token = req.headers.authorization.replace("Bearer ", "");

  try {
    let vtoken = jwt.verify(token, "mysecret");
    let users;
    if (vtoken.isAdmin) {
      users = await userModel
        .find({}, { password: 0 })
        .populate("role", { _id: 0 });
    } else {
      users = await userModel.find({}, { password: 0, isAdmin: 0 });
    }
    res.send(users);
  } catch (e) {
    res.status(400).send(e);
  }
});

//estamos buscando usuario por id.
router.get("/:id", async (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");

  try {
    let vtoken = jwt.verify(token, "mysecret");
    let user;
    if (vtoken.isAdmin) {
      user = await userModel.findById(req.params.id, { password: 0 });
    } else {
      user = await userModel.findById(req.params.id, {
        password: 0,
        isAdmin: 0
      });
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});


//Aquí estamos buscando por id y editando los datos en función de si es admin o no.
router.put("/:id", async (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");

  try {
    let vtoken = jwt.verify(token, "mysecret");
    let user;
    if (vtoken.isAdmin) {
      await userModel.findOneAndUpdate(
        { _id: req.params.id },
        {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            surname: req.body.surname,
            mobile: req.body.mobile,
            companyName: req.body.companyName,
            country: req.body.country,
            isAdmin: req.body.isAdmin,
            role: req.body.role
        }
      );
      user = await userModel.findById(req.params.id, { password: 0 });
    } else {
      await userModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          surname: req.body.surname,
          mobile: req.body.mobile,
          companyName: req.body.companyName,
          country: req.body.country
        }
      );
      user = await userModel.findById(req.params.id, {
        password: 0,
        isAdmin: 0,
        role: 0
      });
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//aqui estamos añadiendo un usuario nuevo.

router.post("/", async (req, res) {
    const token = req.headers.authorization.replace("Bearer ", "");
})
module.exports = router;

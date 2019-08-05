var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var md5 = require("md5");
const mongodb = require("mongodb");

const userModel = require("../models/userModel");
const roleModel = require("../models/roleModel");

//estamos pididnedo que nos liste todos los usuarios.
router.get("/list", async (req, res) => {
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
      users = await userModel.find({}, { password: 0, isAdmin: 0, role: 0 });
    }
    console.log(users);
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
      user = await userModel
        .findById(req.params.id, { password: 0 })
        .populate("role", { _id: 0 });
    } else {
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

//Aquí estamos buscando por id y editando los datos en función de si es admin o no.
router.put("/edit/:id", async (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");

  try {
    let vtoken = jwt.verify(token, "mysecret");
    let user;
    if (vtoken.isAdmin || vtoken.id === req.params.id) {
      console.log(req.body);
      await userModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          ...(req.body.username != null && { username: req.body.username }),
          ...(req.body.email != null && { email: req.body.email }),
          ...(req.body.password != null && {
            password: md5(req.body.password)
          }),
          ...(req.body.surname != null && { surname: req.body.surname }),
          ...(req.body.mobile != null && { mobile: req.body.mobile }),
          ...(req.body.companyName != null && {
            companyName: req.body.companyName
          }),
          ...(req.body.country != null && { country: req.body.country }),
          ...(req.body.isAdmin != null && { isAdmin: req.body.isAdmin }),
          ...(req.body.role != null && { role: req.body.role })
        }
      );
      user = await userModel
        .findById(req.params.id, { password: 0 })
        .populate("role", { _id: 0 });
    } else {
      await userModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          ...(req.body.username != null && { username: req.body.username }),
          ...(req.body.email != null && { email: req.body.email }),
          ...(req.body.password != null && { password: md5(req.body.password) }),
          ...(req.body.surname != null && { surname: req.body.surname }),
          ...(req.body.mobile != null && { mobile: req.body.mobile }),
          ...(req.body.companyName != null && {
            companyName: req.body.companyName
          }),
          ...(req.body.country != null && { country: req.body.country })
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
router.post("/add", (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");

  try {
    let vtoken = jwt.verify(token, "mysecret");
    if (vtoken.isAdmin) {
      const newUser = new userModel({
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        surname: req.body.surname,
        mobile: req.body.mobile,
        companyName: req.body.companyName,
        country: req.body.country,
        isAdmin: req.body.isAdmin,
        role: req.body.role //como hago xa no tener q meterlo a mano??
      });
      newUser.save((err, obj) => {
        if (err) {
          if (err.code === 11000) {
            console.log(err);
            res.send("El usuario ya existe.");
          } else {
            res.send("err" + err.msg[0]);
          }
        }
        res.send(obj);
        console.log(obj);
      });
    }
  } catch (err) {
    console.log(err);
    res.status(401).send("Sorry, you don't have permission" + err);
  }
});

//aqui estamos eliminando un usuario a través del id.Sólo el admin.
router.delete("/:id", (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");

  try {
    let vtoken = jwt.verify(token, "mysecret");
    if (vtoken.isAdmin) {
      userModel.deleteOne({ _id: req.params.id }, (err, raw) => {
        res.send();
      });
    } else {
      res.send("Sorry, you don't have permission. You are not an Admin");
    }
  } catch (err) {
    res
      .status(401)
      .send("Sorry, you don't have permission your Token is not valid");
  }
});

module.exports = router;

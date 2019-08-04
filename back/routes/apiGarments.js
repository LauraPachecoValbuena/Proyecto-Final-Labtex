var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var md5 = require("md5");
const mongodb = require("mongodb");

const userModel = require("../models/userModel");
const roleModel = require("../models/roleModel");
const sizeModel = require("../models/sizeModel");
const colorModel = require("../models/colorModel");
const garmentModel = require("../models/garmentModel");

//Listamos las garments que haya en la base de datos.
router.get("/", async (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");
  garmentModel
    .find({})
    .then(objs => {
      res.send(objs);
      console.log(objs);
    })
    .catch(err => {
      res.send("ERROR: " + err);
    });
});

//estamos buscando una prenda por id.
router.get("/:id", async (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");

  try {
    let vtoken = jwt.verify(token, "mysecret");
    let garment;
    if (vtoken) {
      garment = await garmentModel.findById(req.params.id);
    } else {
      send("error");
    }
    res.send(garment);
  } catch (e) {
    res.status(400).send(e);
  }
});

//estamos buscando por id y editando los datos de la prenda.
router.put("/edit/:id", async (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");

  try {
    let vtoken = jwt.verify(token, "mysecret");
    let garment;
    if (vtoken) {
      await garmentModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          ...(req.body.reference != null && { reference: req.body.reference }),
          ...(req.body.description != null && {
            description: req.body.description
          }),
          ...(req.body.season != null && { season: req.body.season }),
          ...(req.body.sizes != null && { sizes: req.body.sizes }),
          ...(req.body.colors != null && { colors: req.body.colors }),
          ...(req.body.users != null && { users: req.body.users }),
          ...(req.body.images != null && { images: req.body.images })
        }
      );
      garment = await garmentModel.findById(req.params.id);
    } else {
      send("error");
    }
    res.send(garment);
  } catch (e) {
    res.status(400).send(e);
  }
});

//aquí estamos añadiendo una prenda.
router.post("/add", (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");

  try {
    let vtoken = jwt.verify(token, "mysecret");
    if (
      vtoken.role === "5d3ebb9c17fb7b60d454b0a8" ||
      vtoken.role === "5d3ebc4b17fb7b60d454b0f2"
    ) {
      const newGarment = new garmentModel({
        reference: req.body.reference,
        description: req.body.description,
        season: req.body.season,
        sizes: req.body.sizes,
        colors: req.body.colors,
        users: req.body.users,
        images: req.body.images
      });
      newGarment.save((err, obj) => {
        if (err) {
          console.log("ups!! tenemos un error guardando", err);
        } else {
          res.send(obj);
          console.log(obj);
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(401).send("Sorry, you don't have permission");
  }
});

//aqui estamos eliminando una prenda.
router.delete("/:id", (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");

  try {
    let vtoken = jwt.verify(token, "mysecret");
    if (
      vtoken.role === "5d3ebb9c17fb7b60d454b0a8" ||
      vtoken.role === "5d3ebc4b17fb7b60d454b0f2"
    ) {
      garmentModel.deleteOne({ _id: req.params.id }, (err, raw) => {
        res.send();
      });
    } else {
      res.send("Sorry, you don't have permission. You can't delete anything");
    }
  } catch (err) {
    res
      .status(401)
      .send("Sorry, you don't have permission your Token is not valid");
  }
});

module.exports = router;

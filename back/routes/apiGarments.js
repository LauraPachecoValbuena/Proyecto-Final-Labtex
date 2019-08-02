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
router.get("/list", (req, res) => {
    const token = req.headers.authorization.replace("Bearer ", "");
    garmentModel.find({})
        .populate('Size')
        .populate('Color')
        .populate('User')
        .then((objs) => {
            res.send (objs);
            console.log(objs);
        })
        .catch((err) => {
            res.send('ERROR: ' + err);
        })
});


//aquí estamos añadiendo una prenda.
router.post("/add", (req, res) => {
    const token = req.headers.authorization.replace("Bearer ", "");

    try {
        let vtoken = jwt.verify(token, "mysecret");
        let garments,
        if (vtoken.id === role.id)
        const newGarment = new garmentModel({
        reference: req.body.reference,
        description: req.body.description,
        season: req.body.season,
        sizes: req.body.sizes,
        colors: req.body.colors,
        users: req.body.users
    })
    newGarment.save((err, obj) => {
        if (err){
            console.log("ups!! tenemos un error guardando", err);
        } else {
            res.send(obj);
            console.log(obj);
        }
    });
        } catch (err) {
            console.log(err);
            res.status(401).send("Sorry, you don't have permission");
        }
});


//aqui estamos eliminando una prenda.
// router.delete("/:id", (req, res) => {
//     const token = req.headers.authorization.replace("Bearer ", "");

//     try {
//         if(/*aquí condición NO suppliers */) {
//             garmentModel.deleteOne({_id: req.params.id}, (err, raw) => {
//                 res.send();
//             })
//         } else {
//             res.send("Sorry, you don't have permission. You can't delete anything")
//         }
//     }  catch (err) {
//         res.status(401).send("Sorry, you don't have permission your Token is not valid")
//     }
// });


module.exports = router; 
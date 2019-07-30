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

router.get("/list", (req, res) => {
    const token = req.headers.authorization.replace("Bearer ", "");
    garmentModel.find({})
        .populate('size')
        .populate('color')
        .populate('user')
        .then((objs) => {
            res.send (objs);
        })
        .catch((err) => {
            res.send('ERROR: ' + err)
        })
})
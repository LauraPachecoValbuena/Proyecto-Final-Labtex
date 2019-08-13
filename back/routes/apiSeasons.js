var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var md5 = require("md5");
const mongodb = require("mongodb");

const seasonModel = require("../models/seasonModel");

router.get("/list", async (req, res) => {
    const token = req.headers. authorization.replace("Bearer ", "");

    try {
        let vtoken = jwt.verify(token, "mysecret");
        if (vtoken) {
            const seasons = await seasonModel.find({});
            res.send(seasons);
        } else {
            res.status(403).send();
        } 
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;
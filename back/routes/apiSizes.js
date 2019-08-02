var express = require("express");
var router = express.Router();

const sizeModel = require("../models/sizeModel");

router.get("/list", async (req, res) => {
    try{
        const sizes = await sizeModel.find({});
        res.send(sizes);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;
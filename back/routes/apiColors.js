var express = require("express");
var router = express.Router();

const colorModel = require("../models/colorModel");

router.get("/list", async (req, res) => {
    try{
        const colors = await colorModel.find({});
        res.send(colors);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;
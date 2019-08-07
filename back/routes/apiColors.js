var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");

const colorModel = require("../models/colorModel");

router.get("/list", async (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");
  try {
    let vtoken = jwt.verify(token, "mysecret");
    if (vtoken) {
      const colors = await colorModel.find({});
      res.send(colors);
    } else {
      res.status(403).send();
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;

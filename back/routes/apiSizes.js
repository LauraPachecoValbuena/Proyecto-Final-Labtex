var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");

const sizeModel = require("../models/sizeModel");

router.get("/list", async (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");
  
  try {
    let vtoken = jwt.verify(token, "mysecret");
    if (vtoken) {
      const sizes = await sizeModel.find({});
      res.send(sizes);
    } else {
      res.status(403).send();
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;

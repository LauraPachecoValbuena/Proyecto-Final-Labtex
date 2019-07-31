var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var md5 = require("md5");
const mongodb = require("mongodb");

const roleModel = require("../models/roleModel");

router.get("/list", async (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");

  try {
    let vtoken = jwt.verify(token, "mysecret");
    if (vtoken.isAdmin) {
      const roles = await roleModel.find({});
      res.send(roles);
    } else {
      res.status(403).send();
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;

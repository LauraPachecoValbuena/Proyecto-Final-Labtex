var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var md5 = require("md5");
const mongodb = require("mongodb");

const userModel = require("../models/userModel");

router.post("/", (req, res) => {
  const user = userModel.find({
    email: req.body.email,
    password: md5(req.body.password)
  });
  user.then(documents => {
    if (documents.length > 0) {
      var token = jwt.sign(
        {
          id: documents[0]._id,
          username: documents[0].username,
          email: documents[0].email,
          role: documents[0].role,
          isAdmin: documents[0].isAdmin ? true : false
        },
        "mysecret",
        {
          expiresIn: 3600
        }
      );
      res.send(token);
    } else {
      res.status(400).send("Sorry, Invalid credentials");
    }
  });
});

module.exports = router;

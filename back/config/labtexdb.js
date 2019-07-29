const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const mongoConexion = mongoose
  .connect("mongodb://@localhost/labtex", { useNewUrlParser: true })
  .then(_ok => console.log("You are now connected to Mongo!"))
  .catch(err => console.error("Somewhing went wrong", err));

module.exports = mongoConexion;

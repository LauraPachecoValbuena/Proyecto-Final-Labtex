const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema(
  {  name: String },
  { collection: "roles" }
);

module.exports = mongoose.model("Role", roleSchema);

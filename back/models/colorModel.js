const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const colorSchema = new Schema(
    { name: String },
    { collection: "colors"}
);

module.exports = mongoose.model("Color", colorSchema);
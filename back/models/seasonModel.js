const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seasonSchema = new Schema(
    { name: String },
    { collection: "seasons"}
);

module.exports = mongoose.model("Season", seasonSchema);
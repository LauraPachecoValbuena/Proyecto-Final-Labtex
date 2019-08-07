const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const garmentSchema = new Schema(
  {
    reference: { type: String, required: true, unique: true },
    description: String,
    dateAdded: { type: Date, default: Date.now },
    season: String,
    sizes: [{ type: Schema.Types.ObjectId, ref: "Size" }],
    colors: [{ type: Schema.Types.ObjectId, ref: "Color" }],
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    images: [{ type: String }]
  },
  { collection: "garments" }
);

module.exports = mongoose.model("Garment", garmentSchema);

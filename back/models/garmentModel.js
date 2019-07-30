const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const garmentSchema = new Schema(
    {
        reference: { type: Number, required: true, unique: true },
        description: String,
        dateAdded: Date,
        season: String,
        size: { type: Schema.Types.ObjectId, ref: "Size"  },
        color: { type: Schema.Types.ObjectId, ref: "Color"},
        users: { type: Schema.Types.ObjectId, ref: "User" } 
     }, 
     { collection: "garments" },  
);

module.exports = mongoose.model("Garment", garmentSchema);
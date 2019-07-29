const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    // _id: Schema.Types.ObjectId,
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    surname: String,
    mobile: Number,
    companyName: String,
    country: String,
    isAdmin: Boolean,
    role: { type: Schema.Types.ObjectId, ref: "Role" }
  },
  { collection: "users" }
);

module.exports = mongoose.model("User", userSchema);

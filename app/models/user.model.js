const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    fullName: { type: String },
    matkhau: { type: String },
    email: { type: String},
    diachi: { type: String},
    phone: { type: String},
  },
  { collection: "user" }
);

// users.index({ email: 1}) //Nơi đánh index
module.exports = mongoose.model("user", usersSchema);

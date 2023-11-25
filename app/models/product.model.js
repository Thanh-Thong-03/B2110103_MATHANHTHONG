const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    hinh: { type: String},
    ten: { type: String},
    loai: { type: String},
    soluonghang: {type: Number},
    gia: { type: String},
    mota: { type: String },
  },
  { collection: "product" }
);

// Export the model
module.exports = mongoose.model('product', productSchema);
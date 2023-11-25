const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        soluong: Number,
      },
    ],
    userReceive: String,
    phoneNumber: String,
    address: String,
    statusOrder: {
      type: String,
      enum: [
        "Chờ xác nhận",
        "Chấp nhận đơn hàng",
        "Từ chối đơn hàng",
        "Hủy đơn hàng",
      ],
      default: "Chờ xác nhận",
    },
    ghichu: { type: String },
    ngaydathang: { type: Date, default: Date.now },
    ngaygiaohang: { type: Date, default: Date.now },
    gia: Number,
  },
  { collection: "order" }
);

module.exports = mongoose.model("order", orderSchema);

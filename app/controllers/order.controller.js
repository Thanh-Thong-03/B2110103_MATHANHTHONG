const Order = require("../models/order.model");
const mongoose = require("mongoose");

exports.create = async function (req, res, next) {
  try {
    
    const newOrder = new Order(req.body);

    const saveOrder = await newOrder.save();

    res.json(saveOrder);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Lỗi server" });
  }
};

exports.findAll = async function (req, res, next) {
  try {
    const orders = await Order.find();

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.findbyId = async (req, res, next) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findById(orderId);

    return res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// // Phương thức xử lý hiển thị danh sách sản phẩm dựa trên tên
// exports.findByName = async function (req, res, next) {
//   try {
//     const ten = req.query.ten;

//     // Kiểm tra xem tham số name có được truyền vào không
//     if (!ten) {
//       return res.status(400).json({ error: "Tên không được để trống" });
//     }

//     // Tìm sản phẩm dựa trên tên
//     const products = await Product.find({
//       ten: { $regex: new RegExp(ten, "i") },
//     });

//     // Kiểm tra xem có sản phẩm nào được tìm thấy không
//     if (products.length === 0) {
//       return res.status(404).json({ error: "Không tìm thấy sản phẩm nào" });
//     }

//     // Trả về danh sách sản phẩm dưới dạng JSON
//     res.json(products);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Lỗi server" });
//   }
// };

exports.update = async function (req, res, next) {
  try {
    const orderId = req.params.id;

    const isValid = mongoose.Types.ObjectId.isValid(orderId);
    if (!isValid) {
      return res.status(404).json({ message: "Sản phẩm không được tìm thấy" });
    }

    await Order.findByIdAndUpdate(orderId, req.body, {
      new: true,
    });

    return res.json({ message: "Sản phẩm được cập nhật thành công" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi server" });
  }
};

exports.delete = async function (req, res, next) {
  try {
    const orderId = req.params.id;

    const isValid = mongoose.Types.ObjectId.isValid(orderId);
    if (!isValid) {
      return res.status(404).json({ messae: "Không tìm thấy sản phẩm" });
    }

    await Or.findByIdAndDelete(orderId);

    res.json({ message: "Sản phẩm đã được xóa thành công" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi server" });
  }
};

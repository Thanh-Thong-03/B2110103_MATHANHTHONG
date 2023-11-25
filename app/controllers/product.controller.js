const Product = require("../models/product.model");
const mongoose = require("mongoose");

exports.create = async function (req, res, next) {
  try {
    // Tạo một sản phẩm mới
    const newProduct = new Product(req.body);

    // Lưu sản phẩm vào cơ sở dữ liệu
    const savedProduct = await newProduct.save();

    // Trả về thông tin người dùng đã tạo thành công
    return res.json(savedProduct);
  } catch (error) {
    // Xử lý lỗi nếu có
    console.log(error);
    res.status(500).json({ error: "Lỗi server" });
  }
};

// Phương thức xử lý hiển thị danh sách sản phẩm
exports.findAll = async function (req, res, next) {
  try {
    // Lấy danh sách sản phẩm từ cơ sở dữ liệu
    const products = await Product.find();

    // Trả về danh sách sản phẩm dưới dạng JSON
    res.json(products);
  } catch (error) {
    // Xử lý lỗi nếu có
    console.log(error);
    res.status(500).json({ error: "Lỗi server" });
  }
};

// Phương thức xử lý hiển thị danh sách sản phẩm dựa trên tên
exports.findByName = async function (req, res, next) {
  try {
    const ten = req.query.ten;

    // Kiểm tra xem tham số name có được truyền vào không
    if (!ten) {
      return res.status(400).json({ error: "Tên không được để trống" });
    }

    // Tìm sản phẩm dựa trên tên
    const products = await Product.find({
      ten: { $regex: new RegExp(ten, "i") },
    });

    // Kiểm tra xem có sản phẩm nào được tìm thấy không
    if (products.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy sản phẩm nào" });
    }

    // Trả về danh sách sản phẩm dưới dạng JSON
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi server" });
  }
};

exports.findbyId = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    return res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.update = async function (req, res, next) {
  try {
    const productId = req.params.id;

    const isValid = mongoose.Types.ObjectId.isValid(productId);
    if (!isValid) {
      return res.status(404).json({ message: "Sản phẩm không được tìm thấy" });
    }

    await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });

    return res.json({ message: "Sản phẩm được cập nhật thành công" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi server" });
  }
};

exports.findbyId = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const products = await Product.findById(productId);

    return res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Lỗi server" });
  }
};

exports.delete = async function (req, res, next) {
  try {
    const productId = req.params.id;

    const isValid = mongoose.Types.ObjectId.isValid(productId);
    if (!isValid) {
      return res.status(404).json({ messae: "Không tìm thấy sản phẩm" });
    }

    await Product.findByIdAndDelete(productId);

    res.json({ message: "Sản phẩm đã được xóa thành công" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi server" });
  }
};

exports.findbyType = async function (req, res, next) {
  try {
    const productType = req.params.type;

    const product = await Product.find({ loai: productType });
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi server" });
  }
};

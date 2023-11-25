const Staff = require("../models/staff.model");
const mongoose = require("mongoose");

exports.create = async function (req, res, next) {
  try {

    // Tạo một nhân viên mới
    const newStaff = new Staff(req.body);

    // Lưu nhân viên vào cơ sở dữ liệu
    const savedStaff = await newStaff.save();

    // Trả về thông tin nhân viên đã tạo thành công
    res.json(savedStaff);
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
    const staff = await Staff.find();

    // Trả về danh sách sản phẩm dưới dạng JSON
    res.json(staff);
  } catch (error) {
    // Xử lý lỗi nếu có
    console.log(error);
    res.status(500).json({ error: "Lỗi server" });
  }
};

// Phương thức xử lý hiển thị danh sách sản phẩm dựa trên tên
exports.findByName = async function (req, res, next) {
  try {

    
    const hoten = req.query.hoten;
    // Kiểm tra xem tham số name có được truyền vào không
    if (!hoten) {
      return res.status(400).json({ error: "Tên không được để trống" });
    }

    // Tìm sản phẩm dựa trên tên
    const staff = await Staff.find({
      hoten: { $regex: new RegExp(hoten, "i") },
    });

    // Kiểm tra xem có sản phẩm nào được tìm thấy không
    if (staff.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy sản phẩm nào" });
    }

    // Trả về danh sách sản phẩm dưới dạng JSON
    res.json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi server" });
  }
};

exports.update = async function (req, res, next) {
  try {
    const staffId = req.params.id;

    const isValid = mongoose.Types.ObjectId.isValid(staffId);
    if (!isValid) {
      return res.status(404).json({ message: "Sản phẩm không được tìm thấy" });
    }

    await Staff.findByIdAndUpdate(staffId, req.body, {
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
    const staffId = req.params.id;

    const staff = await Staff.findById(staffId);

    return res.json(staff);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Lỗi server" });
  }
};

exports.delete = async function (req, res, next) {
  try {
    const staffId = req.params.id;

    const isValid = mongoose.Types.ObjectId.isValid(staffId);
    if (!isValid) {
      return res.status(404).json({ messae: "Không tìm thấy sản phẩm" });
    }

    await Staff.findByIdAndDelete(staffId);

    res.json({ message: "Sản phẩm đã được xóa thành công" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi server" });
  }
};

const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
exports.create = async function (req, res, next) {
  try {
    // Lấy thông tin người dùng từ body request
    const newUser = new User(req.body);
    console.log(newUser);

    // Lưu người dùng mới vào cơ sở dữ liệu
    const saveUser = await newUser.save();

    // Trả về thông tin người dùng đã tạo thành công
    res.json(saveUser);
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error(error);
    res.status(500).json({ error: "Lỗi server" });
  }
};

// Phương thức xử lý hiển thị danh sách người dùng
exports.findAll = async function (req, res, next) {
  try {
    //Lấy danh sách người dùng từ cơ sở dữ liệu
    const users = await User.find();

    //Hiển thị danh sách người dùng dạng Json
    res.json(users);
  } catch (error) {
    // Xử lý lỗi nếu có
    console.log(error);
    res.status(500).json({ error: "Lỗi máy chủ" });
  }
};

// Phương thức xử lý tìm kiếm người dùng theo tên người dùng
exports.findByName = async function (req, res, next) {
  try {
    // Lấy tên người dùng từ yêu cầu
    const fullName = req.query.fullName;
    //Kiểm tra
    if (!fullName) {
      return res.status(400).json({ error: "Thiếu tham số fullName" });
    }

    const users = await User.find({
      fullName: { $regex: new RegExp(fullName, "i") },
    });

    if (users.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy người dùng nào" });
    }

    // Trả về thông tin người dùng dưới dạng JSON
    res.json(users);
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error(error);
    res.status(500).json({ error: "Lỗi server" });
  }
};

exports.findbyId = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    return res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
};

exports.delete = async function (req, res, next) {
  try {
    const userId = req.params.id;

    const isValid = mongoose.Types.ObjectId.isValid(userId);
    if (!isValid) {
      return res.status(404).json({ messae: "Không tìm thấy sản phẩm" });
    }

    await User.findByIdAndDelete(userId);

    res.json({ message: "Sản phẩm đã được xóa thành công" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi server" });
  }
};

exports.login = async function login(req, res, next) {
  const { phone, matkhau } = req.body;

  try {
    // Tìm người dùng trong cơ sở dữ liệu
    const user = await User.findOne({ phone });

    // Kiểm tra xem người dùng có tồn tại không
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    // Kiểm tra mật khẩu
    const passwordMatch = matkhau === user.matkhau;

    if (!passwordMatch) {
      return res.status(401).json({ message: "Mật khẩu không chính xác" });
    }

    // Tạo JWT token
    const token = jwt.sign({ phone: user.phone }, "your_secret_key");

    // Gửi token về cho client
    res.json(user._id);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.register = async function (req, res) {
  const { phone, matkhau } = req.body;
  console.log(req.body)

  try {
    // Kiểm tra xem người dùng đã tồn tại chưa
    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      return res.status(400).json({ message: "Tên người dùng đã tồn tại" });
    }

    // Tạo người dùng mới
    const newUser = new User({ phone, matkhau });

    // Lưu người dùng vào cơ sở dữ liệu
    await newUser.save();

    // Tạo JWT token
    const token = jwt.sign({ username: newUser.username }, "your_secret_key");

    // Gửi token về cho client
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server" });
  }

};


exports.addToCart = async function (req, res){
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;
    const quantity = parseInt(req.body.soluong) || 1; // Số lượng sản phẩm mặc định là 1, bạn có thể điều chỉnh tùy ý.

    // Kiểm tra xem người dùng có tồn tại không
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại.' });
    }

    // Kiểm tra xem sản phẩm có tồn tại không
    const productExists = user.cart.products.find(
      (item) => item.product.toString() === productId
    );

    if (productExists) {
      // Nếu sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
      productExists.soluong += quantity;
    } else {
      // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm mới vào mảng products
      user.cart.products.push({ product: productId, soluong: quantity });
    }

    // Lưu thông tin người dùng sau khi cập nhật giỏ hàng
    await user.save();

    res.status(200).json({ message: 'Sản phẩm đã được thêm vào giỏ hàng.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Đã xảy ra lỗi.' });
  }
}

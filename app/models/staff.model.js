const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
    hoten: { type: String, required: true},
    matkhau: { type: String, required: true },
    email: {type: String, required: true, unique: true},
    chucvu: { type: String, required: true, unique: true},
    diachi: { type: String, required: true},
    phone: {type: Number, required: true, unique: true}, 
}, { collection: 'staff' })

module.exports = mongoose.model('staff', staffSchema);
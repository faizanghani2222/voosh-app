const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    phone_number: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    orders: { type:Array, default:[] },
})

const User = mongoose.model('user', userSchema);

module.exports = User;
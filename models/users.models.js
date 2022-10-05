const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  isDisabled: {
    type: Boolean,
    required: false
  }
},
  { collection: "User" })

const User = mongoose.model("UserSchema", UserSchema);

module.exports = User

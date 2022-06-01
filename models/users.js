const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  phone: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  followers: {
    type: Array,
    default: [],
  },
  followings: {
    type: Array,
    default: [],
  },
  likes: {
    type: Array,
    default: [],
  },

  gender: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
  blockStatus: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("User", userSchema);

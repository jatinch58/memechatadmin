const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hostsuserSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: String,
  expireToken: Date,
  roles: {
    type: [String],
    enum: ["user", "admin"],
    default: ["user"],
  },
});
module.exports = mongoose.model("Hostsuser", hostsuserSchema);

const { model, Schema } = require("mongoose");

const subadmin = new Schema({
  uid: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  responsibilities: [String],
});

module.exports = model("subadmin", subadmin);

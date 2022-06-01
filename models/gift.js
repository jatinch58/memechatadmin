const { model, Schema } = require("mongoose");
const giftSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    giftUrl: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model("gift", giftSchema);

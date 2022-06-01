const { model, Schema } = require("mongoose");
const walletSchema = new Schema(
  {
    coins: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    offer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model("wallet", walletSchema);

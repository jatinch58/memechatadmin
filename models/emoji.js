const { model, Schema } = require("mongoose");
const emoji = new Schema(
  {
    emojiUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model("emoji", emoji);

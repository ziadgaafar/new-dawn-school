const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "chat" },
    content: { type: String, trim: true },
    sender: {
      id: {
        type: mongoose.Types.ObjectId
      },
      name: {
        type: String
      },
      image: {
        type: String
      }
    }
  },
  {
    timestamps: true,
  }
);

const messageModel = mongoose.model("message", messageSchema);
module.exports = messageModel;

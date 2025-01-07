const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  type: { type: String, enum: ["borrow", "return"], required: true }, // borrow or return
  date: { type: Date, default: Date.now }, // When the transaction occurred
});

module.exports = mongoose.model("Transaction", transactionSchema);

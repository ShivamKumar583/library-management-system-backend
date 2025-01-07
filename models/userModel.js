const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    borrowedBooks: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
      borrowedAt: { type: Date, default: Date.now },
      dueDate: { type: Date },
    },
  ],
});

// Hash password before saving
userSchema.pre("save", async function (next) {
    try {
      if (this.isNew) {
        const salt = await bcryptjs.genSalt(12);
        const hashedPassword = await bcryptjs.hash(this.password, salt);
        this.password = hashedPassword;
      }
      next();
    } catch (error) {
      next(error);
    }
  });

module.exports = mongoose.model('User', userSchema);

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// User schema - defines what data we store for each user
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Automatically hash password before saving to database
userSchema.pre("save", async function (next) {
  // Only hash if password is new or changed
  if (!this.isModified("password")) return next();
  
  // Hash the password with salt rounds of 10
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to check if entered password matches stored password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);

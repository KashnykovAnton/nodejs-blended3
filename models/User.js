const { model, Schema } = require("mongoose");

const userSchema = Schema(
  {
    firstName: {
      type: String,
      default: "John",
    },
    lastName: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    token: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = model("user", userSchema);

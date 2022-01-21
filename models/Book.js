const { model, Schema } = require("mongoose");

const bookSchema = Schema(
  {
    author: {
      type: String,
      required: [true, "Please add author "],
      trim: true,
      maxLength: [15, "cannot be more 15 symbols"],
      minLength: [2, "cannot be less 2 symbols"],
    },
    link: { type: String },
    pages: {
      type: Number,
      maxLength: [2000, "cannot be more 2000 pages"],
      minLength: [2, "cannot be less 2 pages"],
    },
    title: {
      type: String,
      required: [true, "Please add title "],
      trim: true,
      maxLength: [50, "cannot be more 50 symbols"],
      minLength: [2, "cannot be less 2 symbols"],
    },
    language: {
      type: String,
      enum: ["en", "ru", "ua"],
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = model("book", bookSchema);

const Book = require("../../models/Book");

const addBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    return res.status(201).json({ message: "ok", code: 201, data: book });
  } catch (error) {
    // console.log(error.message);
    res.status(400).json({ message: error.message, code: 400 });
  }
};

module.exports = addBook;

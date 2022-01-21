const Book = require("../../models/Book");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json({
      message: "ok",
      code: 200,
      data: books,
      count: books.length,
    });
  } catch (error) {
    // console.log(error.message);
    res.status(400).json({ message: error.message, code: 400 });
  }
};

module.exports = getAllBooks;

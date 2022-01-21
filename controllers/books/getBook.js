const Book = require("../../models/Book");

const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(200).json({
        message: `Cannot find with id: ${req.params.id}`,
        code: 200,
        data: book,
      });
    }
    return res.status(200).json({
      message: "ok",
      code: 200,
      data: book,
    });
  } catch (error) {
    // console.log(error.message);
    res.status(400).json({ message: error.message, code: 400 });
  }
};

module.exports = getBook;

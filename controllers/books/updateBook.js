const Book = require("../../models/Book");

const updateBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return res.status(400).json({
        message: `Cannot update with id: ${id}`,
        code: 400,
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

module.exports = updateBook;

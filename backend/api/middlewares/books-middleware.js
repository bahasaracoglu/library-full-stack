const booksModel = require("../books/books-model");
const db = require("../../data/db-config");

const isBookExist = async (req, res, next) => {
  try {
    const book_id = req.params.book_id;
    const bookExist = await booksModel.getBookWithId(book_id);
    if (!bookExist) {
      return res
        .status(400)
        .json({ message: `Can not found book with id: ${book_id}.` });
    } else {
      req.book = bookExist;
      next();
    }
  } catch (error) {
    next(error);
  }
};

const isBookAvailable = async (req, res, next) => {
  try {
    const book = req.book;
    if (book.is_loaned) {
      return res.status(400).json({
        message: `The book with id: ${book.book_id} is currently loaned.`,
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const isBookLoanedToUser = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const book_id = req.params.book_id;

    const loan = await db("loans")
      .where({ user_id, book_id, return_date: null })
      .first();

    if (!loan) {
      return res.status(400).json({
        message:
          "Book is not loaned to this user or it has already been returned.",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { isBookExist, isBookAvailable, isBookLoanedToUser };

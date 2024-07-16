const { isBookExist } = require("../middlewares/books-middleware");
const { validateName } = require("../middlewares/validate-middleware");
const booksModel = require("./books-model");

const router = require("express").Router();

// brings all books
router.get("/", async (req, res, next) => {
  try {
    const books = await booksModel.getAll();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
});

// creates book with name
router.post("/", validateName, async (req, res, next) => {
  try {
    const { name } = req.body;
    await booksModel.create({ name: name });
    res.status(201).json("");
  } catch (error) {
    next(error);
  }
});

// brings book with name
router.get("/:book_id", isBookExist, async (req, res, next) => {
  try {
    const id = req.params.book_id;
    const bookWithId = await booksModel.getBookWithId(id);
    res.status(200).json({
      id: bookWithId.book_id,
      name: bookWithId.name,
      score: bookWithId.score,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

const usersModel = require("./users-model");
const usersMw = require("../middlewares/users-middleware");
const booksMw = require("../middlewares/books-middleware");
const validateMw = require("../middlewares/validate-middleware");
const router = require("express").Router();

// brings all users
router.get("/", async (req, res, next) => {
  try {
    const users = await usersModel.getAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

// creates user with name
router.post("/", validateMw.validateName, async (req, res, next) => {
  try {
    const { name } = req.body;
    await usersModel.create({ name: name });
    res.status(201).json("");
  } catch (error) {
    next(error);
  }
});

// brings user with id and their loans
router.get("/:id", usersMw.isUserExist, async (req, res, next) => {
  try {
    const id = req.params.id;
    const userWithLoans = await usersModel.getUserWithLoans(id);
    res.status(200).json(userWithLoans);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/:id/borrow/:book_id",
  usersMw.isUserExist,
  booksMw.isBookExist,
  booksMw.isBookAvailable,
  async (req, res, next) => {
    try {
      const user_id = req.params.id;
      const book_id = req.params.book_id;
      await usersModel.borrowBook(user_id, book_id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  "/:id/return/:book_id",
  usersMw.isUserExist,
  booksMw.isBookExist,
  booksMw.isBookLoanedToUser,
  validateMw.validateScore,

  async (req, res, next) => {
    try {
      const user_id = req.params.id;
      const book_id = req.params.book_id;
      const user_score = req.body.score;
      await usersModel.returnBook(user_id, book_id, user_score);
      res.send(204).json("");
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;

const knex = require("knex");
const db = require("../../data/db-config");
const formatDate = require("../../utils/formatDate");

async function getAll() {
  const users = await db("users as u").select("u.user_id", "u.name");
  return users;
}

async function getById(id) {
  const user = await db("users as u")
    .where("user_id", id)
    .select("u.user_id", "u.name")
    .first();
  return user;
}

async function getUserWithLoans(userId) {
  const user = await getById(userId);

  const loans = await db("loans as l")
    .join("books as b", "l.book_id", "b.book_id")
    .where({ "l.user_id": userId })
    .select(
      "b.name",
      "b.book_id",
      "l.loan_date",
      "l.return_date",
      "l.user_score as userScore"
    );

  const past = loans
    .filter((loan) => loan.return_date)
    .map((loan) => {
      const { book_id, name, userScore } = loan;
      return {
        book_id: book_id,
        name,
        ...(userScore !== null && { userScore }),
      };
    });

  const present = loans
    .filter((loan) => !loan.return_date)
    .map((loan) => {
      const { book_id, name, userScore } = loan;
      return {
        book_id: book_id,
        name,
        ...(userScore !== null && { userScore }),
      };
    });

  return {
    id: user.user_id,
    name: user.name,
    books: { past, present },
  };
}

async function create(user) {
  const [insertedUser] = await db("users as u").insert(user);
  //return getById(insertedUser);
}
async function borrowBook(user_id, book_id) {
  const loanDate = formatDate(Date.now());
  await db("loans as l").insert({
    user_id: user_id,
    book_id: book_id,
    loan_date: loanDate,
  });
  await db("books").where({ book_id }).update({ is_loaned: true });
}

async function returnBook(user_id, book_id, user_score) {
  const returnDate = formatDate(Date.now());
  await db("loans")
    .where({
      user_id: user_id,
      book_id: book_id,
      return_date: null,
    })
    .update({
      return_date: returnDate,
      user_score: user_score,
    });

  // Calculate the new average score for the book
  const scores = await db("loans")
    .where("book_id", book_id)
    .whereNotNull("user_score")
    .pluck("user_score");

  const averageScore =
    scores.reduce((total, score) => total + score, 0) / scores.length;

  // Update the book's score and availability
  await db("books")
    .where("book_id", book_id)
    .update({ score: averageScore, is_loaned: false });
}

module.exports = {
  getAll,
  getById,
  create,
  getUserWithLoans,
  borrowBook,
  returnBook,
};

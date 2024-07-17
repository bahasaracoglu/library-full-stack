const db = require("../../data/db-config");

async function getAll() {
  const loans = await db("loans as l").select(
    "l.id",
    "l.user_id",
    "l.book_id",
    "l.loan_date",
    "l.return_date",
    "l.user_score"
  );
  return loans;
}

module.exports = {
  getAll,
};

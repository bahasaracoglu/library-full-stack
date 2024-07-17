/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("loans").truncate();
  await knex("books").delete(); // Books tablosunu truncate etmek yerine delete kullanıyorum.
  await knex("users").delete();

  await knex("users").insert([
    {
      name: "John Doe",
    },
    {
      name: "Baha Saraçoğlu",
    },
    {
      name: "Jane Doe",
    },
    {
      name: "Elon Musk",
    },
  ]);

  await knex("books").insert([
    {
      name: "The Hitchhiker's Guide to the Galaxy",
      score: -1,
      is_loaned: false,
    },
    {
      name: "I, Robot",
      score: 5.33,
      is_loaned: false,
    },
    {
      name: "Dune",
      score: -1,
      is_loaned: false,
    },
    {
      name: "1984",
      score: -1,
      is_loaned: false,
    },
    {
      name: "Brave New World",
      score: -1,
      is_loaned: true,
    },
    {
      name: "Dracula",
      score: 5,
      is_loaned: true,
    },
  ]);

  await knex("loans").insert([
    {
      user_id: 2,
      book_id: 2,
      user_score: 5,
      loan_date: knex.fn.now(),
      return_date: knex.fn.now(),
    },
    {
      user_id: 2,
      book_id: 1,
      user_score: 10,
      loan_date: knex.fn.now(),
      return_date: knex.fn.now(),
    },
    {
      user_id: 2,
      book_id: 5,
      loan_date: knex.fn.now(),
    },
    {
      user_id: 2,
      book_id: 6,
      loan_date: knex.fn.now(),
    },
  ]);
};

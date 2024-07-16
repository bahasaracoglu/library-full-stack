/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema

    .createTable("users", (users) => {
      users.increments("user_id");
      users.string("name").notNullable();
    })

    .createTable("books", (books) => {
      books.increments("book_id");
      books.string("name", 280);
      books.integer("score").defaultTo("-1");
      books.boolean("is_loaned").defaultTo(false).notNullable();
    })
    .createTable("loans", (loans) => {
      loans.increments("id").primary();
      loans
        .integer("user_id")
        .unsigned()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE");
      loans
        .integer("book_id")
        .unsigned()
        .references("book_id")
        .inTable("books")
        .onDelete("CASCADE");
      loans.date("loan_date").notNullable();
      loans.date("return_date");
      loans.integer("user_score");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("loans")
    .dropTableIfExists("books")
    .dropTableIfExists("users");
};

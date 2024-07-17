const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const server = express();
const morgan = require("morgan");

const usersRouter = require("./users/users-router");
const booksRouter = require("./books/books-router");
const loansRouter = require("./loans/loans-router");

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(morgan("dev"));

server.use("/users", usersRouter);
server.use("/books", booksRouter);
server.use("/loans", loansRouter);

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;

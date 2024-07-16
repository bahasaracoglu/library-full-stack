const { check, validationResult } = require("express-validator");

// Middleware to validate the request body
const validateName = [
  check("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name is required"),

  // Middleware to handle validation results
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateScore = [
  check("score")
    .isInt()
    .withMessage("Score must be an integer")
    .notEmpty()
    .withMessage("Score is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateName, validateScore };

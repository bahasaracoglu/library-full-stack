const loansModel = require("./loans-model");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const loans = await loansModel.getAll();
    res.status(200).json(loans);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

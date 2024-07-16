const usersModel = require("../users/users-model");

const isUserExist = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const userExist = await usersModel.getById(user_id);
    if (!userExist) {
      res
        .status(400)
        .json({ message: `Can not found user with id: ${user_id}.` });
    } else {
      next();
    }
  } catch (error) {}
};

module.exports = { isUserExist };

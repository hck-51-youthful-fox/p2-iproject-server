const { User, RentReview } = require("../models/index");
const authorization = async (req, resp, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const foundUser = await User.findByPk(userId);
    if (!foundUser) throw { name: "not_found" };
    const foundItem = await RentReview.findByPk(id);
    if (!foundItem) throw { name: "rent_not_found" };
    if (foundUser.id !== foundItem.UserId) {
      throw { name: "forbidden" };
    }
    // req.rentReview =
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;

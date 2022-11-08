const { Food, Category, Cart } = require("../models/index");
const { Op } = require("sequelize");

class CartController {
  static async readCart(req, res, next) {
    try {
      const cart = await Cart.findAll({
        order: [["id", "DESC"]],
        where: { CustomerId: req.customer.id, isPaid: false },
        include: [
          {
            model: Food,
            include: [
              {
                model: Category,
              },
            ],
          },
        ],
      });
      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  }

  static async addFoodToCart(req, res, next) {
    try {
      const { foodId } = req.params;
      const { quantity } = req.body;
      const CustomerId = req.customer.id;
      let totalPrice = 0;
      const isPaid = false;

      let checkFood = await Food.findByPk(foodId);

      if (!checkFood) {
        throw { name: "FOOD_NOT_FOUND", model: "Food" };
      }

      let [food, addToCart] = await Cart.findOrCreate({
        where: {
          CustomerId,
          FoodId: foodId,
        },
        defaults: {
          CustomerId,
          FoodId: foodId,
          quantity,
          totalPrice,
          isPaid,
        },
      });
      totalPrice = quantity * checkFood.price;

      if (addToCart) {
        return res.status(201).json({ message: "You Added food to cart" });
      } else {
        const updateQuantity = await Cart.update(
          { quantity, totalPrice },
          {
            where: {
              CustomerId,
              FoodId: foodId,
            },
          }
        );
        return res.status(200).json({ message: "Quantity Food Updated" });
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteFoodInCart(req, res, next) {
    try {
      const { foodId } = req.params;
      const data = await Cart.destroy({
        where: {
          CustomerId: req.customer.id,
          FoodId: foodId,
        },
      });
      if (!data) {
        throw { name: "DATA_NOT_FOUND", model: "Food", id: foodId };
      }
      res.status(200).json({
        message: `Success remove Food from cart`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CartController;

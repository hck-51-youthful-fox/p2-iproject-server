const { Food, Category, Cart } = require("../models/index");
const { Op } = require("sequelize");
const axios = require("axios");

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

  static async city(req, res, next) {
    try {
      const { data } = await axios.get(
        `https://api.rajaongkir.com/starter/city?province=6`,
        {
          headers: {
            key: "e66cc4122441762243872586e1fcc672",
          },
        }
      );
      res.status(200).json(data.rajaongkir.results);
    } catch (error) {
      next(error);
    }
  }

  static async cost(req, res, next) {
    try {
      const destinationCode = req.body.destination;
      const { data } = await axios.post(
        `https://api.rajaongkir.com/starter/cost`,
        {
          origin: "151",
          destination: destinationCode,
          weight: 3,
          courier: "jne",
        },
        {
          headers: {
            key: "e66cc4122441762243872586e1fcc672",
          },
        }
      );
      res.status(200).json(data.rajaongkir.results[0].costs[0].cost);
    } catch (error) {
      next(error);
    }
  }

  static async addFoodToCart(req, res, next) {
    try {
      const { foodId } = req.params;
      let { quantity } = req.body;
      const CustomerId = req.customer.id;
      const isPaid = false;

      if (!quantity) {
        quantity = 1;
      }

      let checkFood = await Food.findByPk(foodId);

      if (!checkFood) {
        throw { name: "FOOD_NOT_FOUND", model: "Food" };
      }
      let totalPrice = +quantity * +checkFood.price;

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

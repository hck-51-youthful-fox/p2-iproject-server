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
      let destinationCode = req.body.destination;
      if (!destinationCode) {
        return res.status(200).json(0);
      }
      const { data } = await axios.post(
        `https://api.rajaongkir.com/starter/cost`,
        {
          origin: "151",
          destination: destinationCode,
          weight: 4,
          courier: "jne",
        },
        {
          headers: {
            key: "e66cc4122441762243872586e1fcc672",
          },
        }
      );
      res.status(200).json(data.rajaongkir.results[0].costs[0].cost[0].value);
    } catch (error) {
      next(error);
    }
  }

  static async addFoodToCart(req, res, next) {
    try {
      const { foodId } = req.params;
      let { quantity } = req.body;
      const CustomerId = req.customer.id;
      let isPaid = false;

      let FoodId = foodId;
      let checkCart = await Cart.findByPk(+foodId);
      if (!checkCart) {
        FoodId = foodId;
      } else {
        FoodId = checkCart.FoodId;
      }
      let checkFood = await Food.findByPk(FoodId);

      if (!checkFood) {
        throw { name: "FOOD_NOT_FOUND", model: "Food" };
      }

      if (!quantity) {
        quantity = 1;
      }
      let totalPrice = +quantity * +checkFood.price;

      let [food, addToCart] = await Cart.findOrCreate({
        where: {
          CustomerId,
          FoodId: checkFood.id,
          isPaid: false,
        },
        defaults: {
          CustomerId,
          FoodId: checkFood.id,
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
              FoodId: checkFood.id,
            },
          }
        );
        return res.status(200).json({ message: "Quantity Food Updated" });
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateCartStatusAfterPayment(req, res, next) {
    try {
      const CustomerId = req.customer.id;
      const cart = await Cart.findAll({
        include: Food,
        where: {
          [Op.and]: [{ isPaid: false }, { CustomerId }],
        },
      });
      let isPaid = true;
      if (cart) {
        await Cart.update(
          { isPaid, CustomerId },
          {
            where: { [Op.and]: [{ isPaid: false }, { CustomerId }] },
          }
        );
      }
      res.status(200).json({ message: "Transaction Paid" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      let { id } = req.params;
      let data = await Category.destroy({
        where: { id },
      });
      if (!data) {
        throw { name: "DATA_NOT_FOUND", model: "Category", id };
      }
      res.status(200).json({
        message: `Success delete id: ${id}`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteFoodInCart(req, res, next) {
    try {
      const { foodId } = req.params;
      const data = await Cart.destroy({
        where: {
          id: foodId,
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

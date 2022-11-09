const { Food, Category, Cart, Transaction } = require("../models/index");
const { Op } = require("sequelize");
const axios = require("axios");

class TransactionController {
  static async readAllTransaction(req, res, next) {
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

  static async createTransaction(req, res, next) {
    try {
      const CustomerId = req.customer.id;
      const { shippingCost } = req.body;

      const cart = await Cart.findAll({
        include: Food,
        where: {
          [Op.and]: [{ isPaid: false }, { CustomerId }],
        },
      });

      if (cart.length === 0) {
        throw { name: "FOOD_NOT_FOUND" };
      }

      let totalPrice = 0;
      let cartInformation = [];
      let listCart = {};

      cart.forEach((el) => {
        totalPrice += el.totalPrice;
        listCart = {
          name: el.Food.name,
          quantity: el.quantity,
          totalPrice: el.totalPrice,
        };
        cartInformation.push(listCart);
      });
      const TotalShippingCost = +shippingCost;

      const transaction = await Transaction.create({
        totalPrice,
        shippingCost: TotalShippingCost,
        cartInformation,
        CustomerId,
      });

      const isPaid = true;

      await Cart.update(
        { isPaid, CustomerId },
        {
          where: { [Op.and]: [{ isPaid: false }, { CustomerId }] },
        }
      );

      let idOrder = `ORDER-2${CustomerId}${transaction.id}-${Math.random()
        .toString()
        .slice(2, 12)}`;
      const dataInput = JSON.stringify({
        transaction_details: {
          order_id: idOrder,
          gross_amount: totalPrice + TotalShippingCost,
        },
        credit_card: {
          secure: true,
        },
      });

      const { data } = await axios.post(
        `https://app.midtrans.com/snap/v1/transactions`,
        dataInput,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
              "Basic TWlkLXNlcnZlci00RWJ3TXFTeUxIaV9HTVlab0ZJcUhZcDM6",
          },
        }
      );
      res.status(200).json({ transaction, data, order_id: idOrder });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TransactionController;

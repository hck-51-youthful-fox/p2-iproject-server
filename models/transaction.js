"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Customer, {
        foreignKey: "CustomerId",
      });
    }
  }
  Transaction.init(
    {
      shippingCost: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
      CustomerId: DataTypes.INTEGER,
      cartInformation: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};

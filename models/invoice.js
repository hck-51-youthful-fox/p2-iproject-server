"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invoice.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Invoice.init(
    {
      totalPrice: DataTypes.INTEGER,
      ongkir: DataTypes.INTEGER,
      information: DataTypes.JSON,
      url_payment: DataTypes.STRING,
      token_payment: DataTypes.STRING,
      isPay: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Invoice",
    }
  );
  return Invoice;
};

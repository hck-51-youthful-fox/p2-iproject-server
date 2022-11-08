"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rent.belongsTo(models.User);
    }
  }
  Rent.init(
    {
      UserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      ShowId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      showName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      showImgUrl: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      showSummary: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      imgName: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Please upload the transaction proof" },
          notNull: { msg: "Please upload the transaction proof" },
        },
      },
      imgUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Please upload the transaction proof" },
          notNull: { msg: "Please upload the transaction proof" },
        },
      },
    },
    {
      sequelize,
      modelName: "Rent",
    }
  );
  return Rent;
};

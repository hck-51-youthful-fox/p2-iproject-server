"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RentReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RentReview.belongsTo(models.User);
    }
  }
  RentReview.init(
    {
      name: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
      content: DataTypes.TEXT,
      rating: DataTypes.INTEGER,
      rented: DataTypes.BOOLEAN,
      rentEnd: DataTypes.DATE,
      PetId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "RentReview",
    }
  );
  return RentReview;
};

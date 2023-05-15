"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User);
      Comment.belongsTo(models.Thread);
    }
  }
  Comment.init(
    {
      UserId: DataTypes.INTEGER,
      ThreadId: DataTypes.INTEGER,
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { message: "Comment cannot blank" },
          notEmpty: { message: "Comment cannot blank" },
        },
      },
      imgUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};

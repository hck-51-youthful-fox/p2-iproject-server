"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class UserReview extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			UserReview.belongsTo(models.Game)
			UserReview.belongsTo(models.User)

		}
	}
	UserReview.init(
		{
			review: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notNull: { msg: "Review cannot be empty" },
					notEmpty: { msg: "Review cannot be empty" },
				},
			},
			score: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: { msg: "Review Score cannot be empty" },
					notEmpty: { msg: "Review Score cannot be empty" },
				},
			},
			UserId: DataTypes.INTEGER,
			GameId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "UserReview",
		}
	);
	return UserReview;
};

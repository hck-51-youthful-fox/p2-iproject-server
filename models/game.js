"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Game extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			// Game.hasMany(models.UserReview)
			Game.belongsToMany(models.Genre, { through: 'GameGenre' });
			Game.hasMany(models.UserReview)
		}
	}
	Game.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			imageUrl: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			releaseDate: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			rating: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Game",
		}
	);
	return Game;
};

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		const insertData = require(`../data/genre.json`);
    insertData.forEach(el=>{
      el.createdAt = el.updatedAt = new Date()
    })
		await queryInterface.bulkInsert("Genres", insertData, {});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
     await queryInterface.bulkInsert("Genres", null, {});
	},
};

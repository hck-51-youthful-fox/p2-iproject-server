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
    const fs = require("fs");
    const data = JSON.parse(fs.readFileSync("./players.json", "utf-8"));
    data.forEach((el) => {
      delete el.id;
      el.updatedAt = el.createdAt = new Date();
    });
    console.log(data);
    await queryInterface.bulkInsert("Players", data);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Players", null, {});
  },
};

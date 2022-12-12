"use strict";

const admins = require("../data/admins.json");
const customers = require("../data/customers.json");
const categories = require("../data/categories.json");
const foods = require("../data/foods.json");
const cart = require("../data/cart.json");
const { hashPassword } = require("../helpers/bcrypt");

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
    admins.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
      el.password = hashPassword(el.password);
    });
    categories.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    });
    foods.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    });
    customers.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
      el.password = hashPassword(el.password);
    });
    cart.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Admins", admins, {});
    await queryInterface.bulkInsert("Categories", categories, {});
    await queryInterface.bulkInsert("Food", foods, {});
    await queryInterface.bulkInsert("Customers", customers, {});
    await queryInterface.bulkInsert("Carts", cart, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Admins", null, {});
    await queryInterface.bulkDelete("Categories", null, {});
    await queryInterface.bulkDelete("Food", null, {});
    await queryInterface.bulkDelete("Customers", null, {});
    await queryInterface.bulkDelete("Carts", null, {});
  },
};

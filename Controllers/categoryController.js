const { Category } = require("../models/index");

class CategoryController {
  static async findAllCategories(req, res, next) {
    try {
      let data = await Category.findAll();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async createCategory(req, res, next) {
    try {
      let { name } = req.body;
      let data = await Category.create({
        name,
      });
      res.status(201).json({
        message: `Success create Category`,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      let { id } = req.params;
      let data = await Category.destroy({
        where: { id },
      });
      if (!data) {
        throw { name: "DATA_NOT_FOUND", model: "Category", id };
      }
      res.status(200).json({
        message: `Success delete id: ${id}`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;

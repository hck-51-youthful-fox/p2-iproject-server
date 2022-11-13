const { Food, Category } = require("../models/index");
const { Op } = require("sequelize");

class FoodController {
  static async findAllFoods(req, res, next) {
    try {
      let options = {};
      options = {
        order: [["id", "DESC"]],
        include: [
          {
            model: Category,
          },
        ],
      };

      const data = await Food.findAll(options);

      if (data) {
        res.status(200).json(data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async createFood(req, res, next) {
    try {
      const { name, price, imageUrl, CategoryId } = req.body;
      let data = await Food.create({
        name,
        price,
        imageUrl,
        CategoryId,
      });

      res.status(201).json({
        message: `Success create Food`,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async editFood(req, res, next) {
    try {
      const { id } = req.params;
      const { name, price, imageUrl, CategoryId } = req.body;
      await Food.update(
        {
          name,
          price,
          imageUrl,
          CategoryId,
        },
        { where: { id } }
      );

      res.status(200).json({
        message: `Success update Food id: ${id}`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteFood(req, res, next) {
    try {
      const { id } = req.params;
      await Food.destroy({
        where: { id },
      });
      res.status(200).json({
        message: `Success delete id: ${id}`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async findFoodById(req, res, next) {
    try {
      let { id } = req.params;
      let data = await Food.findByPk(id, {
        include: [
          {
            model: Category,
          },
        ],
      });
      if (!data) {
        throw { name: "DATA_NOT_FOUND", model: "Food", id };
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async readAllFoods(req, res, next) {
    try {
      let options = {};
      options.include = [
        {
          model: Category,
        },
      ];

      let { page, filter, search } = req.query;
      let limit = 9;
      let offset = 0;
      let totalPage;

      options.include = [{ model: Category }];

      // pagination
      if (page !== "" && typeof page !== "undefined") {
        limit = 9;
        options.limit = limit;
        if (page.number !== "" && typeof page.number !== "undefined") {
          let offset = page.number * limit - limit;
          options.offset = offset;
        } else {
          limit = 9;
          offset = 0;
          page.number = 1;
          totalPage = 1;
          options.limit = limit;
          options.offset = offset;
        }
      }

      if (!page) {
        page = {};
        totalPage = 1;
        page.number = 1;
      }

      // filter by category
      if (filter) {
        if (filter !== "" && typeof filter !== "undefined") {
          options.include = [
            {
              model: Category,
              where: {
                name: {
                  [Op.eq]: filter.category,
                },
              },
            },
          ];
        }
      }

      //search
      if (search) {
        options = {
          limit: limit,
          offset: offset,
          order: [["id", "ASC"]],
          where: {
            [Op.and]: [{ name: { [Op.iLike]: `%${search}%` } }],
          },
        };
      }

      const data = await Food.findAndCountAll(options);

      if (!data || data.rows.length === 0) {
        throw { name: "FOOD_NOT_FOUND", model: "Foods" };
      }

      totalPage = data.count;
      data.totalPage = Math.ceil(totalPage / limit);

      if (!data.totalPage) {
        data.totalPage = 1;
      }
      data.currentPage = page.number ? +page.number : 0;
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FoodController;

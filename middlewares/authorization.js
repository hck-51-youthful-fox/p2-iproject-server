const { verifyToken } = require("../helpers/jwt");
const { User, Comment, Post } = require("../models/index");

const paymentAuthorization = async (req, res, next) => {
  try {
    // console.log(req.user);
    const { id, isPremium } = req.user;
    // console.log(role.toUpperCase());
    console.log(req.user);
    const findUser = await User.findByPk(id);

    if (findUser) {
      if (isPremium === false) {
        next();
      } else {
        throw { message: "You Already Premium!" };
      }
    }

    if (!findUser) {
      throw { name: "DATA_NOT_FOUND" };
    }
  } catch (error) {
    console.log(error);
    // next(error);
    res.status(403).json(error);
  }
};

const addAuthorization = async (req, res, next) => {
  try {
    // console.log(req.user);
    const { id, isPremium } = req.user;
    // console.log(role.toUpperCase());
    console.log(req.user);
    const findUser = await User.findByPk(id);

    if (findUser) {
      if (isPremium === true) {
        next();
      } else {
        throw { message: "You Need Premium to Access this Feature!" };
      }
    }

    if (!findUser) {
      throw { name: "DATA_NOT_FOUND" };
    }
  } catch (error) {
    console.log(error);
    // next(error);
    res.status(403).json(error);
  }
};

const editAuthorization = async (req, res, next) => {
  try {
    // console.log(req.user);
    const { id, isPremium } = req.user;
    // console.log(role.toUpperCase());
    console.log(req.user);
    const findUser = await User.findByPk(id);

    if (findUser) {
      if (isPremium === true) {
        next();
      } else {
        throw { message: "You Need Premium to Access this Feature!" };
      }
    }

    if (!findUser) {
      throw { name: "DATA_NOT_FOUND" };
    }
  } catch (error) {
    console.log(error);
    // next(error);
    res.status(403).json(error);
  }
};

module.exports = {
  paymentAuthorization,
  addAuthorization,
};

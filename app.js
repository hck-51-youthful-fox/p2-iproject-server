if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
var axios = require("axios");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
var cors = require("cors");
const { User, Cart, Product, Invoice } = require("./models/index");
const { Op } = require("sequelize");
// const { Op } = require("sequelize");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//register
app.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const role = "client";
    const register = await User.create({ email, password, role });
    let obj = {
      id: register.id,
      email: register.email,
    };
    res.status(201).json(obj);
  } catch (error) {
    // console.log(error);
    next(error);
  }
});
// login
app.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const cekemail = await User.findOne({ where: { email: email } });
    console.log(req.body);

    if (!cekemail || !bcrypt.compareSync(password, cekemail.password)) {
      throw { name: "UNAUTHORIZED" };
    }
    let payload = { id: cekemail.id, email };
    const access_token = jwt.sign(payload, "secret");
    console.log(payload);
    res.status(200).json({ access_token });
  } catch (err) {
    next(err);
  }
});

//GET-ALL-PRODUCT
app.get("/products", async (req, res, next) => {
  try {
    let { page, search } = req.query;
    // console.log(search);
    // console.log("ihza");
    page = +page;
    // console.log(page);

    // console.log(req.query.page);
    // console.log(req.user);
    if (!page) {
      page = 0;
    }

    // console.log(page);
    const limit = 10;
    const offset = page * limit;
    let option = {
      limit: limit,
      offset: offset,
      order: [["id", "ASC"]],
      where: {
        name: { [Op.iLike]: `%%` },
      },
    };

    if (search) {
      option.where.name = { [Op.iLike]: `%${search}%` };
    }
    // console.log(req.user.role);
    console.log(option);
    console.log("ihza cuy");
    const allProduct = await Product.findAndCountAll(option);
    console.log(allProduct);
    // console.log(allMovies.count);
    if (allProduct.rows.length === 0) {
      throw { name: "PRODUCT_NOT_FOUND" };
    }
    const totalPages = Math.ceil(allProduct.count / limit);
    allProduct.totalPage = totalPages;
    allProduct.currentPage = `${+page + 1}`;
    res.status(200).json(allProduct);
  } catch (error) {
    next(error);
    // res.status(500).json({msg:"internal Server Error"})
  }
});

//authentikasi
app.use(async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const cektoken = jwt.verify(access_token, "secret");
    const cekid = await User.findByPk(cektoken.id);
    req.user = {
      UserId: cekid.id,
    };
    next();
  } catch (err) {
    next(err);
  }
});
//CREATE-PRODUCT
app.post("/products", async (req, res, next) => {
  try {
    const { name, price } = req.body;
    const addProducts = await Product.create({
      name,
      price,
    });
    res.status(200).json(addProducts);
  } catch (err) {
    next(err);
  }
});

//DELETE-PRODUCT-IN-CART
app.delete("/cart/:ProductId", async (req, res, next) => {
  try {
    const { ProductId } = req.params;
    const { UserId } = req.user;
    const removeProducts = await Cart.destroy({
      where: { [Op.and]: [{ UserId }, { ProductId }] },
    });
    // console.log("data berhasil dihapus");
    res.status(200).json({ message: "data berhasil dihapus" });
  } catch (err) {
    next(err);
  }
});

//GET-ALL-PODUCT-IN-CART
app.get("/cart", async (req, res, next) => {
  try {
    console.log("lontong");
    const { UserId } = req.user;
    const cart = await Cart.findAll({
      include: {
        model: Product,
        attributes: ["name", "price", "imageUrl", "id"],
      },
      where: { UserId },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [["id", "DESC"]],
    });
    // console.log("lontong3");
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
});

//ADD-PRODUCT-TO-CART
app.post("/cart/:ProductId", async (req, res, next) => {
  try {
    const { ProductId } = req.params;
    const { UserId } = req.user;
    const { quantity } = req.body;
    console.log(quantity, ProductId);
    // const role = "-";
    const isPay = false;
    if (!ProductId) {
      throw { name: "PRODUCT_NOT_FOUND" };
    }
    const cekProduct = await Product.findByPk(ProductId);
    // console.log(cekProduct);
    // console.log(price);
    // console.log("lononr");
    if (!cekProduct) {
      throw { name: "PRODUCT_NOT_FOUND" };
    }
    console.log("lontong");
    const price = quantity * cekProduct.price;
    console.log(ProductId, UserId, quantity, isPay, price);
    const [product, addToCart] = await Cart.findOrCreate({
      where: { ProductId },
      defaults: {
        quantity,
        price,
        isPay,
        UserId,
        ProductId,
      },
    });
    // console.log(product);
    // console.log(addToCart, "<<<");
    if (addToCart) {
      res.status(201).json(addToCart);
    } else {
      const updateProduct = await Cart.update(
        { quantity, price },
        { where: { ProductId } }
      );
      res.status(200).json({ message: "Berhasil Update" });
    }
  } catch (err) {
    next(err);
  }
});

//CREATE INVOICE
app.post("/invoice", async (req, res, next) => {
  try {
    const { UserId } = req.user;
    const { ongkir, url_payment, token_payment } = req.body;
    // console.log(UserId);
    const unpaid = await Cart.findAll({
      include: Product,
      where: { [Op.and]: [{ isPay: false }, { UserId }] },
    });
    if (unpaid.length === 0) {
      throw { name: "PRODUCT_NOT_FOUND" };
    }
    let totalPrice = 0;
    let information = [];
    unpaid.forEach((e) => {
      totalPrice += e.price;
      obj = {
        productName: e.Product.name,
        quantity: e.quantity,
        price: e.price,
      };
      information.push(obj);
    });
    const ongkirInt = Number(ongkir);
    console.log(totalPrice, ongkirInt, information, UserId);
    // const paid = await Cart.update(
    //   { isPay: true },
    //   {
    //     where: { [Op.and]: [{ isPay: false }, { UserId }] },
    //   }
    // );
    const addInvoice = await Invoice.create({
      totalPrice,
      ongkir: ongkirInt,
      information,
      url_payment,
      token_payment,
      isPay: "PENDING",
      UserId,
    });

    const deleteCart = await Cart.destroy({
      where: { [Op.and]: [{ isPay: false }, { UserId }] },
    });

    res.status(200).json(addInvoice);
  } catch (err) {
    next(err);
  }
});

//GET INVOICE
app.get("/invoice", async (req, res, next) => {
  try {
    console.log("ihza");
    // const { province } = req.query;
    // const { key } = req.headers;
    // console.log(key);
    const { UserId } = req.user;
    const dataInvoice = await User.findOne({
      include: Invoice,
      where: { id: UserId },
    });
    console.log(dataInvoice);
    // console.log(data.rajaongkir.results);
    // console.log(data.rajaongkir.results);

    res.status(200).json(dataInvoice);
  } catch (err) {
    next(err);
  }
});

//UPDATE STATUS INVOICE
app.post("/invoice/:invoiceId", async (req, res, next) => {
  try {
    const { UserId } = req.user;
    const { invoiceId } = req.params;

    const updateInvoice = await Invoice.update(
      {
        isPay: "LUNAS",
      },
      { where: { id: invoiceId } }
    );

    // console.log("lonotng");
    res.status(200).json({ msg: `invoive id:${invoiceId} LUNAS` });
  } catch (err) {
    next(err);
  }
});

//Raja Ongkir - GET /CITY FROM JAWA TIMUR
app.get("/city", async (req, res, next) => {
  try {
    console.log("ihza");
    // const { province } = req.query;
    // const { key } = req.headers;
    // console.log(key);
    const { data } = await axios.get(
      `https://api.rajaongkir.com/starter/city?province=11`,
      {
        headers: { key: "47a0a696c237a5da1e4037606950f67d" },
      }
    );
    // console.log(data.rajaongkir.results);
    // console.log(data.rajaongkir.results);

    res.status(200).json(data.rajaongkir.results);
  } catch (err) {
    next(err);
  }
});

//RajaOngkir - POST /COST
app.post("/cost", async (req, res, next) => {
  try {
    console.log("ihza");
    const { origin, destination, weight, courier } = req.body;
    console.log(req.body);
    const { data } = await axios.post(
      `https://api.rajaongkir.com/starter/cost`,
      {
        origin,
        destination,
        weight,
        courier,
      },
      {
        headers: { key: "47a0a696c237a5da1e4037606950f67d" },
      }
    );
    // console.log(data.rajaongkir.results);
    // console.log(data.rajaongkir.results);
    // console.log(data.rajaongkir.results[0].costs);

    res.status(200).json(data.rajaongkir.results[0].costs[0].cost[0].value);
  } catch (err) {
    next(err);
  }
});
//payment
app.post("/payment", async (req, res, next) => {
  try {
    // console.log("ihza bubu");
    const { gross_amount } = req.body;
    // console.log(req.body);
    // console.log(new Date().toISOString());
    let payload = JSON.stringify({
      transaction_details: {
        order_id: `ORDER - ${new Date().toISOString()}`,
        gross_amount,
      },
      credit_card: {
        secure: true,
      },
    });

    // console.log("bantalll");
    console.log(payload);
    const { data } = await axios.post(
      "https://app.midtrans.com/snap/v1/transactions",
      payload,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Basic TWlkLXNlcnZlci04UWdzNlVwVE80Z3dwcGdkVWFzQmxIVTQ6",
        },
      }
    );
    // console.log(data);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

//ERROR - HANDLER
app.use((err, req, res, next) => {
  console.log("ihzza");
  //   console.log(err);
  let statuscode = 500;
  let message = "Internal server error";
  console.log(err.name);
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    statuscode = 400;
    message = err.errors[0].message;
  } else if (err.name === "EMAIL_NOT_FOUND") {
    statuscode = 400;
    message = "Email is Require";
  } else if (err.name === "PASSWORD_NOT_FOUND") {
    statuscode = 400;
    message = "Password is Require";
  } else if (err.name === "UNAUTHORIZED") {
    statuscode = 401;
    message = "Invalid email/password";
  } else if (err.name === "JsonWebTokenError") {
    statuscode = 401;
    message = "Invalid token";
  } else if (err.name === "PRODUCT_NOT_FOUND") {
    statuscode = 404;
    message = "Product not found";
  } else if (err.name === "FORBIDDEN") {
    statuscode = 403;
    message = "You are not authorized";
  }
  res.status(statuscode).json({ message });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// module.exports = app;

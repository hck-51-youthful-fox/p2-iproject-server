const nodemailer = require("nodemailer");
const env = require("dotenv");

env.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 25,
  secure: false,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendMail = (email, username) => {
  let message = {
    from: process.env.AUTH_EMAIL, // sender address
    to: `${email}`, // list of receivers
    subject: "Welcome to RZ Hobby Shop", // Subject line
    text: `${username}, Welcome to RZ Hobby Shop
    Happy Shopping and enjoy`, // plain text body
  };

  transporter.sendMail(message);
};

module.exports = sendMail;

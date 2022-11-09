const nodemailer = require("nodemailer");

function mailer(data) {
  let mailTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smpt.gmail.com",
    port: 587,
    secure: true,
    auth: {
      user: "wuss140196gmail.com",
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  let detail = {
    from: "wuss140196gmail.com",
    to: data,
    subject: "Congratulations",
    text: "Welcome Brother, enjoy our service and information about NBA Basketball",
  };

  mailTransport.sendMail(detail, (err) => {
    if (err) {
      console.log(`Something went wrong!`, err);
    } else {
      console.log("success sending email");
    }
  });
}

module.exports = mailer;

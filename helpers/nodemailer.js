const nodemailer = require("nodemailer");

function mailer(data) {
  let mailTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smpt.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "wus140196@gmail.com",
      pass: "elglvhnrgiobouhg",
      //   elglvhnrgiobouhg
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  let detail = {
    from: "wus140196@gmail.com",
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

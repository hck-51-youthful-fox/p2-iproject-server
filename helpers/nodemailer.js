const nodemailer = require("nodemailer");

function sendMail() {
  // async..await is not allowed in global scope, must use a wrapper
  // async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();
  const template = `
    <div
        style="
            background: #EB1616;
            text-align: center;
            font-family: Arial;"
    >
          <h1>Thanks for your Payment!</h1>
       <h3>Dah gitu aja </h3>
    </div>
    
    `;
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "investr-project@outlook.com",
      pass: "AmpunDah",
    },
    // tls: { rejectUnauthorized: false}
  });

  let options = {
    from: "investr-project@outlook.com", // sender address
    to: "r.irfannawwaf@outlook.com", // list of receivers
    subject: "Hello ✔", // Subject line
    // text: "Hello world?", // plain text body
    html: template, // html body
  };

  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(info.response);
  });
}

module.exports = {
  sendMail,
};

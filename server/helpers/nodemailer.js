"use strict";
const nodemailer = require("nodemailer");
const user = require("../models/user");

function sendMail (email) {

// async..await is not allowed in global scope, must use a wrapper
// async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();
	const template = `
	<div
		style="
			background: #e2d4f0;
			padding: 30px 0;
			text-align: center;
			font-family: Arial;"
	>
  		<h1>Thanks for your subscription!</h1>
		<img src="https://www.freepnglogos.com/uploads/youtube-logo-hd-8.png" width="30"/>
	</div>
	<div style="margin: 0 auto; max-width: 720px; padding: 30px 0; font-family: Arial">
  		<h3>Hello, ${email}
  		<p> You are now a Premium Member. </p>
  		<p> Please enjoy all the benefits we provide crafted just for you. </p>
	</div>
	<div
		style="
			background: #4b2179;
			padding: 30px 0;
			text-align: center;
			font-family: Arial;
			color: #fff;"
	>
  		<p>&copy 2022 Avinska</p>
	</div>
	`
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "hotmail", 
    auth: {
      user: "youchub-app@outlook.com",
      pass: "Nyusahin",
    },
    // tls: { rejectUnauthorized: false}
  })

  let options = {
    from: 'youchub-app@outlook.com', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    // text: "Hello world?", // plain text body
    html: template, // html body
  } 

transporter.sendMail(options, (err, info) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(info.response)
})
}

module.exports = {
	sendMail
};

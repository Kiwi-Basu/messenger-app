const nodemailer = require("nodemailer");

const sendMail = async (email, message) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_AUTHORIZED_USER,
      pass: process.env.SMTP_AUTHORIZED_PASSWORD
    }
  })

  await transporter.sendMail({
    from: process.env.SMTP_AUTHORIZED_USER,
    to: email,
    subject: "OTP Verification",
    text: "OTP for verification of account is " + message
  })

}

module.exports = sendMail
const nodemailer = require('nodemailer');

const {
  SMTP_HOST, SMTP_PORT, APP_EMAIL, APP_EMAIL_PASSWORD,
} = process.env;

const mail = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: true,
  auth: {
    user: APP_EMAIL,
    pass: APP_EMAIL_PASSWORD,
  },
});

module.exports = mail;

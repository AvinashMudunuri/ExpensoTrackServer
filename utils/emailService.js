const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  secure: true,
  port: 465,
  auth: {
    user: 'info@avinashmudunuri.com',
    pass: 'iKJD5FqtqV4z',
  },
  logger: true,
  debug: true,
});
const sendConfirmationMail = async (email, token) => {
  const confirmationUrl = `http://localhost:3000/auth/confirm/${token}`;
  const mailOptions = {
    from: 'info@avinashmudunuri.com',
    to: email,
    subject: `Email Confirmation`,
    html: `<p>Please confirm your email by clicking the following linkL <a href="${confirmationUrl}">Confirm Email</a></p>`,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = { sendConfirmationMail };

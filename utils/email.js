const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config({ path: '../config.env' });

module.exports = class Email {
  constructor(admin, url) {
    this.to = admin.email;
    this.firstName = admin.fullName.split(' ')[0];
    this.url = url;
    this.from = 'Hamro Blood Bank';
  }

  newTransport() {
    nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.USERNAME_EMAIL,
        pass: process.env.PASSWORD_EMAIL,
      },
    });
  }

  async send(subject) {
    const emailOptions = {
      from: this.from,
      to: this.to,
      subject,
    };
    await this.newTransport().sendMail(emailOptions);
  }
  async sendPasswordReset() {
    await this.send('Password Reset Link');
  }
};

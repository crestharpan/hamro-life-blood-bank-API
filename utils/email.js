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
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(subject) {
    const emailOptions = {
      from: this.from,
      to: this.to,
      text: `Hello ${this.firstName},\n\nYou requested a password reset. Please click the link below:\n${this.url}\n\nIf you did not request this, please ignore this email.\n\n- Hamro Blood Bank`,
      subject,
    };
    await this.newTransport().sendMail(emailOptions);
  }
  async sendPasswordReset() {
    await this.send('Password Reset Link');
  }
};

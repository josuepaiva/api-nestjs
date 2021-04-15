import * as nodemailer from 'nodemailer';
import config from '../configs/mailer.config';

class Mail {
  constructor(
    public to?: string,
    public subject?: string,
    public message?: string,
  ) {}
  sendMail() {
    const mailOptions = {
      from: 'apptest@test.com.br',
      to: this.to,
      subject: this.subject,
      html: this.message,
    };

    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: false,
      auth: {
        user: config.user,
        pass: config.password,
      },
      tls: { rejectUnauthorized: false },
    });

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return error;
      } else {
        return 'E-mail enviado com sucesso!';
      }
    });
  }
}

export default new Mail();

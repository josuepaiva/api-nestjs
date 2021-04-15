import Mail from '../email/email';

class EmailPromise {
  async send(delay, value) {
    return new Promise((resolve) => {
      setTimeout(async () => {
        const valueParsed = JSON.parse(value);
        const email = valueParsed.user.email;
        const products = valueParsed.products;
        Mail.to = email;
        Mail.subject = 'favorites';
        Mail.message = JSON.stringify(products);
        const result = Mail.sendMail();
        resolve(result);
      }, delay);
    });
  }
}

export default new EmailPromise();

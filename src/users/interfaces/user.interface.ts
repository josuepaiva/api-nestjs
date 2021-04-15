export interface UserInterface {
  _id?: string;
  name: string;
  email: string;
  password: string;
  salt: string;
  productsFavorits: [string];
}

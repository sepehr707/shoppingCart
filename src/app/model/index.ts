import {Sequelize} from "sequelize";
import {DBConfig} from "../config/db.config";
import {Product} from './interface/product.interface';
import {Cart} from "./interface/cart.interface";
import {CartProduct} from "./interface/cart-product.interface";

const sequelize = new Sequelize(DBConfig.database, DBConfig.username, DBConfig.password, {
  host: DBConfig.host,
  dialect: "mysql",
  timezone: "+00:00",
  port: DBConfig.port
});

const products = Product(sequelize);
const carts = Cart(sequelize);
const cartProducts = CartProduct(sequelize);

export const db = {
  sequelize,
  products,
  carts,
  cartProducts
}




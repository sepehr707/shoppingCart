import {Op, QueryTypes} from 'sequelize';
import {db} from '../model';
import {Request, Response} from "express";
import {CartAttributes} from "../model/interface/cart.interface";
import {CartProductAttributes} from "../model/interface/cart-product.interface";

const carts = db.carts;
const cartProducts = db.cartProducts;

interface CartItem {
  title: string;
  productCount: number;
  price: number;
  total: string;
}

export const insertCartItem = async (req: Request, res: Response) => {
  try {
    let cartId = 0;
    const existedCart = await getActiveCart();
    if(!existedCart){
      const cart: CartAttributes = {
        paid: false
      }
      const insertedCart = await carts.create(cart);
      cartId = insertedCart.getDataValue('id');
    } else {
      cartId = existedCart.getDataValue('id');
    }
    const cartProduct: CartProductAttributes = {
      cartId: cartId,
      productId: +req.body.productId,
      productCount: +req.body.productCount
    }
    const existedItem = await cartProducts.findOne({where: {
      [Op.and] : [
        {cartId: cartId},
        {productId: cartProduct.productId}
      ]
      }});
    if(!existedItem){
      const insertedCartProduct = await cartProducts.create(cartProduct);
    } else {
      const updated = await cartProducts.update({productCount: cartProduct.productCount + existedItem.getDataValue('productCount')}, {where: {id: existedItem.getDataValue('id')}})
    }
    const activeCart = await cartItems(cartId);

    res.status(200).send({activeCart});
  } catch (err) {
    res.status(500).send({err});
  }
}

export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const activeCart = await getActiveCart();
    const cartId = activeCart?.getDataValue('id');
    const cartProduct = await cartProducts.findOne({where: {
      [Op.and] : [
        {cartId: cartId},
        {productId: productId}
      ]
      }});
    const cartProductId = cartProduct?.getDataValue('id')
    const productCount = +req.body.productCount;
    if(productCount === 0){
      const deleted = await cartProducts.destroy({where: {id: cartProductId}})
    } else {
      const updated = await cartProducts.update({productCount: productCount}, {where: {id: cartProductId}});
    }
    const items = await cartItems(cartId);
    res.status(200).send({activeCart: items});
  } catch (err) {
    res.status(500).send({err})
  }
}

export const getActiveCartItems = async (req: Request, res: Response) => {
  try {
    const activeCart = await getActiveCart();
    const cartId = !activeCart ? 0 : activeCart.getDataValue('id');
    const activeCartItems = await cartItems(cartId);

    res.status(200).send({ActiveCart: activeCartItems});

  } catch (err) {
    res.status(500).send({err})
  }
}

export const checkout = async (req: Request, res: Response) => {
  try {
    const cart = await getActiveCart();
    const cartId = !cart ? 0 : cart.getDataValue('id');
    if(cartId === 0) {
      return res.status(200).send({Message: 'No active cart'});
    }
    const items = await cartItems(cartId);
    if(!items){
      return res.status(200).send({Message: 'No active cart'});
    }

    const invoice = {
      checkedOut: true,
      sum: {
        Products: items.length,
        Count: items.map(val => val.productCount).reduce((sum, value) => sum + value),
        TotalPrice: items.map(val => parseFloat(val.total)).reduce((sum, value) => sum + value)
      },
      items: items
    }

    await carts.update({paid: true}, {where: {id: cartId}});

    res.status(200).send({invoice});
  } catch (err) {
    res.status(500).send({err})
  }
}

const getActiveCart = () => {
  return carts.findOne({where: {paid: false}});
}

const cartItems = (cartId: number): Promise<CartItem[]> => {
  const query = `select Products.title, CartProducts.productCount, Products.price, CartProducts.productCount * Products.price as total from CartProducts, Products where CartProducts.productId = Products.Id and CartProducts.cartId = ${cartId}`

  return db.sequelize.query(query, {type: QueryTypes.SELECT});
}

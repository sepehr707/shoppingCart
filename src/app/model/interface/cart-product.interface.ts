import {Sequelize, DataTypes } from "sequelize";

export interface CartProductAttributes {
  id?: number;
  cartId: number;
  productId: number;
  productCount: number;
}

export const CartProduct = (sequelize: Sequelize) => {
  return sequelize.define("CartProduct", {
    cartId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    productCount: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  });
}


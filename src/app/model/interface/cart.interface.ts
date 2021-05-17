import {Sequelize,DataTypes } from "sequelize";

export interface CartAttributes {
  id?: number;
  paid: boolean;
}

export const Cart = (sequelize: Sequelize) => {
  return sequelize.define("Cart", {
    paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
}


import {Sequelize, DataTypes} from "sequelize";

export interface ProductAttributes {
  id?: number;
  title: string,
  description: string,
  price: number,
  picture?: string
}

export const Product = (sequelize: Sequelize) => {
  const Product = sequelize.define('Product', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    picture: {
      type: DataTypes.STRING
    }
  });

  return Product;
}

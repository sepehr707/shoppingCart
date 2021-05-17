import {Op} from 'sequelize';
import {db} from '../model';
import {Request, Response} from "express";
const products = db.products;
import {ProductAttributes} from '../model/interface/product.interface';

export const insertProduct = async (req: Request, res: Response) => {
  try {
    const product: ProductAttributes = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      picture: req.body.picture || null
    }

    const inserted = await products.create(product)
    res.status(200).send({product: inserted});

  } catch (err) {
    res.status(500).send({err})
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product: ProductAttributes = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      picture: req.body.picture || null
    }
    const id = req.params.id;
    const isUpdated = await products.update(product, {where: {id: id}});

    res.status(200).send({isUpdated});
  } catch (err) {
    res.status(500).send({err})
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const isDeleted = await products.destroy({where: {id: id}})
    res.status(200).send({isDeleted});
  } catch (err) {
    res.status(500).send({err})
  }
}

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const title = req.body.title || '';
    const description = req.body.description || '';
    const condition = {
      [Op.and] : [
        {title: {[Op.substring]: title}},
        {description: {[Op.substring]: description}}
      ]
    }
    const filteredProducts = await products.findAll({attributes: ['title', 'description', 'picture','price'], where: condition})
    res.status(200).send({products: filteredProducts});
  } catch (err) {
    res.status(500).send({err})
  }
}

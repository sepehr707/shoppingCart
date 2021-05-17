import {Router} from "express";
import * as service from '../service/product.service';

export const router = Router();
router.post('/', service.insertProduct);
router.patch('/:id', service.updateProduct);
router.delete('/:id', service.deleteProduct);
router.get('/products', service.getAllProducts);

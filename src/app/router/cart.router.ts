import {Router} from "express";
import * as service from '../service/cart.service';

export const router = Router();
router.post('/', service.insertCartItem);
router.patch('/:productId', service.updateCartItem);
router.get('/items', service.getActiveCartItems);
router.get('/checkout', service.checkout);

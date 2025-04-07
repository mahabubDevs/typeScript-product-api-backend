import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cart.controller';

const router = express.Router();

router.post('/', addToCart);
router.get('/:userId', getCart);
router.delete('/', removeFromCart);

export default router;

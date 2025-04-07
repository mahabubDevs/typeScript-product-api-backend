import express from 'express';
import { createOrder, getUserOrders, updateOrderStatus } from '../controllers/order.controller';

const router = express.Router();

router.post('/', createOrder);
router.get('/:userId', getUserOrders);
router.put('/:id', updateOrderStatus);

export default router;

import express from 'express';
import { addToWishlist, getWishlist, removeFromWishlist } from '../controllers/wishlist.controller';

const router = express.Router();

router.post('/', addToWishlist);
router.get('/:userId', getWishlist);
router.delete('/', removeFromWishlist);

export default router;

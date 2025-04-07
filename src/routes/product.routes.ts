import express from 'express';
import { createProduct, getAllProducts } from '../controllers/product.controller';
import upload from '../middleware/upload';

const router = express.Router();

router.post('/', upload.single('image'), createProduct);
router.get('/', getAllProducts);

export default router;

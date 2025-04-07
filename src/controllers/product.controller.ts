import { Request, Response } from 'express';
import Product from '../models/Product';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = new Product(req.body);
    if (req.file) newProduct.image = req.file.path;
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllProducts = async (_: Request, res: Response) => {
  const products = await Product.find();
  res.json(products);
};

// add getOne, update, delete similarly

import { Request, Response } from 'express';
import Cart from '../models/Cart';

export const addToCart = async (req: Request, res: Response) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [{ productId, quantity }] });
    } else {
      const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCart = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('products.productId');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findOne({ userId: req.body.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.products = cart.products.filter(p => p.productId.toString() !== req.body.productId);
    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

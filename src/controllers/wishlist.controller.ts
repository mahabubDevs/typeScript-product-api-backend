import { Request, Response } from 'express';
import Wishlist from '../models/Wishlist';

export const addToWishlist = async (req: Request, res: Response) => {
  const { userId, productId } = req.body;

  try {
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [productId] });
    } else if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
    }

    await wishlist.save();
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getWishlist = async (req: Request, res: Response) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.userId }).populate('products');
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeFromWishlist = async (req: Request, res: Response) => {
  const { userId, productId } = req.body;

  try {
    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });

    wishlist.products = wishlist.products.filter(p => p.toString() !== productId);
    await wishlist.save();

    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

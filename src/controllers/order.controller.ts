import { Request, Response } from 'express';
import Order from '../models/Order';
import stripe from '../config/stripe';

export const createOrder = async (req: Request, res: Response) => {
  const { userId, products, amount, address } = req.body;

  try {
    // Create Stripe PaymentIntent (simulated)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // in cents
      currency: 'usd',
      metadata: { integration_check: 'accept_a_payment' },
    });

    const order = new Order({
      userId,
      products,
      amount,
      address,
      paymentIntentId: paymentIntent.id,
    });

    await order.save();
    res.status(201).json({ order, clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate('products.productId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

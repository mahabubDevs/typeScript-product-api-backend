import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import productRoutes from './routes/product.routes'; // Product routes
import cartRoutes from './routes/cart.routes'; // Cart routes
import wishlistRoutes from './routes/wishlist.routes'; // Wishlist routes
import orderRoutes from './routes/order.routes'; // Order routes

// Optional: import authRoutes when you implement auth
// import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/orders', orderRoutes);
// app.use('/api/auth', authRoutes); // future

// Root route
app.get('/', (_, res) => {
  res.send('E-Commerce API is running ');
});

// Connect MongoDB and start server
mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    app.listen(PORT, () => {
      console.log(` Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });

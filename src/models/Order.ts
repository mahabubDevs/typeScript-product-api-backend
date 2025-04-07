import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    }
  ],
  amount: { type: Number, required: true },
  address: Object,
  status: { type: String, default: 'Pending' },
  paymentIntentId: String,
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);

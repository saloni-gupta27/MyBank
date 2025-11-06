// server/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import txnRoutes from './routes/transaction.js';

dotenv.config();
const app = express();

const allowedOrigins =["my-bank-eight-umber.vercel.app", "http://localhost:3000"]
app.use(cors({
  origin:allowedOrigins,
  credentials:true
}));
app.use(express.json()); // for parsing application/json

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/transactions', txnRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error('DB Connection Error:', err));

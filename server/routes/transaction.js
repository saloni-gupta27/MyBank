import express from 'express';
import { sendMoney, getMyTransactions } from '../controllers/transactionController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/send', authMiddleware, sendMoney);
router.get('/view', authMiddleware, getMyTransactions);

export default router;

import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

export const sendMoney = async (req, res) => {
  const { toUserEmail, amount, note } = req.body;

  if (!toUserEmail || !amount) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const fromUser = await User.findById(req.user.id);
  const toUser = await User.findOne({ email: toUserEmail });

  if (!toUser) return res.status(404).json({ message: 'Recipient not found' });
  if (fromUser._id.equals(toUser._id)) return res.status(400).json({ message: 'Cannot send to yourself' });
  if (fromUser.balance < amount) return res.status(400).json({ message: 'Insufficient funds' });

  // Update balances
  fromUser.balance -= amount;
  toUser.balance += amount;

  await fromUser.save();
  await toUser.save();

  // Record transaction
  const txn = new Transaction({
    fromUser: fromUser._id,
    toUser: toUser._id,
    amount,
    note,
  });

  await txn.save();

  res.status(200).json({ message: 'Transaction successful', txn });
};

export const getMyTransactions = async (req, res) => {
  const txns = await Transaction.find({
    $or: [{ fromUser: req.user.id }, { toUser: req.user.id }],
  })
    .sort({ createdAt: -1 })
    .populate('fromUser', 'email')
    .populate('toUser', 'email');

  res.status(200).json(txns);
};

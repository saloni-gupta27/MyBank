import React, { useEffect, useState } from 'react'
import API from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [transactions, setTransactions] = useState([]);
  
    useEffect(() => {
      const fetchTxns = async () => {
        const res = await API.get('/transactions/view');
        setTransactions(res.data);
      };
      fetchTxns();
    }, []);

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <p>Balance: €{user?.balance}</p>
      <button onClick={logout}>Logout</button>

      <h3>Transactions</h3>
      <ul>
        {transactions.map((txn) => (
          <li key={txn._id}>
            To: {txn.toUser.email} | Amount: €{txn.amount} | Note: {txn.note}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dashboard

import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTxns = async () => {
      const res = await API.get("/transactions/view");
      setTransactions(res.data);
    };
    fetchTxns();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Dashboard</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-2">Hello, {user?.name}</h2>
        <p className="text-gray-600">Account Balance:</p>
        <p className="text-3xl font-bold text-green-600">
          ₹{user?.balance?.toFixed(2)}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        {transactions.length === 0 ? (
          <p className="text-gray-500">No transactions found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {transactions.map((txn, index) => (
              <li
                key={index}
                className="py-3 flex justify-between items-center"
              >
                <div>
                  <p className="text-sm text-gray-700">
                    {txn.toUser._id === user._id ? (
                      <>
                        Received from <strong>{txn.fromUser.email}</strong>
                      </>
                    ) : (
                      <>
                        Sent to <strong>{txn.toUser.email}</strong>
                      </>
                    )}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(txn.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`text-lg font-semibold ${
                    txn.type === "credit" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {txn.type === "credit" ? "+" : "-"} ₹{txn.amount}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

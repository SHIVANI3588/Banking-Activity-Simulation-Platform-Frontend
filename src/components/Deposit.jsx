import { useState } from "react";
import axios from "axios";

export default function Deposit({ user, setPage, updateBalance }) {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleDeposit = async () => {
    try {
      const response = await axios.post("http://localhost:8081/api/transactions/deposit", null, {
        params: {
          accountNumber: user.accountNumber,
          amount: amount
        }
      });
      // Backend now returns JSON with { message, newBalance }
      const data = response.data;
      const newBalance = data.newBalance;

      // Update global user state
      if (typeof updateBalance === 'function') {
        updateBalance(newBalance);
      }

      setPage("transaction-success", {
        type: "Deposit",
        amount: amount,
        finalBalance: newBalance,
        date: new Date().toLocaleString()
      });

    } catch (error) {
      setMessage("Deposit failed: " + (error.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <div className="container">
      <h2>Deposit</h2>
      {message && <p>{message}</p>}
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button onClick={handleDeposit}>Deposit</button>

      <div style={{ marginTop: "20px" }}>
        <button className="btn btn-secondary" onClick={() => setPage("dashboard")}>Cancel / Back</button>
      </div>
    </div>
  );
}

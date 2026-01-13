import { useState } from "react";
import axios from "axios";

export default function Withdraw({ user, setPage, updateBalance }) {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleWithdraw = async () => {
    try {
      const response = await axios.post("http://localhost:8081/api/transactions/withdraw", null, {
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
        type: "Withdrawal",
        amount: amount,
        finalBalance: newBalance,
        date: new Date().toLocaleString()
      });

    } catch (error) {
      setMessage("Withdraw failed: " + (error.response?.data?.message || "Insufficient funds or Error"));
    }
  };

  return (
    <div className="container">
      <h2>Withdraw</h2>
      {message && <p>{message}</p>}
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button onClick={handleWithdraw}>Withdraw</button>

      <div style={{ marginTop: "20px" }}>
        <button className="btn btn-secondary" onClick={() => setPage("dashboard")}>Cancel / Back</button>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import axios from "axios";

export default function Balance({ user, setPage }) {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8081/api/accounts/${user.accountNumber}/balance`)
      .then(res => setBalance(res.data))
      .catch(err => console.error(err));
  }, [user.accountNumber]);

  return (
    <div className="container">
      <h2>Account Balance</h2>
      <h1>{balance !== null ? `₹${balance}` : "Loading..."}</h1>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setPage("dashboard")}>Back to Dashboard</button>
        <button onClick={() => setPage("deposit")}>Deposit</button>
        <button onClick={() => setPage("withdraw")}>Withdraw</button>
      </div>
    </div>
  );
}

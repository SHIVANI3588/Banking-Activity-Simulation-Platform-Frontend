import { useState } from "react";
import axios from "axios";

export default function Login({ setPage, setUser }) {
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8081/api/accounts/login", {
        accountNumber,
        password,
      });

      setUser({
        name: response.data.name,
        accountNumber: accountNumber,
        balance: response.data.balance
      });

    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        // Backend error (e.g., 500 or 400 or 401)
        // If backend returns { message: "..." } or string
        const msg = err.response.data.message || JSON.stringify(err.response.data);
        setError(msg);
      } else {
        setError("Server unreachable or Network Error");
      }
    }
  };

  return (
    <div className="container">
      <h2>Bank Simulator Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        placeholder="Account Number"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => setPage("create")}>Create Account</button>
    </div>
  );
}

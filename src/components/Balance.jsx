import { useState, useEffect } from "react";
import axios from "axios";
import BackButton from "./BackButton";

export default function Balance({ user, setPage }) {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (user && user.accountNumber) {
      axios.get(`http://localhost:8081/api/accounts/${user.accountNumber}/balance`)
        .then(res => setBalance(res.data))
        .catch(err => console.error(err));
    }
  }, [user]);

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      backgroundColor: "#1e272e", // Premium Dark Grey
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      position: "relative" // Added relative to allow absolute positioning of children
    }}>
      <div style={{ position: "absolute", top: "40px", left: "40px", backgroundColor: "white", borderRadius: "30px", padding: "0", zIndex: 10 }}>
        <BackButton setPage={setPage} targetPage="dashboard" />
      </div>

      <div style={{ width: "100%", maxWidth: "500px", padding: "20px" }}>

        <div style={{ marginBottom: "20px" }}>
          {/* Space holder or remove entirely since button is moved */}
        </div>

        <h2 style={{ textAlign: "center", marginBottom: "40px", fontWeight: "300" }}>Your Wallet</h2>

        {/* Balance Card - Credit Card Style */}
        <div style={{
          background: "linear-gradient(135deg, #c31432, #240b36)", // Red/Purple Gradient
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          position: "relative",
          marginBottom: "50px",
          border: "1px solid rgba(255,255,255,0.1)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px" }}>
            <span style={{ fontSize: "20px", fontWeight: "bold", letterSpacing: "2px" }}>BANK CARD</span>
            <span style={{ opacity: 0.8 }}>DEBIT</span>
          </div>

          <div style={{ fontSize: "14px", opacity: 0.7, marginBottom: "5px" }}>Available Balance</div>
          <div style={{ fontSize: "48px", fontWeight: "bold", textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
            {balance !== null ? `$${balance.toFixed(2)}` : "Loading..."}
          </div>

          <div style={{ marginTop: "40px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div style={{ fontSize: "10px", opacity: 0.7 }}>CARD HOLDER</div>
              <div style={{ fontSize: "16px", fontWeight: "bold", textTransform: "uppercase" }}>{user.name}</div>
            </div>
            <div style={{ fontSize: "18px" }}>•••• {user.accountNumber ? user.accountNumber.slice(-4) : "0000"}</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "15px" }}>
          <button
            onClick={() => setPage("deposit")}
            className="btn btn-success"
            style={{ flex: 1, padding: "15px", borderRadius: "10px", fontWeight: "bold" }}
          >
            Deposit
          </button>
          <button
            onClick={() => setPage("withdraw")}
            className="btn btn-danger"
            style={{ flex: 1, padding: "15px", borderRadius: "10px", fontWeight: "bold" }}
          >
            Withdraw
          </button>
        </div>

      </div>
    </div>
  );
}

import React, { useState } from "react";
import BackButton from "./BackButton";

function Withdraw({ user, setPage, updateBalance }) {
  const [amount, setAmount] = useState("");

  const handleWithdraw = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8081/api/transactions/withdraw?accountNumber=${user.accountNumber}&amount=${amount}`, {
        method: "POST"
      });
      if (response.ok) {
        const data = await response.json();
        updateBalance(data.newBalance);
        setPage("transaction-success", { type: "Withdraw", amount: amount, balance: data.newBalance });
      } else {
        alert("Insufficient funds or invalid amount");
      }
    } catch (error) {
      alert("Error processing withdrawal");
    }
  };

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      width: "100%",
      backgroundColor: "#2c3e50", // Dark Background
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "500px",
        backgroundColor: "white",
        borderRadius: "20px",
        padding: "40px",
        position: "relative",
        boxShadow: "0 20px 50px rgba(0,0,0,0.5)"
      }}>
        <div style={{ position: "absolute", top: "-60px", left: "0", backgroundColor: "white", borderRadius: "30px", padding: "0" }}>
          <BackButton setPage={setPage} targetPage="dashboard" />
        </div>

        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2 style={{ color: "#c0392b", fontSize: "32px", margin: "0 0 10px 0" }}>Withdraw Cash</h2>
          <p style={{ color: "#7f8c8d" }}>Current Balance: <strong style={{ color: "#2c3e50" }}>${user.balance.toFixed(2)}</strong></p>
        </div>

        <form onSubmit={handleWithdraw}>
          <div style={{ marginBottom: "30px" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              borderBottom: "2px solid #ddd",
              paddingBottom: "10px"
            }}>
              <span style={{ fontSize: "36px", color: "#c0392b", marginRight: "10px" }}>$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                required
                min="1"
                style={{
                  border: "none",
                  fontSize: "36px",
                  width: "100%",
                  outline: "none",
                  color: "#333",
                  fontWeight: "bold"
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "20px",
              backgroundColor: "#c0392b",
              color: "white",
              fontSize: "18px",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
              letterSpacing: "1px",
              textTransform: "uppercase"
            }}
          >
            Withdraw Now
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: "12px", color: "#aaa", marginTop: "20px" }}>
          Please ensure you have sufficient funds before proceeding.
        </p>
      </div>
    </div>
  );
}

export default Withdraw;

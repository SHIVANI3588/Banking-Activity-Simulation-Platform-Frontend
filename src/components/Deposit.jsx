import React, { useState } from "react";
import BackButton from "./BackButton";

function Deposit({ user, setPage, updateBalance }) {
  const [amount, setAmount] = useState("");

  const handleDeposit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8081/api/transactions/deposit?accountNumber=${user.accountNumber}&amount=${amount}`, {
        method: "POST"
      });
      if (response.ok) {
        const data = await response.json();
        updateBalance(data.newBalance);
        setPage("transaction-success", { type: "Deposit", amount: amount, balance: data.newBalance });
      } else {
        alert("Deposit failed");
      }
    } catch (error) {
      alert("Error processing deposit");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", width: "100%" }}>

      {/* Left Panel - Information/Visual */}
      <div style={{
        flex: "1",
        backgroundColor: "#27ae60",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "60px",
        position: "relative"
      }}>
        <div style={{ position: "absolute", top: "40px", left: "40px", backgroundColor: "white", borderRadius: "30px", padding: "0" }}>
          <BackButton setPage={setPage} targetPage="dashboard" />
        </div>

        <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>Add Funds</h1>
        <p style={{ fontSize: "20px", opacity: 0.9, lineHeight: "1.6" }}>
          Securely deposit money into your account. Your new balance will be updated instantly.
        </p>
        <div style={{ marginTop: "50px", fontSize: "100px", opacity: 0.2 }}>
          💰
        </div>
      </div>

      {/* Right Panel - Form */}
      <div style={{
        flex: "1",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px"
      }}>
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <h2 style={{ color: "#333", marginBottom: "30px" }}>Enter Amount</h2>

          <form onSubmit={handleDeposit}>
            <div style={{ marginBottom: "30px" }}>
              <label style={{ display: "block", color: "#666", marginBottom: "10px" }}>Amount to Deposit ($)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                required
                min="1"
                style={{
                  width: "100%",
                  padding: "15px",
                  fontSize: "24px",
                  border: "2px solid #eee",
                  borderRadius: "10px",
                  outline: "none"
                }}
                onFocus={(e) => e.target.style.borderColor = "#27ae60"}
                onBlur={(e) => e.target.style.borderColor = "#eee"}
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "15px",
                backgroundColor: "#27ae60",
                color: "white",
                fontSize: "18px",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow: "0 4px 15px rgba(39, 174, 96, 0.3)"
              }}
            >
              Confirm Deposit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Deposit;

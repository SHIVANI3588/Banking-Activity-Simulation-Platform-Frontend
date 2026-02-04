import React from "react";

export default function Dashboard({ setPage, user, logout }) {
  const actions = [
    { label: "Deposit Funds", page: "deposit", color: "#27ae60", icon: "💰" },
    { label: "Withdraw Funds", page: "withdraw", color: "#c0392b", icon: "🏧" },
    { label: "Transfer Money", page: "transfer", color: "#2980b9", icon: "💸" },
    { label: "Check Balance", page: "balance", color: "#8e44ad", icon: "⚖️" },
    { label: "My Profile", page: "profile", color: "#f39c12", icon: "👤" },
  ];

  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      backgroundColor: "#f0f2f5",
      padding: "40px"
    }}>
      {/* Header Section */}
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "50px",
        backgroundColor: "white",
        padding: "20px 30px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
      }}>
        <div>
          <h2 style={{ margin: 0, color: "#2c3e50" }}>Hello, {user.name}</h2>
          <p style={{ margin: "5px 0 0 0", color: "#7f8c8d" }}>Account #{user.accountNumber}</p>
        </div>
        <button
          onClick={logout}
          style={{
            backgroundColor: "#e74c3c",
            padding: "10px 25px",
            borderRadius: "5px",
            fontWeight: "bold",
            width: "auto"
          }}
        >
          Logout
        </button>
      </header>

      {/* Balance Card */}
      <div style={{
        background: "linear-gradient(135deg, #2980b9, #2c3e50)",
        color: "white",
        padding: "40px",
        borderRadius: "20px",
        marginBottom: "40px",
        textAlign: "center",
        boxShadow: "0 10px 20px rgba(44, 62, 80, 0.3)"
      }}>
        <h3 style={{ margin: 0, fontWeight: "300", opacity: 0.8 }}>Available Balance</h3>
        <h1 style={{ fontSize: "56px", margin: "10px 0" }}>${Number(user.balance).toFixed(2)}</h1>
      </div>

      {/* Actions Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px"
      }}>
        {actions.map((action) => (
          <div
            key={action.page}
            onClick={() => setPage(action.page)}
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "15px",
              textAlign: "center",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 10px 15px rgba(0,0,0,0.1)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "15px" }}>{action.icon}</div>
            <h4 style={{ margin: 0, color: "#34495e" }}>{action.label}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

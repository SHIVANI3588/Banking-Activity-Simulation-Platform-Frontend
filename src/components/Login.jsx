import React, { useState } from "react";
import axios from "axios";
import BackButton from "./BackButton"; // Assuming you might want a back button to Landing, though usually Login is top level from Landing

export default function Login({ setPage, setUser }) {
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/api/accounts/login", {
        accountNumber,
        password,
      });

      setUser({
        name: response.data.name,
        accountNumber: accountNumber,
        balance: Number(response.data.balance)
      });
      setPage("dashboard");

    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        const msg = err.response.data.message || JSON.stringify(err.response.data);
        setError(msg);
      } else {
        setError("Server unreachable or Network Error");
      }
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", width: "100%" }}>

      {/* Left Decoration Panel */}
      <div style={{
        flex: "1",
        background: "linear-gradient(135deg, #1a237e 0%, #283593 100%)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        textAlign: "center"
      }}>
        <div style={{ fontSize: "80px", marginBottom: "20px" }}>🏦</div>
        <h1 style={{ fontWeight: "300", fontSize: "40px", marginBottom: "10px" }}>Secure Banking</h1>
        <p style={{ opacity: 0.7, maxWidth: "400px", lineHeight: "1.6" }}>
          Access your accounts, manage transactions, and track your finances with industry-leading security.
        </p>
      </div>

      {/* Right Form Panel */}
      <div style={{
        flex: "1",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px"
      }}>
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <div style={{ marginBottom: "30px", textAlign: "left" }}>
            <BackButton setPage={setPage} targetPage="landing" />
          </div>

          <h2 style={{ color: "#2c3e50", marginBottom: "30px", fontSize: "32px" }}>Welcome Back</h2>

          {error && (
            <div className="alert alert-danger" style={{ marginBottom: "20px", borderRadius: "8px" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group" style={{ marginBottom: "20px" }}>
              <label style={{ fontWeight: "600", color: "#34495e", marginBottom: "8px", display: "block" }}>Account Number</label>
              <input
                className="form-control"
                placeholder="e.g. 123456789"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ced4da" }}
                required
              />
            </div>
            <div className="form-group" style={{ marginBottom: "30px" }}>
              <label style={{ fontWeight: "600", color: "#34495e", marginBottom: "8px", display: "block" }}>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ced4da" }}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              style={{
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: "#1a237e",
                borderColor: "#1a237e",
                fontWeight: "bold",
                fontSize: "16px"
              }}
            >
              Login to Account
            </button>
          </form>

          <div style={{ marginTop: "30px", textAlign: "center", color: "#7f8c8d" }}>
            New to our bank?
            <button
              onClick={() => setPage("create")}
              style={{
                background: "none",
                border: "none",
                color: "#1a237e",
                fontWeight: "bold",
                cursor: "pointer",
                textDecoration: "underline",
                marginLeft: "5px"
              }}
            >
              Create an account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

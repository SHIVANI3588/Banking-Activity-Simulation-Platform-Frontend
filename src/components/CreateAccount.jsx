import React, { useState } from "react";
import axios from "axios";
import BackButton from "./BackButton";

export default function CreateAccount({ setPage }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    balance: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.email || !formData.phone || !formData.balance || !formData.password) {
      setError("All fields are required.");
      return;
    }

    try {
      const payload = {
        ...formData,
        balance: Number(formData.balance)
      };

      const response = await axios.post("http://localhost:8081/api/accounts/create", payload);
      setSuccess(`Account Created! Your Account Number is: ${response.data.accountNumber}`);
      setTimeout(() => setPage("login"), 5000); // Give user time to read account number
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || err.response?.data || err.message || "Backend not reachable";
      setError("Failed to create account: " + (typeof msg === 'object' ? JSON.stringify(msg) : msg));
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      background: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)", // Soft subtle background
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px"
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "40px 50px",
        borderRadius: "20px",
        boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "600px",
        position: "relative"
      }}>

        {/* Back Button Positioned Absolute */}
        <div style={{ position: "absolute", top: "30px", left: "30px" }}>
          <BackButton setPage={setPage} targetPage="login" />
        </div>

        <div style={{ textAlign: "center", marginBottom: "30px", marginTop: "40px" }}>
          <h2 style={{ color: "#2c3e50", fontWeight: "700" }}>Create New Account</h2>
          <p style={{ color: "#95a5a6" }}>Join us today and verify your banking instantly.</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && (
          <div className="alert alert-success" style={{ textAlign: "center", padding: "20px" }}>
            <h4 style={{ margin: "0 0 10px 0" }}>🎉 Success!</h4>
            <p>{success}</p>
            <small>Redirecting to login...</small>
          </div>
        )}

        {!success && (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", color: "#34495e", fontWeight: "600", marginBottom: "5px" }}>Full Name</label>
              <input className="form-control" name="name" placeholder="John Doe" onChange={handleChange} required style={{ borderRadius: "8px", padding: "10px" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <div>
                <label style={{ display: "block", color: "#34495e", fontWeight: "600", marginBottom: "5px" }}>Email Address</label>
                <input className="form-control" name="email" type="email" placeholder="john@example.com" onChange={handleChange} required style={{ borderRadius: "8px", padding: "10px" }} />
              </div>
              <div>
                <label style={{ display: "block", color: "#34495e", fontWeight: "600", marginBottom: "5px" }}>Phone Number</label>
                <input className="form-control" name="phone" placeholder="+1 234..." onChange={handleChange} required style={{ borderRadius: "8px", padding: "10px" }} />
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", color: "#34495e", fontWeight: "600", marginBottom: "5px" }}>Initial Deposit Amount ($)</label>
              <input className="form-control" name="balance" type="number" placeholder="50.00" onChange={handleChange} required style={{ borderRadius: "8px", padding: "10px" }} />
            </div>

            <div style={{ marginBottom: "30px" }}>
              <label style={{ display: "block", color: "#34495e", fontWeight: "600", marginBottom: "5px" }}>Secure Password</label>
              <input className="form-control" name="password" type="password" placeholder="••••••••" onChange={handleChange} required style={{ borderRadius: "8px", padding: "10px" }} />
            </div>

            <button
              type="submit"
              className="btn btn-success btn-block"
              style={{
                padding: "15px",
                borderRadius: "10px",
                fontWeight: "bold",
                fontSize: "18px",
                backgroundColor: "#27ae60",
                border: "none",
                boxShadow: "0 5px 15px rgba(39, 174, 96, 0.4)"
              }}
            >
              Create Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

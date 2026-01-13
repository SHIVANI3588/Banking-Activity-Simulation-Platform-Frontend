import { useState } from "react";
import axios from "axios";

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

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    // Basic validation
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
      setSuccess(`Account Created Successfully! Account Number: ${response.data.accountNumber}`);
      setTimeout(() => setPage("login"), 3000);
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || err.response?.data || err.message || "Backend not reachable";
      setError("Failed to create account: " + (typeof msg === 'object' ? JSON.stringify(msg) : msg));
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2>Create New Account</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="form-group">
        <input className="form-control mb-2" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input className="form-control mb-2" name="email" placeholder="Email" onChange={handleChange} required />
        <input className="form-control mb-2" name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <input className="form-control mb-2" name="balance" placeholder="Initial Deposit" type="number" onChange={handleChange} required />
        <input className="form-control mb-2" name="password" placeholder="Password" type="password" onChange={handleChange} required />
      </div>

      <button className="btn btn-primary btn-block" onClick={handleSubmit}>Create Account</button>
      <button className="btn btn-secondary btn-block mt-2" onClick={() => setPage("login")}>Back to Login</button>
    </div>
  );
}

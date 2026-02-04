import React, { useState } from "react";
import axios from "axios";

export default function UpdatePhone({ user, setPage }) {
    const [phone, setPhone] = useState(user.phone || "");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8081/api/accounts/${user.accountNumber}/profile`, { phone });
            setMessage("Phone updated successfully!");
            setError("");
            setTimeout(() => setPage("profile"), 1500); // Redirect after success
        } catch (err) {
            setError("Failed to update phone. " + (err.response?.data?.error || err.message));
            setMessage("");
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "400px" }}>
            <h3>Update Phone Number</h3>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="form-group">
                <label>New Phone Number:</label>
                <input
                    type="text"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>

            <button className="btn btn-primary btn-block" onClick={handleUpdate}>Save Changes</button>
            <button className="btn btn-secondary btn-block mt-2" onClick={() => setPage("profile")}>Cancel</button>
        </div>
    );
}

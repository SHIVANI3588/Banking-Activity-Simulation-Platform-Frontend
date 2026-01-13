import React, { useState } from "react";
import axios from "axios";

export default function ChangePassword({ user, setPage }) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8081/api/accounts/${user.accountNumber}/password`, { oldPassword, newPassword });
            setMessage("Password updated successfully!");
            setError("");
            setTimeout(() => setPage("profile"), 1500); // Redirect after success
        } catch (err) {
            setError("Failed to update password. " + (err.response?.data?.error || err.message));
            setMessage("");
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "400px" }}>
            <h3>Change Password</h3>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="form-group">
                <label>Old Password:</label>
                <input
                    type="password"
                    className="form-control"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>New Password:</label>
                <input
                    type="password"
                    className="form-control"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>

            <button className="btn btn-warning btn-block" onClick={handleUpdate}>Update Password</button>
            <button className="btn btn-secondary btn-block mt-2" onClick={() => setPage("profile")}>Cancel</button>
        </div>
    );
}

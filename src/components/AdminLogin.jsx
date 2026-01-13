import React, { useState } from "react";
import BackButton from "./BackButton";

function AdminLogin({ setPage, setAdmin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:8081/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setAdmin(data);
                setPage("admin-menu");
            } else {
                setError("Invalid admin credentials");
            }
        } catch (err) {
            setError("Login failed. Is the backend running?");
        }
    };

    return (
        <div className="container" style={{ maxWidth: "400px", margin: "auto", marginTop: "50px", minHeight: "100vh" }}>
            <BackButton setPage={setPage} targetPage="landing" />
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit" className="btn btn-dark btn-block">
                    Login as Admin
                </button>
            </form>
        </div>
    );
}

export default AdminLogin;

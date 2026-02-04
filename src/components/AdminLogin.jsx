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
                setPage("admin-dashboard");
            } else {
                setError("Invalid admin credentials");
            }
        } catch (err) {
            setError("Login failed. Is the backend running?");
        }
    };

    return (
        <div style={{ display: "flex", minHeight: "100vh", width: "100%" }}>

            {/* Left Panel - Dark Themed for Admin */}
            <div style={{
                flex: "1",
                background: "linear-gradient(135deg, #2c3e50 0%, #000000 100%)",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "40px",
                textAlign: "center"
            }}>
                <div style={{ fontSize: "80px", marginBottom: "20px" }}>🛡️</div>
                <h1 style={{ fontWeight: "300", fontSize: "40px", marginBottom: "10px" }}>Admin Portal</h1>
                <p style={{ opacity: 0.7, maxWidth: "400px", lineHeight: "1.6" }}>
                    Restricted access. Please verify your credentials to manage banking operations.
                </p>
            </div>

            {/* Right Panel - Login Form */}
            <div style={{
                flex: "1",
                backgroundColor: "#f8f9fa",
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

                    <h2 style={{ color: "#2c3e50", marginBottom: "30px", fontSize: "28px" }}>Administrator Login</h2>

                    {error && (
                        <div className="alert alert-danger" style={{ marginBottom: "20px", borderRadius: "8px" }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        <div className="form-group" style={{ marginBottom: "20px" }}>
                            <label style={{ fontWeight: "600", color: "#34495e", marginBottom: "8px", display: "block" }}>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Admin ID"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                            className="btn btn-dark btn-block"
                            style={{
                                padding: "12px",
                                borderRadius: "8px",
                                backgroundColor: "#2c3e50",
                                borderColor: "#2c3e50",
                                fontWeight: "bold",
                                fontSize: "16px",
                                width: "100%"
                            }}
                        >
                            Access Dashboard
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;

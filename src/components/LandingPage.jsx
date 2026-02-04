import React from "react";

function LandingPage({ setPage }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", width: "100%" }}>

            {/* Navbar */}
            <nav style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px 40px",
                backgroundColor: "#1a237e", // Deep Blue
                color: "white",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
            }}>
                <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "bold", color: "white" }}>Banking App</h2>
                <div style={{ display: "flex", gap: "20px" }}>
                    <button
                        onClick={() => setPage("login")}
                        style={{
                            background: "transparent",
                            border: "1px solid white",
                            color: "white",
                            padding: "8px 20px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "14px",
                            margin: 0,
                            width: "auto"
                        }}
                        onMouseOver={(e) => e.target.style.background = "rgba(255,255,255,0.1)"}
                        onMouseOut={(e) => e.target.style.background = "transparent"}
                    >
                        User Login
                    </button>
                    <button
                        onClick={() => setPage("admin-login")}
                        style={{
                            background: "#c62828", // Red accent for Admin
                            border: "none",
                            color: "white",
                            padding: "8px 20px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "14px",
                            margin: 0,
                            width: "auto"
                        }}
                    >
                        Admin Login
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                textAlign: "center",
                padding: "20px"
            }}>
                <h1 style={{
                    fontSize: "48px",
                    marginBottom: "20px",
                    color: "#2c3e50",
                    fontWeight: "300"
                }}>
                    Welcome to <span style={{ fontWeight: "bold", color: "#1a237e" }}>Secure Banking</span>
                </h1>
                <p style={{
                    fontSize: "18px",
                    color: "#546e7a",
                    maxWidth: "600px",
                    lineHeight: "1.6"
                }}>
                    Experience seamless and secure transactions. Monitor your accounts, transfer funds, and manage your finances with our trusted platform.
                </p>
                <div style={{ marginTop: "40px" }}>
                    <button
                        onClick={() => setPage("login")}
                        style={{
                            padding: "15px 40px",
                            fontSize: "18px",
                            backgroundColor: "#1a237e",
                            color: "white",
                            border: "none",
                            borderRadius: "30px",
                            cursor: "pointer",
                            boxShadow: "0 4px 15px rgba(26, 35, 126, 0.3)",
                            width: "auto"
                        }}
                    >
                        Get Started
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer style={{
                textAlign: "center",
                padding: "20px",
                background: "#eceff1",
                color: "#78909c",
                fontSize: "12px"
            }}>
                &copy; 2026 Secure Banking System. All rights reserved.
            </footer>
        </div>
    );
}

export default LandingPage;

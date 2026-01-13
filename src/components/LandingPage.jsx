import React from "react";

function LandingPage({ setPage }) {
    return (
        <div className="container" style={{ textAlign: "center", marginTop: "100px" }}>
            <h1>Welcome to the Banking Application</h1>
            <p style={{ marginBottom: "40px" }}>Please select your login type</p>

            <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                <button
                    onClick={() => setPage("login")}
                    style={{
                        padding: "15px 30px",
                        fontSize: "18px",
                        cursor: "pointer",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "5px"
                    }}
                >
                    User Login
                </button>

                <button
                    onClick={() => setPage("admin-login")}
                    style={{
                        padding: "15px 30px",
                        fontSize: "18px",
                        cursor: "pointer",
                        backgroundColor: "#343a40",
                        color: "white",
                        border: "none",
                        borderRadius: "5px"
                    }}
                >
                    Admin Login
                </button>
            </div>
        </div>
    );
}

export default LandingPage;

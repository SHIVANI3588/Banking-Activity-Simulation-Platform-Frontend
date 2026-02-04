import React from "react";
import BackButton from "./BackButton";

function AdminDashboard({ setPage, admin }) {

    return (
        <div style={{ padding: "40px", minHeight: "100vh", backgroundColor: "#f5f7fa" }}>
            <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
                    <div>
                        <h2 style={{ color: "#1a237e", margin: 0 }}>Admin Dashboard</h2>
                        <p style={{ margin: "5px 0 0 0", color: "#7f8c8d" }}>Welcome back, {admin?.username}</p>
                    </div>
                    <button
                        className="btn btn-outline-danger"
                        onClick={() => setPage("landing")}
                    >
                        Logout
                    </button>
                </div>

                {/* Dashboard Menu Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "30px"
                }}>

                    {/* View All Accounts Card */}
                    <div
                        onClick={() => setPage("view-all-accounts")}
                        style={{
                            backgroundColor: "white",
                            padding: "40px",
                            borderRadius: "15px",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                            cursor: "pointer",
                            transition: "transform 0.2s, box-shadow 0.2s",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                            border: "1px solid #eee"
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = "translateY(-5px)";
                            e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.1)";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = "none";
                            e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.05)";
                        }}
                    >
                        <div style={{
                            width: "80px",
                            height: "80px",
                            backgroundColor: "#e3f2fd",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: "20px"
                        }}>
                            <span style={{ fontSize: "32px", color: "#1565c0" }}>📋</span>
                        </div>
                        <h3 style={{ color: "#2c3e50" }}>View All Accounts</h3>
                        <p style={{ color: "#7f8c8d" }}>Manage user accounts, approve requests, and monitor status.</p>
                    </div>

                    {/* Transaction History Card */}
                    <div
                        onClick={() => setPage("admin-history")}
                        style={{
                            backgroundColor: "white",
                            padding: "40px",
                            borderRadius: "15px",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                            cursor: "pointer",
                            transition: "transform 0.2s, box-shadow 0.2s",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                            border: "1px solid #eee"
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = "translateY(-5px)";
                            e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.1)";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = "none";
                            e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.05)";
                        }}
                    >
                        <div style={{
                            width: "80px",
                            height: "80px",
                            backgroundColor: "#fff3e0",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: "20px"
                        }}>
                            <span style={{ fontSize: "32px", color: "#ef6c00" }}>📊</span>
                        </div>
                        <h3 style={{ color: "#2c3e50" }}>Transaction Records</h3>
                        <p style={{ color: "#7f8c8d" }}>View global transaction history and audit logs.</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AdminDashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import BackButton from "./BackButton";

function Profile({ user, setPage }) {
    const [profileData, setProfileData] = useState(user);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.accountNumber) {
            axios.get(`http://localhost:8081/api/accounts/${user.accountNumber}/details`)
                .then(response => {
                    setProfileData(response.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Failed to fetch profile", err);
                    setLoading(false);
                });
        }
    }, [user]);

    if (loading) return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );

    return (
        <div style={{
            minHeight: "100vh",
            backgroundColor: "#f0f2f5",
            width: "100%",
            padding: "40px"
        }}>
            {/* Header / Nav matching Dashboard Header */}
            <header style={{
                backgroundColor: "white",
                padding: "20px 40px",
                display: "flex",
                flexDirection: "row", // Explicitly set row
                justifyContent: "flex-start", // Explicitly set start
                alignItems: "center",
                gap: "20px", // Use gap relative layout
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                marginBottom: "40px",
                borderRadius: "10px"
            }}>
                <div style={{ display: "inline-block", width: "auto" }}>
                    <BackButton setPage={setPage} targetPage="dashboard" />
                </div>
                <h2 style={{ margin: 0, fontSize: "28px", fontWeight: "700", color: "#2c3e50" }}>My Profile</h2>
            </header>

            {/* Content Container */}
            <div className="container" style={{ paddingBottom: "40px", display: "flex", justifyContent: "center" }}>
                <div style={{
                    backgroundColor: "white",
                    borderRadius: "20px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                    padding: "60px",
                    textAlign: "center",
                    maxWidth: "800px",
                    width: "100%"
                }}>

                    {/* Avatar */}
                    <div style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #2c3e50, #4ca1af)",
                        color: "white",
                        fontSize: "64px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "0 auto 30px auto",
                        boxShadow: "0 10px 20px rgba(44, 62, 80, 0.3)"
                    }}>
                        {profileData.name.charAt(0).toUpperCase()}
                    </div>

                    <h2 style={{ color: "#2c3e50", marginBottom: "10px", fontWeight: "700" }}>{profileData.name}</h2>
                    <p style={{ color: "#7f8c8d", fontSize: "18px", marginBottom: "40px" }}>Valued Customer</p>

                    <div style={{ height: "1px", backgroundColor: "#eee", width: "100%", marginBottom: "40px" }} />

                    {/* Information Grid */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "30px",
                        textAlign: "left"
                    }}>
                        <div style={{ padding: "25px", backgroundColor: "#f8f9fa", borderRadius: "15px", border: "1px solid #e9ecef" }}>
                            <label style={{ fontSize: "12px", color: "#95a5a6", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "bold" }}>Account Number</label>
                            <div style={{ fontSize: "20px", fontWeight: "600", color: "#34495e", marginTop: "5px" }}>{profileData.accountNumber}</div>
                        </div>

                        <div style={{ padding: "25px", backgroundColor: "#f8f9fa", borderRadius: "15px", border: "1px solid #e9ecef" }}>
                            <label style={{ fontSize: "12px", color: "#95a5a6", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "bold" }}>Available Balance</label>
                            <div style={{ fontSize: "20px", fontWeight: "600", color: "#27ae60", marginTop: "5px" }}>${profileData.balance ? profileData.balance.toFixed(2) : "0.00"}</div>
                        </div>

                        <div style={{ padding: "25px", backgroundColor: "#f8f9fa", borderRadius: "15px", border: "1px solid #e9ecef" }}>
                            <label style={{ fontSize: "12px", color: "#95a5a6", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "bold" }}>Email Address</label>
                            <div style={{ fontSize: "20px", fontWeight: "600", color: "#34495e", marginTop: "5px" }}>{profileData.email}</div>
                        </div>

                        <div style={{ padding: "25px", backgroundColor: "#f8f9fa", borderRadius: "15px", border: "1px solid #e9ecef" }}>
                            <label style={{ fontSize: "12px", color: "#95a5a6", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "bold" }}>Phone Number</label>
                            <div style={{ fontSize: "20px", fontWeight: "600", color: "#34495e", marginTop: "5px" }}>{profileData.phone}</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Profile;

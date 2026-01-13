
import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile({ user, setPage }) {
    const [profileData, setProfileData] = useState(user);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch fresh data on mount
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

    if (loading) return <div className="text-center mt-5">Loading Profile...</div>;

    return (
        <div className="container" style={{ textAlign: "center", maxWidth: "600px", margin: "auto", marginTop: "20px" }}>
            <h2>My Profile</h2>

            <div className="card p-4 mb-3 text-left shadow-sm">
                <h4 className="border-bottom pb-2 mb-3">User Details</h4>

                <div className="mb-2">
                    <span style={{ fontWeight: "bold" }}>Full Name: </span>
                    <span>{profileData.name}</span>
                </div>

                <div className="mb-2">
                    <span style={{ fontWeight: "bold" }}>Account Number: </span>
                    <span>{profileData.accountNumber}</span>
                </div>

                <div className="mb-2">
                    <span style={{ fontWeight: "bold" }}>Email ID: </span>
                    <span>{profileData.email}</span>
                </div>

                <div className="mb-2">
                    <span style={{ fontWeight: "bold" }}>Phone Number: </span>
                    <span>{profileData.phone}</span>
                </div>
            </div>

            <button className="btn btn-secondary mt-3 btn-block" onClick={() => setPage("dashboard")}>
                Back to Dashboard
            </button>
        </div>
    );
}

export default Profile;

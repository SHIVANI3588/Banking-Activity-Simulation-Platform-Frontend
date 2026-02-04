import React, { useState } from "react";
import BackButton from "./BackButton";

function AccountDetails({ account, setPage }) {
    const [currentAccount, setCurrentAccount] = useState(account);

    if (!currentAccount) return <div>No account selected</div>;

    const handleStatusChange = async (newStatus) => {
        try {
            const response = await fetch(`http://localhost:8081/api/admin/account/${currentAccount.accountNumber}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            if (response.ok) {
                // Update local state to reflect change immediately
                setCurrentAccount(prev => ({ ...prev, status: newStatus }));
                alert(`Account ${newStatus} successfully!`);
            } else {
                alert("Failed to update status");
            }
        } catch (error) {
            console.error(error);
            alert("Error updating status");
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this account? This action cannot be undone.")) return;

        try {
            const response = await fetch(`http://localhost:8081/api/admin/account/${currentAccount.accountNumber}`, {
                method: "DELETE",
            });
            if (response.ok) {
                alert("Account deleted successfully");
                setPage("view-all-accounts");
            } else {
                alert("Failed to delete account");
            }
        } catch (error) {
            console.error(error);
            alert("Error deleting account");
        }
    };

    return (
        <div style={{ padding: "40px", minHeight: "100vh", backgroundColor: "#f5f7fa" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>

                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}>
                    <BackButton setPage={setPage} targetPage="view-all-accounts" />
                    <h2 style={{ margin: "0 0 0 20px", color: "#1a237e" }}>Account Details</h2>
                </div>

                {/* Main Card */}
                <div style={{
                    backgroundColor: "white",
                    borderRadius: "15px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    padding: "40px",
                    border: "1px solid #eee"
                }}>

                    {/* Top Section: Status & Balance */}
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "2px solid #f0f2f5",
                        paddingBottom: "20px",
                        marginBottom: "30px"
                    }}>
                        <div>
                            <h3 style={{ margin: 0, fontSize: "24px", color: "#2c3e50" }}>{currentAccount.name}</h3>
                            <p style={{ margin: "5px 0 0 0", color: "#7f8c8d" }}>Account #{currentAccount.accountNumber}</p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#27ae60" }}>
                                ${currentAccount.balance.toFixed(2)}
                            </div>
                            <span className={`badge ${currentAccount.status === 'PENDING' ? 'badge-warning' :
                                    currentAccount.status === 'FROZEN' ? 'badge-danger' : 'badge-success'
                                }`} style={{ fontSize: "14px", padding: "8px 12px", marginTop: "5px", display: "inline-block" }}>
                                {currentAccount.status || 'ACTIVE'}
                            </span>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", marginBottom: "40px" }}>
                        <div>
                            <label style={{ display: "block", color: "#95a5a6", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "5px" }}>Email Address</label>
                            <div style={{ fontSize: "16px", color: "#34495e", fontWeight: "500" }}>{currentAccount.email}</div>
                        </div>
                        <div>
                            <label style={{ display: "block", color: "#95a5a6", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "5px" }}>Phone Number</label>
                            <div style={{ fontSize: "16px", color: "#34495e", fontWeight: "500" }}>{currentAccount.phone}</div>
                        </div>
                        <div>
                            <label style={{ display: "block", color: "#95a5a6", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "5px" }}>Created At</label>
                            <div style={{ fontSize: "16px", color: "#34495e", fontWeight: "500" }}>
                                {currentAccount.createdAt ? new Date(currentAccount.createdAt).toLocaleString() : 'N/A'}
                            </div>
                        </div>
                        <div>
                            <label style={{ display: "block", color: "#95a5a6", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "5px" }}>Password</label>
                            <div style={{ fontSize: "16px", color: "#34495e", fontWeight: "500" }}>••••••••</div>
                        </div>
                    </div>

                    {/* Actions Section */}
                    <div style={{
                        backgroundColor: "#f8f9fa",
                        padding: "20px",
                        borderRadius: "10px",
                        border: "1px solid #e9ecef"
                    }}>
                        <h4 style={{ margin: "0 0 15px 0", color: "#495057" }}>Admin Actions</h4>
                        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>

                            {/* PENDING ACTIONS */}
                            {currentAccount.status === "PENDING" && (
                                <>
                                    <button
                                        className="btn btn-success"
                                        onClick={() => handleStatusChange("ACTIVE")}
                                        style={{ padding: "10px 20px" }}
                                    >
                                        Approve Account
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={handleDelete}
                                        style={{ padding: "10px 20px" }}
                                    >
                                        Reject Request
                                    </button>
                                </>
                            )}

                            {/* ACTIVE/FROZEN ACTIONS */}
                            {currentAccount.status !== "PENDING" && (
                                <>
                                    {currentAccount.status !== "FROZEN" ? (
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => handleStatusChange("FROZEN")}
                                            style={{ padding: "10px 20px", color: "white" }}
                                        >
                                            Freeze Account
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-info"
                                            onClick={() => handleStatusChange("ACTIVE")}
                                            style={{ padding: "10px 20px", color: "white" }}
                                        >
                                            Unfreeze Account
                                        </button>
                                    )}

                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={handleDelete}
                                        style={{ padding: "10px 20px", marginLeft: "auto" }}
                                    >
                                        Delete Account
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AccountDetails;

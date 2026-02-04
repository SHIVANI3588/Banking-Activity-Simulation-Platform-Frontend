import React, { useState, useEffect } from "react";
import BackButton from "./BackButton";

function ViewAllAccounts({ setPage, setAdmin, setAccount }) { // Added setAccount prop
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/admin/accounts");
            if (response.ok) {
                const data = await response.json();
                setAccounts(data);
            }
        } catch (error) {
            console.error("Failed to fetch accounts", error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = (account) => {
        if (setAccount) {
            setAccount(account);
            setPage("account-details");
        } else {
            console.error("setAccount prop missing");
        }
    };

    // Filter logic
    const filteredAccounts = accounts.filter(acc => {
        const matchesStatus = filterStatus === 'ALL' ||
            acc.status === filterStatus ||
            (!acc.status && filterStatus === 'ACTIVE');

        const matchesSearch = searchTerm === "" ||
            acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            acc.accountNumber.toString().includes(searchTerm);

        return matchesStatus && matchesSearch;
    });

    if (loading) return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );

    return (
        <div style={{ padding: "40px", minHeight: "100vh", backgroundColor: "#f5f7fa" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <BackButton setPage={setPage} targetPage="admin-dashboard" />
                    <h2 style={{ margin: 0, color: "#1a237e" }}>All Accounts</h2>
                </div>

                {/* Filters and Search */}
                <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search name or account..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ padding: "8px 12px", borderRadius: "5px", border: "1px solid #ccc", width: "250px" }}
                    />

                    <div className="btn-group">
                        {['ALL', 'ACTIVE', 'PENDING', 'FROZEN'].map(status => (
                            <button
                                key={status}
                                type="button"
                                className={`btn ${filterStatus === status ? 'btn-dark' : 'btn-outline-dark'}`}
                                onClick={() => setFilterStatus(status)}
                            >
                                {status === 'ALL' ? 'All Accounts' : status}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid Layout */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "25px",
                width: "100%"
            }}>
                {filteredAccounts.map((acc) => (
                    <div key={acc.accountNumber} style={{
                        backgroundColor: "white",
                        borderRadius: "12px",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                        padding: "25px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        transition: "transform 0.2s, box-shadow 0.2s",
                        border: "1px solid #eee"
                    }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = "translateY(-5px)";
                            e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = "none";
                            e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
                        }}
                    >
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "15px" }}>
                                <h5 style={{ margin: 0, fontSize: "18px", fontWeight: "600", color: "#2c3e50" }}>{acc.name}</h5>
                                <span className={`badge ${acc.status === 'PENDING' ? 'badge-warning' :
                                    acc.status === 'FROZEN' ? 'badge-danger' : 'badge-success'
                                    }`} style={{ padding: "5px 10px", fontSize: "12px" }}>
                                    {acc.status || 'ACTIVE'}
                                </span>
                            </div>

                            <div style={{ color: "#7f8c8d", fontSize: "14px", marginBottom: "5px" }}>
                                <strong>Email:</strong> {acc.email}
                            </div>
                            <div style={{ color: "#7f8c8d", fontSize: "14px", marginBottom: "5px" }}>
                                <strong>Account:</strong> {acc.accountNumber}
                            </div>
                            <div style={{ color: "#7f8c8d", fontSize: "14px", marginBottom: "15px" }}>
                                <strong>Created:</strong> {acc.createdAt ? new Date(acc.createdAt).toLocaleDateString() : 'N/A'}
                            </div>

                            <h3 style={{ margin: "10px 0 20px 0", color: "#27ae60" }}>
                                ${acc.balance.toFixed(2)}
                            </h3>
                        </div>

                        <button
                            className="btn btn-primary btn-block"
                            onClick={() => handleViewDetails(acc)}
                            style={{ borderRadius: "8px", fontWeight: "500" }}
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>

            {filteredAccounts.length === 0 && (
                <div style={{ textAlign: "center", marginTop: "50px", color: "#95a5a6" }}>
                    <h4>No accounts found with status: {filterStatus}</h4>
                </div>
            )}
        </div>
    );
}

export default ViewAllAccounts;

import React, { useState, useEffect } from "react";
import BackButton from "./BackButton";

function AdminTransactionHistory({ setPage }) {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:8081/api/admin/transactions");
            if (response.ok) {
                const data = await response.json();
                setTransactions(data);
            }
        } catch (error) {
            console.error("Failed to fetch transactions", error);
        } finally {
            setLoading(false);
        }
    };

    // Filter logic
    const filteredTransactions = transactions.filter(txn => {
        if (!searchTerm) return true;
        const lowerSearch = searchTerm.toLowerCase();
        return (
            (txn.accountNumber && txn.accountNumber.toString().includes(lowerSearch)) ||
            (txn.name && txn.name.toLowerCase().includes(lowerSearch)) ||
            (txn.type && txn.type.toLowerCase().includes(lowerSearch)) ||
            (txn.id && txn.id.toString().includes(lowerSearch))
        );
    });

    if (loading) return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f5f7fa", padding: "40px" }}>
            <div className="container">

                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                        <BackButton setPage={setPage} targetPage="admin-dashboard" />
                        <div>
                            <h2 style={{ margin: 0, color: "#1a237e" }}>Global Transactions</h2>
                            <p style={{ margin: "5px 0 0 0", color: "#7f8c8d" }}>Monitor all banking activity across the platform.</p>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.05)", marginBottom: "30px" }}>
                    <div style={{ display: "flex", gap: "15px" }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="🔍 Search by Account Number, Name, Type or ID"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ flex: 1, padding: "12px", borderRadius: "6px" }}
                        />
                    </div>
                </div>

                {/* Table Card */}
                <div style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                    overflow: "hidden",
                    border: "1px solid #eee"
                }}>
                    <table className="table table-hover mb-0">
                        <thead style={{ backgroundColor: "#f8f9fa" }}>
                            <tr>
                                <th style={{ padding: "20px", borderTop: "none", color: "#495057" }}>Transaction ID</th>
                                <th style={{ padding: "20px", borderTop: "none", color: "#495057" }}>Type</th>
                                <th style={{ padding: "20px", borderTop: "none", color: "#495057" }}>Account</th>
                                <th style={{ padding: "20px", borderTop: "none", color: "#495057" }}>Date</th>
                                <th style={{ padding: "20px", borderTop: "none", color: "#495057", textAlign: "right" }}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map((txn, index) => (
                                    <tr key={index} style={{ borderTop: "1px solid #f1f1f1" }}>
                                        <td style={{ padding: "20px" }}>
                                            <span style={{ fontFamily: "monospace", color: "#666" }}>#{txn.id || index + 1}</span>
                                        </td>
                                        <td style={{ padding: "20px", fontWeight: "600" }}>
                                            <span className={`badge ${txn.type === 'DEPOSIT' ? 'badge-success' :
                                                txn.type === 'WITHDRAW' ? 'badge-danger' : 'badge-primary'
                                                }`} style={{ padding: "8px 12px", fontSize: "12px" }}>
                                                {txn.type}
                                            </span>
                                        </td>
                                        <td style={{ padding: "20px" }}>
                                            {txn.accountNumber} <br />
                                            <small style={{ color: "#999" }}>{txn.name}</small>
                                        </td>
                                        <td style={{ padding: "20px", color: "#555" }}>
                                            {txn.timestamp ? new Date(txn.timestamp).toLocaleString() : 'N/A'}
                                        </td>
                                        <td style={{ padding: "20px", textAlign: "right", fontWeight: "bold", color: "#2c3e50" }}>
                                            ${txn.amount ? txn.amount.toFixed(2) : "0.00"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ padding: "40px", textAlign: "center", color: "#aaa" }}>
                                        No transactions found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}

export default AdminTransactionHistory;

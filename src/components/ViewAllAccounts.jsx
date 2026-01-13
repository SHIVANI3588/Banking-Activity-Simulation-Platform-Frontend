import React, { useState, useEffect } from "react";
import BackButton from "./BackButton";

function ViewAllAccounts({ setPage, admin }) {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('ALL');

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

    const handleStatusChange = async (accountNumber, newStatus) => {
        try {
            const response = await fetch(`http://localhost:8081/api/admin/account/${accountNumber}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            if (response.ok) {
                fetchAccounts(); // Refresh
            } else {
                alert("Failed to update status");
            }
        } catch (error) {
            alert("Error updating status");
        }
    };

    const handleDelete = async (accountNumber) => {
        if (!window.confirm("Are you sure you want to delete this account?")) return;

        try {
            const response = await fetch(`http://localhost:8081/api/admin/account/${accountNumber}`, {
                method: "DELETE",
            });
            if (response.ok) {
                fetchAccounts(); // Refresh
            } else {
                alert("Failed to delete account");
            }
        } catch (error) {
            alert("Error deleting account");
        }
    };

    if (loading) return <div className="p-5 text-center"><h3>Loading...</h3></div>;


    return (
        <div className="container" style={{ marginTop: "20px", height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {/* FIXED HEADER SECTION */}
            <div style={{ flexShrink: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <BackButton setPage={setPage} targetPage="admin-menu" />
                    <span>Logged in as: <strong>{admin?.username}</strong> ({admin?.role})</span>
                </div>

                <h2 className="mb-4">All Accounts</h2>

                <div className="btn-group mb-3" role="group" aria-label="Account Filters">
                    <button type="button" className={`btn ${filterStatus === 'ALL' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setFilterStatus('ALL')}>All Accounts</button>
                    <button type="button" className={`btn ${filterStatus === 'ACTIVE' ? 'btn-success' : 'btn-outline-success'}`} onClick={() => setFilterStatus('ACTIVE')}>Active</button>
                    <button type="button" className={`btn ${filterStatus === 'PENDING' ? 'btn-warning' : 'btn-outline-warning'}`} onClick={() => setFilterStatus('PENDING')}>Pending</button>
                    <button type="button" className={`btn ${filterStatus === 'FROZEN' ? 'btn-danger' : 'btn-outline-danger'}`} onClick={() => setFilterStatus('FROZEN')}>Frozen</button>
                </div>
            </div>

            {/* SCROLLABLE TABLE SECTION */}
            <div style={{ border: "1px solid #dee2e6", borderRadius: "5px", flex: 1, overflowY: "auto", position: "relative" }}>
                <table className="table table-bordered table-striped mb-0">
                    <thead className="thead-dark" style={{ position: "sticky", top: 0, zIndex: 10 }}>
                        <tr>
                            <th style={{ background: "#343a40", color: "white", boxShadow: "0 2px 2px -1px rgba(0, 0, 0, 0.4)" }}>Account No</th>
                            <th style={{ background: "#343a40", color: "white", boxShadow: "0 2px 2px -1px rgba(0, 0, 0, 0.4)" }}>Name</th>
                            <th style={{ background: "#343a40", color: "white", boxShadow: "0 2px 2px -1px rgba(0, 0, 0, 0.4)" }}>Balance</th>
                            <th style={{ background: "#343a40", color: "white", boxShadow: "0 2px 2px -1px rgba(0, 0, 0, 0.4)" }}>Status</th>
                            <th style={{ background: "#343a40", color: "white", boxShadow: "0 2px 2px -1px rgba(0, 0, 0, 0.4)" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts
                            .filter(acc => filterStatus === 'ALL' || acc.status === filterStatus || (!acc.status && filterStatus === 'ACTIVE'))
                            .map((acc) => (
                                <tr key={acc.accountNumber}>
                                    <td>{acc.accountNumber}</td>
                                    <td>{acc.name}</td>
                                    <td>${acc.balance.toFixed(2)}</td>
                                    <td>
                                        <span className={`badge ${acc.status === 'PENDING' ? 'badge-warning' : acc.status === 'FROZEN' ? 'badge-danger' : 'badge-success'}`}>
                                            {acc.status || 'ACTIVE'}
                                        </span>
                                    </td>
                                    <td>
                                        {acc.status === "PENDING" && (
                                            <>
                                                <button className="btn btn-sm btn-success mr-2" onClick={() => handleStatusChange(acc.accountNumber, "ACTIVE")}>Approve</button>
                                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(acc.accountNumber)}>Reject</button>
                                            </>
                                        )}
                                        {acc.status !== "PENDING" && (
                                            <>
                                                {acc.status !== "FROZEN" ? (
                                                    <button className="btn btn-sm btn-warning mr-2" onClick={() => handleStatusChange(acc.accountNumber, "FROZEN")}>Freeze</button>
                                                ) : (
                                                    <button className="btn btn-sm btn-info mr-2" onClick={() => handleStatusChange(acc.accountNumber, "ACTIVE")}>Activate</button>
                                                )}
                                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(acc.accountNumber)}>Delete</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {/* Bottom padding spacer if needed for visual comfort */}
            <div style={{ height: "20px", flexShrink: 0 }}></div>
        </div>
    );

}

export default ViewAllAccounts;

import React, { useState, useEffect } from "react";
import BackButton from "./BackButton";

function AdminDashboard({ setPage, admin }) {
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

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container-fluid" style={{ marginTop: "20px", padding: "0 30px", backgroundColor: "white", color: "black", minHeight: "100vh" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <BackButton setPage={setPage} targetPage="landing" />
                <span>Welcome, {admin?.username} ({admin?.role})</span>
            </div>

            <h2>Admin Dashboard</h2>
            <div className="mb-4 mt-3" style={{ padding: "10px 0" }}>
                <button className="btn btn-info btn-lg" onClick={() => setPage("admin-history")}>View Global Transaction History</button>
            </div>
            <h3>All Accounts</h3>
            <div style={{ border: "1px solid #dee2e6" }}>
                <div className="btn-group mb-3" role="group">
                    <button type="button" className={`btn ${filterStatus === 'ALL' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setFilterStatus('ALL')}>All</button>
                    <button type="button" className={`btn ${filterStatus === 'ACTIVE' ? 'btn-success' : 'btn-outline-success'}`} onClick={() => setFilterStatus('ACTIVE')}>Active</button>
                    <button type="button" className={`btn ${filterStatus === 'PENDING' ? 'btn-warning' : 'btn-outline-warning'}`} onClick={() => setFilterStatus('PENDING')}>Pending</button>
                    <button type="button" className={`btn ${filterStatus === 'FROZEN' ? 'btn-danger' : 'btn-outline-danger'}`} onClick={() => setFilterStatus('FROZEN')}>Frozen</button>
                </div>

                <table className="table table-bordered table-striped mb-0">
                    <thead className="thead-dark" style={{ position: "sticky", top: 0, zIndex: 1 }}>
                        <tr>
                            <th style={{ position: "sticky", top: 0, background: "#343a40", color: "white" }}>Account No</th>
                            <th style={{ position: "sticky", top: 0, background: "#343a40", color: "white" }}>Name</th>
                            <th style={{ position: "sticky", top: 0, background: "#343a40", color: "white" }}>Balance</th>
                            <th style={{ position: "sticky", top: 0, background: "#343a40", color: "white" }}>Status</th>
                            <th style={{ position: "sticky", top: 0, background: "#343a40", color: "white" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts
                            .filter(acc => filterStatus === 'ALL' || acc.status === filterStatus || (!acc.status && filterStatus === 'ACTIVE')) // Default to ACTIVE if status missing
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
        </div>
    );
}

export default AdminDashboard;

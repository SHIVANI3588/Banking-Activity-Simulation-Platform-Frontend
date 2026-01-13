
import React, { useState, useEffect } from "react";
import BackButton from "./BackButton";

function AdminTransactionHistory({ setPage }) {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async (query = "") => {
        try {
            setLoading(true);
            const url = query
                ? `http://localhost:8081/api/admin/transactions/search?query=${query}`
                : "http://localhost:8081/api/admin/transactions";

            const response = await fetch(url);
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

    const handleSearch = (e) => {
        e.preventDefault();
        fetchTransactions(searchTerm);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container" style={{ marginTop: "20px", minHeight: "100vh" }}>
            <h2>Transaction History</h2>

            <form onSubmit={handleSearch} className="mb-4" style={{ display: "flex", gap: "10px" }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Account #, Type, or Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">Search</button>
                <button type="button" className="btn btn-secondary" onClick={() => { setSearchTerm(""); fetchTransactions(""); }}>Reset</button>
            </form>

            <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((txn, index) => (
                        <tr key={index}>
                            <td>{txn}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <BackButton setPage={setPage} targetPage="admin-menu" />
        </div>
    );
}

export default AdminTransactionHistory;

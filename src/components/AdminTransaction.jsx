import React, { useState } from "react";
import BackButton from "./BackButton";

function AdminTransaction({ setPage, type }) { // type: "deposit" or "withdraw"
    const [accountNumber, setAccountNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");

    const handleTransaction = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const params = new URLSearchParams();
            params.append("accountNumber", accountNumber);
            params.append("amount", amount);

            const response = await fetch(`http://localhost:8081/api/transactions/${type}`, { // Assuming TransactionController handles this
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: params,
            });

            if (response.ok) {
                setMessage("Transaction successful!");
            } else {
                setMessage("Transaction failed.");
            }
        } catch (error) {
            setMessage("Error processing transaction.");
        }
    };

    return (
        <div className="container" style={{ textAlign: "center" }}>
            <h2>Admin {type === "deposit" ? "Deposit" : "Withdraw"}</h2>
            <form onSubmit={handleTransaction} style={{ maxWidth: "400px", margin: "auto" }}>
                <div className="form-group">
                    <label>Account Number</label>
                    <input
                        type="number"
                        className="form-control"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        required
                        placeholder="Enter User Account Number"
                    />
                </div>
                <div className="form-group">
                    <label>Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        placeholder="Enter Amount"
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                    {type === "deposit" ? "Deposit" : "Withdraw"}
                </button>
            </form>
            {message && <p style={{ marginTop: "20px", fontWeight: "bold" }}>{message}</p>}

            <div style={{ marginTop: "40px" }}>
                <BackButton setPage={setPage} targetPage="admin-menu" />
            </div>
        </div>
    );
}

export default AdminTransaction;

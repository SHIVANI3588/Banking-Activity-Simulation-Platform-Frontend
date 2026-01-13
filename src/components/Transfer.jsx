import React, { useState } from "react";
import BackButton from "./BackButton";

function Transfer({ user, setPage, updateBalance }) {
    const [receiverAccount, setReceiverAccount] = useState("");
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleTransfer = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (Number(amount) <= 0) {
            setError("Amount must be greater than zero");
            return;
        }

        try {
            const params = new URLSearchParams();
            params.append("fromAccount", user.accountNumber);
            params.append("toAccount", receiverAccount);
            params.append("amount", amount);

            const response = await fetch("http://localhost:8081/api/transactions/transfer", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: params,
            });

            if (response.ok) {
                const data = await response.json();
                // Assume 200 OK means success, update local balance roughly or fetch fresh
                // Ideally backend returns new balance, but for now we manually update
                updateBalance(user.balance - Number(amount));

                setPage("transaction-success", {
                    type: "Transfer",
                    amount: Number(amount),
                    balance: user.balance - Number(amount),
                    accountNumber: user.accountNumber,
                    receiver: receiverAccount
                });
            } else {
                const errorData = await response.json().catch(() => ({}));
                // Backend GlobalExceptionHandler returns { message: "..." }
                setError(errorData.message || "Transfer failed. Check account number and balance.");
            }
        } catch (err) {
            setError(err.message || "Transfer failed. Service might be down.");
        }
    };

    return (
        <div className="container" style={{ textAlign: "center", marginTop: "20px" }}>
            <h2>Transfer Money</h2>
            <div className="card p-4" style={{ maxWidth: "400px", margin: "auto" }}>
                <p><strong>Sender:</strong> {user.name} (Acct: {user.accountNumber})</p>
                <p><strong>Current Balance:</strong> ${user.balance.toFixed(2)}</p>

                <form onSubmit={handleTransfer}>
                    <div className="form-group">
                        <label>Receiver Account Number</label>
                        <input
                            type="number"
                            className="form-control"
                            value={receiverAccount}
                            onChange={(e) => setReceiverAccount(e.target.value)}
                            required
                            placeholder="Enter Receiver Account #"
                        />
                    </div>
                    <div className="form-group">
                        <label>Amount ($)</label>
                        <input
                            type="number"
                            className="form-control"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            placeholder="Enter Amount"
                            min="1"
                        />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {message && <div className="alert alert-success">{message}</div>}

                    <button type="submit" className="btn btn-primary btn-block">Transfer</button>
                </form>
            </div>
            <div style={{ marginTop: "20px" }}>
                <BackButton setPage={setPage} targetPage="dashboard" />
            </div>
        </div>
    );
}

export default Transfer;

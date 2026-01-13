
import React from "react";
import BackButton from "./BackButton";

function TransactionSuccess({ setPage, transactionDetails }) {
    if (!transactionDetails) {
        return (
            <div className="container" style={{ textAlign: "center", marginTop: "50px" }}>
                <h2>No Transaction Details Found</h2>
                <BackButton setPage={setPage} targetPage="dashboard" />
            </div>
        );
    }

    const { type, amount, finalBalance, date } = transactionDetails;

    return (
        <div className="container" style={{ maxWidth: "500px", marginTop: "50px", textAlign: "center" }}>
            <div className="card p-4 shadow-sm">
                <div style={{ fontSize: "3rem", color: "green", marginBottom: "20px" }}>✓</div>
                <h2 className="mb-4">Transaction Successful</h2>

                <div style={{ textAlign: "left", marginBottom: "20px" }}>
                    <p><strong>Type:</strong> {type}</p>
                    <p><strong>Amount:</strong> ${amount}</p>
                    <p><strong>Date:</strong> {date}</p>
                    <hr />
                    <h4 style={{ color: "#007bff" }}>New Balance: ${finalBalance}</h4>
                </div>

                <button
                    className="btn btn-primary btn-block"
                    onClick={() => setPage("dashboard")}
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
}

export default TransactionSuccess;

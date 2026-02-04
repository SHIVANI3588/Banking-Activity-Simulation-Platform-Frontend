import React from "react";
import BackButton from "./BackButton";

function TransactionSuccess({ setPage, transactionDetails }) {
    if (!transactionDetails) {
        return (
            <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f0f2f5" }}>
                <div style={{ textAlign: "center" }}>
                    <h2>No Transaction Details</h2>
                    <BackButton setPage={setPage} targetPage="dashboard" />
                </div>
            </div>
        );
    }

    const { type, amount, finalBalance, date } = transactionDetails;

    return (
        <div style={{
            minHeight: "100vh",
            width: "100%",
            backgroundColor: "#27ae60",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px"
        }}>
            {/* Receipt Container */}
            <div style={{
                backgroundColor: "white",
                width: "100%",
                maxWidth: "400px",
                padding: "40px",
                borderRadius: "5px",
                boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
                position: "relative",
                textAlign: "center"
            }}>
                {/* Success Icon */}
                <div style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "#27ae60",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 auto 20px auto",
                    color: "white",
                    fontSize: "40px"
                }}>
                    ✓
                </div>

                <h2 style={{ color: "#2c3e50", marginBottom: "10px" }}>Transfer Complete</h2>
                <p style={{ color: "#95a5a6", fontSize: "14px", marginBottom: "30px" }}>{date || new Date().toLocaleString()}</p>

                <div style={{ borderTop: "2px dashed #eee", borderBottom: "2px dashed #eee", padding: "20px 0", marginBottom: "30px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                        <span style={{ color: "#7f8c8d" }}>Transaction Type</span>
                        <span style={{ fontWeight: "bold", color: "#2c3e50" }}>{type}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                        <span style={{ color: "#7f8c8d" }}>Amount</span>
                        <span style={{ fontWeight: "bold", color: "#c0392b" }}>${amount}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#7f8c8d" }}>Reference ID</span>
                        <span style={{ fontWeight: "bold", color: "#2c3e50" }}>#{Math.floor(Math.random() * 10000000)}</span>
                    </div>
                </div>

                <div style={{ marginBottom: "30px" }}>
                    <span style={{ color: "#7f8c8d", display: "block", marginBottom: "5px" }}>Updated Balance</span>
                    <span style={{ fontSize: "32px", color: "#27ae60", fontWeight: "bold" }}>${(transactionDetails.balance !== undefined ? transactionDetails.balance : transactionDetails.finalBalance) ? Number(transactionDetails.balance !== undefined ? transactionDetails.balance : transactionDetails.finalBalance).toFixed(2) : "0.00"}</span>
                </div>

                <button
                    className="btn btn-dark btn-block"
                    onClick={() => setPage("dashboard")}
                    style={{ padding: "15px", fontWeight: "bold", borderRadius: "8px", width: "100%" }}
                >
                    Done
                </button>
            </div>
        </div>
    );
}

export default TransactionSuccess;

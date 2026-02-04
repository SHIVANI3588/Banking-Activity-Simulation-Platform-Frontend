import React, { useState } from "react";
import BackButton from "./BackButton";

function Transfer({ user, setPage, updateBalance }) {
    const [targetAccount, setTargetAccount] = useState("");
    const [amount, setAmount] = useState("");

    const handleTransfer = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8081/api/transactions/transfer?fromAccount=${user.accountNumber}&toAccount=${targetAccount}&amount=${amount}`, {
                method: "POST"
            });
            if (response.ok) {
                // Fetch updated balance for sender
                const balanceResponse = await fetch(`http://localhost:8081/api/accounts/${user.accountNumber}/balance`);
                const newBalance = await balanceResponse.json();
                updateBalance(newBalance);
                setPage("transaction-success", { type: "Transfer", amount: amount, balance: newBalance });
            } else {
                alert("Transfer failed. Check account number and balance.");
            }
        } catch (error) {
            alert("Error processing transfer");
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            width: "100%",
            backgroundColor: "#f4f7f6",
            padding: "40px 20px"
        }}>
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                <div style={{ marginBottom: "20px" }}>
                    <BackButton setPage={setPage} targetPage="dashboard" />
                </div>

                <div style={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    overflow: "hidden"
                }}>
                    <div style={{
                        backgroundColor: "#2980b9",
                        padding: "30px",
                        color: "white",
                        textAlign: "center"
                    }}>
                        <h2 style={{ margin: 0, fontWeight: "500", letterSpacing: "1px" }}>Transfer Funds</h2>
                        <p style={{ margin: "10px 0 0 0", opacity: 0.8 }}>Send money to another account securely</p>
                    </div>

                    <div style={{ padding: "40px" }}>
                        <form onSubmit={handleTransfer}>
                            <div style={{ marginBottom: "25px" }}>
                                <label style={{ display: "block", color: "#34495e", marginBottom: "8px", fontWeight: "600" }}>Recipient Account</label>
                                <input
                                    type="number"
                                    value={targetAccount}
                                    onChange={(e) => setTargetAccount(e.target.value)}
                                    placeholder="Enter 12-digit Account Number"
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "12px",
                                        borderRadius: "6px",
                                        border: "1px solid #dcdde1",
                                        backgroundColor: "#f9f9f9"
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: "30px" }}>
                                <label style={{ display: "block", color: "#34495e", marginBottom: "8px", fontWeight: "600" }}>Amount to Transfer</label>
                                <div style={{ position: "relative" }}>
                                    <span style={{ position: "absolute", left: "15px", top: "12px", color: "#7f8c8d" }}>$</span>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0.00"
                                        required
                                        min="1"
                                        style={{
                                            width: "100%",
                                            padding: "12px 12px 12px 30px",
                                            borderRadius: "6px",
                                            border: "1px solid #dcdde1",
                                            fontSize: "18px",
                                            fontWeight: "bold"
                                        }}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                style={{
                                    width: "100%",
                                    padding: "15px",
                                    backgroundColor: "#2980b9",
                                    color: "white",
                                    fontSize: "16px",
                                    border: "none",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontWeight: "600",
                                    transition: "background 0.2s"
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = "#2471a3"}
                                onMouseOut={(e) => e.target.style.backgroundColor = "#2980b9"}
                            >
                                Send Money
                            </button>
                        </form>
                    </div>
                </div>

                <p style={{ textAlign: "center", marginTop: "30px", color: "#95a5a6", fontSize: "14px" }}>
                    Transfers between accounts are instant and free of charge.
                </p>
            </div>
        </div>
    );
}

export default Transfer;

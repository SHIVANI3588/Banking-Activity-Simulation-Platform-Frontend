import React from "react";
import BackButton from "./BackButton";

function AdminMenu({ setPage, admin }) {
    return (
        <div className="container" style={{ textAlign: "center", marginTop: "20px", minHeight: "100vh" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <BackButton setPage={setPage} targetPage="landing" />
                <span>Welcome, {admin?.username}</span>
            </div>
            <h2>Admin Actions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <button className="btn btn-primary" onClick={() => setPage("view-all-accounts")}>
                    View All Accounts
                </button>

                <button className="btn btn-info" onClick={() => setPage("admin-history")}>
                    View Global Transaction History
                </button>

            </div>
        </div>
    );
}

export default AdminMenu;

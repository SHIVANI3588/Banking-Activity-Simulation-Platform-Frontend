import React from "react";

function BackButton({ setPage, targetPage = "landing" }) {
    return (
        <button
            onClick={() => setPage(targetPage)}
            style={{
                padding: "8px 16px",
                backgroundColor: "rgba(108, 117, 125, 0.1)", // Transparent grey
                color: "#2c3e50",
                border: "1px solid #ced4da",
                borderRadius: "30px", // Pill shape
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                fontWeight: "600",
                fontSize: "14px",
                transition: "all 0.2s ease",
                textDecoration: "none",
                width: "auto"
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#2c3e50";
                e.currentTarget.style.color = "white";
                e.currentTarget.style.borderColor = "#2c3e50";
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(108, 117, 125, 0.1)";
                e.currentTarget.style.color = "#2c3e50";
                e.currentTarget.style.borderColor = "#ced4da";
            }}
        >
            <span style={{ marginRight: "8px", fontSize: "16px" }}>←</span> Back
        </button>
    );
}

export default BackButton;

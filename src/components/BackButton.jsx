import React from "react";

function BackButton({ setPage, targetPage = "landing" }) {
    return (
        <button
            onClick={() => setPage(targetPage)}
            style={{
                marginBottom: "20px",
                padding: "8px 16px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                display: "block" // Ensure it takes its own line if needed
            }}
        >
            &larr; Back
        </button>
    );
}

export default BackButton;

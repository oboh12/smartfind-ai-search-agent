import React from "react";

export default function ChatWindow({ messages }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: 5,
        padding: 10,
        minHeight: 200,
        maxHeight: 400,
        overflowY: "auto",
        marginBottom: 10,
        background: "#f9f9f9",
      }}
    >
      {messages.map((msg, idx) => (
        <div
          key={idx}
          style={{
            textAlign: msg.role === "User" ? "right" : "left",
            marginBottom: 8,
          }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "6px 12px",
              borderRadius: 15,
              background: msg.role === "User" ? "#d1e7ff" : "#e2ffe2",
            }}
          >
            <strong>{msg.role}:</strong> {msg.text}
          </span>
        </div>
      ))}
    </div>
  );
}
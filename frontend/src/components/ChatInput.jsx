import React, { useState } from "react";

export default function ChatInput({ onSend }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput(""); // Clear input after sending
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div style={{ display: "flex", marginTop: 5 }}>
      <input
        type="text"
        placeholder="Type your question..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          flex: 1,
          padding: 8,
          borderRadius: 5,
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={handleSend}
        style={{
          marginLeft: 8,
          padding: "8px 12px",
          borderRadius: 5,
          background: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </div>
  );
}
import { useState } from "react";
import { sendMessage } from "./services/api";
import ChatInput from "./components/ChatInput";
import ChatWindow from "./components/ChatWindow";

export default function App() {
  // Chat state
  const [messages, setMessages] = useState([]);

  // Search state
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle chat messages with Algolia fallback
  async function handleSend(text) {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { role: "User", text }]);

    try {
      const data = await sendMessage(text);

      // If AI response is empty or fallback text, fetch Algolia results
      if (!data.reply || data.reply.includes("couldn't find relevant")) {
        const res = await fetch(`http://localhost:5000/api/search?q=${text}`);
        const algoliaData = await res.json();

        const fallbackText =
          algoliaData.products.length ||
          algoliaData.articles.length ||
          algoliaData.faqs.length
            ? `I found the following results for your query:\n
Products: ${algoliaData.products.map((p) => p.name).join(", ")}
Articles: ${algoliaData.articles.map((a) => a.title).join(", ")}
FAQs: ${algoliaData.faqs.map((f) => f.question).join(", ")}`
            : "I couldn't find relevant products or information. Try another request.";

        setMessages((prev) => [
          ...prev,
          { role: "SmartFind AI", text: fallbackText },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "SmartFind AI", text: data.reply },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "SmartFind AI", text: "Oops! Something went wrong." },
      ]);
    }
  }

  // Handle search from search input
  async function handleSearch() {
    if (!query.trim() || loading) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch(`http://localhost:5000/api/search?q=${query}`);
      const data = await res.json();

      // Check if results are empty
      const isEmpty =
        (!data.products || data.products.length === 0) &&
        (!data.articles || data.articles.length === 0) &&
        (!data.faqs || data.faqs.length === 0);

      setResults(isEmpty ? { products: [], articles: [], faqs: [] } : data);
      if (isEmpty) setError("No results found. Try refining your query.");
    } catch (err) {
      setError("Search failed. Please try again later.");
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      <h2>SmartFind AI</h2>

      {/* 🔍 SEARCH SECTION */}
      <div style={{ marginBottom: 30, borderBottom: "1px solid #ccc", paddingBottom: 20 }}>
        <h3>Search</h3>
        <input
          placeholder="Search products, articles, FAQs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: 5, width: "70%" }}
        />
        <button onClick={handleSearch} style={{ marginLeft: 8, padding: "5px 10px" }}>
          Search
        </button>

        {loading && <p>Searching...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {results && !loading && !error && (
          <div style={{ marginTop: 20 }}>
            <h4>Products</h4>
            {results.products.length ? (
              <ul>
                {results.products.map((p) => (
                  <li key={p.objectID}>
                    {p.name} — ${p.price}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No products found.</p>
            )}

            <h4>Articles</h4>
            {results.articles.length ? (
              <ul>
                {results.articles.map((a) => (
                  <li key={a.objectID}>{a.title}</li>
                ))}
              </ul>
            ) : (
              <p>No articles found.</p>
            )}

            <h4>FAQs</h4>
            {results.faqs.length ? (
              <ul>
                {results.faqs.map((f) => (
                  <li key={f.objectID}>{f.question}</li>
                ))}
              </ul>
            ) : (
              <p>No FAQs found.</p>
            )}
          </div>
        )}
      </div>

      {/* 💬 CHAT SECTION */}
      <div>
        <h3>Ask SmartFind AI</h3>
        <ChatWindow messages={messages} />
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
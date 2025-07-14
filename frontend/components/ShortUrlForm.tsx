"use client";

import { useState } from "react";

type ShortUrlResult = {
  id: string;
  url: string;
  shortCode: string;
  createdAt: string;
  updatedAt: string;
};

export default function ShortUrlForm() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<ShortUrlResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("http://localhost:3000/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create short URL");
      } else {
        const data = await res.json();
        setResult(data);
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 400, margin: "2rem auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
      <h2>Create Short URL</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          type="url"
          placeholder="Enter long URL"
          value={url}
          onChange={e => setUrl(e.target.value)}
          required
          style={{ padding: 8, fontSize: 16 }}
        />
        <button type="submit" disabled={loading} style={{ padding: 8, fontSize: 16 }}>
          {loading ? "Creating..." : "Shorten"}
        </button>
      </form>
      {error && <div style={{ color: "red", marginTop: 12 }}>{error}</div>}
      {result && (
        <div style={{ marginTop: 16, background: "#f6f6f6", padding: 12, borderRadius: 4 }}>
          <div><b>Short URL:</b> <code>{typeof window !== 'undefined' ? window.location.origin : ''}/shorten/{result.shortCode}</code></div>
          <div><b>Original URL:</b> <a href={result.url} target="_blank" rel="noopener noreferrer">{result.url}</a></div>
        </div>
      )}
    </main>
  );
} 
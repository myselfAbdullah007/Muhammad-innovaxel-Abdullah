"use client";

import { useState, useEffect } from "react";

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
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-100 font-sans">
      <div className="bg-white rounded-2xl shadow-xl p-8 min-w-[340px] max-w-sm w-full">
        <h2 className="mb-5 font-bold text-2xl text-center text-blue-700 tracking-tight flex items-center justify-center gap-2">
          <span role="img" aria-label="link">🔗</span> Minimal URL Shortener
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="url"
            placeholder="Paste your long URL here..."
            value={url}
            onChange={e => setUrl(e.target.value)}
            required
            className="px-4 py-3 text-base border border-slate-300 rounded-lg outline-none focus:border-blue-400 transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="py-3 text-base font-semibold bg-gradient-to-r from-indigo-500 to-blue-400 text-white rounded-lg shadow hover:from-indigo-600 hover:to-blue-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Shorten URL"}
          </button>
        </form>
        {error && <div className="text-rose-600 mt-4 font-medium text-center">{error}</div>}
        {result && (
          <div className="mt-6 bg-slate-100 p-4 rounded-lg text-center break-all">
            <div className="text-sm text-slate-700 mb-1 font-semibold">Short URL:</div>
            <div className="text-lg font-bold text-blue-600">
              <code>{origin}/shorten/{result.shortCode}</code>
            </div>
            <div className="text-xs text-slate-500 mt-2">
              <b>Original:</b> <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{result.url}</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
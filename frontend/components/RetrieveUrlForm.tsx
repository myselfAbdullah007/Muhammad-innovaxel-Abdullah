"use client";
import { useState } from "react";

export default function RetrieveUrlForm() {
  const [shortCode, setShortCode] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(`http://localhost:3000/shorten/${shortCode}`);
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Not found");
      } else {
        const data = await res.json();
        setResult(data);
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 w-full max-w-md mx-auto mt-6">
      <h3 className="font-bold text-lg mb-4 text-blue-700">Retrieve Original URL</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Enter short code"
          value={shortCode}
          onChange={e => setShortCode(e.target.value)}
          required
          className="px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-400 outline-none"
        />
        <button type="submit" disabled={loading} className="py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition disabled:opacity-60">
          {loading ? "Retrieving..." : "Get Original URL"}
        </button>
      </form>
      {error && <div className="text-rose-600 mt-3 font-medium text-center">{error}</div>}
      {result && (
        <div className="mt-4 text-center text-blue-700">
          <b>Original URL:</b> <a href={result.url} target="_blank" rel="noopener noreferrer" className="underline">{result.url}</a>
        </div>
      )}
    </div>
  );
} 
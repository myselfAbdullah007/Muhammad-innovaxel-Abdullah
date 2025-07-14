"use client";
import React, { useState, useEffect } from "react";

type ShortUrlResult = {
  id: string;
  url: string;
  shortCode: string;
  createdAt: string;
  updatedAt: string;
  accessCount?: number;
};

type Action = "create" | "retrieve" | "update" | "delete" | "stats";

export default function UnifiedUrlForm() {
  const [mainInput, setMainInput] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [action, setAction] = useState<Action | null>(null);
  const [result, setResult] = useState<ShortUrlResult | string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const handleAction = (selected: Action) => {
    setAction(selected);
    setResult(null);
    setError("");
    setNewUrl("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    setError("");
    setLoading(true);
    try {
      let res, data;
      switch (action) {
        case "create":
          res = await fetch("http://localhost:3000/shorten", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: mainInput }),
          });
          data = await res.json();
          if (!res.ok) setError(data.error || "Failed to create short URL");
          else setResult(data);
          break;
        case "retrieve":
          res = await fetch(`http://localhost:3000/shorten/${mainInput}`);
          data = await res.json();
          if (!res.ok) setError(data.error || "Not found");
          else setResult(data);
          break;
        case "update":
          res = await fetch(`http://localhost:3000/shorten/${mainInput}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: newUrl }),
          });
          data = await res.json();
          if (!res.ok) setError(data.error || "Not found");
          else setResult(data);
          break;
        case "delete":
          res = await fetch(`http://localhost:3000/shorten/${mainInput}`, { method: "DELETE" });
          if (res.status === 204) setResult("Short URL deleted successfully.");
          else {
            data = await res.json();
            setError(data.error || "Not found");
          }
          break;
        case "stats":
          res = await fetch(`http://localhost:3000/shorten/${mainInput}/stats`);
          data = await res.json();
          if (!res.ok) setError(data.error || "Not found");
          else setResult(data);
          break;
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 min-w-[340px] max-w-md w-full mx-auto mt-10">
      <h2 className="mb-5 font-bold text-2xl text-center text-blue-700 tracking-tight flex items-center justify-center gap-2">
        <span role="img" aria-label="link">🔗</span> URL Shortener Actions
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type={action === "create" || action === "update" ? "url" : "text"}
          placeholder={
            action === "create"
              ? "Enter long URL"
              : action === "update"
              ? "Enter short code to update"
              : action === "retrieve"
              ? "Enter short code to retrieve"
              : action === "delete"
              ? "Enter short code to delete"
              : action === "stats"
              ? "Enter short code for stats"
              : "Enter URL or short code"
          }
          value={mainInput}
          onChange={e => setMainInput(e.target.value)}
          required
          className="px-4 py-3 text-base border border-slate-300 rounded-lg outline-none focus:border-blue-400 transition text-slate-900"
        />
        {action === "update" && (
          <input
            type="url"
            placeholder="Enter new URL"
            value={newUrl}
            onChange={e => setNewUrl(e.target.value)}
            required
            className="px-4 py-3 text-base border border-slate-300 rounded-lg outline-none focus:border-blue-400 transition text-slate-900"
          />
        )}
        <div className="flex flex-wrap gap-2 justify-center mt-2">
          <button type="button" onClick={() => handleAction("create")}
            className={`px-4 py-2 rounded-lg font-semibold bg-gradient-to-r from-indigo-500 to-blue-400 text-white shadow hover:from-indigo-600 hover:to-blue-500 transition ${action === "create" ? "ring-2 ring-blue-400" : ""}`}>Create</button>
          <button type="button" onClick={() => handleAction("retrieve")}
            className={`px-4 py-2 rounded-lg font-semibold bg-blue-500 text-white shadow hover:bg-blue-600 transition ${action === "retrieve" ? "ring-2 ring-blue-400" : ""}`}>Retrieve</button>
          <button type="button" onClick={() => handleAction("update")}
            className={`px-4 py-2 rounded-lg font-semibold bg-indigo-500 text-white shadow hover:bg-indigo-600 transition ${action === "update" ? "ring-2 ring-blue-400" : ""}`}>Update</button>
          <button type="button" onClick={() => handleAction("delete")}
            className={`px-4 py-2 rounded-lg font-semibold bg-rose-500 text-white shadow hover:bg-rose-600 transition ${action === "delete" ? "ring-2 ring-blue-400" : ""}`}>Delete</button>
          <button type="button" onClick={() => handleAction("stats")}
            className={`px-4 py-2 rounded-lg font-semibold bg-green-500 text-white shadow hover:bg-green-600 transition ${action === "stats" ? "ring-2 ring-blue-400" : ""}`}>Stats</button>
        </div>
        <button type="submit" disabled={loading || !action} className="py-3 text-base font-semibold bg-blue-700 text-white rounded-lg shadow hover:bg-blue-800 transition disabled:opacity-60 disabled:cursor-not-allowed mt-2">
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>
      {error && <div className="text-rose-600 mt-4 font-medium text-center">{error}</div>}
      {result && typeof result === "string" && (
        <div className="mt-6 bg-slate-100 p-4 rounded-lg text-center text-rose-700 font-semibold">{result}</div>
      )}
      {result && typeof result === "object" && (
        <div className="mt-6 bg-slate-100 p-4 rounded-lg text-center break-all">
          {result.shortCode && (
            <div className="text-sm text-slate-700 mb-1 font-semibold">Short URL:</div>
          )}
          {result.shortCode && (
            <div className="text-lg font-bold text-blue-600">
              <code>{origin}/shorten/{result.shortCode}</code>
            </div>
          )}
          <div className="text-xs text-slate-500 mt-2">
            <b>Original:</b> <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{result.url}</a>
          </div>
          {typeof result.accessCount === "number" && (
            <div className="mt-2 text-xs text-green-700">Access Count: {result.accessCount}</div>
          )}
        </div>
      )}
    </div>
  );
} 
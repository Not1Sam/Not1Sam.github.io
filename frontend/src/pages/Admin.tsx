import { useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "https://x7k9m2.bungus.fyi";

export function Admin() {
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"blogs" | "inbox">("blogs");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [toast, setToast] = useState("");
  const [inbox, setInbox] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("admin_token");
    if (saved) setToken(saved);
  }, []);

  useEffect(() => {
    if (token) loadInbox();
  }, [token]);

  const loadInbox = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setInbox(await res.json());
    } catch {}
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username: "admin", password }),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("admin_token", data.access_token);
        setToken(data.access_token);
        setError("");
      } else {
        setError("ACCESS DENIED. INVALID CREDENTIALS.");
      }
    } catch {
      setError("CONNECTION FAILED.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
    setPassword("");
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, excerpt, content }),
      });
      if (res.ok) {
        setTitle(""); setExcerpt(""); setContent("");
        setToast("Blog post published!");
        setTimeout(() => setToast(""), 3000);
      }
    } catch {}
  };

  if (!token) {
    return (
      <main className="flex justify-center items-center min-h-[60vh] animate-fade-in">
        <div className="bento-box w-full max-w-[400px] text-center">
          <h1 className="text-2xl font-bold mb-4 brand-font">Admin System.</h1>
          <p className="text-secondary mb-8">Authentication Required</p>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Enter passcode..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 bg-transparent border border-border text-primary outline-none"
            />
            {error && <span className="text-red-500 text-[0.85rem]">{error}</span>}
            <button type="submit" className="w-full px-4 py-3 bg-primary text-bg font-semibold cursor-pointer brand-font">
              LOGIN →
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="py-8 animate-fade-in">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-[2.5rem] tracking-tight brand-font">System Admin.</h1>
          <p className="fluo-text">FastAPI CMS</p>
        </div>
        <button onClick={handleLogout} className="px-4 py-2 bg-transparent border border-border text-secondary cursor-pointer text-[0.8rem] font-mono">
          LOGOUT
        </button>
      </div>

      <div className="flex gap-4 mb-8 border-b border-border pb-4">
        {(["blogs", "inbox"] as const).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); if (t === "inbox") loadInbox(); }}
            className={`px-4 py-2 bg-transparent border-none cursor-pointer font-mono text-[0.9rem] transition-colors ${
              tab === t ? "text-fluo border-b-2 border-fluo" : "text-secondary hover:text-primary"
            }`}
          >
            {t === "blogs" ? "Blogs" : `Inbox ${inbox.length > 0 ? `(${inbox.length})` : ""}`}
          </button>
        ))}
      </div>

      {toast && <div className="mb-6 fluo-text font-mono">{toast}</div>}

      <div className="bento-box">
        {tab === "blogs" && (
          <form onSubmit={handlePublish} className="flex flex-col gap-6">
            <h2 className="text-xl font-bold brand-font">Publish Blog Post</h2>
            <div className="flex flex-col gap-2">
              <label className="text-[0.85rem] uppercase tracking-widest text-secondary font-semibold">POST TITLE</label>
              <input required value={title} onChange={(e) => setTitle(e.target.value)} className="p-3 bg-transparent border border-border text-primary outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[0.85rem] uppercase tracking-widest text-secondary font-semibold">SHORT EXCERPT</label>
              <textarea required rows={2} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="p-3 bg-transparent border border-border text-primary outline-none resize-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[0.85rem] uppercase tracking-widest text-secondary font-semibold">FULL CONTENT</label>
              <textarea required rows={10} value={content} onChange={(e) => setContent(e.target.value)} className="p-3 bg-transparent border border-border text-primary outline-none resize-none" />
            </div>
            <button type="submit" className="px-8 py-4 bg-primary text-bg font-semibold cursor-pointer brand-font">
              PUBLISH POST
            </button>
          </form>
        )}

        {tab === "inbox" && (
          <div>
            <h2 className="text-xl font-bold mb-8 brand-font">Incoming Transmissions</h2>
            {inbox.length === 0 ? (
              <p className="text-secondary">No messages found in the databanks.</p>
            ) : (
              <div className="flex flex-col gap-6">
                {inbox.map((msg) => (
                  <div key={msg.id} className="border border-border p-4">
                    <div className="flex justify-between items-center mb-4 border-b border-border pb-2">
                      <strong className="uppercase brand-font">{msg.name}</strong>
                      <div className="flex gap-4 items-center">
                        <span className="fluo-text text-[0.75rem] tracking-wider font-mono">{msg.created_at}</span>
                        <button
                          onClick={async () => {
                            await fetch(`${API_BASE}/api/contact/${msg.id}`, {
                              method: "DELETE",
                              headers: { Authorization: `Bearer ${token}` },
                            });
                            setInbox(inbox.filter((m) => m.id !== msg.id));
                          }}
                          className="bg-transparent text-red-500 border border-red-500 px-2 py-1 text-[0.75rem] cursor-pointer font-mono"
                        >
                          [ DELETE ]
                        </button>
                      </div>
                    </div>
                    <p className="text-secondary text-[0.85rem] mb-4 font-mono">{msg.email}</p>
                    <p className="whitespace-pre-wrap leading-relaxed text-[0.9rem]">{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

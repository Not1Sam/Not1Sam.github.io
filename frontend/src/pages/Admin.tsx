import { useState, useEffect } from "react";
import { API_BASE } from "../lib/constants";
import type { BlogPost, CVData } from "../lib/types";

interface ContactMessage { id: string; name: string; email: string; message: string; created_at: string; }

export function Admin() {
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"blogs" | "inbox" | "cv">("blogs");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [toast, setToast] = useState("");
  const [inbox, setInbox] = useState<ContactMessage[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [cv, setCv] = useState<CVData | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvUploading, setCvUploading] = useState(false);

  useEffect(() => { const s = localStorage.getItem("admin_token"); if (s) setToken(s); }, []);
  useEffect(() => { if (token) { loadInbox(); loadPosts(); loadCv(); } }, [token]);

  const authHeaders = { Authorization: `Bearer ${token}` };

  const loadInbox = async () => { try { const r = await fetch(`${API_BASE}/api/contact`, { headers: authHeaders }); if (r.ok) setInbox(await r.json()); else if (r.status === 401) handleLogout(); } catch { toastMsg("Failed to load inbox"); } };
  const loadPosts = async () => { try { const r = await fetch(`${API_BASE}/api/blog`); if (r.ok) setPosts(await r.json()); } catch { toastMsg("Failed to load posts"); } };
  const loadCv = async () => { try { const r = await fetch(`${API_BASE}/api/cv`, { headers: authHeaders }); if (r.ok) setCv(await r.json()); else if (r.status === 401) handleLogout(); } catch { toastMsg("Failed to load CV"); } };

  const toastMsg = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const r = await fetch(`${API_BASE}/api/auth/login`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ username: "", password }) });
      if (r.ok) { const d = await r.json(); localStorage.setItem("admin_token", d.access_token); setToken(d.access_token); setError(""); }
      else setError("ACCESS DENIED.");
    } catch { setError("CONNECTION FAILED."); }
  };

  const handleLogout = () => { localStorage.removeItem("admin_token"); setToken(null); setPassword(""); };
  const resetForm = () => { setTitle(""); setExcerpt(""); setContent(""); setEditingPost(null); };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingPost ? `${API_BASE}/api/blog/${editingPost.id}` : `${API_BASE}/api/blog`;
      const r = await fetch(url, { method: editingPost ? "PUT" : "POST", headers: { "Content-Type": "application/json", ...authHeaders }, body: JSON.stringify({ title, excerpt, content }) });
      if (r.ok) { resetForm(); toastMsg(editingPost ? "Post updated." : "Post published."); loadPosts(); } else toastMsg("Save failed.");
    } catch { toastMsg("Connection failed."); }
  };

  const handleEdit = (post: BlogPost) => { setEditingPost(post); setTitle(post.title); setExcerpt(post.excerpt); setContent(post.content); };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    try { const r = await fetch(`${API_BASE}/api/blog/${id}`, { method: "DELETE", headers: authHeaders }); if (r.ok) { setPosts(posts.filter((p) => p.id !== id)); toastMsg("Post deleted."); } } catch { toastMsg("Delete failed."); }
  };

  const handleDeleteInbox = async (id: string) => {
    if (!confirm("Delete message?")) return;
    try { const r = await fetch(`${API_BASE}/api/contact/${id}`, { method: "DELETE", headers: authHeaders }); if (r.ok) { setInbox(inbox.filter((m) => m.id !== id)); toastMsg("Message deleted."); } } catch { toastMsg("Delete failed."); }
  };

  const handleCvUpload = async () => {
    if (!cvFile) return;
    setCvUploading(true);
    try {
      const fd = new FormData(); fd.append("file", cvFile);
      const r = await fetch(`${API_BASE}/api/cv`, { method: "POST", headers: authHeaders, body: fd });
      if (r.ok) { setCv(await r.json()); setCvFile(null); toastMsg("CV uploaded."); }
      else { const e = await r.json(); toastMsg(e.detail || "Upload failed."); }
    } catch { toastMsg("Connection failed."); } finally { setCvUploading(false); }
  };

  const handleCvDelete = async () => {
    if (!confirm("Delete CV?")) return;
    try { const r = await fetch(`${API_BASE}/api/cv`, { method: "DELETE", headers: authHeaders }); if (r.ok) { setCv(null); toastMsg("CV deleted."); } } catch { toastMsg("Delete failed."); }
  };

  if (!token) {
    return (
      <main className="flex justify-center items-center min-h-[50vh] md:min-h-[60vh] animate-fade-in">
        <div className="bento-box w-full max-w-[380px] text-center mx-4">
          <div className="font-mono text-fluo text-[0.7rem] mb-3 tracking-widest">SYSTEM ACCESS</div>
          <h1 className="text-[1.3rem] md:text-[1.5rem] font-bold mb-2 brand-font">Admin Terminal</h1>
          <p className="text-secondary mb-6 text-[0.8rem] font-mono">Authentication required</p>
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <input type="password" placeholder="Enter passcode..." value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" />
            {error && <span className="text-red-500 text-[0.75rem] font-mono">[DENIED] {error}</span>}
            <button type="submit" className="btn-primary w-full">AUTHENTICATE →</button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="py-6 md:py-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-5 md:mb-6">
        <div>
          <h1 className="text-[clamp(1.5rem,5vw,2.2rem)] tracking-tight brand-font">Admin Terminal</h1>
          <p className="fluo-text text-[0.8rem] font-mono">SYS.ACCESS GRANTED</p>
        </div>
        <button onClick={handleLogout} className="btn-outline text-[0.7rem] px-3 py-1.5">LOGOUT</button>
      </div>

      <div className="tabs">
        {(["blogs", "inbox", "cv"] as const).map((t) => (
          <button key={t} onClick={() => { setTab(t); if (t === "inbox") loadInbox(); if (t === "cv") loadCv(); }} className={`tab ${tab === t ? "tab-active" : ""}`}>
            {t === "blogs" ? "BLOGS" : t === "inbox" ? `INBOX${inbox.length > 0 ? ` (${inbox.length})` : ""}` : "CV"}
          </button>
        ))}
      </div>

      {toast && <div className="mb-4 p-2.5 bg-fluo/10 border border-fluo/30 rounded font-mono text-fluo text-[0.8rem] animate-fade-in">[SYS] {toast}</div>}

      <div className="bento-box">
        {tab === "blogs" && (
          <div className="flex flex-col gap-5 md:gap-6">
            <form onSubmit={handlePublish} className="flex flex-col gap-3 md:gap-4">
              <h2 className="text-base md:text-lg font-bold brand-font">{editingPost ? "EDIT POST" : "NEW POST"}</h2>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.65rem] uppercase tracking-[0.12em] text-secondary font-mono">TITLE</label>
                <input required maxLength={200} value={title} onChange={(e) => setTitle(e.target.value)} className="input-field" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.65rem] uppercase tracking-[0.12em] text-secondary font-mono">EXCERPT</label>
                <textarea required rows={2} maxLength={500} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="input-field resize-none" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.65rem] uppercase tracking-[0.12em] text-secondary font-mono">CONTENT</label>
                <textarea required rows={8} value={content} onChange={(e) => setContent(e.target.value)} className="input-field resize-none min-h-[140px]" />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button type="submit" className="btn-primary text-[0.8rem]">{editingPost ? "UPDATE" : "PUBLISH"}</button>
                {editingPost && <button type="button" onClick={resetForm} className="btn-outline text-[0.8rem]">CANCEL</button>}
              </div>
            </form>

            {posts.length > 0 && (
              <div>
                <h3 className="text-sm font-bold mb-3 brand-font">EXISTING POSTS</h3>
                <div className="flex flex-col gap-2">
                  {posts.map((post) => (
                    <div key={post.id} className="border border-border p-3 rounded flex flex-col sm:flex-row justify-between items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-primary text-[0.85rem] truncate">{post.title}</h4>
                        <span className="fluo-text text-[0.6rem] font-mono">{post.created_at}</span>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => handleEdit(post)} className="btn-outline text-[0.65rem] px-2 py-0.5">EDIT</button>
                        <button onClick={() => handleDelete(post.id)} className="btn-danger text-[0.65rem]">DEL</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "inbox" && (
          <div>
            <h2 className="text-base md:text-lg font-bold mb-4 brand-font">INCOMING TRANSMISSIONS</h2>
            {inbox.length === 0 ? <p className="text-secondary text-[0.85rem] font-mono">NO MESSAGES.</p> : (
              <div className="flex flex-col gap-3">
                {inbox.map((msg) => (
                  <div key={msg.id} className="border border-border p-3 rounded">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-1 mb-2 border-b border-border/50 pb-2">
                      <strong className="uppercase brand-font text-[0.85rem]">{msg.name}</strong>
                      <div className="flex gap-2 items-center">
                        <span className="fluo-text text-[0.6rem] font-mono">{msg.created_at}</span>
                        <button onClick={() => handleDeleteInbox(msg.id)} className="btn-danger text-[0.6rem]">DEL</button>
                      </div>
                    </div>
                    <p className="text-secondary text-[0.75rem] font-mono mb-1">{msg.email}</p>
                    <p className="whitespace-pre-wrap text-[0.85rem] leading-relaxed">{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "cv" && (
          <div className="flex flex-col gap-5 md:gap-6">
            <div>
              <h2 className="text-base md:text-lg font-bold mb-1 brand-font">CV MANAGEMENT</h2>
              <p className="text-secondary text-[0.8rem] font-mono">Upload PDF to /cv page. Link: <span className="fluo-text">not1sam.github.io/cv</span></p>
            </div>

            {cv ? (
              <div className="border border-border p-3 md:p-4 rounded">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-3">
                  <div className="min-w-0">
                    <h3 className="font-bold text-primary brand-font text-[0.9rem]">ACTIVE CV</h3>
                    <p className="text-secondary text-[0.75rem] font-mono mt-0.5 break-all">{cv.original_name}</p>
                    <p className="text-secondary/50 text-[0.65rem] font-mono">{cv.uploaded_at}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <a href={`${API_BASE}${cv.file_path}`} target="_blank" rel="noreferrer" className="btn-outline text-[0.7rem] px-2 py-1">VIEW</a>
                    <button onClick={handleCvDelete} className="btn-danger text-[0.7rem]">DEL</button>
                  </div>
                </div>
                <div className="border border-border overflow-hidden" style={{ height: "min(500px, 55vh)" }}>
                  <iframe src={`${API_BASE}${cv.file_path}`} className="w-full h-full border-none" title="CV Preview" />
                </div>
              </div>
            ) : (
              <div className="border border-dashed border-border p-6 text-center rounded">
                <p className="text-secondary text-[0.8rem] font-mono">NO CV ON FILE</p>
              </div>
            )}

            <div className="border border-border p-3 md:p-4 rounded">
              <h3 className="font-bold text-primary brand-font mb-3 text-[0.9rem]">{cv ? "REPLACE CV" : "UPLOAD CV"}</h3>
              <div className="flex flex-col gap-3">
                <input type="file" accept=".pdf" onChange={(e) => setCvFile(e.target.files?.[0] || null)} className="input-field file:mr-3 file:py-1.5 file:px-3 file:border-0 file:bg-fluo file:text-black file:font-semibold file:cursor-pointer file:font-mono file:text-[0.75rem] file:rounded" />
                {cvFile && <p className="text-secondary text-[0.75rem] font-mono break-all">{cvFile.name} ({(cvFile.size / 1024 / 1024).toFixed(2)} MB)</p>}
                <button onClick={handleCvUpload} disabled={!cvFile || cvUploading} className="btn-primary w-full md:w-auto text-[0.8rem] disabled:opacity-30">
                  {cvUploading ? "UPLOADING..." : cv ? "REPLACE" : "UPLOAD"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

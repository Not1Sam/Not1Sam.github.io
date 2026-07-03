import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "https://84.8.221.29:8001";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <main className="py-8">
      <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="mb-12">
          <h1 className="text-[clamp(2.5rem,6vw,4rem)] tracking-tight brand-font">Let&apos;s Talk.</h1>
          <p className="text-secondary mt-4">
            Have a project in mind, or just want to say hi? Drop a message below.
          </p>
        </div>

        <div className="bento-box max-w-[800px] animate-fade-in" style={{ animationDelay: "0.2s" }}>
          {submitted ? (
            <div className="text-center py-8">
              <h3 className="text-2xl font-bold mb-4 fluo-text brand-font">Message Protocol Initiated.</h3>
              <p className="text-secondary mb-8">
                Thanks for reaching out! I&apos;ll get back to you as soon as my compiler finishes.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-8 py-3 bg-transparent border border-border text-primary cursor-pointer transition-all hover:border-secondary font-mono"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[0.85rem] uppercase tracking-widest text-secondary font-semibold">NAME</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className="p-3 bg-transparent border border-border text-primary outline-none transition-colors focus:border-fluo"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.85rem] uppercase tracking-widest text-secondary font-semibold">EMAIL</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="john@example.com"
                  className="p-3 bg-transparent border border-border text-primary outline-none transition-colors focus:border-fluo"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.85rem] uppercase tracking-widest text-secondary font-semibold">MESSAGE</label>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  className="p-3 bg-transparent border border-border text-primary outline-none resize-none transition-colors focus:border-fluo"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 bg-primary text-bg font-semibold text-[1.1rem] rounded cursor-pointer transition-all hover:opacity-80 hover:-translate-y-0.5 disabled:opacity-50 brand-font"
              >
                {loading ? "SENDING..." : "SEND TRANSMISSION →"}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

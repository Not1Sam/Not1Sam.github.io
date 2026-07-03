import { useState } from "react";
import { API_BASE } from "../lib/constants";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    } else if (form.message.length > 2000) {
      newErrors.message = "Message must be under 2000 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setServerError("");
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name.trim(), email: form.email.trim(), message: form.message.trim() }),
      });
      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
        setErrors({});
      } else if (res.status === 429) {
        setServerError("Too many messages. Please wait a minute before trying again.");
      } else {
        const data = await res.json().catch(() => ({}));
        setServerError(data.detail || "Failed to send message. Please try again.");
      }
    } catch {
      setServerError("Connection failed. Please check your internet and try again.");
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
              {serverError && <p className="text-red-500 text-[0.9rem]">{serverError}</p>}
              <div className="flex flex-col gap-2">
                <label className="text-[0.85rem] uppercase tracking-widest text-secondary font-semibold">NAME</label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className="p-3 bg-transparent border border-border text-primary outline-none transition-colors focus:border-fluo"
                />
                {errors.name && <span className="text-red-500 text-[0.8rem]">{errors.name}</span>}
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
                {errors.email && <span className="text-red-500 text-[0.8rem]">{errors.email}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.85rem] uppercase tracking-widest text-secondary font-semibold">MESSAGE</label>
                <textarea
                  required
                  rows={6}
                  maxLength={2000}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  className="p-3 bg-transparent border border-border text-primary outline-none resize-none transition-colors focus:border-fluo"
                />
                <span className="text-[0.75rem] text-secondary text-right">{form.message.length}/2000</span>
                {errors.message && <span className="text-red-500 text-[0.8rem]">{errors.message}</span>}
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

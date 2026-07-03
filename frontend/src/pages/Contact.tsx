import { useState } from "react";
import { API_BASE } from "../lib/constants";
import { sanitizeInput, validateEmail, validateRequired, validateMinLength, validateMaxLength } from "../lib/validation";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    const name = sanitizeInput(form.name);
    const email = sanitizeInput(form.email);
    const message = form.message;

    const nameErr = validateRequired(name, "Name") || validateMaxLength(name, 100, "Name");
    const emailErr = validateRequired(email, "Email") || (validateEmail(email) ? null : "Invalid email format");
    const msgErr = validateRequired(message, "Message") || validateMinLength(message, 10, "Message") || validateMaxLength(message, 2000, "Message");

    if (nameErr) newErrors.name = nameErr;
    if (emailErr) newErrors.email = emailErr;
    if (msgErr) newErrors.message = msgErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true); setServerError("");
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: sanitizeInput(form.name),
          email: sanitizeInput(form.email),
          message: sanitizeInput(form.message),
        }),
      });
      if (res.ok) { setSubmitted(true); setForm({ name: "", email: "", message: "" }); setErrors({}); }
      else if (res.status === 429) setServerError("Rate limit exceeded. Wait before retrying.");
      else { const data = await res.json().catch(() => ({})); setServerError(data.detail || "Transmission failed."); }
    } catch { setServerError("CONNECTION FAILED — Check network."); }
    setLoading(false);
  };

  return (
    <main className="py-6 md:py-8">
      <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="mb-8 md:mb-10">
          <span className="text-[0.7rem] md:text-[0.75rem] font-semibold tracking-[0.15em] uppercase mb-2 block font-mono text-secondary stagger-child" style={{ animationDelay: "0.05s" }}>
            <span className="fluo-text mr-1">▸</span> COMMS
          </span>
          <h1 className="text-[clamp(1.8rem,6vw,3rem)] tracking-tight brand-font stagger-child" style={{ animationDelay: "0.1s" }}>Let&apos;s Talk.</h1>
          <p className="text-secondary mt-2 text-[0.85rem] md:text-[0.9rem] stagger-child" style={{ animationDelay: "0.15s" }}>
            Open a transmission channel below.
          </p>
        </div>

        <div className="bento-box w-full max-w-[700px] animate-fade-in relative overflow-hidden" style={{ animationDelay: "0.2s" }}>
          {/* Scanning line */}
          <div className="scan-line" style={{ animationDuration: "6s" }} />

          {submitted ? (
            <div className="text-center py-6 md:py-8 relative z-10">
              <div className="font-mono text-fluo text-[1.5rem] mb-3 animate-text-glow animate-flicker-in">✓ TRANSMISSION SENT</div>
              <p className="text-secondary mb-6 text-[0.85rem] stagger-child" style={{ animationDelay: "0.2s" }}>Signal received. Standby for response.</p>
              <div className="stagger-child" style={{ animationDelay: "0.4s" }}>
                <button onClick={() => setSubmitted(false)} className="btn-outline text-[0.8rem]">NEW TRANSMISSION</button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-5 relative z-10">
              {serverError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded font-mono text-red-400 text-[0.8rem] animate-flicker-in">
                  [ERROR] {serverError}
                </div>
              )}
              <div className={`flex flex-col gap-1.5 transition-all duration-300 ${focusedField === "name" ? "translate-x-1" : ""}`}>
                <label className="text-[0.7rem] uppercase tracking-[0.12em] text-secondary font-mono">
                  <span className="fluo-text mr-1">01</span> IDENTIFIER
                </label>
                <input
                  type="text" required maxLength={100} value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)}
                  placeholder="Your name" className={`input-field transition-all duration-300 ${focusedField === "name" ? "border-fluo shadow-[0_0_15px_rgba(57,255,20,0.15)]" : ""}`}
                />
                {errors.name && <span className="text-red-500 text-[0.7rem] font-mono animate-flicker-in">{errors.name}</span>}
              </div>
              <div className={`flex flex-col gap-1.5 transition-all duration-300 ${focusedField === "email" ? "translate-x-1" : ""}`}>
                <label className="text-[0.7rem] uppercase tracking-[0.12em] text-secondary font-mono">
                  <span className="fluo-text mr-1">02</span> COMM CHANNEL
                </label>
                <input
                  type="email" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)}
                  placeholder="your@email.com" className={`input-field transition-all duration-300 ${focusedField === "email" ? "border-fluo shadow-[0_0_15px_rgba(57,255,20,0.15)]" : ""}`}
                />
                {errors.email && <span className="text-red-500 text-[0.7rem] font-mono animate-flicker-in">{errors.email}</span>}
              </div>
              <div className={`flex flex-col gap-1.5 transition-all duration-300 ${focusedField === "message" ? "translate-x-1" : ""}`}>
                <label className="text-[0.7rem] uppercase tracking-[0.12em] text-secondary font-mono">
                  <span className="fluo-text mr-1">03</span> PAYLOAD
                </label>
                <textarea
                  required rows={5} maxLength={2000} value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setFocusedField("message")} onBlur={() => setFocusedField(null)}
                  placeholder="Your message..." className={`input-field resize-none min-h-[110px] transition-all duration-300 ${focusedField === "message" ? "border-fluo shadow-[0_0_15px_rgba(57,255,20,0.15)]" : ""}`}
                />
                <div className="flex justify-between items-center">
                  <span className="text-[0.65rem] text-secondary/50 font-mono">{form.message.length}/2000</span>
                  {errors.message && <span className="text-red-500 text-[0.7rem] font-mono">{errors.message}</span>}
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full md:w-auto mt-1">
                {loading ? (
                  <span className="flex items-center gap-2">
                    TRANSMITTING
                    <span className="flex gap-1">
                      <span className="typing-dot w-1 h-1 bg-black rounded-full inline-block" />
                      <span className="typing-dot w-1 h-1 bg-black rounded-full inline-block" />
                      <span className="typing-dot w-1 h-1 bg-black rounded-full inline-block" />
                    </span>
                  </span>
                ) : "SEND TRANSMISSION →"}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

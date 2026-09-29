import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [aiReply, setAiReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAiReply("");

    try {
      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `${form.subject}: ${form.message}`,
          personality: "default",
        }),
      });
      const data = await res.json();
      setAiReply(data.reply || "Thanks for reaching out! We'll get back to you shortly.");
    } catch {
      setAiReply("Thanks for your message! Our team will get back to you within 24 hours.");
    }

    setLoading(false);
    setSent(true);
  };

  const info = [
    { icon: "✉", label: "Email us", value: "hello@yourbrand.com" },
    { icon: "◎", label: "Location", value: "123 AI Street, San Francisco, CA" },
    { icon: "☎", label: "Phone", value: "+1 (800) 555-0198" },
  ];

  const faqs = [
    {
      q: "How fast do you reply?",
      a: "Your message gets an instant AI reply. A human from our team follows up within 24 hours.",
    },
    {
      q: "Can I report a bug or suggest a feature?",
      a: "Absolutely — use the form and select 'Bug Report' or 'Feature Request' as your subject. We read every one.",
    },
    {
      q: "Is there a live chat option?",
      a: "Yes! Head to the Chat page to talk directly with your AI friend. For human support, use this form.",
    },
    {
      q: "Do you offer refunds?",
      a: "Yes, we offer a full refund within 7 days of any premium purchase, no questions asked.",
    },
  ];

  const reasons = [
    { icon: "◈", title: "General enquiry", desc: "Questions about the product, pricing, or partnerships." },
    { icon: "⬡", title: "Technical support", desc: "Issues with the app, backend, or model inference." },
    { icon: "○", title: "Feedback", desc: "Tell us what you love or what we can do better." },
    { icon: "✦", title: "Press & media", desc: "Interviews, coverage, or collaboration requests." },
  ];

  return (
    <div className="page contact-page">
      <div className="orb orb-1" />
      <div className="orb orb-3" />

      {/* Hero */}
      <section className="contact-hero">
        <div className="badge-pill">Contact Us</div>
        <h1 className="about-title">
          Let's <span className="purple-text">Talk</span>
        </h1>
        <p className="about-subtitle">
          Have a question about your AI friend, feedback on a personality, or
          just want to say hello? We're here for you — always. Reach out and
          get an instant reply powered by your local AI.
        </p>
      </section>

      {/* Reason cards */}
      <section style={{ maxWidth: "1000px", margin: "0 auto 3rem", padding: "0 1.5rem" }}>
        <h2 className="section-title centered">How can we help?</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
          {reasons.map((r) => (
            <div key={r.title} className="value-card" style={{ textAlign: "center" }}>
              <span style={{ fontSize: "1.5rem", color: "var(--purple)", display: "block", marginBottom: "0.75rem" }}>{r.icon}</span>
              <h3 className="value-title">{r.title}</h3>
              <p className="value-desc">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="contact-layout">
        {/* Info cards */}
        <div className="contact-info">
          {info.map((i) => (
            <div className="info-card" key={i.label}>
              <span className="info-icon">{i.icon}</span>
              <div>
                <p className="info-label">{i.label}</p>
                <p className="info-value">{i.value}</p>
              </div>
            </div>
          ))}

          <div className="info-card">
            <span className="info-icon">⬡</span>
            <div>
              <p className="info-label">Follow us</p>
              <div className="social-links">
                <a href="#" className="social-link">Twitter</a>
                <a href="#" className="social-link">LinkedIn</a>
                <a href="#" className="social-link">Discord</a>
              </div>
            </div>
          </div>

          {/* Response time badge */}
          <div className="info-card" style={{ background: "var(--purple-soft)", border: "1px solid rgba(108,62,245,0.2)" }}>
            <span className="info-icon">◈</span>
            <div>
              <p className="info-label">Instant AI reply</p>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Powered by Phi-3 Mini running locally on your device. No cloud, no wait.
              </p>
            </div>
          </div>

          {/* Hours */}
          <div className="info-card">
            <span className="info-icon">○</span>
            <div>
              <p className="info-label">Human support hours</p>
              <p className="info-value" style={{ fontSize: "13px", fontWeight: 400, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Mon – Fri, 9am – 6pm PST<br />
                Replies within 24 hours
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="contact-form-wrap">
          {sent ? (
            <div className="sent-state">
              <div className="sent-icon">◈</div>
              <h3>Message received!</h3>
              {aiReply && (
                <div style={{
                  background: "var(--purple-soft)",
                  border: "1px solid rgba(108,62,245,0.2)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1rem 1.25rem",
                  maxWidth: "360px",
                  textAlign: "left",
                  marginTop: "0.5rem",
                }}>
                  <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--purple)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>
                    AI Friend Reply
                  </p>
                  <p style={{ fontSize: "14px", color: "var(--text-primary)", lineHeight: 1.6 }}>
                    {aiReply}
                  </p>
                </div>
              )}
              <p style={{ color: "var(--text-secondary)", fontSize: "13px", marginTop: "0.5rem" }}>
                A human from our team will also follow up within 24 hours.
              </p>
              <button className="btn-primary" onClick={() => {
                setSent(false);
                setAiReply("");
                setForm({ name: "", email: "", subject: "", message: "" });
              }}>
                Send another
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div style={{ marginBottom: "0.25rem" }}>
                <p style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "4px" }}>
                  Send us a message
                </p>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                  Fill in the form and your AI friend will reply instantly.
                </p>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="What's on your mind?"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Tell us more — your AI friend is listening..."
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn-primary form-submit" disabled={loading}>
                {loading ? (
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                    <span style={{
                      width: "14px", height: "14px",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTop: "2px solid #fff", borderRadius: "50%",
                      animation: "spin 0.7s linear infinite", display: "inline-block",
                    }} />
                    Getting AI reply...
                  </span>
                ) : "Send message →"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* FAQ */}
      <section style={{ maxWidth: "680px", margin: "4rem auto 0", padding: "0 1.5rem 4rem" }}>
        <h2 className="section-title centered">Common Questions</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {faqs.map((f, i) => (
            <div key={f.q} style={{
              background: "var(--white)", border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)", overflow: "hidden",
              boxShadow: "var(--shadow-sm)",
            }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: "100%", display: "flex", alignItems: "center",
                  justifyContent: "space-between", padding: "1rem 1.25rem",
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "var(--font)", textAlign: "left",
                }}
              >
                <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
                  {f.q}
                </span>
                <span style={{
                  fontSize: "18px", color: "var(--purple)", flexShrink: 0, marginLeft: "1rem",
                  transition: "transform 0.2s",
                  transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                }}>
                  +
                </span>
              </button>
              {openFaq === i && (
                <div style={{ padding: "0 1.25rem 1rem" }}>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.65 }}>
                    {f.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
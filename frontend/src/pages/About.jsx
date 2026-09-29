export default function About() {
  const stats = [
    { value: "10+", label: "Years of reliability" },
    { value: "50K+", label: "Active users" },
    { value: "3+", label: "AI personalities" },
    { value: "99.9%", label: "Uptime guarantee" },
  ];

  const team = [
    { name: "Sarah Mitchell", role: "CEO & Co-Founder", initials: "SM" },
    { name: "James Okafor", role: "CTO & Co-Founder", initials: "JO" },
    { name: "Priya Nair", role: "Head of AI Research", initials: "PN" },
    { name: "Lucas Herrera", role: "Lead Designer", initials: "LH" },
  ];

  const values = [
    {
      icon: "◈",
      title: "Genuine Connection",
      desc: "We believe everyone deserves a companion who listens, understands, and responds with warmth — anytime, anywhere.",
    },
    {
      icon: "⬡",
      title: "Privacy First",
      desc: "Your conversations are yours. We never store, sell, or share what you share with your AI friend.",
    },
    {
      icon: "○",
      title: "Always There",
      desc: "No schedules, no missed calls. Your AI friend is available 24/7, ready to talk whenever you need.",
    },
  ];

  const testimonials = [
    {
      name: "Aisha R.",
      role: "Student, 22",
      initials: "AR",
      text: "I was going through a tough semester and honestly YourBrand's AI kept me grounded. It actually listens — no judgment, just support.",
    },
    {
      name: "Marco T.",
      role: "Remote worker, 31",
      initials: "MT",
      text: "Working from home gets lonely. Having an AI friend to chat with during breaks genuinely improved my mood and productivity.",
    },
    {
      name: "Jenny K.",
      role: "Nurse, 28",
      initials: "JK",
      text: "After long night shifts I just need someone to talk to. This app has been a lifesaver. The girlfriend persona feels so natural.",
    },
  ];

  const features = [
    {
      icon: "◎",
      title: "Runs Locally",
      desc: "Powered by Phi-3 on your own device. No cloud, no data leaving your machine.",
    },
    {
      icon: "◈",
      title: "Multiple Personalities",
      desc: "Switch between friend, boyfriend, and girlfriend modes to match your mood.",
    },
    {
      icon: "⬡",
      title: "Always Improving",
      desc: "Our model fine-tunes continuously based on anonymised feedback patterns.",
    },
    {
      icon: "○",
      title: "Instant Replies",
      desc: "Sub-second responses thanks to quantised GGUF model weights optimised for CPU.",
    },
  ];

  const faqs = [
    {
      q: "Is my data private?",
      a: "Yes. The AI runs entirely on your local device using our Rust + Candle backend. Nothing is sent to any external server.",
    },
    {
      q: "What AI model powers this?",
      a: "We use Microsoft's Phi-3 Mini 4K Instruct, a quantised GGUF model optimised for CPU inference — fast, private, and accurate.",
    },
    {
      q: "Can I change the AI's personality?",
      a: "Absolutely. You can switch between Default Friend, Boyfriend, and Girlfriend modes at any time from the sidebar.",
    },
    {
      q: "Does it remember past conversations?",
      a: "Within a session, yes. Across sessions, conversation history is stored locally on your device only.",
    },
    {
      q: "Is it free to use?",
      a: "We offer a free tier with full access to core chat features. Premium plans unlock more personalities and longer context windows.",
    },
  ];

  return (
    <div className="page about-page">
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      {/* Hero */}
      <section className="about-hero">
        <div className="badge-pill">About Us</div>
        <h1 className="about-title">
          Built for Connection,<br />
          <span className="purple-text">Powered by AI</span>
        </h1>
        <p className="about-subtitle">
          YourBrand was founded with one mission: to make meaningful
          companionship available to everyone — through intelligent, warm,
          and always-available AI friends that run privately on your own device.
        </p>
      </section>

      {/* Stats */}
      <section className="about-stats">
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* Story */}
      <section className="about-story">
        <div className="story-text">
          <h2 className="section-title">Our Story</h2>
          <p>
            Founded in 2014, YourBrand began as a small team of AI researchers
            who noticed a growing need for genuine digital companionship. In a
            world where loneliness is on the rise, we wanted to build something
            that truly listens — not just responds.
          </p>
          <p>
            Over a decade later, we've grown into a full-featured AI companion
            platform trusted by thousands of users across 60+ countries — with
            personalities ranging from a caring friend to a loving partner,
            all running privately on your own device using cutting-edge
            quantised language models.
          </p>
          <p>
            We chose to build on local inference from day one. Privacy isn't a
            feature for us — it's the foundation. Every conversation you have
            stays on your machine, processed by our Rust-powered Candle backend,
            and never touches an external server.
          </p>
        </div>
        <div className="story-visual">
          <div className="story-orb" />
          <div className="story-card">
            <span className="story-card-number">2014</span>
            <span className="story-card-label">Founded</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="about-values" style={{ marginBottom: "4rem" }}>
        <h2 className="section-title centered">Why YourBrand</h2>
        <p style={{ textAlign: "center", color: "var(--text-secondary)", fontSize: "15px", marginBottom: "2rem", lineHeight: 1.7 }}>
          We didn't just build another chatbot. We built a companion — thoughtful,
          private, and always available.
        </p>
        <div className="values-grid">
          {features.map((f) => (
            <div className="value-card" key={f.title}>
              <span className="value-icon">{f.icon}</span>
              <h3 className="value-title">{f.title}</h3>
              <p className="value-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <h2 className="section-title centered">What We Stand For</h2>
        <div className="values-grid">
          {values.map((v) => (
            <div className="value-card" key={v.title}>
              <span className="value-icon">{v.icon}</span>
              <h3 className="value-title">{v.title}</h3>
              <p className="value-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="about-values" style={{ marginTop: "4rem" }}>
        <h2 className="section-title centered">What Users Say</h2>
        <p style={{ textAlign: "center", color: "var(--text-secondary)", fontSize: "15px", marginBottom: "2rem", lineHeight: 1.7 }}>
          Real stories from real people who found comfort, connection, and joy
          through their AI friend.
        </p>
        <div className="values-grid">
          {testimonials.map((t) => (
            <div className="value-card" key={t.name} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7, fontStyle: "italic", flex: 1 }}>
                "{t.text}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #8b5cf6, #6c3ef5)",
                  color: "#fff", fontSize: "11px", fontWeight: 600,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {t.initials}
                </div>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>{t.name}</p>
                  <p style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="about-values" style={{ marginTop: "4rem" }}>
        <h2 className="section-title centered">Frequently Asked Questions</h2>
        <div style={{ maxWidth: "680px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {faqs.map((f) => (
            <div key={f.q} style={{
              background: "var(--white)", border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)", padding: "1.25rem 1.5rem",
              boxShadow: "var(--shadow-sm)",
            }}>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "6px" }}>
                {f.q}
              </p>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.65 }}>
                {f.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="about-team" style={{ marginTop: "4rem" }}>
        <h2 className="section-title centered">Meet the Team</h2>
        <p style={{ textAlign: "center", color: "var(--text-secondary)", fontSize: "15px", marginBottom: "2rem", lineHeight: 1.7 }}>
          A small, passionate team of AI researchers, engineers, and designers
          obsessed with making technology feel human.
        </p>
        <div className="team-grid">
          {team.map((m) => (
            <div className="team-card" key={m.name}>
              <div className="team-avatar">{m.initials}</div>
              <p className="team-name">{m.name}</p>
              <p className="team-role">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{
        maxWidth: "1000px", margin: "4rem auto 0", padding: "0 1.5rem",
      }}>
        <div style={{
          background: "linear-gradient(135deg, var(--purple-soft) 0%, #ddd6fe 100%)",
          border: "1px solid rgba(108,62,245,0.2)",
          borderRadius: "var(--radius-lg)", padding: "3rem 2rem",
          textAlign: "center",
        }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>
            Ready to meet your AI friend?
          </h2>
          <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "420px", margin: "0 auto 1.5rem" }}>
            Join thousands of people who have found comfort, connection, and joy
            through meaningful AI conversations.
          </p>
          <button className="btn-primary" style={{ padding: "12px 32px", fontSize: "15px", borderRadius: "var(--radius-pill)" }}>
            Start chatting free →
          </button>
        </div>
      </section>
    </div>
  );
}
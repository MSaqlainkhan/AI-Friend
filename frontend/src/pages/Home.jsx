export default function Home() {
  return (
    <div className="home-page">
      <div className="home-orb home-orb-1" />
      <div className="home-orb home-orb-2" />
      <div className="home-orb home-orb-3" />
      <br />
      <section className="home-hero">
        <div className="home-badge">
          <span className="badge-dot" />
          Lets Chat with AI Friend
        </div>
        <br />

        <h1 className="home-heading">
          Making Friend<br />
          <span className="home-purple">Chat with AI friend.</span>
        </h1>

        <p className="home-sub">
          Unlock AI potential with our comprehensive resources,
          tailored to guide you every step of the way.
        </p>

        <div className="home-actions">
          <button className="btn-primary home-cta">Start Chatting</button>
          <div className="home-stat">
            <span className="home-stat-num">10</span>
            <div className="home-stat-text">
              <span>years of</span>
              <span>reliability</span>
            </div>
          </div>
        </div>
      </section>
      <><br /><br /><br /><br /><br /><br /><br /><br /></>
      <footer className="footer">
        <div className="footer-glow" />
        <div className="footer-inner">

          {/* Brand col */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <path d="M9 1L16 5.5V12.5L9 17L2 12.5V5.5L9 1Z" stroke="#fff" strokeWidth="1.5" fill="none"/>
                  <path d="M9 5L13 7.5V12.5L9 15L5 12.5V7.5L9 5Z" fill="#fff" opacity="0.5"/>
                </svg>
              </div>
              <span className="footer-logo-name">YourBrand</span>
            </div>
            <p className="footer-tagline">
              Your AI companion for meaningful conversations. Making friendship smarter, warmer, and always available.
            </p>
            <div className="footer-socials">
              {[
                { name: "Twitter", icon: "𝕏" },
                { name: "LinkedIn", icon: "in" },
                { name: "Discord", icon: "◈" },
                { name: "YouTube", icon: "▶" },
              ].map((s) => (
                <a key={s.name} href="#" className="footer-social-btn" title={s.name}>
                  <span className="footer-social-icon">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {[
            {
              title: "Product",
              links: ["AI Chat", "Boyfriend Mode", "Girlfriend Mode", "Pricing"],
            },
            {
              title: "Company",
              links: ["About Us", "Careers", "Blog", "Press"],
            },
            {
              title: "Support",
              links: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"],
            },
          ].map((col) => (
            <div className="footer-col" key={col.title}>
              <p className="footer-col-title">{col.title}</p>
              {col.links.map((l) => (
                <a key={l} href="#" className="footer-col-link">{l}</a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copy">© {new Date().getFullYear()} YourBrand. All rights reserved.</p>
          <div className="footer-bottom-links">
            {["Privacy", "Terms", "Cookies"].map((l) => (
              <a key={l} href="#" className="footer-bottom-link">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
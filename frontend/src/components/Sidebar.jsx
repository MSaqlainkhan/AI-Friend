import { NavLink } from "react-router-dom";

const personas = [
  {
    id: "ai",
    label: "AI Assistant",
    icon: "◈",
    desc: "Smart trading insights",
    color: "#6C3EF5",
    bg: "#EDE9FE",
  },
  {
    id: "boyfriend",
    label: "Boyfriend",
    icon: "♥",
    desc: "Supportive & caring",
    color: "#ec4899",
    bg: "#fce7f3",
  },
  {
    id: "girlfriend",
    label: "Girlfriend",
    icon: "✿",
    desc: "Warm & encouraging",
    color: "#f97316",
    bg: "#ffedd5",
  },
];

export default function Sidebar({ active, onSelect }) {
  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M9 1L16 5.5V12.5L9 17L2 12.5V5.5L9 1Z" stroke="#6C3EF5" strokeWidth="1.5" fill="none"/>
          <path d="M9 5L13 7.5V12.5L9 15L5 12.5V7.5L9 5Z" fill="#6C3EF5" opacity="0.3"/>
        </svg>
        <span className="sidebar-brand-name">YourBrand</span>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        <p className="sidebar-section-label">Navigation</p>
        {[
          { to: "/", label: "Home", icon: "⌂" },
          { to: "/chat", label: "Chat", icon: "✉" },
          { to: "/about", label: "About", icon: "◎" },
          { to: "/contact", label: "Contact", icon: "☎" },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) => "sidebar-nav-link" + (isActive ? " active" : "")}
          >
            <span className="sidebar-nav-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Chat personas — only shown in /chat */}
      <div className="sidebar-personas">
        <p className="sidebar-section-label">Chat with</p>
        {personas.map((p) => (
          <button
            key={p.id}
            className={"persona-btn" + (active === p.id ? " active" : "")}
            style={active === p.id ? { "--p-color": p.color, "--p-bg": p.bg } : {}}
            onClick={() => onSelect(p.id)}
          >
            <span
              className="persona-avatar"
              style={{ background: p.bg, color: p.color }}
            >
              {p.icon}
            </span>
            <div className="persona-info">
              <span className="persona-name">{p.label}</span>
              <span className="persona-desc">{p.desc}</span>
            </div>
            {active === p.id && <span className="persona-check">✓</span>}
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">U</div>
          <div>
            <p className="sidebar-user-name">Guest User</p>
            <p className="sidebar-user-role">Free plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
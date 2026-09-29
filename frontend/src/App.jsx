import { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ChatArea from "./components/ChatArea";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Chat", to: "/chat" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-logo">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M9 1L16 5.5V12.5L9 17L2 12.5V5.5L9 1Z" stroke="#6C3EF5" strokeWidth="1.5" fill="none"/>
            <path d="M9 5L13 7.5V12.5L9 15L5 12.5V7.5L9 5Z" fill="#6C3EF5" opacity="0.25"/>
          </svg>
          <span className="logo-text">YourBrand</span>
        </div>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>


        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => "mobile-nav-link" + (isActive ? " active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <div className="mobile-cta">
            <button className="btn-ghost">Log in</button>
            <button className="btn-primary">Sign up</button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatArea />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}
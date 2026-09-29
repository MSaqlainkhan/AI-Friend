import { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";

const PERSONAS = {
  ai: {
    name: "AI Assistant",
    icon: "◈",
    color: "#6C3EF5",
    bg: "#EDE9FE",
    welcome: "Hi! I'm your AI assistant. Ask me anything — I'm here to chat, help, and listen.",
    personality: "default",
    suggestions: [
      "How are you today?",
      "Tell me something interesting",
      "I need some advice",
      "What can you help me with?",
    ],
  },
  boyfriend: {
    name: "Boyfriend",
    icon: "♥",
    color: "#ec4899",
    bg: "#fce7f3",
    welcome: "Hey babe! 💕 I'm here for you. What's on your mind today?",
    personality: "boyfriend",
    suggestions: [
      "I need some motivation today",
      "Talk to me about my day",
      "Give me some encouragement",
      "I'm feeling stressed",
    ],
  },
  girlfriend: {
    name: "Girlfriend",
    icon: "✿",
    color: "#f97316",
    bg: "#ffedd5",
    welcome: "Hey you! 🌸 So happy you're here. How are you feeling today?",
    personality: "girlfriend",
    suggestions: [
      "Tell me something sweet",
      "I need cheering up",
      "What should we talk about?",
      "Give me some advice",
    ],
  },
};

export default function ChatArea() {
  const [persona, setPersona] = useState("ai");
  const [chats, setChats] = useState({
    ai: [{ role: "assistant", text: PERSONAS.ai.welcome }],
    boyfriend: [{ role: "assistant", text: PERSONAS.boyfriend.welcome }],
    girlfriend: [{ role: "assistant", text: PERSONAS.girlfriend.welcome }],
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const bottomRef = useRef(null);
  const p = PERSONAS[persona];
  const messages = chats[persona];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, persona]);

  const send = async (text) => {
    if (!text.trim() || loading) return;

    // Add user message immediately
    setChats((prev) => ({
      ...prev,
      [persona]: [...prev[persona], { role: "user", text }],
    }));
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          personality: PERSONAS[persona].personality,
        }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();

      setChats((prev) => ({
        ...prev,
        [persona]: [
          ...prev[persona],
          { role: "assistant", text: data.reply || "I'm not sure what to say, but I'm here!" },
        ],
      }));
    } catch {
      // Fallback reply if backend is down
      const fallbacks = {
        ai: "I'm having trouble connecting right now. Make sure the Candle server is running on port 3000.",
        boyfriend: "Hey, I'm having a little trouble connecting 💙 Try again in a sec?",
        girlfriend: "Oops, something went wrong on my end 🌸 Give it another try!",
      };

      setChats((prev) => ({
        ...prev,
        [persona]: [
          ...prev[persona],
          { role: "assistant", text: fallbacks[persona] },
        ],
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const clearChat = () =>
    setChats((prev) => ({
      ...prev,
      [persona]: [{ role: "assistant", text: p.welcome }],
    }));

  return (
    <div className="chat-page-layout">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={"sidebar-wrap" + (sidebarOpen ? " open" : "")}>
        <Sidebar
          active={persona}
          onSelect={(id) => { setPersona(id); setSidebarOpen(false); }}
        />
      </div>

      {/* Chat panel */}
      <div className="chat-panel">
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        <div className="chat-container">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-left">
              <button
                className="chat-menu-btn"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Open sidebar"
              >
                ☰
              </button>
              <div
                className="chat-avatar-sm"
                style={{ background: `linear-gradient(135deg, ${p.color}aa, ${p.color})` }}
              >
                {p.icon}
              </div>
              <div>
                <p className="chat-title">{p.name}</p>
                <p className="chat-status">
                  <span className="status-dot" />
                  {loading ? "Typing..." : "Online"}
                </p>
              </div>
            </div>
            <button className="btn-ghost chat-clear" onClick={clearChat}>
              Clear
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={"msg-wrap " + m.role}>
                {m.role === "assistant" && (
                  <div
                    className="msg-avatar"
                    style={{ background: `linear-gradient(135deg, ${p.color}99, ${p.color})` }}
                  >
                    {p.icon}
                  </div>
                )}
                <div
                  className={"msg-bubble " + m.role}
                  style={m.role === "user" ? { background: p.color } : {}}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="msg-wrap assistant">
                <div
                  className="msg-avatar"
                  style={{ background: `linear-gradient(135deg, ${p.color}99, ${p.color})` }}
                >
                  {p.icon}
                </div>
                <div className="msg-bubble assistant" style={{ display: "flex", alignItems: "center", gap: "5px", padding: "12px 16px" }}>
                  <span style={dotStyle(p.color, 0)} />
                  <span style={dotStyle(p.color, 0.2)} />
                  <span style={dotStyle(p.color, 0.4)} />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Suggestions — only show on first message and not loading */}
          {messages.length === 1 && !loading && (
            <div className="chat-suggestions">
              {p.suggestions.map((s) => (
                <button
                  key={s}
                  className="suggestion-chip"
                  style={{ color: p.color, background: p.bg, borderColor: p.color + "33" }}
                  onClick={() => send(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="chat-input-bar">
            <textarea
              className="chat-input"
              placeholder={loading ? `${p.name} is typing...` : `Message ${p.name}...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
              disabled={loading}
            />
            <button
              className="chat-send-btn"
              style={{ background: loading ? p.color + "88" : p.color }}
              onClick={() => send(input)}
              disabled={!input.trim() || loading}
              aria-label="Send"
            >
              {loading ? (
                <span style={{
                  width: "14px", height: "14px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTop: "2px solid #fff",
                  borderRadius: "50%",
                  display: "inline-block",
                  animation: "spin 0.7s linear infinite",
                }} />
              ) : "→"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// Animated typing dot helper
function dotStyle(color, delay) {
  return {
    display: "inline-block",
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: color,
    animation: `bounce 1.2s ease-in-out ${delay}s infinite`,
  };
}
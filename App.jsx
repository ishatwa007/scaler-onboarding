import { useState, useEffect, useRef } from "react";

/* ════════════════════════════════════════════
   DESIGN TOKENS
   ════════════════════════════════════════════ */
const C = {
  bg: "#F8F8F6", card: "#FFFFFF", accent: "#1746A2", accentSoft: "#EBF0FB",
  accentDark: "#0D2B6B", gold: "#C9950C", goldSoft: "#FFF8E1", goldBg: "#FFFDF5",
  green: "#1A7F45", greenSoft: "#E8F5ED", red: "#C92A3E", redSoft: "#FDEAED",
  orange: "#E07C1A", orangeSoft: "#FFF3E0", text: "#151515", sub: "#5F6368",
  muted: "#9CA3AF", border: "#E8E8E4", borderSoft: "#F2F2EE", white: "#FFFFFF",
};
const F = {
  h: "'Plus Jakarta Sans', sans-serif",
  mono: "'JetBrains Mono', monospace",
  display: "'Playfair Display', serif",
};

/* ════════════════════════════════════════════
   TINY HELPERS
   ════════════════════════════════════════════ */
function Pill({ children, color = C.accent, bg = C.accentSoft }) {
  return <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: 20, background: bg, color, fontFamily: F.h, fontSize: 12, fontWeight: 600 }}>{children}</span>;
}

function ProgressBar({ pct, color = C.accent, h = 6 }) {
  return (
    <div style={{ width: "100%", height: h, background: C.borderSoft, borderRadius: h / 2, overflow: "hidden" }}>
      <div style={{ width: `${Math.min(pct, 100)}%`, height: "100%", background: color, borderRadius: h / 2, transition: "width 0.8s cubic-bezier(.4,0,.2,1)" }} />
    </div>
  );
}

function Card({ children, style = {}, onClick }) {
  return <div onClick={onClick} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24, ...style }}>{children}</div>;
}

function Btn({ children, onClick, variant = "primary", disabled, style = {} }) {
  const styles = {
    primary: { background: C.accent, color: "#fff", border: "none" },
    outline: { background: "transparent", color: C.accent, border: `1.5px solid ${C.accent}` },
    ghost: { background: "transparent", color: C.sub, border: `1px solid ${C.border}` },
    whatsapp: { background: "#25D366", color: "#fff", border: "none" },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: "14px 28px", borderRadius: 10, fontFamily: F.h, fontSize: 15, fontWeight: 600,
      cursor: disabled ? "default" : "pointer", display: "inline-flex", alignItems: "center", gap: 8,
      opacity: disabled ? 0.4 : 1, transition: "all 0.2s", ...styles[variant], ...style,
    }}>{children}</button>
  );
}

/* ════════════════════════════════════════════
   COIN POP ANIMATION
   ════════════════════════════════════════════ */
function CoinPop({ amount, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2200); return () => clearTimeout(t); }, []);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
      <div style={{ animation: "coinUp 2.2s ease-out forwards", textAlign: "center" }}>
        <div style={{ width: 90, height: 90, borderRadius: "50%", background: "linear-gradient(135deg, #D4A017, #F5D060)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", boxShadow: "0 0 60px rgba(212,160,23,0.4)" }}>
          <span style={{ fontFamily: F.h, fontSize: 28, fontWeight: 800, color: "#fff" }}>+{amount}</span>
        </div>
        <div style={{ fontFamily: F.h, fontSize: 13, fontWeight: 700, color: C.gold, marginTop: 10, letterSpacing: 1.5 }}>COINS EARNED 🎉</div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   CONFETTI
   ════════════════════════════════════════════ */
function Confetti({ onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, []);
  const pieces = Array.from({ length: 40 }, (_, i) => ({
    left: Math.random() * 100, delay: Math.random() * 0.8, dur: 1.5 + Math.random(),
    color: ["#D4A017", "#1746A2", "#1A7F45", "#E07C1A", "#C92A3E"][i % 5], size: 6 + Math.random() * 6,
  }));
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9998, pointerEvents: "none", overflow: "hidden" }}>
      {pieces.map((p, i) => (
        <div key={i} style={{
          position: "absolute", left: `${p.left}%`, top: -20, width: p.size, height: p.size,
          background: p.color, borderRadius: p.size > 9 ? "50%" : 2, opacity: 0.9,
          animation: `confettiFall ${p.dur}s ease-in ${p.delay}s forwards`,
        }} />
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════
   SOCIAL PROOF CARD (slides in between steps)
   ════════════════════════════════════════════ */
function SocialProof({ text, stat }) {
  return (
    <div style={{
      background: C.accentSoft, borderRadius: 12, padding: "14px 18px", marginTop: 16, marginBottom: 8,
      display: "flex", alignItems: "center", gap: 12, animation: "slideIn 0.4s ease-out",
    }}>
      <div style={{ fontSize: 22 }}>📊</div>
      <div>
        <div style={{ fontFamily: F.h, fontSize: 14, fontWeight: 600, color: C.accent }}>{stat}</div>
        <div style={{ fontFamily: F.h, fontSize: 13, color: C.sub }}>{text}</div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   RADAR / GAP CHART (SVG)
   ════════════════════════════════════════════ */
function GapRadar({ skills }) {
  const labels = ["Python", "SQL", "Statistics", "ML/AI", "Dashboards"];
  const levels = { "": 0.1, "Never used it": 0.1, "Never written SQL": 0.1, "No background": 0.1,
    "Basic scripts": 0.3, "Basic SELECT/WHERE": 0.3, "College-level stats": 0.3,
    "Comfortable with pandas/numpy": 0.55, "Joins & aggregations": 0.55, "Self-taught ML basics": 0.55,
    "Build ML pipelines": 0.8, "Window functions & CTEs": 0.8, "Built ML models": 0.8,
    "Production-grade Python": 0.95, "Performance tuning": 0.95, "Production ML experience": 0.95,
  };
  const current = [levels[skills.python] || 0.1, levels[skills.sql] || 0.1, 0.2, 0.15, 0.15];
  const target = [0.9, 0.9, 0.85, 0.85, 0.8];
  const cx = 140, cy = 130, r = 90;
  const toXY = (i, val) => {
    const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
    return [cx + r * val * Math.cos(angle), cy + r * val * Math.sin(angle)];
  };
  const makePath = (vals) => vals.map((v, i) => toXY(i, v)).map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ") + "Z";

  return (
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <svg viewBox="0 0 280 260" width="280" height="260">
        {[0.2, 0.4, 0.6, 0.8, 1].map(s => (
          <polygon key={s} points={Array.from({ length: 5 }, (_, i) => toXY(i, s).join(",")).join(" ")}
            fill="none" stroke={C.borderSoft} strokeWidth="1" />
        ))}
        {labels.map((l, i) => {
          const [x, y] = toXY(i, 1.18);
          return <text key={l} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
            style={{ fontFamily: F.h, fontSize: 11, fontWeight: 600, fill: C.sub }}>{l}</text>;
        })}
        <polygon points={makePath(target).replace(/[MLZ]/g, " ")} fill="rgba(23,70,162,0.08)" stroke={C.accent} strokeWidth="1.5" strokeDasharray="4,3" />
        <polygon points={makePath(current).replace(/[MLZ]/g, " ")} fill="rgba(212,160,23,0.15)" stroke={C.gold} strokeWidth="2" />
      </svg>
      <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 8 }}>
        <span style={{ fontFamily: F.h, fontSize: 12, color: C.gold, fontWeight: 600 }}>● You today</span>
        <span style={{ fontFamily: F.h, fontSize: 12, color: C.accent, fontWeight: 600 }}>● After DSML</span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   AI BUDDY CHAT WIDGET
   ════════════════════════════════════════════ */
function AIBuddy({ learnerName }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { from: "bot", text: `Hi ${learnerName || "there"}! I'm your AI buddy. I can help with anything about your onboarding, classes, or the programme. What's on your mind?` },
  ]);
  const [input, setInput] = useState("");
  const quickQs = [
    { q: "When is my first class?", a: "Your first class is on the day after your Meet and Greet session, at 9 PM. You'll get a calendar invite on your email and WhatsApp once your MnG is confirmed. Just make sure your SAT is done before that!" },
    { q: "What is PYSJ?", a: "PYSJ stands for 'Plan Your Scaler Journey.' It's a one-on-one session with your mentor where you map out your study plan, set goals, and figure out how to balance the programme with your work. Learners who complete PYSJ in Week 1 are much more likely to stay on track." },
    { q: "Talk to a real person", a: "HUMAN_ESCALATION" },
  ];
  const handleSend = (text) => {
    const q = text || input;
    if (!q.trim()) return;
    setMsgs(m => [...m, { from: "user", text: q }]);
    setInput("");
    const match = quickQs.find(qq => q.includes(qq.q) || q.toLowerCase().includes(qq.q.toLowerCase().slice(0, 15)));
    setTimeout(() => {
      if (match && match.a === "HUMAN_ESCALATION") {
        setMsgs(m => [...m, { from: "bot", text: "Absolutely. Let me connect you with your onboarding counsellor on WhatsApp. They usually respond within 2 hours during business hours.", action: "whatsapp" }]);
      } else if (match) {
        setMsgs(m => [...m, { from: "bot", text: match.a }]);
      } else {
        setMsgs(m => [...m, { from: "bot", text: "That's a great question! I'm still learning about that specific topic. Would you like to chat with your onboarding counsellor? They can help with anything I can't.", action: "whatsapp" }]);
      }
    }, 800);
  };
  const chatEnd = useRef(null);
  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  return (
    <>
      {/* Floating button */}
      <button onClick={() => setOpen(!open)} style={{
        position: "fixed", bottom: 24, right: 24, width: 60, height: 60, borderRadius: "50%",
        background: C.accent, border: "none", cursor: "pointer", zIndex: 1000,
        boxShadow: "0 4px 20px rgba(23,70,162,0.35)", display: "flex", alignItems: "center", justifyContent: "center",
        transition: "transform 0.2s", transform: open ? "rotate(45deg)" : "none",
      }}>
        <span style={{ fontSize: 26, color: "#fff" }}>{open ? "+" : "💬"}</span>
      </button>

      {/* Chat panel */}
      {open && (
        <div style={{
          position: "fixed", bottom: 96, right: 24, width: 380, maxHeight: 520,
          background: C.white, borderRadius: 16, boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
          zIndex: 1000, display: "flex", flexDirection: "column", overflow: "hidden",
          animation: "slideIn 0.3s ease-out", border: `1px solid ${C.border}`,
        }}>
          {/* Header */}
          <div style={{ padding: "16px 20px", background: C.accent, color: "#fff" }}>
            <div style={{ fontFamily: F.h, fontSize: 16, fontWeight: 700 }}>Your AI Buddy</div>
            <div style={{ fontFamily: F.h, fontSize: 12, opacity: 0.8 }}>Online now. Ask me anything about the programme.</div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10, maxHeight: 320 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "80%", padding: "10px 14px", borderRadius: 12,
                  background: m.from === "user" ? C.accent : C.bg,
                  color: m.from === "user" ? "#fff" : C.text,
                  fontFamily: F.h, fontSize: 14, lineHeight: 1.6,
                  borderBottomRightRadius: m.from === "user" ? 4 : 12,
                  borderBottomLeftRadius: m.from === "bot" ? 4 : 12,
                }}>
                  {m.text}
                  {m.action === "whatsapp" && (
                    <a href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20help%20with%20my%20Scaler%20DSML%20onboarding" target="_blank" rel="noopener noreferrer"
                      style={{ display: "block", marginTop: 10, padding: "8px 16px", borderRadius: 8, background: "#25D366", color: "#fff", fontFamily: F.h, fontSize: 13, fontWeight: 600, textDecoration: "none", textAlign: "center" }}>
                      Chat on WhatsApp →
                    </a>
                  )}
                </div>
              </div>
            ))}
            <div ref={chatEnd} />
          </div>

          {/* Quick questions */}
          <div style={{ padding: "8px 16px", display: "flex", gap: 6, flexWrap: "wrap", borderTop: `1px solid ${C.borderSoft}` }}>
            {quickQs.map((qq, i) => (
              <button key={i} onClick={() => handleSend(qq.q)} style={{
                padding: "6px 12px", borderRadius: 16, border: `1px solid ${C.border}`,
                background: C.white, fontFamily: F.h, fontSize: 12, color: C.accent, cursor: "pointer",
              }}>{qq.q}</button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: "10px 16px 14px", display: "flex", gap: 8, borderTop: `1px solid ${C.borderSoft}` }}>
            <input value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              placeholder="Type your question..."
              style={{ flex: 1, padding: "10px 14px", borderRadius: 8, border: `1px solid ${C.border}`, fontFamily: F.h, fontSize: 14, outline: "none" }} />
            <button onClick={() => handleSend()} style={{
              padding: "10px 16px", borderRadius: 8, background: C.accent, color: "#fff", border: "none",
              fontFamily: F.h, fontSize: 14, fontWeight: 600, cursor: "pointer",
            }}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

/* ════════════════════════════════════════════
   CALENDAR POPUP
   ════════════════════════════════════════════ */
function CalendarPopup({ email, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.4)" }}>
      <div style={{ background: C.white, borderRadius: 16, padding: 32, maxWidth: 420, width: "90%", textAlign: "center", animation: "slideIn 0.3s ease-out" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📅</div>
        <h3 style={{ fontFamily: F.h, fontSize: 22, fontWeight: 700, color: C.text, margin: "0 0 8px" }}>Class calendar sent!</h3>
        <p style={{ fontFamily: F.h, fontSize: 15, color: C.sub, lineHeight: 1.6, margin: "0 0 20px" }}>
          We've sent your full class schedule to <strong>{email || "your email"}</strong>. Add it to Google Calendar or Apple Calendar in one click.
        </p>
        <p style={{ fontFamily: F.h, fontSize: 13, color: C.muted, margin: "0 0 24px" }}>
          Didn't get it? Check your spam folder, or ask your AI buddy for help.
        </p>
        <Btn onClick={onClose}>Got it, thanks!</Btn>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   PROACTIVE NUDGE
   ════════════════════════════════════════════ */
function Nudge({ text, cta, onAction, onDismiss }) {
  return (
    <div style={{
      position: "fixed", bottom: 96, left: 24, maxWidth: 340, padding: 18, borderRadius: 14,
      background: C.white, boxShadow: "0 4px 24px rgba(0,0,0,0.1)", border: `1px solid ${C.border}`,
      zIndex: 500, animation: "slideIn 0.4s ease-out",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <span style={{ fontSize: 20 }}>🤖</span>
        <div>
          <div style={{ fontFamily: F.h, fontSize: 14, color: C.text, lineHeight: 1.5 }}>{text}</div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <Btn onClick={onAction} style={{ padding: "8px 16px", fontSize: 13 }}>{cta}</Btn>
            <Btn variant="ghost" onClick={onDismiss} style={{ padding: "8px 12px", fontSize: 13 }}>Later</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   QUESTIONNAIRE COMPONENTS
   ════════════════════════════════════════════ */
function StepLayout({ step, total, label, title, subtitle, children, onNext, onBack, nextLabel = "Continue", nextDisabled, hint, voiceOption, onVoice }) {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ width: "100%", maxWidth: 660 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {onBack && <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${C.border}`, background: C.white, cursor: "pointer", fontFamily: F.h, fontSize: 16 }}>←</button>}
            <div>
              <div style={{ fontFamily: F.mono, fontSize: 11, letterSpacing: 2, color: C.accent }}>STEP {step}</div>
              <div style={{ fontFamily: F.h, fontSize: 14, fontWeight: 600, color: C.text }}>{label}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 140, height: 5, background: C.borderSoft, borderRadius: 3, overflow: "hidden" }}>
              <div style={{ width: `${(step / total) * 100}%`, height: "100%", background: C.accent, borderRadius: 3, transition: "width 0.5s ease" }} />
            </div>
            <span style={{ fontFamily: F.mono, fontSize: 12, color: C.muted }}>{step}/{total}</span>
          </div>
        </div>

        <h2 style={{ fontFamily: F.h, fontSize: 38, fontWeight: 800, color: C.text, lineHeight: 1.2, margin: "0 0 10px" }}>{title}</h2>
        <p style={{ fontFamily: F.h, fontSize: 16, color: C.sub, lineHeight: 1.6, margin: "0 0 28px", maxWidth: 540 }}>{subtitle}</p>

        {voiceOption && (
          <button onClick={onVoice} style={{
            display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 10,
            border: `1.5px dashed ${C.accent}`, background: C.accentSoft, cursor: "pointer", marginBottom: 20,
            fontFamily: F.h, fontSize: 14, fontWeight: 500, color: C.accent,
          }}>
            🎙 Don't want to type? Tell us in your own words
          </button>
        )}

        {children}

        <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
          <Btn onClick={onNext} disabled={nextDisabled}>{nextLabel} →</Btn>
        </div>
        {hint && <div style={{ fontFamily: F.h, fontSize: 13, color: C.muted, marginTop: 10 }}>{hint}</div>}
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: 1.5, color: C.muted, textTransform: "uppercase", display: "block", marginBottom: 6 }}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: "100%", padding: "14px 16px", border: `1px solid ${C.border}`, borderRadius: 10, fontFamily: F.h, fontSize: 16, color: C.text, background: C.white, outline: "none", boxSizing: "border-box" }} />
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: 1.5, color: C.muted, textTransform: "uppercase", display: "block", marginBottom: 6 }}>{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)}
        style={{ width: "100%", padding: "14px 16px", border: `1px solid ${C.border}`, borderRadius: 10, fontFamily: F.h, fontSize: 16, color: C.text, background: C.white, outline: "none", appearance: "none", cursor: "pointer", boxSizing: "border-box", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M6 8L1 3h10z' fill='%239CA3AF'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}>
        <option value="">Pick one...</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Chips({ options, selected, onChange, multi = false }) {
  const toggle = (opt) => {
    if (multi) onChange(selected.includes(opt) ? selected.filter(s => s !== opt) : [...selected, opt]);
    else onChange(selected === opt ? "" : opt);
  };
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map(opt => {
        const active = multi ? selected.includes(opt) : selected === opt;
        return (
          <button key={opt} onClick={() => toggle(opt)} style={{
            padding: "10px 18px", borderRadius: 10, border: `1.5px solid ${active ? C.accent : C.border}`,
            background: active ? C.accentSoft : C.white, color: active ? C.accent : C.text,
            fontFamily: F.h, fontSize: 14, fontWeight: active ? 600 : 400, cursor: "pointer", transition: "all 0.15s",
          }}>{active && "✓ "}{opt}</button>
        );
      })}
    </div>
  );
}

/* ════════════════════════════════════════════
   VOICE MODAL (simulated)
   ════════════════════════════════════════════ */
function VoiceModal({ onClose, onResult }) {
  const [phase, setPhase] = useState("listening"); // listening -> processing -> done
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("processing"), 2500);
    const t2 = setTimeout(() => setPhase("done"), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.5)" }}>
      <div style={{ background: C.white, borderRadius: 20, padding: 40, maxWidth: 440, width: "90%", textAlign: "center" }}>
        {phase === "listening" && <>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: C.redSoft, margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", animation: "pulse 1.5s ease-in-out infinite" }}>
            <span style={{ fontSize: 36 }}>🎙</span>
          </div>
          <h3 style={{ fontFamily: F.h, fontSize: 20, fontWeight: 700, margin: "0 0 8px" }}>Listening...</h3>
          <p style={{ fontFamily: F.h, fontSize: 15, color: C.sub }}>Tell us about your background and what you hope to achieve.</p>
        </>}
        {phase === "processing" && <>
          <div style={{ fontSize: 40, marginBottom: 16 }}>⚙️</div>
          <h3 style={{ fontFamily: F.h, fontSize: 20, fontWeight: 700, margin: "0 0 8px" }}>Understanding what you said...</h3>
        </>}
        {phase === "done" && <>
          <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
          <h3 style={{ fontFamily: F.h, fontSize: 20, fontWeight: 700, margin: "0 0 12px" }}>Here's what we heard</h3>
          <div style={{ background: C.bg, borderRadius: 12, padding: 18, textAlign: "left", marginBottom: 20, border: `1px solid ${C.border}` }}>
            <div style={{ fontFamily: F.h, fontSize: 14, color: C.sub, lineHeight: 1.6 }}>
              <strong>Role:</strong> Business Analyst<br />
              <strong>Experience:</strong> 3-5 years<br />
              <strong>Domain:</strong> Finance<br />
              <strong>Goal:</strong> Transition to data science at a product company
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <Btn onClick={() => { onResult({ role: "Business Analyst", experience: "3-5 years", domain: "Finance" }); onClose(); }}>Looks right!</Btn>
            <Btn variant="ghost" onClick={onClose}>Let me type instead</Btn>
          </div>
        </>}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   MAIN APP
   ════════════════════════════════════════════ */
export default function App() {
  const [step, setStep] = useState(0);
  const [d, setD] = useState({
    name: "", email: "", title: "Mr.", dob: "", pincode: "",
    role: "", experience: "", domain: "", ctc: "",
    python: "", sql: "", ml: "",
    aiUse: [], aiIssue: "",
    goals: [], successLine: "", futureLetter: "",
  });
  const [showVoice, setShowVoice] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [coinPop, setCoinPop] = useState(null);
  const [confetti, setConfetti] = useState(false);
  const [coins, setCoins] = useState(0);
  const [milestones, setMilestones] = useState({ loan: false, sat: false, profile: false, mentor: false });
  const [nudge, setNudge] = useState(null);
  const [dashTab, setDashTab] = useState("home");
  const [signed, setSigned] = useState(false);

  const firstName = d.name ? d.name.split(" ")[0] : "";

  const addCoins = (n) => { setCoinPop(n); setTimeout(() => setCoins(c => c + n), 400); };
  const completeMilestone = (key, coinAmt) => {
    if (milestones[key]) return;
    setMilestones(m => ({ ...m, [key]: true }));
    addCoins(coinAmt);
    const newM = { ...milestones, [key]: true };
    if (Object.values(newM).every(Boolean)) {
      setTimeout(() => { setConfetti(true); addCoins(100); }, 1500);
    }
  };
  const completedCount = Object.values(milestones).filter(Boolean).length;
  const readiness = Math.round((completedCount / 4) * 60 + (d.goals.length > 0 ? 20 : 0) + (d.role ? 10 : 0) + (d.python ? 10 : 0));

  // Proactive nudge after 5s on dashboard
  useEffect(() => {
    if (step === 8 && !milestones.sat) {
      const t = setTimeout(() => {
        setNudge({ text: "Your SAT isn't done yet. It takes about 20 minutes, and you'll earn 100 coins for completing it.", cta: "Start SAT", key: "sat" });
      }, 5000);
      return () => clearTimeout(t);
    }
  }, [step, milestones.sat]);

  // ─── STEP 0: INTRO ───
  if (step === 0) return (
    <div style={{ minHeight: "100vh", display: "flex", background: C.bg }}>
      <div style={{ flex: 1, padding: "80px 48px", display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 660 }}>
        <div style={{ fontFamily: F.mono, fontSize: 11, letterSpacing: 3, color: C.accent, marginBottom: 20 }}>WELCOME TO SCALER</div>
        <h1 style={{ fontFamily: F.h, fontSize: 46, lineHeight: 1.15, color: C.text, fontWeight: 800, margin: "0 0 20px" }}>
          The most important skill of this decade is already here.
        </h1>
        <p style={{ fontFamily: F.h, fontSize: 17, lineHeight: 1.7, color: C.sub, maxWidth: 500, margin: "0 0 36px" }}>
          This programme doesn't just teach you AI. It teaches you how to think clearly, work with data, and make decisions that matter, in a world where AI is changing every role.
        </p>
        <div style={{ borderLeft: `3px solid ${C.gold}`, paddingLeft: 20, marginBottom: 36 }}>
          <div style={{ fontFamily: F.display, fontSize: 24, fontStyle: "italic", color: C.text }}>"1% better every day."</div>
          <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: 2, marginTop: 6, color: C.muted }}>FOUNDING TEAM, SCALER</div>
        </div>
        <Btn onClick={() => setStep(1)}>Start your onboarding →</Btn>
        <div style={{ fontFamily: F.h, fontSize: 14, color: C.muted, marginTop: 12, display: "flex", alignItems: "center", gap: 6 }}>
          ⏱ About 4 minutes. Opens your personalised dashboard.
        </div>
      </div>
      <div style={{ flex: 1, background: `linear-gradient(135deg, ${C.accent}, ${C.accentDark})`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", minHeight: "100vh" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: F.h, fontSize: 72, fontWeight: 800, color: "rgba(255,255,255,0.15)" }}>DSML</div>
          <div style={{ fontFamily: F.h, fontSize: 16, color: "rgba(255,255,255,0.6)", letterSpacing: 3, marginTop: 8 }}>DATA SCIENCE &</div>
          <div style={{ fontFamily: F.h, fontSize: 16, color: "rgba(255,255,255,0.6)", letterSpacing: 3 }}>MACHINE LEARNING</div>
        </div>
      </div>
    </div>
  );

  // ─── STEP 1: PROFILE ───
  if (step === 1) return (
    <StepLayout step={1} total={6} label="Profile details" title="Let's start with the basics" subtitle="This helps us set up your learning account and keep things personalised." onNext={() => setStep(2)} hint="This stays private. We never share it.">
      <Card>
        <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 16 }}>
          <Select label="Title" value={d.title} onChange={v => setD({ ...d, title: v })} options={["Mr.", "Ms.", "Mx."]} />
          <InputField label="Full name" value={d.name} onChange={v => setD({ ...d, name: v })} placeholder="Your full name" />
        </div>
        <InputField label="Your email" value={d.email} onChange={v => setD({ ...d, email: v })} placeholder="name@company.com" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <InputField label="Date of birth" value={d.dob} onChange={v => setD({ ...d, dob: v })} placeholder="DD-MM-YYYY" />
          <InputField label="Area pincode" value={d.pincode} onChange={v => setD({ ...d, pincode: v })} placeholder="560034" />
        </div>
      </Card>
    </StepLayout>
  );

  // ─── STEP 2: WORK ───
  if (step === 2) return (
    <>
      {showVoice && <VoiceModal onClose={() => setShowVoice(false)} onResult={(r) => setD({ ...d, ...r })} />}
      <StepLayout step={2} total={6} label="Your background" title={firstName ? `Nice to meet you, ${firstName}. Tell us where you are today.` : "Tell us where you are today"} subtitle="We use this to match you with the right batch, mentors, and study plan."
        onNext={() => setStep(3)} onBack={() => setStep(1)} hint="This shapes your entire learning path." voiceOption onVoice={() => setShowVoice(true)}>
        <Card>
          <Select label="What's your current role?" value={d.role} onChange={v => setD({ ...d, role: v })}
            options={["Student", "Business Analyst", "Data Analyst", "Software Engineer", "Product Manager", "Consultant", "Marketing/Growth", "Non-tech professional", "Fresher", "Other"]} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Select label="Years of experience" value={d.experience} onChange={v => setD({ ...d, experience: v })}
              options={["Fresher", "0-1 years", "1-3 years", "3-5 years", "5-8 years", "8-12 years", "12+ years"]} />
            <Select label="Which industry?" value={d.domain} onChange={v => setD({ ...d, domain: v })}
              options={["Tech", "Finance/Banking", "Consulting", "Healthcare", "E-commerce/Retail", "Education", "Manufacturing", "Other"]} />
          </div>
          <InputField label="Current salary (LPA, optional)" value={d.ctc} onChange={v => setD({ ...d, ctc: v })} placeholder="e.g. 8" />
        </Card>
        {d.role && <SocialProof stat={`${Math.floor(Math.random() * 30 + 30)} ${d.role}s joined DSML last quarter`} text={`Most common transition: ${d.role === "Business Analyst" ? "Decision Scientist" : d.role === "Software Engineer" ? "ML Engineer" : "Data Analyst"} at product companies.`} />}
      </StepLayout>
    </>
  );

  // ─── STEP 3: SKILLS ───
  if (step === 3) return (
    <StepLayout step={3} total={6} label="Your skill level" title={firstName ? `${firstName}, where are you with data skills?` : "Where are you with data skills?"} subtitle="No wrong answers. We're calibrating your starting point so we can meet you where you are."
      onNext={() => setStep("gap")} onBack={() => setStep(2)} hint="This decides your pre-reads and batch level.">
      <Card>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: 1.5, color: C.muted, textTransform: "uppercase", display: "block", marginBottom: 8 }}>Python</label>
          <Chips options={["Never used it", "Basic scripts", "Comfortable with pandas/numpy", "Build ML pipelines", "Production-grade"]} selected={d.python} onChange={v => setD({ ...d, python: v })} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: 1.5, color: C.muted, textTransform: "uppercase", display: "block", marginBottom: 8 }}>SQL</label>
          <Chips options={["Never written SQL", "Basic SELECT/WHERE", "Joins & aggregations", "Window functions & CTEs", "Performance tuning"]} selected={d.sql} onChange={v => setD({ ...d, sql: v })} />
        </div>
        <div>
          <label style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: 1.5, color: C.muted, textTransform: "uppercase", display: "block", marginBottom: 8 }}>Statistics & ML</label>
          <Chips options={["No background", "College-level stats", "Self-taught ML basics", "Built ML models", "Production ML experience"]} selected={d.ml} onChange={v => setD({ ...d, ml: v })} />
        </div>
      </Card>
      {d.python && <SocialProof stat="You're in good company" text={`Learners at your level typically reach the next proficiency in 4 to 6 weeks.`} />}
    </StepLayout>
  );

  // ─── GAP VISUALIZATION (interstitial) ───
  if (step === "gap") return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ maxWidth: 500, textAlign: "center" }}>
        <div style={{ fontFamily: F.mono, fontSize: 11, letterSpacing: 2, color: C.accent, marginBottom: 12 }}>YOUR SKILL GAP</div>
        <h2 style={{ fontFamily: F.h, fontSize: 32, fontWeight: 800, color: C.text, margin: "0 0 8px" }}>{firstName ? `${firstName}, here's the distance.` : "Here's the distance."} The programme covers it all.</h2>
        <p style={{ fontFamily: F.h, fontSize: 15, color: C.sub, marginBottom: 8 }}>The gold area is you today. The blue outline is where you'll be after 12 months.</p>
        <GapRadar skills={d} />
        <Btn onClick={() => setStep(4)} style={{ marginTop: 16 }}>Continue →</Btn>
      </div>
    </div>
  );

  // ─── STEP 4: AI EXPERIENCE ───
  if (step === 4) return (
    <StepLayout step={4} total={6} label="Your AI experience" title={firstName ? `${firstName}, how are you using AI today?` : "How are you using AI today?"} subtitle="We want to know what's working and what's not, so we can help you use AI the right way."
      onNext={() => setStep(5)} onBack={() => setStep(3)} hint="We'll address your specific AI concerns in your welcome note.">
      <Card>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: 1.5, color: C.muted, textTransform: "uppercase", display: "block", marginBottom: 8 }}>What do you use AI for? (pick all that apply)</label>
          <Chips multi options={["Analysing data", "Writing SQL or Python", "Debugging code", "Building dashboards", "Learning new concepts", "Interview prep", "Nothing yet"]} selected={d.aiUse} onChange={v => setD({ ...d, aiUse: v })} />
        </div>
        <div>
          <label style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: 1.5, color: C.muted, textTransform: "uppercase", display: "block", marginBottom: 8 }}>What's your biggest issue with AI?</label>
          <Chips options={["Outputs are often wrong", "Can't tell if AI results are correct", "Not sure when to use AI vs do it myself", "I worry about becoming too dependent", "No issues, I use it well"]} selected={d.aiIssue} onChange={v => setD({ ...d, aiIssue: v })} />
        </div>
      </Card>
    </StepLayout>
  );

  // ─── STEP 5: GOALS ───
  if (step === 5) return (
    <StepLayout step={5} total={6} label="Your goals" title={firstName ? `${firstName}, what would make this programme worth it?` : "What would make this programme worth it?"} subtitle="Pick up to 4 outcomes that matter most. This shapes your onboarding and how we guide you."
      onNext={() => setStep(6)} onBack={() => setStep(4)} hint="Your welcome letter is built from what you share here.">
      <Card>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          {["Get hired at top product companies", "Learn to analyse data and make better decisions", "Move into a higher-paying data role", "Stay relevant by mastering AI and ML", "Become a decision scientist or product analyst", "Switch from a non-tech career to data", "Build and deploy ML models in production", "Use AI effectively without becoming dependent on it"].map(g => {
            const sel = d.goals.includes(g);
            return (
              <button key={g} onClick={() => {
                if (sel) setD({ ...d, goals: d.goals.filter(x => x !== g) });
                else if (d.goals.length < 4) setD({ ...d, goals: [...d.goals, g] });
              }} style={{
                padding: "14px 16px", borderRadius: 10, textAlign: "left",
                border: `1.5px solid ${sel ? C.accent : C.border}`,
                background: sel ? C.accentSoft : C.white,
                fontFamily: F.h, fontSize: 14, color: sel ? C.accent : C.text,
                fontWeight: sel ? 600 : 400, cursor: "pointer", transition: "all 0.15s",
              }}><span style={{ marginRight: 6 }}>{sel ? "★" : "+"}</span>{g}</button>
            );
          })}
        </div>
        <InputField label="In one line, what does success look like for you?" value={d.successLine} onChange={v => setD({ ...d, successLine: v })} placeholder="e.g. I want to become a product analyst at a top company within 12 months" />
        <InputField label="✉ A note to your future self, 12 months from now (optional)" value={d.futureLetter} onChange={v => setD({ ...d, futureLetter: v })} placeholder="e.g. Stay consistent. The hard part is already behind you." />
      </Card>
    </StepLayout>
  );

  // ─── STEP 6: AGREEMENT ───
  if (step === 6) {
    return (
      <StepLayout step={6} total={6} label="Enrollment agreement" title="One final step before your journey begins" subtitle="We believe in being upfront. Here's what to expect."
        onNext={() => { setStep(7); setMilestones(m => ({ ...m, profile: true })); addCoins(50); }} onBack={() => setStep(5)} nextLabel="See your personalised roadmap" nextDisabled={!signed}>
        <Card>
          <h3 style={{ fontFamily: F.h, fontSize: 22, fontWeight: 700, color: C.text, margin: "0 0 16px" }}>Welcome to Scaler, {d.name || "Learner"}!</h3>
          <div style={{ fontFamily: F.h, fontSize: 15, color: C.sub, lineHeight: 1.8 }}>
            <p><strong style={{ color: C.text }}>Time commitment:</strong> About 15 hours a week. Classes are 3 days a week at 9 PM.</p>
            <p><strong style={{ color: C.text }}>Career support:</strong> Complete your module certifications to apply for jobs through 900+ Scaler hiring partners. This is not a placement guarantee. Your outcomes depend on your effort, skills, and market conditions.</p>
            <p><strong style={{ color: C.text }}>Payment:</strong> One-time programme fee. Loan options available through financing partners.</p>
          </div>
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: F.h, fontSize: 15, fontWeight: 600 }}>{d.name || "Learner"}</div>
              <div style={{ fontFamily: F.h, fontSize: 13, color: C.muted }}>Scaler DSML, April 2026</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Brush Script MT', cursive", fontSize: 24, color: C.text }}>Anshuman</div>
              <div style={{ fontFamily: F.h, fontSize: 13, color: C.muted }}>Co-Founder, Scaler</div>
            </div>
          </div>
          <button onClick={() => setSigned(!signed)} style={{
            marginTop: 20, padding: "14px 24px", borderRadius: 10, width: "100%",
            border: `2px solid ${signed ? C.green : C.border}`, background: signed ? C.greenSoft : C.white,
            fontFamily: F.h, fontSize: 15, fontWeight: 600, cursor: "pointer", color: signed ? C.green : C.text,
            transition: "all 0.2s",
          }}>{signed ? "✓ Signed and agreed" : "I agree to the terms above"}</button>
        </Card>
      </StepLayout>
    );
  }

  // ─── STEP 7: WELCOME REVEAL + ROADMAP ───
  if (step === 7) return (
    <div style={{ minHeight: "100vh", background: C.bg, padding: "48px 20px" }}>
      {coinPop && <CoinPop amount={coinPop} onDone={() => setCoinPop(null)} />}
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontFamily: F.mono, fontSize: 11, letterSpacing: 2, color: C.gold, marginBottom: 12 }}>WELCOME NOTE</div>
          <h1 style={{ fontFamily: F.h, fontSize: 40, fontWeight: 800, color: C.text, margin: "0 0 12px" }}>
            {firstName || "Learner"}, your journey starts now.
          </h1>
          <p style={{ fontFamily: F.h, fontSize: 16, color: C.sub }}>{Math.floor(Math.random() * 20 + 40)}+ learners with a similar profile have already enrolled this month.</p>
        </div>

        {/* Alumni matches */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 36 }}>
          {[
            { name: "Priya Sharma", role: "Decision Scientist at Flipkart", before: "Business Analyst" },
            { name: "Arjun Menon", role: "Data Scientist at Razorpay", before: "Software Engineer" },
            { name: "Sneha Reddy", role: "Product Analyst at Meesho", before: "Marketing Analyst" },
          ].map((a, i) => (
            <Card key={i} style={{ textAlign: "center", padding: 20 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: C.accentSoft, margin: "0 auto 10px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.h, fontSize: 18, fontWeight: 700, color: C.accent }}>{a.name[0]}</div>
              <div style={{ fontFamily: F.h, fontSize: 14, fontWeight: 700, color: C.text }}>{a.name}</div>
              <div style={{ fontFamily: F.h, fontSize: 13, color: C.accent, marginTop: 2 }}>{a.role}</div>
              <div style={{ fontFamily: F.h, fontSize: 12, color: C.muted, marginTop: 4 }}>Before: {a.before}</div>
            </Card>
          ))}
        </div>

        {/* AI concerns mapping */}
        {d.aiIssue && (
          <Card style={{ marginBottom: 36 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div>
                <div style={{ fontFamily: F.h, fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 12 }}>Your concern</div>
                <div style={{ fontFamily: F.h, fontSize: 14, color: C.sub, padding: "12px 16px", background: C.bg, borderRadius: 10 }}>✕ {d.aiIssue}</div>
              </div>
              <div>
                <div style={{ fontFamily: F.h, fontSize: 16, fontWeight: 700, color: C.accent, marginBottom: 12 }}>How Scaler helps</div>
                <div style={{ fontFamily: F.h, fontSize: 14, color: C.text, padding: "12px 16px", background: C.accentSoft, borderRadius: 10 }}>
                  {d.aiIssue.includes("wrong") && "✓ Learn to prompt correctly, set up checks, and add guardrails so AI doesn't hallucinate."}
                  {d.aiIssue.includes("validate") && "✓ Use techniques like LLM-as-a-judge, second-model review, and quick tests to verify AI outputs."}
                  {d.aiIssue.includes("when to use") && "✓ Learn when to use AI for speed and when to rely on your own reasoning, so you stay in control."}
                  {d.aiIssue.includes("dependent") && "✓ Scaler builds your fundamentals alongside AI skills. You lead, AI assists."}
                  {d.aiIssue.includes("No issues") && "✓ Great! You'll learn advanced techniques to go from good AI usage to production-grade AI workflows."}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Roadmap */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Pill bg={C.goldSoft} color={C.gold}>YOUR 12-MONTH ROADMAP</Pill>
          <h2 style={{ fontFamily: F.h, fontSize: 28, fontWeight: 800, color: C.text, margin: "16px 0 8px" }}>Learning and building, with and from, AI.</h2>
        </div>

        <div style={{ position: "relative", paddingLeft: 32 }}>
          {[
            { t: "Day 0", title: "Meet and Greet session", desc: "Orientation with your batch. Meet your 24x7 AI companion. Clear picture of what the year looks like.", cta: "Add to calendar", active: true },
            { t: "Week 1", title: "First class + mentor session", desc: "Learners who pick a mentor in Week 1 are 2-3x more likely to stay on track. Top mentor slots fill quickly.", active: true },
            { t: "Month 1-2", title: "SQL + Python + AI Workflows", desc: "Query data with AI. Build dashboards that tell stories. Automate analysis. Your first real data skills." },
            { t: "Month 3-4", title: "Analytics + Statistics + Experiments", desc: "Product analytics, A/B testing, hypothesis building. Think like a decision scientist." },
            { t: "Month 5-6", title: "Machine Learning: Build real models", desc: "Regression, classification, clustering, time series. From notebooks to production." },
            { t: "Month 7-8", title: "Deep Learning + NLP + Computer Vision", desc: "Transformers, LLMs, multimodal AI. The skills companies are hiring for right now." },
            { t: "Month 9-10", title: "MLOps + System Design + Capstone", desc: "Deploy models. Monitor drift. Build a production-grade portfolio project.", highlight: true },
            { t: "Month 10+", title: "Placement assistance begins", desc: "Clear skill certifications and start applying to 900+ hiring partners." },
            { t: "Beyond", title: "Lifelong learning partner", desc: "Lifetime access to live and updated course material. Your learning never stops." },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 16, marginBottom: 20, position: "relative" }}>
              <div style={{ position: "absolute", left: -32, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: item.active ? C.accent : item.highlight ? C.gold : C.border, flexShrink: 0 }} />
                {i < 8 && <div style={{ width: 1.5, flex: 1, background: C.borderSoft, minHeight: 50 }} />}
              </div>
              <Card style={{ flex: 1, background: item.highlight ? C.goldBg : C.white, border: `1px solid ${item.highlight ? "rgba(201,149,12,0.2)" : C.border}` }}>
                <div style={{ fontFamily: F.mono, fontSize: 11, letterSpacing: 2, color: item.active ? C.accent : C.muted, marginBottom: 4 }}>{item.t.toUpperCase()}</div>
                <div style={{ fontFamily: F.h, fontSize: 17, fontWeight: 700, color: C.text, marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontFamily: F.h, fontSize: 14, color: C.sub, lineHeight: 1.6 }}>{item.desc}</div>
              </Card>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 32 }}>
          <Btn onClick={() => { setStep(8); setShowCalendar(true); }}>Go to your dashboard →</Btn>
        </div>
      </div>
    </div>
  );

  // ─── STEP 8: DASHBOARD ───
  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      {coinPop && <CoinPop amount={coinPop} onDone={() => setCoinPop(null)} />}
      {confetti && <Confetti onDone={() => setConfetti(false)} />}
      {showCalendar && <CalendarPopup email={d.email || "your registered email"} onClose={() => setShowCalendar(false)} />}
      {nudge && <Nudge text={nudge.text} cta={nudge.cta} onAction={() => { completeMilestone("sat", 100); setNudge(null); }} onDismiss={() => setNudge(null)} />}
      <AIBuddy learnerName={firstName} />

      {/* NAV */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "10px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: F.h, fontSize: 20, fontWeight: 800, color: C.text }}>Scaler</span>
          <Pill>DSML</Pill>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {["home", "rewards", "roadmap"].map(tab => (
            <button key={tab} onClick={() => setDashTab(tab)} style={{
              background: "none", border: "none", fontFamily: F.h, fontSize: 14, fontWeight: dashTab === tab ? 700 : 400,
              color: dashTab === tab ? C.accent : C.muted, cursor: "pointer",
              borderBottom: dashTab === tab ? `2px solid ${C.accent}` : "2px solid transparent", padding: "10px 4px",
            }}>{tab === "home" ? "Home" : tab === "rewards" ? "Rewards" : "Roadmap"}</button>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: C.goldSoft, padding: "7px 16px", borderRadius: 20, fontFamily: F.h, fontSize: 14, fontWeight: 700, color: C.gold, marginLeft: 8 }}>
            🪙 {coins}
          </div>
          {firstName && <div style={{ fontFamily: F.h, fontSize: 14, fontWeight: 600, color: C.text, marginLeft: 8 }}>👋 {firstName}</div>}
        </div>
      </div>

      {/* BANNER */}
      <BannerRotator role={d.role} />

      <div style={{ padding: "28px 28px", maxWidth: 1100, margin: "0 auto" }}>
        {dashTab === "home" && <DashHome d={d} firstName={firstName} coins={coins} milestones={milestones} completeMilestone={completeMilestone} readiness={readiness} completedCount={completedCount} />}
        {dashTab === "rewards" && <DashRewards firstName={firstName} coins={coins} milestones={milestones} readiness={readiness} />}
        {dashTab === "roadmap" && <DashRoadmap />}
      </div>

      <style>{`
        @keyframes coinUp { 0% { opacity:0; transform:scale(0.5); } 25% { opacity:1; transform:scale(1.15); } 50% { transform:scale(1); } 100% { opacity:0; transform:translateY(-60px) scale(0.8); } }
        @keyframes slideIn { 0% { opacity:0; transform:translateY(12px); } 100% { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { transform:scale(1); } 50% { transform:scale(1.08); } }
        @keyframes confettiFall { 0% { transform:translateY(0) rotate(0deg); opacity:1; } 100% { transform:translateY(100vh) rotate(720deg); opacity:0; } }
        * { box-sizing: border-box; margin: 0; } body { margin: 0; font-family: 'Plus Jakarta Sans', sans-serif; }
        ::selection { background: ${C.accentSoft}; color: ${C.accent}; }
      `}</style>
    </div>
  );
}

/* ════════════════════════════════════════════
   DASHBOARD SUB-COMPONENTS
   ════════════════════════════════════════════ */
function BannerRotator({ role }) {
  const banners = [
    `💡 Most learners complete their SAT by Day 3. It takes about 20 minutes.`,
    `📊 Your batch: 85 learners from 14 cities. Most common role: ${role || "Data Analyst"}.`,
    `🎯 Learners who select a mentor in Week 1 are 2.3x more likely to complete Tier 2.`,
  ];
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI(x => (x + 1) % banners.length), 6000); return () => clearInterval(t); }, []);
  return (
    <div style={{ background: C.accentSoft, padding: "11px 28px", fontFamily: F.h, fontSize: 14, color: C.accent, transition: "all 0.5s" }}>
      {banners[i]}
    </div>
  );
}

function DashHome({ d, firstName, coins, milestones, completeMilestone, readiness, completedCount }) {
  const mngDate = new Date(); mngDate.setDate(mngDate.getDate() + 4);
  const diff = mngDate - new Date();
  const days = Math.floor(diff / 86400000); const hrs = Math.floor((diff % 86400000) / 3600000);
  const tierNum = readiness >= 85 ? 4 : readiness >= 65 ? 3 : readiness >= 40 ? 2 : 1;
  const tierLabel = ["", "Setup Complete", "First Month On Track", "Full Commitment", "Batch Standout"][tierNum];

  return (
    <>
      <h1 style={{ fontFamily: F.h, fontSize: 30, fontWeight: 800, color: C.text, margin: "0 0 4px" }}>
        Welcome, {firstName || "there"}. Let's get you ready for your first session.
      </h1>
      <p style={{ fontFamily: F.h, fontSize: 15, color: C.sub, margin: "0 0 24px" }}>
        Complete the steps below before your Meet and Greet. Your classes begin after that.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 22 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

          {/* MnG Countdown */}
          <Card style={{ background: `linear-gradient(135deg, ${C.accent}, ${C.accentDark})`, border: "none", color: "#fff" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: F.mono, fontSize: 11, letterSpacing: 2, opacity: 0.7 }}>MEET AND GREET IN</div>
                <div style={{ fontFamily: F.h, fontSize: 40, fontWeight: 800, marginTop: 4 }}>{days}d {hrs}h</div>
                <div style={{ fontFamily: F.h, fontSize: 14, opacity: 0.8, marginTop: 4 }}>Your orientation session with the full batch.</div>
              </div>
              <div style={{ fontSize: 48 }}>🎓</div>
            </div>
          </Card>

          {/* Readiness + Tier */}
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div>
                <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: 2, color: C.muted }}>ONBOARDING READINESS</div>
                <div style={{ fontFamily: F.h, fontSize: 48, fontWeight: 800, color: readiness >= 65 ? C.green : readiness >= 35 ? C.orange : C.red, lineHeight: 1 }}>{readiness}%</div>
              </div>
              <Pill bg={C.goldSoft} color={C.gold}>Tier {tierNum}: {tierLabel}</Pill>
            </div>
            <ProgressBar pct={readiness} color={readiness >= 65 ? C.green : readiness >= 35 ? C.orange : C.red} h={8} />
          </Card>

          {/* Quest milestones */}
          <Card>
            <div style={{ fontFamily: F.h, fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 4 }}>Onboarding Quest</div>
            <div style={{ fontFamily: F.h, fontSize: 14, color: C.sub, marginBottom: 18 }}>Finish all 4 to earn "Ready for MnG" + 100 bonus coins.</div>
            {[
              { key: "profile", label: "Profile completed", coins: 50, icon: "👤", auto: true },
              { key: "loan", label: "Loan/EMI paperwork", coins: 50, icon: "📄" },
              { key: "sat", label: "SAT taken", coins: 100, icon: "📝" },
              { key: "mentor", label: "Mentor selected", coins: 75, icon: "🎯" },
            ].map((m, i) => {
              const done = milestones[m.key];
              return (
                <div key={m.key} style={{
                  display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
                  background: done ? C.greenSoft : C.bg, border: `1px solid ${done ? "rgba(26,127,69,0.15)" : C.borderSoft}`,
                  borderRadius: 12, marginBottom: 8, transition: "all 0.3s",
                }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: done ? C.green : C.border, display: "flex", alignItems: "center", justifyContent: "center", fontSize: done ? 15 : 13, color: done ? "#fff" : C.muted, fontWeight: 700, flexShrink: 0, transition: "all 0.3s" }}>{done ? "✓" : i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: F.h, fontSize: 15, fontWeight: 500, color: C.text }}>{m.icon} {m.label}</div>
                    {m.auto && done && <div style={{ fontFamily: F.h, fontSize: 12, color: C.green }}>Auto-credited from your sign-up</div>}
                  </div>
                  <div style={{ fontFamily: F.mono, fontSize: 11, color: done ? C.green : C.gold, fontWeight: 600 }}>{done ? `+${m.coins}` : `${m.coins} coins`}</div>
                  {!done && !m.auto && (
                    m.key === "loan" ? (
                      <a href="https://wa.me/919876543210?text=Hi%2C%20I%20have%20a%20question%20about%20my%20loan%20paperwork" target="_blank" rel="noopener noreferrer"
                        style={{ padding: "7px 14px", borderRadius: 8, background: "#25D366", color: "#fff", fontFamily: F.h, fontSize: 12, fontWeight: 600, textDecoration: "none" }}>Talk to counsellor</a>
                    ) : (
                      <Btn onClick={() => completeMilestone(m.key, m.coins)} style={{ padding: "7px 16px", fontSize: 13 }}>
                        {m.key === "sat" ? "Start SAT" : m.key === "mentor" ? "Pick mentor" : "Complete"}
                      </Btn>
                    )
                  )}
                </div>
              );
            })}
            {completedCount === 4 && (
              <div style={{ marginTop: 10, padding: "16px 18px", borderRadius: 12, background: `linear-gradient(135deg, ${C.gold}, #F5D060)`, color: "#fff", fontFamily: F.h, fontSize: 15, fontWeight: 700, textAlign: "center" }}>
                🎉 Ready for MnG! All milestones done. +100 bonus coins earned!
              </div>
            )}
          </Card>

          {/* Pre-read (Pre-MnG phase) */}
          <Card style={{ background: C.accentSoft, border: `1px solid rgba(23,70,162,0.1)` }}>
            <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: 2, color: C.accent, marginBottom: 6 }}>RECOMMENDED PRE-READ · 15 MINUTES</div>
            <div style={{ fontFamily: F.h, fontSize: 17, fontWeight: 700, color: C.text, marginBottom: 6 }}>Get a head start before your MnG</div>
            <div style={{ fontFamily: F.h, fontSize: 14, color: C.sub, lineHeight: 1.7, marginBottom: 14 }}>
              These short reads will help you feel more prepared and less anxious on Day 1. No coding needed, just context.
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
              {[
                { title: "What to expect in your first month", time: "5 min" },
                { title: "How data professionals use SQL daily", time: "7 min" },
                { title: "Your batch, your schedule, your tools", time: "3 min" },
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: C.white, borderRadius: 10, border: `1px solid ${C.borderSoft}` }}>
                  <span style={{ fontFamily: F.h, fontSize: 14, fontWeight: 500, color: C.text }}>📖 {r.title}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 11, color: C.muted }}>{r.time}</span>
                </div>
              ))}
            </div>
            <Btn>Start reading →</Btn>
          </Card>
        </div>

        {/* RIGHT SIDEBAR */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Counsellor */}
          <Card>
            <div style={{ fontFamily: F.h, fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 10 }}>Your onboarding counsellor</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.h, fontSize: 18, fontWeight: 700, color: C.accent }}>P</div>
              <div>
                <div style={{ fontFamily: F.h, fontSize: 15, fontWeight: 600, color: C.text }}>Priya Verma</div>
                <div style={{ fontFamily: F.h, fontSize: 13, color: C.sub }}>Helped 120+ DSML learners get started</div>
              </div>
            </div>
            <a href="https://wa.me/919876543210?text=Hi%20Priya%2C%20I%20need%20help%20with%20my%20DSML%20onboarding" target="_blank" rel="noopener noreferrer"
              style={{ display: "block", padding: "12px", borderRadius: 10, background: "#25D366", color: "#fff", fontFamily: F.h, fontSize: 14, fontWeight: 600, textDecoration: "none", textAlign: "center" }}>
              Chat on WhatsApp →
            </a>
          </Card>

          {/* Adaptive Pre-read */}
          <Card>
            <div style={{ fontFamily: F.h, fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 4 }}>Prep for your MnG</div>
            <div style={{ fontFamily: F.h, fontSize: 13, color: C.sub, marginBottom: 14 }}>Even 30 minutes of reading before your orientation makes a real difference.</div>
            <div style={{ padding: "14px 16px", background: C.bg, borderRadius: 10, border: `1px solid ${C.borderSoft}` }}>
              <div style={{ fontFamily: F.h, fontSize: 14, fontWeight: 600, color: C.text }}>📖 SQL Basics: Why Every Data Role Starts Here</div>
              <div style={{ fontFamily: F.h, fontSize: 13, color: C.muted, marginTop: 4 }}>10 min read · No coding needed</div>
            </div>
            <Btn variant="outline" style={{ marginTop: 12, width: "100%", justifyContent: "center", padding: "10px" }}>Start reading →</Btn>
          </Card>

          {/* Coin summary */}
          <Card>
            <div style={{ fontFamily: F.h, fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 10 }}>Coins earned</div>
            <div style={{ fontFamily: F.h, fontSize: 36, fontWeight: 800, color: C.gold }}>{coins} <span style={{ fontSize: 14, fontWeight: 400, color: C.muted }}>/ 375</span></div>
            <ProgressBar pct={(coins / 375) * 100} color={C.gold} />
            <div style={{ marginTop: 14, fontFamily: F.h, fontSize: 13, color: C.sub, lineHeight: 2 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Profile completed</span><span style={{ color: milestones.profile ? C.green : C.muted }}>{milestones.profile ? "+50 ✓" : "50"}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>SAT taken</span><span style={{ color: milestones.sat ? C.green : C.muted }}>{milestones.sat ? "+100 ✓" : "100"}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Mentor selected</span><span style={{ color: milestones.mentor ? C.green : C.muted }}>{milestones.mentor ? "+75 ✓" : "75"}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Loan paperwork</span><span style={{ color: milestones.loan ? C.green : C.muted }}>{milestones.loan ? "+50 ✓" : "50"}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, paddingTop: 8, borderTop: `1px solid ${C.borderSoft}` }}><span>All 4 done bonus</span><span>100</span></div>
            </div>
          </Card>

          {/* Tier rewards */}
          <Card>
            <div style={{ fontFamily: F.h, fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 12 }}>Tier rewards</div>
            {[
              { n: 1, l: "Setup Complete", r: "LinkedIn credential", pct: "85% earn" },
              { n: 2, l: "First Month", r: "Scaler bottle or notebook", pct: "65% earn" },
              { n: 3, l: "Full Commitment", r: "T-shirt + resume review", pct: "25% earn" },
              { n: 4, l: "Batch Standout", r: "Mentor session + mock priority", pct: "8% earn" },
            ].map(t => (
              <div key={t.n} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", opacity: t.n <= (readiness >= 85 ? 4 : readiness >= 65 ? 3 : readiness >= 40 ? 2 : 1) ? 1 : 0.45 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: t.n <= (readiness >= 85 ? 4 : readiness >= 65 ? 3 : readiness >= 40 ? 2 : 1) ? C.gold : C.border, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.h, fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{t.n}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: F.h, fontSize: 13, fontWeight: 600, color: C.text }}>{t.l}</div>
                  <div style={{ fontFamily: F.h, fontSize: 12, color: C.muted }}>{t.r}</div>
                </div>
                <span style={{ fontFamily: F.mono, fontSize: 10, color: C.muted }}>{t.pct}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </>
  );
}

function DashRewards({ firstName, coins, milestones, readiness }) {
  const allPreMnG = Object.values(milestones).every(Boolean);
  const tierNum = readiness >= 85 ? 4 : readiness >= 65 ? 3 : readiness >= 40 ? 2 : 1;

  const tierRewards = [
    { tier: 1, title: "Setup Complete", desc: "Attend MnG + Calendar added + PYSJ booked", items: ["LinkedIn-shareable credential", "'Active Learner' profile marker", "100 Scaler coins"], emoji: "🎓", unlocked: tierNum >= 1 },
    { tier: 2, title: "First Month On Track", desc: "Tier 1 + Classes 1-3 + First assignment + PYSJ completed", items: ["Scaler bottle or notebook (you pick)", "300 Scaler coins", "Early access to next module's pre-reads"], emoji: "🎒", unlocked: tierNum >= 2 },
    { tier: 3, title: "Full Commitment", desc: "Tier 2 + 100% attendance (2 weeks) + All reviews + 7-day streak", items: ["Scaler t-shirt", "500 Scaler coins", "Priority mentor slot for Month 2", "Resume review by career team"], emoji: "🏆", unlocked: tierNum >= 3 },
    { tier: 4, title: "Batch Standout", desc: "Tier 3 + Top 10% speed + 100% readiness + LinkedIn post", items: ["1:1 mentor session (30 min)", "1000 Scaler coins", "Featured in batch summary", "Mock interview priority scheduling"], emoji: "⭐", unlocked: tierNum >= 4 },
  ];

  const unlockables = [
    { title: "Alumni career stories", desc: "Real transitions from people like you. Not promotional, just honest.", trigger: "Complete all 4 pre-MnG steps", emoji: "🎬", unlocked: allPreMnG },
    { title: "Exclusive masterclass recording", desc: "A CTO talk or system design session from industry leaders.", trigger: "Attend 3 classes", emoji: "🎤", unlocked: false },
    { title: "Quick reference sheet", desc: "Cheat sheet for your next module. Practical and immediately useful.", trigger: "Submit your first assignment", emoji: "📋", unlocked: false },
  ];

  const perks = [
    { title: "Extra 1:1 TA session", desc: "15 minutes of personal attention with a teaching assistant.", trigger: "All onboarding done by Day 14", emoji: "👩‍🏫", unlocked: false },
    { title: "Priority mentor slot", desc: "First pick of mentor time slots for Month 2.", trigger: "Reach Tier 3", emoji: "📅", unlocked: tierNum >= 3 },
    { title: "Early module access", desc: "Get Week 5-6 pre-reads before your batch does.", trigger: "Reach Tier 1", emoji: "🚀", unlocked: tierNum >= 1 },
    { title: "Free resume review", desc: "Career team reviews your resume and gives feedback.", trigger: "PYSJ done + 100% Week 1-2 attendance", emoji: "📄", unlocked: false },
    { title: "Mock interview priority", desc: "First in line when mock slots open.", trigger: "Reach Tier 3", emoji: "🎯", unlocked: tierNum >= 3 },
  ];

  return (
    <div>
      {/* Header with coin balance */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
        <div>
          <h2 style={{ fontFamily: F.h, fontSize: 30, fontWeight: 800, color: C.text, margin: "0 0 6px" }}>{firstName ? `${firstName}'s Rewards` : "Rewards Shop"}</h2>
          <p style={{ fontFamily: F.h, fontSize: 15, color: C.sub, margin: 0 }}>Everything you earn by showing up and doing the work. No shortcuts, real rewards.</p>
        </div>
        <div style={{ background: `linear-gradient(135deg, ${C.gold}, #F5D060)`, padding: "14px 24px", borderRadius: 14, textAlign: "center", minWidth: 140 }}>
          <div style={{ fontFamily: F.h, fontSize: 28, fontWeight: 800, color: "#fff" }}>🪙 {coins}</div>
          <div style={{ fontFamily: F.h, fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>Your coins</div>
        </div>
      </div>

      {/* Welcome Kit banner */}
      <div style={{
        background: `linear-gradient(135deg, ${C.accentDark}, ${C.accent})`, borderRadius: 16, padding: "28px 32px",
        marginBottom: 28, color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <div style={{ fontFamily: F.mono, fontSize: 11, letterSpacing: 2, opacity: 0.7, marginBottom: 6 }}>SCALER WELCOME KIT</div>
          <div style={{ fontFamily: F.h, fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Ships at the end of Week 4</div>
          <div style={{ fontFamily: F.h, fontSize: 14, opacity: 0.85, maxWidth: 500, lineHeight: 1.5 }}>
            One box. Everything you earned. The higher your tier by Day 28, the more you get. Learners love the unboxing moment.
          </div>
        </div>
        <div style={{ fontSize: 56 }}>📦</div>
      </div>

      {/* Tier Rewards */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontFamily: F.h, fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 16 }}>Tier Rewards</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {tierRewards.map(t => (
            <div key={t.tier} style={{
              background: t.unlocked ? C.white : C.bg, border: `1.5px solid ${t.unlocked ? C.gold : C.border}`,
              borderRadius: 14, padding: 22, position: "relative", overflow: "hidden", transition: "all 0.3s",
              opacity: t.unlocked ? 1 : 0.65,
            }}>
              {t.unlocked && <div style={{ position: "absolute", top: 12, right: 14, fontFamily: F.h, fontSize: 11, fontWeight: 700, color: C.green, background: C.greenSoft, padding: "3px 10px", borderRadius: 10 }}>UNLOCKED</div>}
              {!t.unlocked && <div style={{ position: "absolute", top: 12, right: 14, fontFamily: F.h, fontSize: 11, fontWeight: 600, color: C.muted, background: C.borderSoft, padding: "3px 10px", borderRadius: 10 }}>LOCKED</div>}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div style={{ fontSize: 32 }}>{t.emoji}</div>
                <div>
                  <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: 1.5, color: C.gold, fontWeight: 600 }}>TIER {t.tier}</div>
                  <div style={{ fontFamily: F.h, fontSize: 17, fontWeight: 700, color: C.text }}>{t.title}</div>
                </div>
              </div>
              <div style={{ fontFamily: F.h, fontSize: 13, color: C.sub, marginBottom: 12, lineHeight: 1.5 }}>{t.desc}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {t.items.map((item, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 8, padding: "8px 12px",
                    background: t.unlocked ? C.greenSoft : C.borderSoft, borderRadius: 8,
                    fontFamily: F.h, fontSize: 13, color: t.unlocked ? C.green : C.sub, fontWeight: 500,
                  }}>
                    <span>{t.unlocked ? "✓" : "○"}</span> {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unlockable Content */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontFamily: F.h, fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 16 }}>Unlockable Content</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          {unlockables.map((u, i) => (
            <div key={i} style={{
              background: u.unlocked ? C.white : C.bg, border: `1.5px solid ${u.unlocked ? C.accent : C.border}`,
              borderRadius: 14, padding: 20, opacity: u.unlocked ? 1 : 0.6, transition: "all 0.3s",
            }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{u.emoji}</div>
              <div style={{ fontFamily: F.h, fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 4 }}>{u.title}</div>
              <div style={{ fontFamily: F.h, fontSize: 13, color: C.sub, lineHeight: 1.5, marginBottom: 12 }}>{u.desc}</div>
              <div style={{
                padding: "6px 12px", borderRadius: 8, display: "inline-block",
                background: u.unlocked ? C.greenSoft : C.borderSoft,
                fontFamily: F.h, fontSize: 12, fontWeight: 600,
                color: u.unlocked ? C.green : C.muted,
              }}>
                {u.unlocked ? "✓ Unlocked" : u.trigger}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Zero-cost Perks */}
      <div>
        <div style={{ fontFamily: F.h, fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 16 }}>Career Perks</div>
        <p style={{ fontFamily: F.h, fontSize: 14, color: C.sub, marginBottom: 16, marginTop: -8 }}>These cost nothing extra. They're earned by being consistent.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {perks.map((p, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "16px 18px",
              background: p.unlocked ? C.white : C.bg, border: `1px solid ${p.unlocked ? C.accent : C.border}`,
              borderRadius: 12, opacity: p.unlocked ? 1 : 0.55, transition: "all 0.3s",
            }}>
              <div style={{ fontSize: 24, flexShrink: 0 }}>{p.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: F.h, fontSize: 14, fontWeight: 600, color: C.text }}>{p.title}</div>
                <div style={{ fontFamily: F.h, fontSize: 12, color: C.sub, lineHeight: 1.4 }}>{p.desc}</div>
              </div>
              <div style={{
                padding: "4px 10px", borderRadius: 8, flexShrink: 0,
                background: p.unlocked ? C.greenSoft : C.borderSoft,
                fontFamily: F.h, fontSize: 11, fontWeight: 600,
                color: p.unlocked ? C.green : C.muted,
              }}>
                {p.unlocked ? "✓ Earned" : p.trigger}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashRoadmap() {
  const items = [
    { t: "Day 0", title: "Meet and Greet", desc: "Batch orientation. Meet your AI companion.", active: true },
    { t: "Week 1", title: "First class + mentor", desc: "Your first live session. Pick your mentor.", active: true },
    { t: "Month 1-2", title: "SQL + Python + AI Workflows", desc: "Query, visualise, and automate with AI." },
    { t: "Month 3-4", title: "Analytics + Statistics", desc: "A/B tests, product analytics, decision-making." },
    { t: "Month 5-6", title: "Machine Learning", desc: "Build and deploy real ML models." },
    { t: "Month 7-8", title: "Deep Learning + NLP + CV", desc: "Transformers, LLMs, multimodal AI." },
    { t: "Month 9-10", title: "MLOps + Capstone", desc: "Production systems. Portfolio project.", highlight: true },
    { t: "Month 10+", title: "Placements begin", desc: "Apply to 900+ hiring partners." },
    { t: "Beyond", title: "Lifelong access", desc: "Your learning never stops." },
  ];
  return (
    <div>
      <h2 style={{ fontFamily: F.h, fontSize: 28, fontWeight: 800, color: C.text, margin: "0 0 8px" }}>Your 12-month roadmap</h2>
      <p style={{ fontFamily: F.h, fontSize: 15, color: C.sub, marginBottom: 28 }}>Learning and building, with and from, AI.</p>
      <div style={{ paddingLeft: 32, position: "relative" }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 16, marginBottom: 18, position: "relative" }}>
            <div style={{ position: "absolute", left: -32, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: item.active ? C.accent : item.highlight ? C.gold : C.border, flexShrink: 0 }} />
              {i < items.length - 1 && <div style={{ width: 1.5, flex: 1, background: C.borderSoft, minHeight: 40 }} />}
            </div>
            <Card style={{ flex: 1, padding: 18, background: item.highlight ? C.goldBg : C.white }}>
              <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: 2, color: item.active ? C.accent : C.muted }}>{item.t.toUpperCase()}</div>
              <div style={{ fontFamily: F.h, fontSize: 16, fontWeight: 700, color: C.text }}>{item.title}</div>
              <div style={{ fontFamily: F.h, fontSize: 14, color: C.sub }}>{item.desc}</div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

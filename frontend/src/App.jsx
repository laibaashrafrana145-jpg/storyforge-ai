import { useState } from "react"
import CharacterForge from "./components/CharacterForge/CharacterForge"
import WorldForge from "./components/WorldForge/WorldForge"
import PlotForge from "./components/PlotForge/PlotForge"
import CharacterChat from "./components/CharacterChat/CharacterChat"
import StoryContinuation from "./components/StoryContinuation/StoryContinuation"
import "./App.css"

const TABS = [
  { id: "home",      label: "🏠 Home",              color: "#7c3aed" },
  { id: "character", label: "🧙 Character Forge",    color: "#7c3aed" },
  { id: "world",     label: "🌍 World Forge",        color: "#059669" },
  { id: "plot",      label: "📖 Plot Forge",         color: "#d97706" },
  { id: "chat",      label: "💬 Character Chat",     color: "#2563eb" },
  { id: "story",     label: "✍️ Story Continuation", color: "#dc2626" },
]

export default function App() {
  const [active, setActive] = useState("home")
  const activeTab = TABS.find(t => t.id === active)

  return (
    <div style={{ minHeight: "100vh", background: "#f8f7ff" }}>

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
        padding: "1.2rem 2rem",
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 12px rgba(124,58,237,0.3)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 28 }}>⚔️</span>
          <div>
            <h1 style={{ color: "white", margin: 0, fontSize: 22, fontWeight: 700 }}>
              StoryForge AI
            </h1>
            <p style={{ color: "rgba(255,255,255,0.75)", margin: 0, fontSize: 12 }}>
              Build entire fictional universes with AI
            </p>
          </div>
        </div>
        <div style={{
          background: "rgba(255,255,255,0.15)",
          padding: "4px 12px", borderRadius: 20,
          color: "white", fontSize: 12, fontWeight: 500
        }}>
          🏆 Agents League 2026
        </div>
      </div>

      {/* Navigation */}
      <div style={{
        display: "flex", gap: 8, padding: "12px 16px",
        flexWrap: "wrap", background: "white",
        borderBottom: "1px solid #e5e7eb",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
      }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            className="tab-btn"
            onClick={() => setActive(tab.id)}
            style={{
              borderColor: active === tab.id ? tab.color : "#e5e7eb",
              background: active === tab.id ? tab.color : "white",
              color: active === tab.id ? "white" : "#4b5563",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "1.5rem 1rem" }}>
        {active === "home"      && <HomePage onNavigate={setActive} />}
        {active === "character" && <CharacterForge />}
        {active === "world"     && <WorldForge />}
        {active === "plot"      && <PlotForge />}
        {active === "chat"      && <CharacterChat />}
        {active === "story"     && <StoryContinuation />}
      </div>

    </div>
  )
}

function HomePage({ onNavigate }) {
  const features = [
    { id: "character", icon: "🧙", title: "Character Forge", color: "#7c3aed", bg: "#f5f3ff",
      desc: "Generate heroes, villains and side characters grounded in real mythology" },
    { id: "world", icon: "🌍", title: "World Forge", color: "#059669", bg: "#f0fdf4",
      desc: "Build kingdoms, planets, cities and magic systems inspired by real history" },
    { id: "plot", icon: "📖", title: "Plot Forge", color: "#d97706", bg: "#fffbeb",
      desc: "Create story arcs, quests and conflicts with full narrative timelines" },
    { id: "chat", icon: "💬", title: "Character Chat", color: "#2563eb", bg: "#eff6ff",
      desc: "Talk directly to your characters — they stay fully in-persona" },
    { id: "story", icon: "✍️", title: "Story Continuation", color: "#dc2626", bg: "#fff5f5",
      desc: "Write an opening and AI continues your story seamlessly" },
  ]

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>

      {/* Hero */}
      <div style={{
        textAlign: "center", padding: "3rem 1rem 2rem",
        background: "linear-gradient(135deg, #f5f3ff 0%, #eff6ff 100%)",
        borderRadius: 20, marginBottom: 32,
        border: "1px solid #e5e7eb"
      }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>⚔️</div>
        <h2 style={{ fontSize: 32, color: "#7c3aed", margin: "0 0 12px", fontWeight: 800 }}>
          StoryForge AI
        </h2>
        <p style={{ fontSize: 16, color: "#6b7280", maxWidth: 500, margin: "0 auto 24px", lineHeight: 1.6 }}>
          Build entire fictional universes with AI — grounded in real mythology,
          history, and culture via Microsoft Foundry IQ
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => onNavigate("character")}
            className="forge-btn"
            style={{ background: "#7c3aed" }}
          >
            ⚡ Start Creating
          </button>
          <div style={{
            padding: "12px 20px", borderRadius: 10,
            background: "#f0f9ff", color: "#0369a1",
            fontSize: 13, fontWeight: 500,
            border: "1px solid #bae6fd"
          }}>
            🔍 Powered by Foundry IQ
          </div>
        </div>
      </div>

      {/* Feature cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 16, marginBottom: 32
      }}>
        {features.map(f => (
          <div
            key={f.id}
            onClick={() => onNavigate(f.id)}
            style={{
              background: f.bg, borderRadius: 14,
              padding: "1.2rem", cursor: "pointer",
              border: `1px solid ${f.color}22`,
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-3px)"
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 10 }}>{f.icon}</div>
            <h3 style={{ color: f.color, margin: "0 0 8px", fontSize: 15, fontWeight: 600 }}>
              {f.title}
            </h3>
            <p style={{ color: "#6b7280", fontSize: 13, margin: 0, lineHeight: 1.5 }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>

      {/* IQ Badge */}
      <div style={{
        background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
        borderRadius: 14, padding: "1.2rem 1.5rem",
        border: "1px solid #bae6fd",
        display: "flex", alignItems: "center", gap: 16
      }}>
        <div style={{ fontSize: 36 }}>🔍</div>
        <div>
          <h3 style={{ color: "#0369a1", margin: "0 0 4px", fontSize: 15 }}>
            Microsoft Foundry IQ Integration
          </h3>
          <p style={{ color: "#0284c7", margin: 0, fontSize: 13, lineHeight: 1.5 }}>
            Every generation is grounded in real mythology, history, and culture.
            Foundry IQ retrieves knowledge from Egyptian mythology, Norse mythology,
            and medieval architecture to reduce hallucination and create authentic worlds.
          </p>
        </div>
      </div>

    </div>
  )
}
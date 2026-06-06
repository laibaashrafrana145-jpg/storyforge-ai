import { useState } from "react"
import CharacterForge from "./components/CharacterForge/CharacterForge"
import WorldForge from "./components/WorldForge/WorldForge"
import PlotForge from "./components/PlotForge/PlotForge"

const TABS = [
  { id: "character", label: "🧙 Character Forge", color: "#7c3aed" },
  { id: "world",     label: "🌍 World Forge",     color: "#059669" },
  { id: "plot",      label: "📖 Plot Forge",       color: "#d97706" },
  { id: "chat",      label: "💬 Character Chat",   color: "#2563eb" },
  { id: "story",     label: "✍️ Story Continuation", color: "#dc2626" },
]

export default function App() {
  const [active, setActive] = useState("character")
  const activeTab = TABS.find(t => t.id === active)

  return (
    <div style={{ minHeight: "100vh", background: "#f8f7ff" }}>

      <div style={{
        background: "white", borderBottom: "1px solid #e5e7eb",
        padding: "1rem 2rem", textAlign: "center"
      }}>
        <h1 style={{ fontSize: 28, color: "#7c3aed", margin: 0 }}>⚔️ StoryForge AI</h1>
        <p style={{ color: "#6b7280", margin: "4px 0 0", fontSize: 14 }}>
          Build entire fictional universes with AI
        </p>
      </div>

      <div style={{
        display: "flex", justifyContent: "center",
        gap: 8, padding: "1rem", flexWrap: "wrap",
        background: "white", borderBottom: "1px solid #e5e7eb"
      }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            style={{
              padding: "8px 18px", borderRadius: 20,
              border: `2px solid ${active === tab.id ? tab.color : "#e5e7eb"}`,
              background: active === tab.id ? tab.color : "white",
              color: active === tab.id ? "white" : "#4b5563",
              cursor: "pointer", fontSize: 13, fontWeight: 500,
              transition: "all 0.2s"
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ padding: "1rem" }}>
        {active === "character" && <CharacterForge />}
        {active === "world"     && <WorldForge />}
        {active === "plot"      && <PlotForge />}
        {active === "chat"      && <ComingSoon label="💬 Character Chat" color="#2563eb" />}
        {active === "story"     && <ComingSoon label="✍️ Story Continuation" color="#dc2626" />}
      </div>

    </div>
  )
}

function ComingSoon({ label, color }) {
  return (
    <div style={{
      maxWidth: 700, margin: "4rem auto",
      textAlign: "center", color: "#9ca3af"
    }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🔨</div>
      <h2 style={{ color }}>{label}</h2>
      <p>Coming soon — being built!</p>
    </div>
  )
}
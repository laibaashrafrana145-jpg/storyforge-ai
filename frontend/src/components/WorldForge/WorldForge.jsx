import { useState } from "react"
import axios from "axios"

const TYPES = ["kingdom", "planet", "city", "magic_system"]

export default function WorldForge() {
  const [theme, setTheme] = useState("")
  const [type, setType] = useState("kingdom")
  const [world, setWorld] = useState(null)
  const [loading, setLoading] = useState(false)

  async function generate() {
    if (!theme.trim()) return
    setLoading(true)
    setWorld(null)
    try {
      const res = await axios.post("http://localhost:8000/api/worlds/generate", {
        theme,
        world_type: type
      })
      setWorld(res.data.world)
    } catch (err) {
      alert("Error generating world. Is the backend running?")
    }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "2rem" }}>
      <h2 style={{ color: "#059669", marginBottom: 4 }}>🌍 World Forge</h2>
      <p style={{ color: "#666", marginBottom: 24 }}>Generate kingdoms, planets, cities and magic systems</p>

      <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
        <input
          value={theme}
          onChange={e => setTheme(e.target.value)}
          onKeyDown={e => e.key === "Enter" && generate()}
          placeholder="e.g. ancient Egypt, frozen Norse world..."
          style={{
            flex: 1, minWidth: 200, padding: "10px 14px",
            borderRadius: 8, border: "1px solid #ddd",
            fontSize: 14, outline: "none"
          }}
        />
        <select
          value={type}
          onChange={e => setType(e.target.value)}
          style={{
            padding: "10px 14px", borderRadius: 8,
            border: "1px solid #ddd", fontSize: 14,
            background: "white", cursor: "pointer"
          }}
        >
          {TYPES.map(t => (
            <option key={t} value={t}>
              {t === "kingdom" ? "👑 Kingdom" :
               t === "planet" ? "🪐 Planet" :
               t === "city" ? "🏙️ City" : "✨ Magic System"}
            </option>
          ))}
        </select>
        <button
          onClick={generate}
          disabled={loading}
          style={{
            padding: "10px 24px", borderRadius: 8,
            background: loading ? "#ccc" : "#059669",
            color: "white", border: "none",
            fontSize: 14, cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 500
          }}
        >
          {loading ? "Forging..." : "⚡ Forge"}
        </button>
      </div>

      {world && (
        <div style={{
          border: "1px solid #d1fae5", borderRadius: 12,
          padding: "1.5rem", background: "#f0fdf4", marginTop: 20
        }}>
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: 24, color: "#1f2937" }}>{world.name}</h3>
            <p style={{ margin: "4px 0 0", color: "#059669", fontStyle: "italic" }}>{world.tagline}</p>
          </div>

          <Section title="📜 Description" content={world.description} />
          <Section title="🗺️ Geography" content={world.geography} />
          <Section title="👥 Inhabitants" content={world.inhabitants} />
          <Section title="✨ Magic & Technology" content={world.magic_or_technology} />
          <Section title="⚔️ Conflicts" content={world.conflicts} />

          <div style={{
            marginTop: 14, padding: "12px 16px",
            background: "#dcfce7", borderRadius: 8,
            borderLeft: "3px solid #059669"
          }}>
            <p style={{ fontWeight: 500, margin: "0 0 4px", color: "#065f46" }}>🔮 Hidden Secret</p>
            <p style={{ margin: 0, color: "#064e3b", fontSize: 14 }}>{world.secrets}</p>
          </div>
        </div>
      )}
    </div>
  )
}

function Section({ title, content }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <p style={{ fontWeight: 500, marginBottom: 4, color: "#374151" }}>{title}</p>
      <p style={{ margin: 0, color: "#4b5563", lineHeight: 1.6, fontSize: 14 }}>{content}</p>
    </div>
  )
}
import { useState } from "react"
import axios from "axios"

const TYPES = ["story_arc", "chapter", "quest", "conflict"]

export default function PlotForge() {
  const [theme, setTheme] = useState("")
  const [type, setType] = useState("story_arc")
  const [plot, setPlot] = useState(null)
  const [loading, setLoading] = useState(false)

  async function generate() {
    if (!theme.trim()) return
    setLoading(true)
    setPlot(null)
    try {
      const res = await axios.post("http://localhost:8000/api/plots/generate", {
        theme,
        plot_type: type
      })
      setPlot(res.data.plot)
    } catch (err) {
      alert("Error generating plot. Is the backend running?")
    }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "2rem" }}>
      <h2 style={{ color: "#d97706", marginBottom: 4 }}>📖 Plot Forge</h2>
      <p style={{ color: "#666", marginBottom: 24 }}>Generate story arcs, chapters, quests and conflicts</p>

      <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
        <input
          value={theme}
          onChange={e => setTheme(e.target.value)}
          onKeyDown={e => e.key === "Enter" && generate()}
          placeholder="e.g. Egyptian warrior seeking revenge..."
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
              {t === "story_arc" ? "🌟 Story Arc" :
               t === "chapter"   ? "📄 Chapter" :
               t === "quest"     ? "⚔️ Quest" : "💥 Conflict"}
            </option>
          ))}
        </select>
        <button
          onClick={generate}
          disabled={loading}
          style={{
            padding: "10px 24px", borderRadius: 8,
            background: loading ? "#ccc" : "#d97706",
            color: "white", border: "none",
            fontSize: 14, cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 500
          }}
        >
          {loading ? "Forging..." : "⚡ Forge"}
        </button>
      </div>

      {plot && (
        <div style={{
          border: "1px solid #fde68a", borderRadius: 12,
          padding: "1.5rem", background: "#fffbeb", marginTop: 20
        }}>
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: 24, color: "#1f2937" }}>{plot.title}</h3>
            <p style={{ margin: "4px 0 0", color: "#d97706", fontStyle: "italic" }}>{plot.logline}</p>
          </div>

          <div style={{ position: "relative", paddingLeft: 20 }}>
            <div style={{
              position: "absolute", left: 7, top: 0, bottom: 0,
              width: 2, background: "#fde68a"
            }} />
            <TimelineItem icon="🌅" title="Setup" content={plot.setup} color="#d97706" />
            <TimelineItem icon="💥" title="Conflict" content={plot.conflict} color="#dc2626" />
            <TimelineItem icon="📈" title="Rising Action" content={plot.rising_action} color="#7c3aed" />
            <TimelineItem icon="⚡" title="Climax" content={plot.climax} color="#059669" />
            <TimelineItem icon="🌄" title="Resolution" content={plot.resolution} color="#2563eb" />
          </div>

          <div style={{ marginTop: 16 }}>
            <p style={{ fontWeight: 500, marginBottom: 8, color: "#374151" }}>🎭 Themes</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {plot.themes.map((t, i) => (
                <span key={i} style={{
                  background: "#fef3c7", color: "#92400e",
                  padding: "4px 12px", borderRadius: 20, fontSize: 13
                }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function TimelineItem({ icon, title, content, color }) {
  return (
    <div style={{ marginBottom: 16, paddingLeft: 16, position: "relative" }}>
      <div style={{
        position: "absolute", left: -7, top: 2,
        width: 14, height: 14, borderRadius: "50%",
        background: color, border: "2px solid white",
        boxShadow: "0 0 0 2px " + color
      }} />
      <p style={{ fontWeight: 500, margin: "0 0 4px", color }}>{icon} {title}</p>
      <p style={{ margin: 0, color: "#4b5563", fontSize: 14, lineHeight: 1.6 }}>{content}</p>
    </div>
  )
}
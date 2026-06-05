import { useState } from "react"
import axios from "axios"

const TYPES = ["hero", "villain", "side_character"]

export default function CharacterForge() {
  const [theme, setTheme] = useState("")
  const [type, setType] = useState("hero")
  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(false)

  async function generate() {
    if (!theme.trim()) return
    setLoading(true)
    setCharacter(null)
    try {
      const res = await axios.post("http://localhost:8000/api/characters/generate", {
        theme,
        character_type: type
      })
      setCharacter(res.data.character)
    } catch (err) {
      alert("Error generating character. Is the backend running?")
    }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "2rem" }}>
      <h2 style={{ color: "#7c3aed", marginBottom: 4 }}>🧙 Character Forge</h2>
      <p style={{ color: "#666", marginBottom: 24 }}>Generate heroes, villains and side characters</p>

      <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
        <input
          value={theme}
          onChange={e => setTheme(e.target.value)}
          onKeyDown={e => e.key === "Enter" && generate()}
          placeholder="e.g. Egyptian warrior, Norse sea captain..."
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
              {t === "hero" ? "⚔️ Hero" : t === "villain" ? "💀 Villain" : "🧝 Side Character"}
            </option>
          ))}
        </select>
        <button
          onClick={generate}
          disabled={loading}
          style={{
            padding: "10px 24px", borderRadius: 8,
            background: loading ? "#ccc" : "#7c3aed",
            color: "white", border: "none",
            fontSize: 14, cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 500
          }}
        >
          {loading ? "Forging..." : "⚡ Forge"}
        </button>
      </div>

      {character && (
        <div style={{
          border: "1px solid #e5e7eb", borderRadius: 12,
          padding: "1.5rem", background: "#fafafa", marginTop: 20
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 22, color: "#1f2937" }}>{character.name}</h3>
              <p style={{ margin: "4px 0 0", color: "#7c3aed", fontStyle: "italic" }}>{character.title}</p>
            </div>
            <span style={{
              background: type === "hero" ? "#dcfce7" : type === "villain" ? "#fee2e2" : "#fef9c3",
              color: type === "hero" ? "#166534" : type === "villain" ? "#991b1b" : "#854d0e",
              padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 500
            }}>
              {type.replace("_", " ").toUpperCase()}
            </span>
          </div>

          <Section title="📖 Backstory" content={character.backstory} />
          <Section title="✨ Personality" content={character.personality} />
          <Section title="👁️ Appearance" content={character.appearance} />
          <Section title="⚠️ Weakness" content={character.weakness} />

          <div style={{ marginTop: 14 }}>
            <p style={{ fontWeight: 500, marginBottom: 8, color: "#374151" }}>⚔️ Abilities</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {character.abilities.map((a, i) => (
                <span key={i} style={{
                  background: "#ede9fe", color: "#5b21b6",
                  padding: "4px 12px", borderRadius: 20, fontSize: 13
                }}>{a}</span>
              ))}
            </div>
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
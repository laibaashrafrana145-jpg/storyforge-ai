import { useState } from "react"
import axios from "axios"

const GENRES = ["fantasy", "sci-fi", "horror", "romance", "mystery", "adventure"]
const TONES = ["epic", "dark", "humorous", "mysterious", "romantic", "suspenseful"]
const LENGTHS = ["short", "medium", "long"]

export default function StoryContinuation() {
  const [text, setText] = useState("")
  const [genre, setGenre] = useState("fantasy")
  const [tone, setTone] = useState("epic")
  const [length, setLength] = useState("medium")
  const [fullStory, setFullStory] = useState("")
  const [loading, setLoading] = useState(false)

  async function continueStory() {
    if (!text.trim()) return
    setLoading(true)
    try {
      const res = await axios.post("http://localhost:8000/api/story/continue", {
        existing_text: fullStory || text,
        genre,
        tone,
        length
      })
      const continuation = res.data.continuation
      if (!fullStory) {
        setFullStory(text + "\n\n" + continuation)
      } else {
        setFullStory(fullStory + "\n\n" + continuation)
      }
    } catch (err) {
      alert("Error. Is the backend running?")
    }
    setLoading(false)
  }

  function reset() {
    setFullStory("")
    setText("")
  }

  return (
    <div style={{ maxWidth: 750, margin: "0 auto", padding: "2rem" }}>
      <h2 style={{ color: "#dc2626", marginBottom: 4 }}>✍️ Story Continuation</h2>
      <p style={{ color: "#666", marginBottom: 24 }}>
        Write an opening and AI continues your story
      </p>

      {/* Controls */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <div>
          <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>Genre</label>
          <select
            value={genre}
            onChange={e => setGenre(e.target.value)}
            style={{
              padding: "8px 12px", borderRadius: 8,
              border: "1px solid #ddd", fontSize: 13,
              background: "white", cursor: "pointer"
            }}
          >
            {GENRES.map(g => (
              <option key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>Tone</label>
          <select
            value={tone}
            onChange={e => setTone(e.target.value)}
            style={{
              padding: "8px 12px", borderRadius: 8,
              border: "1px solid #ddd", fontSize: 13,
              background: "white", cursor: "pointer"
            }}
          >
            {TONES.map(t => (
              <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>Length</label>
          <select
            value={length}
            onChange={e => setLength(e.target.value)}
            style={{
              padding: "8px 12px", borderRadius: 8,
              border: "1px solid #ddd", fontSize: 13,
              background: "white", cursor: "pointer"
            }}
          >
            {LENGTHS.map(l => (
              <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Text area — shows full story if continuing, input if fresh */}
      {!fullStory ? (
        <div>
          <label style={{ fontSize: 13, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>
            Your opening paragraph
          </label>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Write your story opening here... e.g. Khem stood at the edge of the desert, his golden armor catching the last rays of the dying sun..."
            rows={6}
            style={{
              width: "100%", padding: "12px",
              borderRadius: 8, border: "1px solid #ddd",
              fontSize: 14, lineHeight: 1.7,
              outline: "none", resize: "vertical",
              fontFamily: "Georgia, serif",
              boxSizing: "border-box"
            }}
          />
        </div>
      ) : (
        <div>
          <label style={{ fontSize: 13, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>
            Your story
          </label>
          <div style={{
            width: "100%", padding: "16px",
            borderRadius: 8, border: "1px solid #fecaca",
            fontSize: 14, lineHeight: 1.9,
            background: "#fff9f9", minHeight: 200,
            fontFamily: "Georgia, serif",
            whiteSpace: "pre-wrap", boxSizing: "border-box",
            maxHeight: 400, overflowY: "auto"
          }}>
            {fullStory.split("\n\n").map((para, i) => (
              <p key={i} style={{
                margin: "0 0 16px",
                color: i === 0 ? "#1f2937" : "#dc2626",
                borderLeft: i > 0 ? "3px solid #fecaca" : "none",
                paddingLeft: i > 0 ? 12 : 0
              }}>
                {para}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <button
          onClick={continueStory}
          disabled={loading || (!text.trim() && !fullStory)}
          style={{
            flex: 1, padding: "12px", borderRadius: 8,
            background: loading ? "#ccc" : "#dc2626",
            color: "white", border: "none",
            fontSize: 14, cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 500
          }}
        >
          {loading ? "Writing..." : fullStory ? "✍️ Continue Further" : "✍️ Continue Story"}
        </button>

        {fullStory && (
          <button
            onClick={reset}
            style={{
              padding: "12px 20px", borderRadius: 8,
              background: "white", color: "#6b7280",
              border: "1px solid #e5e7eb",
              fontSize: 14, cursor: "pointer"
            }}
          >
            Start New
          </button>
        )}
      </div>

      {fullStory && (
        <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 8, textAlign: "center" }}>
          Black text = your writing. Red text = AI continuation. Click Continue Further to keep going!
        </p>
      )}
    </div>
  )
}
import { useState, useRef, useEffect } from "react"
import axios from "axios"

export default function CharacterChat() {
  const [step, setStep] = useState("setup") // setup or chat
  const [character, setCharacter] = useState({
    name: "", title: "", backstory: "",
    personality: "", abilities: ""
  })
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  function startChat() {
    if (!character.name.trim()) return
    setStep("chat")
    setMessages([{
      role: "assistant",
      content: `I am ${character.name}, ${character.title}. What do you seek from me?`
    }])
  }

  async function sendMessage() {
    if (!input.trim() || loading) return
    const userMsg = { role: "user", content: input }
    const newHistory = [...messages, userMsg]
    setMessages(newHistory)
    setInput("")
    setLoading(true)

    try {
      const res = await axios.post("http://localhost:8000/api/chat/message", {
        character_name: character.name,
        character_title: character.title,
        character_backstory: character.backstory,
        character_personality: character.personality,
        character_abilities: character.abilities.split(",").map(a => a.trim()),
        user_message: input,
        chat_history: messages
      })
      setMessages([...newHistory, {
        role: "assistant",
        content: res.data.reply
      }])
    } catch (err) {
      alert("Error. Is the backend running?")
    }
    setLoading(false)
  }

  if (step === "setup") {
    return (
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "2rem" }}>
        <h2 style={{ color: "#2563eb", marginBottom: 4 }}>💬 Character Chat</h2>
        <p style={{ color: "#666", marginBottom: 24 }}>
          Enter your character details to start chatting
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Field label="Character Name" placeholder="e.g. Khem"
            value={character.name}
            onChange={v => setCharacter({ ...character, name: v })} />
          <Field label="Title" placeholder="e.g. Scorpion of the Nile"
            value={character.title}
            onChange={v => setCharacter({ ...character, title: v })} />
          <Field label="Backstory" placeholder="Brief backstory..."
            value={character.backstory}
            onChange={v => setCharacter({ ...character, backstory: v })}
            multiline />
          <Field label="Personality" placeholder="e.g. Fearless, charismatic, loyal"
            value={character.personality}
            onChange={v => setCharacter({ ...character, personality: v })} />
          <Field label="Abilities (comma separated)" placeholder="e.g. Swordsmanship, Divine blessing"
            value={character.abilities}
            onChange={v => setCharacter({ ...character, abilities: v })} />

          <button
            onClick={startChat}
            style={{
              padding: "12px", borderRadius: 8,
              background: "#2563eb", color: "white",
              border: "none", fontSize: 15,
              cursor: "pointer", fontWeight: 500,
              marginTop: 8
            }}
          >
            💬 Start Chatting
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "2rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div style={{
          width: 44, height: 44, borderRadius: "50%",
          background: "#2563eb", color: "white",
          display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 20
        }}>⚔️</div>
        <div>
          <div style={{ fontWeight: 600, color: "#1f2937" }}>{character.name}</div>
          <div style={{ fontSize: 13, color: "#2563eb", fontStyle: "italic" }}>{character.title}</div>
        </div>
        <button
          onClick={() => { setStep("setup"); setMessages([]) }}
          style={{
            marginLeft: "auto", padding: "6px 14px",
            borderRadius: 8, border: "1px solid #e5e7eb",
            background: "white", cursor: "pointer",
            fontSize: 13, color: "#6b7280"
          }}
        >
          Change Character
        </button>
      </div>

      {/* Chat messages */}
      <div style={{
        height: 380, overflowY: "auto",
        border: "1px solid #e5e7eb", borderRadius: 12,
        padding: "1rem", background: "#f8fafc",
        display: "flex", flexDirection: "column", gap: 12
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: msg.role === "user" ? "flex-end" : "flex-start"
          }}>
            <div style={{
              maxWidth: "80%", padding: "10px 14px",
              borderRadius: msg.role === "user"
                ? "18px 18px 4px 18px"
                : "18px 18px 18px 4px",
              background: msg.role === "user" ? "#2563eb" : "white",
              color: msg.role === "user" ? "white" : "#1f2937",
              fontSize: 14, lineHeight: 1.5,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{
              padding: "10px 14px", borderRadius: "18px 18px 18px 4px",
              background: "white", color: "#9ca3af", fontSize: 14,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
              {character.name} is thinking...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder={`Say something to ${character.name}...`}
          style={{
            flex: 1, padding: "10px 14px",
            borderRadius: 8, border: "1px solid #ddd",
            fontSize: 14, outline: "none"
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            padding: "10px 20px", borderRadius: 8,
            background: loading ? "#ccc" : "#2563eb",
            color: "white", border: "none",
            fontSize: 14, cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 500
          }}
        >
          Send
        </button>
      </div>
    </div>
  )
}

function Field({ label, placeholder, value, onChange, multiline }) {
  return (
    <div>
      <label style={{ fontSize: 13, fontWeight: 500, color: "#374151", display: "block", marginBottom: 4 }}>
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          style={{
            width: "100%", padding: "8px 12px",
            borderRadius: 8, border: "1px solid #ddd",
            fontSize: 14, outline: "none", resize: "vertical",
            fontFamily: "inherit", boxSizing: "border-box"
          }}
        />
      ) : (
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: "100%", padding: "8px 12px",
            borderRadius: 8, border: "1px solid #ddd",
            fontSize: 14, outline: "none", boxSizing: "border-box"
          }}
        />
      )}
    </div>
  )
}
import CharacterForge from "./components/CharacterForge/CharacterForge"

export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f3ff", paddingTop: "2rem" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: 32, color: "#7c3aed", margin: 0 }}>⚔️ StoryForge AI</h1>
        <p style={{ color: "#6b7280", marginTop: 8 }}>Build entire fictional universes with AI</p>
      </div>
      <CharacterForge />
    </div>
  )
}
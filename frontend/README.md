# ⚔️ StoryForge AI

Build entire fictional universes with AI — powered by Groq LLM and Microsoft Foundry IQ

## 🏆 Agents League Hackathon 2026 — Creative Apps Track

## ✨ What It Does

StoryForge AI lets users build complete fictional universes grounded in real-world mythology, history, and culture using AI-assisted generation. Every feature connects together — generate a world, populate it with characters, build a plot, chat with your characters, then continue writing your story.

## 🧩 Features

### 🧙 Character Forge
Generate fully detailed heroes, villains, and side characters with name, title, backstory, personality, abilities, weakness, and appearance.

### 🌍 World Forge
Generate kingdoms, planets, cities, and magic systems with geography, inhabitants, conflicts, and hidden secrets.

### 📖 Plot Forge
Generate story arcs, chapters, quests, and conflicts with a full narrative timeline — setup, conflict, rising action, climax, and resolution.

### 💬 Character Chat
Talk directly to your generated characters. They stay fully in-persona using their backstory, personality, and world knowledge across multiple messages.

### ✍️ Story Continuation
Write any opening paragraph and AI continues your story seamlessly in the same tone, style, and world. Keep clicking Continue Further to build an entire novel.

## 🤖 Microsoft IQ Integration

StoryForge AI uses Foundry IQ as its intelligence layer to retrieve grounded knowledge from real mythology, history, architecture, and culture sources before generating content.

Instead of generic AI prompts, every generation is grounded in real-world knowledge:

- User creates an Egyptian-inspired world
- Foundry IQ retrieves Egyptian mythology, historical culture, architecture, geography
- StoryForge transforms it into rich fantasy content with citations

This demonstrates knowledge retrieval, grounding, and reduced hallucination — exactly what Foundry IQ is designed for.

## 🛠️ Tech Stack

- Frontend: React + Vite
- Backend: Python + FastAPI
- AI Model: Groq llama-3.3-70b in development, Azure OpenAI gpt-4o-mini in production
- Knowledge Retrieval: Azure AI Search via Foundry IQ
- Dev Tools: GitHub Copilot in VS Code

## 🤖 GitHub Copilot Usage

GitHub Copilot was used throughout the entire development process:

- Generating FastAPI route boilerplate for all 5 features
- Writing React component structures and state management
- Debugging JSON parsing errors from AI responses
- Suggesting prompt engineering improvements for better outputs
- Auto-completing repetitive code patterns across routes
- Writing Pydantic models for request validation
- Suggesting CORS and middleware configuration
- Building multi-turn conversation history logic for Character Chat

## 🚀 Setup

Prerequisites:
- Python 3.10 or higher
- Node.js 18 or higher
- Groq API key — free at console.groq.com

Backend setup:

    cd backend
    python -m venv .venv
    .venv\Scripts\activate
    pip install -r requirements.txt
    copy .env.example .env
    uvicorn main:app --reload

Frontend setup:

    cd frontend
    npm install
    npm run dev

Open the app at http://localhost:5173

## 🔑 Environment Variables

Copy .env.example to .env and fill in your keys:

    GROQ_API_KEY=your_groq_key_here
    GROQ_MODEL=llama-3.3-70b-versatile
    AZURE_OPENAI_ENDPOINT=
    AZURE_OPENAI_API_KEY=
    AZURE_OPENAI_DEPLOYMENT=
    AZURE_SEARCH_ENDPOINT=
    AZURE_SEARCH_API_KEY=
    AZURE_SEARCH_INDEX=

## 📁 Project Structure

    storyforge-ai/
    ├── backend/
    │   ├── routes/
    │   │   ├── characters.py
    │   │   ├── worlds.py
    │   │   ├── plots.py
    │   │   ├── chat.py
    │   │   └── story.py
    │   ├── services/
    │   │   ├── llm.py
    │   │   └── foundry_iq.py
    │   ├── main.py
    │   └── requirements.txt
    ├── frontend/
    │   └── src/
    │       ├── components/
    │       │   ├── CharacterForge/
    │       │   ├── WorldForge/
    │       │   ├── PlotForge/
    │       │   ├── CharacterChat/
    │       │   └── StoryContinuation/
    │       └── App.jsx
    ├── knowledge-base/
    │   ├── egyptian-mythology.md
    │   ├── norse-mythology.md
    │   └── medieval-architecture.md
    ├── .env.example
    └── README.md

## 📅 Build Log

| Day | Date | What Was Built |
|-----|------|----------------|
| Day 1 | Jun 4 | Project setup, folder structure, backend skeleton, Groq AI integration |
| Day 2 | Jun 5 | Character Forge — backend route and React UI |
| Day 3 | Jun 5 | World Forge — backend route, React UI, navigation bar |
| Day 4 | Jun 5 | Plot Forge — backend route, timeline React UI |
| Day 5 | Jun 6 | Character Chat — multi-turn conversation with characters |
| Day 6 | Jun 6 | Story Continuation — AI writing assistant with continue further |
| Day 7 | Jun 6 | Foundry IQ grounding and knowledge citations |
| Day 8 | Jun 7 | UI polish and Copilot documentation |
| Day 9 | Jun 8 | Demo video recording |

## 🏆 Judging Criteria Coverage

| Criteria | How StoryForge Addresses It |
|----------|-----------------------------|
| Accuracy and Relevance 20% | All 5 features meet Creative Apps track requirements |
| Reasoning and Multi-step Thinking 20% | Plot Forge chains setup, conflict, climax into coherent narratives |
| Creativity and Originality 15% | Unique universe-building concept combining 5 interconnected tools |
| User Experience and Presentation 15% | Clean tabbed UI, color-coded features, real-time generation |
| Reliability and Safety 20% | Foundry IQ grounding reduces hallucination, robust JSON parsing |
| Community Vote 10% | Shared on Discord during event week |

## 📺 Demo Video

Coming June 8, 2026

## 🔗 Links

- Hackathon: Agents League Hackathon 2026
- Discord: Agents League Arena
- Microsoft Reactor: Live battle recordings
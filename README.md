# StoryForge AI

StoryForge AI is an AI-powered creative writing tool that lets users build complete fictional universes — characters, worlds, plots, and stories — grounded in real mythology and history. Built for the Agents League Hackathon 2026, Creative Apps track, hosted by Microsoft.

---

## The Idea

Most AI writing tools give you generic output. StoryForge is different. When you ask for an Egyptian warrior, it does not just make something up — it retrieves real knowledge about Egyptian mythology, gods, culture, and architecture first, then builds your character from that foundation. The result feels authentic, historically inspired, and genuinely interesting.

This is possible because of Microsoft Foundry IQ, which acts as a knowledge retrieval layer between the user request and the AI generation. Every character, world, and plot is grounded before it is generated.

---

## Features

### Character Forge
Generate fully detailed fictional characters — heroes, villains, and side characters. Each character includes a name, title, backstory, personality traits, abilities, weakness, and physical appearance. Characters are grounded in real mythology so an Egyptian hero will reference Amun, Ra, the khopesh, and Thebes naturally.

### World Forge
Build entire fictional worlds — kingdoms, planets, cities, and magic systems. Each world includes geography, inhabitants, culture, power systems, conflicts, and a hidden secret. Worlds feel historically inspired rather than generically fantastical.

### Plot Forge
Generate complete narrative structures — story arcs, chapters, quests, and conflicts. Each plot includes a setup, conflict, rising action, climax, and resolution, displayed as a visual timeline. Themes are extracted automatically.

### Character Chat
Have a real conversation with any character you generate. The character stays fully in-persona across multiple messages, drawing on their backstory, personality, and world knowledge. Built with multi-turn conversation memory.

### Story Continuation
Write any opening paragraph and the AI continues your story in the same tone, style, and voice. You can keep clicking to continue building the narrative. Your writing appears in black, AI continuations appear in red so you always know what you wrote.

---

## Microsoft Foundry IQ Integration

StoryForge uses Foundry IQ as its intelligence layer. Before any content is generated, the system retrieves relevant grounded knowledge from a curated knowledge base covering Egyptian mythology, Norse mythology, and medieval architecture.

The flow works like this. A user types a theme such as ancient Egypt. The Foundry IQ service searches the knowledge base and retrieves relevant facts about Egyptian gods, sacred places, magic systems, and culture. This context is passed to the language model alongside the generation request. The model produces content that is grounded in real knowledge rather than hallucinated details. The UI shows a citation at the bottom of every generated card confirming which knowledge sources were used.

This directly demonstrates the core value of Foundry IQ — agentic knowledge retrieval that reduces hallucination and produces cited, grounded answers.

---

## Tech Stack

- Frontend: React and Vite
- Backend: Python and FastAPI
- AI model: Groq llama-3.3-70b during development, swapping to Azure OpenAI gpt-4o-mini for production submission
- Knowledge retrieval: Local knowledge base simulating Azure AI Search via Foundry IQ
- Development tools: GitHub Copilot in VS Code throughout the entire build

---

## GitHub Copilot Usage

GitHub Copilot was used throughout every day of development. It generated the initial FastAPI route boilerplate for all five features, suggested the Pydantic model structures for request validation, helped debug the JSON parsing errors that came from AI responses containing apostrophes and smart quotes, improved the system prompts for better and more consistent output, auto-completed repetitive patterns across all five route files, suggested the multi-turn conversation history structure for Character Chat, and helped write the CSS animations and hover effects for the UI polish.

---

## Setup

You need Python 3.10 or higher and Node.js 18 or higher. Get a free Groq API key at console.groq.com.

Backend:

    cd backend
    python -m venv .venv
    .venv\Scripts\activate
    pip install -r requirements.txt
    copy .env.example .env
    uvicorn main:app --reload

Frontend:

    cd frontend
    npm install
    npm run dev

Open the app at http://localhost:5173

---

## Environment Variables

    GROQ_API_KEY=your_groq_key_here
    GROQ_MODEL=llama-3.3-70b-versatile
    AZURE_OPENAI_ENDPOINT=
    AZURE_OPENAI_API_KEY=
    AZURE_OPENAI_DEPLOYMENT=
    AZURE_SEARCH_ENDPOINT=
    AZURE_SEARCH_API_KEY=
    AZURE_SEARCH_INDEX=

---

## Project Structure

    storyforge-ai/
    backend/
        routes/
            characters.py
            worlds.py
            plots.py
            chat.py
            story.py
        services/
            llm.py
            foundry_iq.py
        main.py
        requirements.txt
    frontend/
        src/
            components/
                CharacterForge/
                WorldForge/
                PlotForge/
                CharacterChat/
                StoryContinuation/
            App.jsx
            App.css
    knowledge-base/
        egyptian-mythology.md
        norse-mythology.md
        medieval-architecture.md
    .env.example
    README.md

---

## Build Log

Day 1 — June 4 — Project setup, folder structure, backend skeleton, Groq AI integration working

Day 2 — June 5 — Character Forge backend route and React UI complete

Day 3 — June 5 — World Forge backend route, React UI, and navigation bar added

Day 4 — June 5 — Plot Forge backend route and timeline React UI complete

Day 5 — June 6 — Character Chat with multi-turn conversation memory complete

Day 6 — June 6 — Story Continuation with continue further functionality complete

Day 7 — June 6 — Foundry IQ knowledge grounding and citations in UI complete

Day 8 — June 7 — UI polish, home page, gradient header, card animations complete

Day 9 — June 8 — Demo video recording

---

## Judging Criteria

Accuracy and Relevance — All five features meet the Creative Apps track requirements and demonstrate meaningful use of GitHub Copilot throughout development.

Reasoning and Multi-step Thinking — Plot Forge chains setup, conflict, rising action, climax, and resolution into a coherent narrative. Character Chat maintains context across multiple turns. Story Continuation tracks the full story history.

Creativity and Originality — The concept of a connected universe builder where characters, worlds, and plots all relate to each other is a novel take on AI creative tools. The Foundry IQ grounding gives outputs a historical authenticity that generic AI tools cannot match.

User Experience and Presentation — Clean tabbed navigation, color-coded features, animated cards, fade-in transitions, and a home page that explains the product clearly.

Reliability and Safety — Foundry IQ grounding reduces hallucination. Robust JSON parsing with fallback handling means the app never crashes on bad model output. All API keys are stored in environment variables and never committed to the repository.

Community Vote — Project shared on the Agents League Discord during event week.

---

## Demo Video

Demo Video

Watch the full demo: https://youtu.be/V0DWxnTfnEc

The demo covers all five features — Character Forge, World Forge, 
Plot Forge, Character Chat, and Story Continuation — and demonstrates 
Microsoft Foundry IQ knowledge grounding with live citations shown in the UI.

---

## Links

Hackathon: Agents League Hackathon 2026
Discord: Agents League Arena
Microsoft Reactor: Live battle recordings
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import characters, worlds, plots, chat

app = FastAPI(title="StoryForge AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(characters.router, prefix="/api/characters")
app.include_router(worlds.router,     prefix="/api/worlds")
app.include_router(plots.router,      prefix="/api/plots")
app.include_router(chat.router,       prefix="/api/chat")

@app.get("/")
def health():
    return {"status": "StoryForge API is running"}
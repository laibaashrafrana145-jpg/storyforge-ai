from fastapi import APIRouter
from pydantic import BaseModel
from services.llm import generate
import json

router = APIRouter()

class CharacterRequest(BaseModel):
    theme: str
    character_type: str  # hero, villain, side_character

@router.post("/generate")
def generate_character(req: CharacterRequest):
    system_prompt = """You are a master fantasy writer and world-builder.
When given a theme and character type, generate a rich fictional character.
Always respond with ONLY a valid JSON object in this exact format:
{
  "name": "character name",
  "title": "their epic title or role",
  "backstory": "2-3 sentence backstory",
  "personality": "2-3 key personality traits",
  "abilities": ["ability 1", "ability 2", "ability 3"],
  "weakness": "their one major weakness",
  "appearance": "brief physical description"
}
No extra text, no markdown, just the JSON."""

    user_prompt = f"Create a {req.character_type} character with this theme: {req.theme}"

    raw = generate(system_prompt, user_prompt, max_tokens=600)

    try:
        character = json.loads(raw)
    except json.JSONDecodeError:
        start = raw.find('{')
        end = raw.rfind('}') + 1
        character = json.loads(raw[start:end])

    return {"character": character}
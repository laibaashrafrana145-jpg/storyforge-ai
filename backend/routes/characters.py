from fastapi import APIRouter  # type: ignore
from typing import TypedDict
from services.llm import generate
from services.foundry_iq import retrieve_context
import json
import re

router = APIRouter()

class CharacterRequest(TypedDict):
    theme: str
    character_type: str

@router.post("/generate")
def generate_character(req: dict):
    # support both TypedDict-like dicts and Pydantic models by accessing as dict
    if not isinstance(req, dict):
        try:
            req = req.dict()
        except Exception:
            req = {}
    # Step 1 — Retrieve grounded knowledge from Foundry IQ
    iq_result = retrieve_context(req.theme)
    context = iq_result["context"]
    citations = iq_result["citations"]
    grounded = iq_result["grounded"]

    # Step 2 — Generate with grounded context
    system_prompt = f"""You are a master fantasy writer and world-builder.
When given a theme and character type, generate a rich fictional character.
Use the following REAL knowledge to ground your response and make it authentic:

--- FOUNDRY IQ KNOWLEDGE ---
{context}
--- END KNOWLEDGE ---

Draw from this knowledge naturally. Make the character feel historically authentic.
Always respond with ONLY a valid JSON object in this exact format:
{{
  "name": "character name",
  "title": "their epic title or role",
  "backstory": "2-3 sentence backstory",
  "personality": "2-3 key personality traits",
  "abilities": ["ability 1", "ability 2", "ability 3"],
  "weakness": "their one major weakness",
  "appearance": "brief physical description"
}}
No extra text, no markdown, just the JSON."""

    user_prompt = f"Create a {req.character_type} character with this theme: {req.theme}"

    raw = generate(system_prompt, user_prompt, max_tokens=600)
    raw = raw.strip()
    raw = re.sub(r'```json\s*', '', raw)
    raw = re.sub(r'```\s*', '', raw)

    start = raw.find('{')
    end = raw.rfind('}') + 1
    json_str = raw[start:end]
    json_str = json_str.replace('\u2018', '').replace('\u2019', '').replace('\u201c', '"').replace('\u201d', '"')

    try:
        character = json.loads(json_str)
    except json.JSONDecodeError:
        character = {"name": "Unknown", "title": "Hero", "backstory": raw[:200],
                     "personality": "Brave", "abilities": ["Combat"],
                     "weakness": "Unknown", "appearance": "Unknown"}

    return {
        "character": character,
        "grounded": grounded,
        "citations": citations
    }
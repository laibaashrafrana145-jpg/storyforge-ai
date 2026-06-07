from fastapi import APIRouter
from pydantic import BaseModel
from services.llm import generate
from services.foundry_iq import retrieve_context
import json
import re

router = APIRouter()


class CharacterRequest(BaseModel):
    theme: str
    character_type: str


@router.post("/generate")
def generate_character(req: CharacterRequest):
    iq_result = retrieve_context(req.theme)
    context = iq_result["context"]
    citations = iq_result["citations"]
    grounded = iq_result["grounded"]

    system_prompt = (
        "You are a master fantasy writer and world-builder.\n"
        "Use the following REAL knowledge to ground your character:\n\n"
        "--- FOUNDRY IQ KNOWLEDGE ---\n"
        + context +
        "\n--- END KNOWLEDGE ---\n\n"
        "Respond with ONLY a valid JSON object:\n"
        "{\n"
        '  "name": "character name",\n'
        '  "title": "their epic title or role",\n'
        '  "backstory": "2-3 sentence backstory",\n'
        '  "personality": "2-3 key personality traits",\n'
        '  "abilities": ["ability 1", "ability 2", "ability 3"],\n'
        '  "weakness": "their one major weakness",\n'
        '  "appearance": "brief physical description"\n'
        "}\n"
        "No extra text. No markdown. Just the JSON."
    )

    user_prompt = f"Create a {req.character_type} character with this theme: {req.theme}"

    raw = generate(system_prompt, user_prompt, max_tokens=600)
    raw = raw.strip()
    raw = re.sub(r"```json\s*", "", raw)
    raw = re.sub(r"```\s*", "", raw)

    start = raw.find("{")
    end = raw.rfind("}") + 1
    json_str = raw[start:end]

    try:
        character = json.loads(json_str)
    except json.JSONDecodeError:
        character = {
            "name": "Unknown", "title": "Hero",
            "backstory": raw[:200], "personality": "Brave",
            "abilities": ["Combat"], "weakness": "Unknown",
            "appearance": "Unknown"
        }

    return {
        "character": character,
        "grounded": grounded,
        "citations": citations
    }
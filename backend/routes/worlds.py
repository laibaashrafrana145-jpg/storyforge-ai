from fastapi import APIRouter
from pydantic import BaseModel
from services.llm import generate
import json
import re

router = APIRouter()

class WorldRequest(BaseModel):
    theme: str
    world_type: str

@router.post("/generate")
def generate_world(req: WorldRequest):
    system_prompt = """You are a master fantasy world-builder.
When given a theme and world type, generate a rich fictional world.
CRITICAL: Respond with ONLY a valid JSON object. 
Do NOT use apostrophes or single quotes inside values. Use simple words instead.
Use this exact format:
{
  "name": "world name here",
  "tagline": "one epic sentence describing it",
  "description": "2-3 sentence vivid description",
  "geography": "terrain climate and notable landmarks",
  "inhabitants": "who lives here and their culture",
  "magic_or_technology": "the unique power system or technology",
  "conflicts": "the main tension or threat in this world",
  "secrets": "one hidden truth about this place"
}
No apostrophes. No markdown. No extra text. Just the JSON."""

    user_prompt = f"Create a {req.world_type} with this theme: {req.theme}"

    raw = generate(system_prompt, user_prompt, max_tokens=700)

    # Clean the response
    raw = raw.strip()

    # Remove markdown code blocks if present
    raw = re.sub(r'```json\s*', '', raw)
    raw = re.sub(r'```\s*', '', raw)

    # Extract JSON object
    start = raw.find('{')
    end = raw.rfind('}') + 1
    if start == -1 or end == 0:
        return {"error": "Could not generate world. Please try again."}

    json_str = raw[start:end]

    # Replace smart quotes with regular quotes
    json_str = json_str.replace('\u2018', '').replace('\u2019', '').replace('\u201c', '"').replace('\u201d', '"')

    try:
        world = json.loads(json_str)
    except json.JSONDecodeError:
        # Last resort — return raw text as description
        return {
            "world": {
                "name": "Unknown Realm",
                "tagline": "A mysterious world awaits",
                "description": raw[:300],
                "geography": "Unknown",
                "inhabitants": "Unknown",
                "magic_or_technology": "Unknown",
                "conflicts": "Unknown",
                "secrets": "Unknown"
            }
        }

    return {"world": world}
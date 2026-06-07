import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import json
import re
from typing import TYPE_CHECKING

# Help static analyzers resolve FastAPI imports without affecting runtime
if TYPE_CHECKING:
    # Import for type checking only; some editors may not have FastAPI installed.
    from fastapi import APIRouter  # type: ignore[import]

try:
    from fastapi import APIRouter  # type: ignore
    from pydantic import BaseModel  # type: ignore
except ImportError as e:
    raise ImportError("FastAPI and Pydantic are required. Install with: pip install fastapi pydantic") from e

from services.llm import generate
from services.foundry_iq import retrieve_context

router = APIRouter()

class WorldRequest(BaseModel):
    theme: str
    world_type: str

@router.post("/generate")
def generate_world(req: WorldRequest):
    # Step 1 — Retrieve grounded knowledge from Foundry IQ
    iq_result = retrieve_context(req.theme)
    context = iq_result["context"]
    citations = iq_result["citations"]
    grounded = iq_result["grounded"]

    system_prompt = f"""You are a master fantasy world-builder.
Use the following REAL knowledge to ground your world and make it authentic:

--- FOUNDRY IQ KNOWLEDGE ---
{context}
--- END KNOWLEDGE ---

Draw from this knowledge naturally. Make the world feel historically inspired.
Always respond with ONLY a valid JSON object in this exact format:
{{
  "name": "world name",
  "tagline": "one epic sentence describing it",
  "description": "2-3 sentence vivid description",
  "geography": "terrain climate and notable landmarks",
  "inhabitants": "who lives here and their culture",
  "magic_or_technology": "the unique power system or technology",
  "conflicts": "the main tension or threat in this world",
  "secrets": "one hidden truth about this place"
}}
No apostrophes. No markdown. No extra text. Just the JSON."""

    user_prompt = f"Create a {req.world_type} with this theme: {req.theme}"

    raw = generate(system_prompt, user_prompt, max_tokens=700)
    raw = raw.strip()
    raw = re.sub(r'```json\s*', '', raw)
    raw = re.sub(r'```\s*', '', raw)

    start = raw.find('{')
    end = raw.rfind('}') + 1
    if start == -1 or end == 0:
        return {"error": "Could not generate world. Please try again."}

    json_str = raw[start:end]
    json_str = json_str.replace('\u2018', '').replace('\u2019', '').replace('\u201c', '"').replace('\u201d', '"')

    try:
        world = json.loads(json_str)
    except json.JSONDecodeError:
        world = {"name": "Unknown Realm", "tagline": "A mysterious world",
                 "description": raw[:200], "geography": "Unknown",
                 "inhabitants": "Unknown", "magic_or_technology": "Unknown",
                 "conflicts": "Unknown", "secrets": "Unknown"}

    return {
        "world": world,
        "grounded": grounded,
        "citations": citations
    }
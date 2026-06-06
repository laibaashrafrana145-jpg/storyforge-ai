from fastapi import APIRouter
from pydantic import BaseModel
from services.llm import generate
import json
import re

router = APIRouter()

class PlotRequest(BaseModel):
    theme: str
    plot_type: str  # story_arc, chapter, quest, conflict

@router.post("/generate")
def generate_plot(req: PlotRequest):
    system_prompt = """You are a master storyteller and narrative designer.
When given a theme and plot type, generate a rich fictional plot.
CRITICAL: Respond with ONLY a valid JSON object.
Do NOT use apostrophes inside values. Use simple words instead.
Use this exact format:
{
  "title": "compelling title here",
  "logline": "one sentence summary of the plot",
  "setup": "how the story begins",
  "conflict": "the main problem or challenge",
  "rising_action": "how tension builds",
  "climax": "the peak moment of the story",
  "resolution": "how it ends",
  "themes": ["theme 1", "theme 2", "theme 3"]
}
No apostrophes. No markdown. No extra text. Just the JSON."""

    user_prompt = f"Create a {req.plot_type} with this theme: {req.theme}"

    raw = generate(system_prompt, user_prompt, max_tokens=700)

    raw = raw.strip()
    raw = re.sub(r'```json\s*', '', raw)
    raw = re.sub(r'```\s*', '', raw)

    start = raw.find('{')
    end = raw.rfind('}') + 1
    if start == -1 or end == 0:
        return {"error": "Could not generate plot. Please try again."}

    json_str = raw[start:end]
    json_str = json_str.replace('\u2018', '').replace('\u2019', '').replace('\u201c', '"').replace('\u201d', '"')

    try:
        plot = json.loads(json_str)
    except json.JSONDecodeError:
        return {
            "plot": {
                "title": "Untitled Story",
                "logline": "A story yet to be told",
                "setup": raw[:200],
                "conflict": "Unknown",
                "rising_action": "Unknown",
                "climax": "Unknown",
                "resolution": "Unknown",
                "themes": ["adventure"]
            }
        }

    return {"plot": plot}
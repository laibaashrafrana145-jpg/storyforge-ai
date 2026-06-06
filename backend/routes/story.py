from fastapi import APIRouter
from pydantic import BaseModel
from services.llm import generate

router = APIRouter()

class StoryRequest(BaseModel):
    existing_text: str
    genre: str = "fantasy"
    tone: str = "epic"
    length: str = "medium"  # short, medium, long

@router.post("/continue")
def continue_story(req: StoryRequest):
    length_map = {
        "short": 150,
        "medium": 300,
        "long": 500
    }
    max_tokens = length_map.get(req.length, 300)

    system_prompt = f"""You are a master {req.genre} writer.
Your task is to continue a story that the user has started.
Match the exact tone, style, and voice of the existing text.
The continuation should feel seamless — as if the same author wrote it.
Tone: {req.tone}
Genre: {req.genre}
Write ONLY the continuation. Do not repeat the existing text.
Do not add titles or labels. Just continue the story naturally."""

    user_prompt = f"""Continue this story:

{req.existing_text}"""

    continuation = generate(system_prompt, user_prompt, max_tokens=max_tokens)

    return {"continuation": continuation}
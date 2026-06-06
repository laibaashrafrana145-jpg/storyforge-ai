from fastapi import APIRouter
from pydantic import BaseModel
from services.llm import generate
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

class ChatRequest(BaseModel):
    character_name: str
    character_title: str
    character_backstory: str
    character_personality: str
    character_abilities: list
    user_message: str
    chat_history: list = []

@router.post("/message")
def chat_with_character(req: ChatRequest):
    system_prompt = f"""You are {req.character_name}, {req.character_title}.

Your backstory: {req.character_backstory}
Your personality: {req.character_personality}
Your abilities: {', '.join(req.character_abilities)}

Stay completely in character at all times. Speak as this character would speak.
Use first person. Reference your backstory and abilities naturally in conversation.
Never break character. Never say you are an AI.
Keep responses to 2-4 sentences — punchy and in-character."""

    # Build conversation history
    messages = [{"role": "system", "content": system_prompt}]

    for msg in req.chat_history:
        messages.append({
            "role": msg["role"],
            "content": msg["content"]
        })

    messages.append({"role": "user", "content": req.user_message})

    # Call LLM with full history
    from groq import Groq
    client = Groq(api_key=os.getenv("GROQ_API_KEY"))

    response = client.chat.completions.create(
        model=os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile"),
        messages=messages,
        max_tokens=300,
        temperature=0.9
    )

    reply = response.choices[0].message.content

    return {"reply": reply}
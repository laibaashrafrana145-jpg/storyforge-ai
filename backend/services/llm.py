import os
from dotenv import load_dotenv

load_dotenv()

# Automatically uses Groq if Azure keys are not set yet
USE_AZURE = bool(os.getenv("AZURE_OPENAI_API_KEY"))

if USE_AZURE:
    from openai import AzureOpenAI
    client = AzureOpenAI(
        azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
        api_key=os.getenv("AZURE_OPENAI_API_KEY"),
        api_version="2024-02-01"
    )
    MODEL = os.getenv("AZURE_OPENAI_DEPLOYMENT")
else:
    from groq import Groq
    client = Groq(api_key=os.getenv("GROQ_API_KEY"))
    MODEL = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")


def generate(system_prompt: str, user_prompt: str, max_tokens: int = 800) -> str:
    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user",   "content": user_prompt}
        ],
        max_tokens=max_tokens,
        temperature=0.85
    )
    return response.choices[0].message.content
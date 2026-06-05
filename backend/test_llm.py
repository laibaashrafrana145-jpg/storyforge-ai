from services.llm import generate

result = generate(
    system_prompt="You are a creative fantasy writer.",
    user_prompt="Describe a mysterious dark forest in 3 sentences."
)
print(result)
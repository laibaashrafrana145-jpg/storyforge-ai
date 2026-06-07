import os
import re

# Knowledge base stored in memory (simulating Foundry IQ retrieval)
# When Azure is connected, this swaps to Azure AI Search

KNOWLEDGE_BASE = {}

def load_knowledge_base():
    """Load all markdown files from knowledge-base folder"""
    kb_path = os.path.join(os.path.dirname(__file__), '..', '..', 'knowledge-base')
    kb_path = os.path.abspath(kb_path)

    if not os.path.exists(kb_path):
        return

    for filename in os.listdir(kb_path):
        if filename.endswith('.md'):
            topic = filename.replace('.md', '').replace('-', ' ')
            with open(os.path.join(kb_path, filename), 'r', encoding='utf-8') as f:
                KNOWLEDGE_BASE[topic] = f.read()

    print(f"Foundry IQ: Loaded {len(KNOWLEDGE_BASE)} knowledge documents")

def retrieve_context(theme: str, max_length: int = 800) -> dict:
    """
    Retrieve relevant knowledge for a given theme.
    Simulates Foundry IQ agentic knowledge retrieval.
    Returns grounded context and source citations.
    """
    if not KNOWLEDGE_BASE:
        load_knowledge_base()

    theme_lower = theme.lower()
    relevant_docs = []
    citations = []

    # Match theme to knowledge documents
    keyword_map = {
        "egyptian mythology": ["egypt", "egyptian", "pharaoh", "nile", "pyramid",
                               "cairo", "thebes", "hieroglyph", "mummy"],
        "norse mythology":    ["norse", "viking", "odin", "thor", "valhalla",
                               "scandinavian", "nordic", "rune", "ragnarok"],
        "medieval architecture": ["medieval", "castle", "knight", "kingdom",
                                  "fortress", "dungeon", "tower", "moat", "magic"]
    }

    for doc_name, keywords in keyword_map.items():
        if any(kw in theme_lower for kw in keywords):
            if doc_name in KNOWLEDGE_BASE:
                relevant_docs.append(KNOWLEDGE_BASE[doc_name])
                citations.append(doc_name.title())

    # Default to all docs if no specific match
    if not relevant_docs:
        for doc_name, content in KNOWLEDGE_BASE.items():
            relevant_docs.append(content[:400])
            citations.append(doc_name.title())

    # Combine and trim context
    combined = "\n\n".join(relevant_docs)
    if len(combined) > max_length:
        combined = combined[:max_length] + "..."

    return {
        "context": combined,
        "citations": citations,
        "grounded": len(citations) > 0
    }

# Load on import
load_knowledge_base()
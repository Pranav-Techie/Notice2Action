from fastapi import APIRouter
from pydantic import BaseModel
from app.services.sarvam import client

router = APIRouter(prefix="/api/chat", tags=["Chat"])

LANGUAGE_NAMES = {
    "en-IN": "English",
    "hi-IN": "Hindi",
    "bn-IN": "Bengali",
    "mr-IN": "Marathi",
    "ta-IN": "Tamil",
    "te-IN": "Telugu",
    "kn-IN": "Kannada",
    "ml-IN": "Malayalam",
    "gu-IN": "Gujarati",
    "pa-IN": "Punjabi",
    "od-IN": "Odia",
    "mai-IN": "Maithili",
}

TTS_LANGUAGES = {
    "en-IN",
    "hi-IN",
    "bn-IN",
    "mr-IN",
    "ta-IN",
    "te-IN",
    "kn-IN",
    "ml-IN",
    "gu-IN",
    "pa-IN",
    "od-IN",
}


class ChatRequest(BaseModel):
    message: str
    document_context: str = ""
    language: str = "en-IN"


def chunk_text(text: str, limit: int = 1800) -> list[str]:
    chunks = []
    current = ""

    for paragraph in text.split("\n"):
        candidate = (
            f"{current}\n{paragraph}"
            if current
            else paragraph
        )

        if len(candidate) <= limit:
            current = candidate
            continue

        if current:
            chunks.append(current.strip())

        while len(paragraph) > limit:
            chunks.append(paragraph[:limit])
            paragraph = paragraph[limit:]

        current = paragraph

    if current.strip():
        chunks.append(current.strip())

    return chunks


def translate_to_language(
    text: str,
    target_language: str,
) -> str:
    if target_language == "en-IN":
        return text

    translated = []

    for chunk in chunk_text(text):
        response = client.text.translate(
            input=chunk,
            source_language_code="en-IN",
            target_language_code=target_language,
            model="sarvam-translate:v1",
        )

        value = getattr(
            response,
            "translated_text",
            None,
        )

        if value:
            translated.append(value.strip())

    return "\n\n".join(translated).strip()


@router.post("/")
def chat(request: ChatRequest):
    if client is None:
        return {
            "error": "Sarvam API key not configured"
        }

    language = request.language

    if language not in LANGUAGE_NAMES:
        language = "en-IN"

    language_name = LANGUAGE_NAMES[language]

    # Sarvam-105B currently covers the 11-language
    # voice/chat set (10 Indian languages + English).
    # Maithili is handled by Sarvam Translate after generation.
    generation_language = (
        "English"
        if language == "mai-IN"
        else language_name
    )

    system_prompt = f"""
You are Notice2Action, a multilingual document assistant.

The user wants a direct answer about the uploaded document.

Respond in {generation_language}.
Keep the answer concise and easy to understand because it
may also be played aloud as audio.

Use at most 5 short paragraphs or bullet points.
Focus only on information supported by the document.
Do not invent facts.
If the document does not contain the answer, say so clearly.

The user may speak or type in any supported Indian language.
Understand code-mixed language naturally.
"""

    user_content = request.message

    if request.document_context:
        user_content = f"""
DOCUMENT CONTENT:

{request.document_context}

USER QUESTION:

{request.message}
"""

    response = client.chat.completions(
        model="sarvam-105b",
        messages=[
            {
                "role": "system",
                "content": system_prompt,
            },
            {
                "role": "user",
                "content": user_content,
            },
        ],
        reasoning_effort=None,
        temperature=0.2,
        max_tokens=900,
    )

    answer = (
        response.choices[0].message.content
        or "I could not generate an answer."
    ).strip()

    if language == "mai-IN":
        answer = translate_to_language(
            answer,
            "mai-IN",
        )

    return {
        "response": answer,
        "language": language,
        "language_name": language_name,
        "tts_supported": language in TTS_LANGUAGES,
    }
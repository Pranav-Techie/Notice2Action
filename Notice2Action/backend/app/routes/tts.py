from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.sarvam import client

router = APIRouter(
    prefix="/api/voice",
    tags=["Text to Speech"],
)

SUPPORTED_TTS_LANGUAGES = {
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


class TTSRequest(BaseModel):
    text: str
    language_code: str = "en-IN"


@router.post("/speak")
def speak(request: TTSRequest):
    if client is None:
        raise HTTPException(
            status_code=500,
            detail="Sarvam API key not configured",
        )

    if request.language_code not in SUPPORTED_TTS_LANGUAGES:
        raise HTTPException(
            status_code=400,
            detail=(
                "Voice playback is not currently available "
                f"for {request.language_code}. "
                "Text chat is still supported."
            ),
        )

    clean_text = request.text.strip()

    if not clean_text:
        raise HTTPException(
            status_code=400,
            detail="Text is empty.",
        )

    response = client.text_to_speech.convert(
        text=clean_text[:2500],
        language_code=request.language_code,
        model="bulbul:v3",
        speaker="shubh",
    )

    return {
        "audio": response.audios[0],
        "content_type": "audio/wav",
        "language": request.language_code,
    }
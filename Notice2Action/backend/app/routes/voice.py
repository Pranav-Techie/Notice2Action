import os
import tempfile

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    HTTPException
)

from app.services.sarvam import client


router = APIRouter(
    prefix="/api/voice",
    tags=["Voice"]
)


@router.post("/transcribe")
async def transcribe_audio(
    file: UploadFile = File(...)
):

    if client is None:

        raise HTTPException(
            status_code=500,
            detail="Sarvam API key not configured"
        )

    suffix = os.path.splitext(
        file.filename or ""
    )[1]

    if not suffix:

        suffix = ".webm"

    contents = await file.read()

    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=suffix
    ) as temp:

        temp.write(contents)

        temp_path = temp.name

    try:

        with open(
            temp_path,
            "rb"
        ) as audio:

            response = client.speech_to_text.transcribe(
                file=audio,
                model="saaras:v4",
                mode="transcribe"
            )

        return {
            "transcript": response.transcript,
            "language": getattr(
                response,
                "language_code",
                None
            )
        }

    finally:

        try:
            os.remove(temp_path)
        except Exception:
            pass
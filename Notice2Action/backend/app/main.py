from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from app.routes.chat import router as chat_router
from app.routes.document import router as document_router
from app.routes.voice import router as voice_router
from app.routes.tts import router as tts_router


app = FastAPI(
    title="Notice2Action API",
    description="Multilingual AI document action assistant",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=False,

    allow_methods=["*"],

    allow_headers=["*"],
)


app.include_router(
    chat_router
)

app.include_router(
    document_router
)

app.include_router(
    voice_router
)

app.include_router(
    tts_router
)


@app.get("/")
def root():

    return {
        "message": "Notice2Action API",
        "status": "ready"
    }


@app.get("/health")
def health():

    return {
        "status": "healthy"
    }
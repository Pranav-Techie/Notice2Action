import os
import re
import time
import zipfile
import tempfile
import requests

from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.services.sarvam import client

router = APIRouter(prefix="/api/document", tags=["Document"])

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

TERMINAL_STATES = {
    "completed",
    "partially_completed",
    "failed",
    "rejected",
}

# Text PDFs can be handled locally in milliseconds. Scanned/image PDFs
# still use Sarvam Document AI OCR.
try:
    from pypdf import PdfReader
except ImportError:
    PdfReader = None


def clean_action_plan(text: str) -> str:
    if not text:
        return "Could not generate the action plan."

    expected = {
        "what is this",
        "eligibility",
        "important dates",
        "required documents",
        "action plan",
        "important conditions",
    }

    output = []
    last_heading = None

    for raw in text.replace("\r\n", "\n").replace("\r", "\n").split("\n"):
        line = raw.strip()

        # Remove Markdown heading/emphasis artifacts.
        line = re.sub(r"^#{1,6}\s*", "", line).strip()
        line = re.sub(r"^\*\*(.*?)\*\*$", r"\1", line).strip()
        line = re.sub(r"^__(.*?)__$", r"\1", line).strip()

        if not line:
            if output and output[-1] != "":
                output.append("")
            continue

        normalized = re.sub(r"[:：]\s*$", "", line).strip().lower()

        if normalized in expected:
            if normalized == last_heading:
                continue
            line = {
                "what is this": "What is this?",
                "eligibility": "Eligibility",
                "important dates": "Important Dates",
                "required documents": "Required Documents",
                "action plan": "Action Plan",
                "important conditions": "Important Conditions",
            }[normalized]
            last_heading = normalized

        if output and line == output[-1]:
            continue

        output.append(line)

    while output and output[0] == "":
        output.pop(0)
    while output and output[-1] == "":
        output.pop()

    return "\n".join(output).strip()


def extract_pdf_text_locally(path: str) -> tuple[str, int]:
    """Fast path for normal text PDFs. Returns (text, page_count)."""
    if PdfReader is None:
        return "", 0

    try:
        reader = PdfReader(path)
        page_count = len(reader.pages)

        if page_count > 10:
            raise HTTPException(
                status_code=400,
                detail="Please upload a document with 10 pages or fewer.",
            )

        parts = []
        for page in reader.pages:
            try:
                text = page.extract_text() or ""
            except Exception:
                text = ""
            if text.strip():
                parts.append(text.strip())

        return "\n\n".join(parts).strip(), page_count

    except HTTPException:
        raise
    except Exception:
        return "", 0


def chunk_text(text: str, limit: int = 1800) -> list[str]:
    """Keep translation requests safely below Sarvam's 2,000-char limit."""
    chunks = []
    current = ""

    for paragraph in text.split("\n"):
        candidate = f"{current}\n{paragraph}" if current else paragraph

        if len(candidate) <= limit:
            current = candidate
            continue

        if current:
            chunks.append(current.strip())

        # Very long single lines are split safely.
        while len(paragraph) > limit:
            chunks.append(paragraph[:limit])
            paragraph = paragraph[limit:]

        current = paragraph

    if current.strip():
        chunks.append(current.strip())

    return chunks


def translate_action_plan(text: str, target_language: str) -> str:
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
        translated_text = getattr(response, "translated_text", None)

        if translated_text:
            translated.append(translated_text.strip())

    return "\n\n".join(translated).strip()


def digitise_with_sarvam(path: str, filename: str, content_type: str):
    with open(path, "rb") as document_file:
        job = client.doc_ai.digitise(
            file=[
                (
                    filename or "document.pdf",
                    document_file,
                    content_type or "application/pdf",
                )
            ],
            language="en-IN",
            output_format="md",
        )

    job_id = getattr(job, "job_id", None)
    if not job_id:
        raise HTTPException(
            status_code=500,
            detail="Sarvam did not return a document processing job ID.",
        )

    status = str(getattr(job, "status", "pending") or "pending").lower()

    # Document AI is asynchronous. Do not treat pending as a failure.
    deadline = time.monotonic() + 180

    while status not in TERMINAL_STATES:
        if time.monotonic() >= deadline:
            raise HTTPException(
                status_code=504,
                detail=(
                    "Document OCR is taking longer than expected. "
                    "Please try a smaller or text-based PDF."
                ),
            )

        time.sleep(5)

        status_response = client.doc_ai.get_status(job_id=job_id)
        status = str(
            getattr(status_response, "status", "unknown") or "unknown"
        ).lower()

    if status not in {"completed", "partially_completed"}:
        raise HTTPException(
            status_code=502,
            detail=f"Document OCR failed. Sarvam status: {status}.",
        )

    download_response = client.doc_ai.get_download_url(job_id=job_id)
    download_url = (
        getattr(download_response, "url", None)
        or getattr(download_response, "download_url", None)
    )

    if not download_url:
        raise HTTPException(
            status_code=500,
            detail="Sarvam did not return a document download URL.",
        )

    zip_response = requests.get(download_url, timeout=90)
    zip_response.raise_for_status()

    with tempfile.TemporaryDirectory() as extract_dir:
        zip_path = os.path.join(extract_dir, "result.zip")

        with open(zip_path, "wb") as zip_file:
            zip_file.write(zip_response.content)

        try:
            with zipfile.ZipFile(zip_path, "r") as zip_ref:
                zip_ref.extractall(extract_dir)
        except zipfile.BadZipFile:
            raise HTTPException(
                status_code=500,
                detail="Sarvam returned an invalid document result.",
            )

        markdown_parts = []

        for root, _, filenames in os.walk(extract_dir):
            for filename in filenames:
                if filename.lower().endswith(".md"):
                    path = os.path.join(root, filename)
                    with open(path, "r", encoding="utf-8") as md_file:
                        markdown_parts.append(md_file.read())

        text = "\n\n".join(markdown_parts).strip()

    if not text:
        raise HTTPException(
            status_code=500,
            detail="No readable text was extracted from the document.",
        )

    return text, job_id, status


@router.post("/analyze")
async def analyze_document(
    file: UploadFile = File(...),
    language: str = Form("en-IN"),
):
    if client is None:
        raise HTTPException(
            status_code=500,
            detail="Sarvam API key not configured.",
        )

    if language not in LANGUAGE_NAMES:
        language = "en-IN"

    allowed_types = {
        "application/pdf",
        "image/png",
        "image/jpeg",
    }

    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Only PDF, PNG and JPG files are supported.",
        )

    contents = await file.read()

    if not contents:
        raise HTTPException(
            status_code=400,
            detail="The uploaded document is empty.",
        )

    # Safety limit for a workshop/public demo.
    if len(contents) > 20 * 1024 * 1024:
        raise HTTPException(
            status_code=413,
            detail="Please upload a document smaller than 20 MB.",
        )

    extension = os.path.splitext(file.filename or "")[1] or ".pdf"

    with tempfile.NamedTemporaryFile(delete=False, suffix=extension) as temp:
        temp.write(contents)
        temp_path = temp.name

    try:
        job_id = "local-text-extraction"
        status = "completed"

        # ---------------------------------------------------------
        # FAST PATH:
        # Normal text PDFs do NOT need a Sarvam OCR job.
        # This removes the long pending/running wait for ordinary PDFs.
        # ---------------------------------------------------------
        document_text = ""

        if file.content_type == "application/pdf":
            document_text, page_count = extract_pdf_text_locally(temp_path)

            if page_count > 10:
                raise HTTPException(
                    status_code=400,
                    detail="Please upload a document with 10 pages or fewer.",
                )

        # ---------------------------------------------------------
        # OCR FALLBACK:
        # Scanned PDFs/images with no extractable text use Sarvam.
        # ---------------------------------------------------------
        if not document_text.strip():
            document_text, job_id, status = digitise_with_sarvam(
                temp_path,
                file.filename or "document.pdf",
                file.content_type or "application/pdf",
            )

        # Keep the prompt focused so 105B has less work to do.
        prompt = f"""
You are Notice2Action.

Turn the document below into a concise action plan.

Return PLAIN TEXT only. No Markdown headings.
Do not use #, ##, ###, *, **, backticks, or tables.

Use exactly these six section labels once each:
What is this?
Eligibility
Important Dates
Required Documents
Action Plan
Important Conditions

Use short lines and simple '-' bullets.
Keep every important date, amount, eligibility rule, document,
URL, email, organization name, and condition accurate.
Do not invent information.

DOCUMENT:
{document_text}
"""

        response = client.chat.completions(
            model="sarvam-105b",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are Notice2Action. "
                        "Return concise plain text. "
                        "No Markdown heading markers."
                    ),
                },
                {"role": "user", "content": prompt},
            ],
            reasoning_effort=None,
            temperature=0.1,
            max_tokens=1600,
        )

        action_plan = clean_action_plan(
            response.choices[0].message.content or ""
        )

        # Translate the final action plan into EVERY selected language.
        # This guarantees that selecting Maithili actually produces Maithili.
        if language != "en-IN":
            action_plan = translate_action_plan(
                action_plan,
                language,
            )
            action_plan = clean_action_plan(action_plan)

        if not action_plan:
            raise HTTPException(
                status_code=500,
                detail="Could not generate the action plan.",
            )

        return {
            "filename": file.filename,
            "job_id": job_id,
            "status": status,
            "document_text": document_text,
            "action_plan": action_plan,
            "language": language,
            "language_name": LANGUAGE_NAMES[language],
        }

    except HTTPException:
        raise

    except requests.RequestException as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Could not download the Sarvam document result: {exc}",
        )

    except Exception as exc:
        print("Document analysis error:", repr(exc))
        raise HTTPException(
            status_code=500,
            detail=f"Document analysis failed: {exc}",
        )

    finally:
        try:
            os.remove(temp_path)
        except Exception:
            pass
import os

from dotenv import load_dotenv

from sarvamai import SarvamAI


load_dotenv()


SARVAM_API_KEY = os.getenv(
    "SARVAM_API_KEY"
)


client = None


if SARVAM_API_KEY:

    client = SarvamAI(
        api_subscription_key=SARVAM_API_KEY
    )
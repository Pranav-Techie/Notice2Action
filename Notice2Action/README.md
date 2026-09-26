# 🚀 Notice2Action

## Your Personal Action Copilot

> **Turn confusing documents into clear actions.**

Notice2Action is a multilingual AI-powered document assistant that helps users understand important notices, forms, circulars, announcements, and other documents and turn them into clear, actionable next steps.

Instead of simply summarizing a document, Notice2Action focuses on:

**Understand → Ask → Act**

Users can upload a document, receive a structured action plan, ask questions about the document using text or voice, and listen to AI-generated answers using text-to-speech.

The application is designed with multilingual and voice-based interaction in mind, making important information easier to access for users who may not be comfortable with English-only interfaces.

---

# 🎯 Problem

Important information is often distributed through:

- College notices
- Government circulars
- Scholarship announcements
- Internship notifications
- Job-related documents
- Application forms
- Registration instructions
- Official announcements
- Eligibility documents

These documents can contain:

- Complex language
- Important deadlines
- Eligibility requirements
- Required documents
- Financial information
- Multiple conditions
- Long instructions

Users often understand the information only partially and may still ask:

> **"What does this mean?"**

> **"Am I eligible?"**

> **"What documents do I need?"**

> **"What is the deadline?"**

> **"What should I do next?"**

Notice2Action is designed to answer these questions directly from the uploaded document.

---

# 💡 Our Solution

Notice2Action converts a document into a practical action-oriented experience.

### Instead of:

```text
Document
   ↓
Read everything
   ↓
Try to understand
   ↓
Find important information
   ↓
Figure out what to do
Notice2Action provides:
Document
   ↓
AI Analysis
   ↓
Important Information
   ↓
Action Plan
   ↓
Ask Questions
   ↓
Text or Voice Answer
   ↓
Take Action

The goal is to reduce the gap between:

Receiving information → Understanding information → Acting on information

✨ Key Features
📄 1. Document Upload

Users can upload:

PDF
JPG
PNG

The application processes the document and extracts the relevant information.

🤖 2. AI Document Understanding

The uploaded document is analyzed using Sarvam AI capabilities.

Notice2Action identifies important information such as:

What the document is about
Eligibility
Important dates
Required documents
Action steps
Important conditions
Deadlines
Contact information
Other relevant instructions
📋 3. Automatic Action Plan

Instead of returning only a generic summary, Notice2Action generates a structured action plan.

The output focuses on:

What is this?
Eligibility
Important Dates
Required Documents
Action Plan
Important Conditions

This makes long and complicated documents easier to understand.

💬 4. Ask Questions About the Document

After analyzing a document, users can ask questions specifically about that document.

For example:

What documents do I need?
What is the deadline?
Am I eligible?
What should I do next?

The AI answers using the uploaded document as context.

This helps prevent the experience from becoming a generic chatbot.

🎙️ 5. Voice-Based Questions

Users can ask questions using their voice instead of typing.

Voice flow:
User speaks
    ↓
Speech-to-Text
    ↓
Question converted to text
    ↓
Document-aware AI
    ↓
Answer generated

This makes the application easier to use for users who prefer speaking over typing.

🔊 6. AI Voice Responses

Notice2Action can also convert AI-generated answers into speech.

Response flow:
AI Answer
    ↓
Text-to-Speech
    ↓
Audio Response
    ↓
User listens

Users can therefore interact with the application through both:

Text
Voice
🌐 7. Multilingual Experience

Notice2Action is designed for multilingual interaction.

The application supports interaction across multiple Indian languages through Sarvam AI's language capabilities.

Users can select their preferred language and interact with the application using:

Text
Voice input
AI-generated text responses
AI-generated speech where supported

The project also uses Sarvam Translate to extend language support.

Supported interface languages include:
English
Hindi
Bengali
Marathi
Tamil
Telugu
Kannada
Malayalam
Gujarati
Punjabi
Odia
Maithili

Voice capabilities depend on the language support provided by the corresponding Sarvam speech model.

🧠 Sarvam AI Technologies Used

Notice2Action uses multiple Sarvam AI capabilities, each serving a specific purpose.

Sarvam AI Technology	Purpose in Notice2Action
Sarvam Document AI	Digitizes and extracts information from uploaded documents
Sarvam-105B	Understands documents and generates action plans and answers
Saaras Speech-to-Text	Converts user's voice questions into text
Bulbul v3 Text-to-Speech	Converts AI responses into natural speech
Sarvam Translate	Translates generated content into supported Indian languages
🔍 Role of Each Sarvam Model
📄 Sarvam Document AI

Used for document digitization and extraction.

It is particularly useful when a document contains scanned or image-based content where normal text extraction may not be sufficient.

Flow:
Uploaded Document
       ↓
Sarvam Document AI
       ↓
Extracted Text
       ↓
AI Understanding
🤖 Sarvam-105B

Sarvam-105B is used as the main language intelligence layer.

It helps Notice2Action:

Understand document content
Generate action plans
Answer document-specific questions
Follow user instructions
Provide concise explanations
Example:
Document:
"Applications close on 5 October.
Students must have a minimum CGPA of 6.5."

User:
"What is the deadline and eligibility?"

AI:
"Applications close on 5 October.
Students need a minimum CGPA of 6.5."
🎙️ Saaras Speech-to-Text

Saaras is used for voice input.

The user can press the microphone button and ask a question.

User Voice
    ↓
Saaras Speech-to-Text
    ↓
Text Question
    ↓
Sarvam-105B
    ↓
Answer

This enables voice-based document interaction.

🔊 Bulbul v3 Text-to-Speech

Bulbul v3 is used to convert the AI-generated answer into audio.

AI Generated Answer
       ↓
Bulbul v3
       ↓
Audio
       ↓
User

This allows users to listen to the answer instead of reading it.

🌍 Sarvam Translate

Sarvam Translate is used for multilingual translation.

This helps Notice2Action provide information in supported Indian languages.

AI Generated Content
        ↓
Sarvam Translate
        ↓
Selected Language
        ↓
User
🏗️ System Architecture
                         ┌──────────────────────┐
                         │        USER          │
                         │                      │
                         │ Text / Voice / File  │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   React Frontend     │
                         │      + Vite          │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   FastAPI Backend    │
                         │       Python         │
                         └──────────┬───────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
              ▼                     ▼                     ▼
     ┌────────────────┐    ┌────────────────┐    ┌────────────────┐
     │ Document AI    │    │  Sarvam-105B   │    │ Speech APIs    │
     │                │    │                │    │                │
     │ Document       │    │ Understanding  │    │ STT + TTS      │
     │ Digitization   │    │ + Q&A          │    │                │
     └────────────────┘    └────────────────┘    └────────────────┘
              │                     │                     │
              └─────────────────────┼─────────────────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Sarvam Translate   │
                         │                      │
                         │ Multilingual Output  │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │       USER           │
                         │                      │
                         │ Text + Audio Answer  │
                         └──────────────────────┘
🔄 Complete Application Workflow
                    START
                      │
                      ▼
              Upload Document
                      │
                      ▼
              Document Processing
                      │
                      ▼
             Extract Document Text
                      │
                      ▼
              AI Document Analysis
                      │
                      ▼
             Generate Action Plan
                      │
                      ▼
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
      Read Answer             Ask Question
                                  │
                       ┌──────────┴──────────┐
                       │                     │
                       ▼                     ▼
                   Type Question        Speak Question
                       │                     │
                       │                Speech-to-Text
                       │                     │
                       └──────────┬──────────┘
                                  │
                                  ▼
                           Sarvam-105B
                                  │
                                  ▼
                           AI Answer
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                    ▼                           ▼
                Read Text                  Play Audio
                                                │
                                                ▼
                                           Bulbul TTS
                                                │
                                                ▼
                                             Listen
🧩 Core Architecture

Notice2Action follows a frontend-backend architecture.

┌───────────────────────────────┐
│          FRONTEND             │
│                               │
│ React + Vite                  │
│ Axios                         │
│ Lucide React                  │
└───────────────┬───────────────┘
                │
                │ HTTP / REST API
                ▼
┌───────────────────────────────┐
│           BACKEND             │
│                               │
│ Python                        │
│ FastAPI                       │
│ Uvicorn                       │
└───────────────┬───────────────┘
                │
                │ Secure API calls
                ▼
┌───────────────────────────────┐
│          SARVAM AI            │
│                               │
│ Document AI                   │
│ Sarvam-105B                   │
│ Saaras STT                    │
│ Bulbul TTS                    │
│ Sarvam Translate              │
└───────────────────────────────┘
🛠️ Technology Stack
Frontend
React
Vite
JavaScript
Axios
Lucide React
CSS
Backend
Python
FastAPI
Uvicorn
Pydantic
Python-dotenv
Requests
PyPDF
AI & Language
Sarvam Document AI
Sarvam-105B
Saaras Speech-to-Text
Bulbul v3 Text-to-Speech
Sarvam Translate
📁 Project Structure
Notice2Action/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   │
│   │   ├── main.py
│   │   │
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── chat.py
│   │   │   ├── document.py
│   │   │   ├── voice.py
│   │   │   └── tts.py
│   │   │
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── sarvam.py
│   │   │   ├── document_service.py
│   │   │   └── speech_service.py
│   │   │
│   │   └── utils/
│   │       ├── __init__.py
│   │       └── prompts.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── sample-data/
│
├── README.md
│
└── .gitignore
🔌 API Endpoints
Document Analysis
POST /api/document/analyze

Used to upload and analyze a document.

Chat
POST /api/chat/

Used to ask questions about the uploaded document.

The request includes:

User question
Document context
Selected language
Speech-to-Text
POST /api/voice/transcribe

Used to convert the user's recorded voice question into text.

Text-to-Speech
POST /api/voice/speak

Used to convert an AI-generated response into audio.

🌐 Language Interaction Flow
                  USER
                   │
          ┌────────┴────────┐
          │                 │
          ▼                 ▼
       TEXT INPUT       VOICE INPUT
          │                 │
          │                 ▼
          │           Saaras STT
          │                 │
          └────────┬────────┘
                   ▼
             User Question
                   │
                   ▼
              Document Context
                   │
                   ▼
              Sarvam-105B
                   │
                   ▼
             AI Generated Answer
                   │
          ┌────────┴─────────┐
          │                  │
          ▼                  ▼
       Text Output       Translation
                             │
                             ▼
                       Selected Language
                             │
                             ▼
                         Bulbul TTS
                             │
                             ▼
                       Audio Response
💡 What Makes Notice2Action Different?

Notice2Action is not designed to be just another chatbot or document summarizer.

The main focus is actionability.

Traditional document tools:
Upload Document
      ↓
Extract Text
      ↓
Summarize
      ↓
Read
Notice2Action:
Upload Document
      ↓
Understand
      ↓
Identify Important Information
      ↓
Generate Action Plan
      ↓
Ask Questions
      ↓
Use Voice if Needed
      ↓
Listen to the Answer
      ↓
Take Action

The application combines:

Document understanding
Action planning
Document-specific Q&A
Speech-to-text
Text-to-speech
Multilingual interaction

into a single workflow.

The core idea is:

Don't just tell the user what the document says. Help the user understand what to do next.

👥 Target Users

Notice2Action can be useful for:

🎓 Students
College notices
Scholarships
Internships
Competitions
Registration forms
Academic announcements
👨‍💼 Job Seekers
Job notifications
Application requirements
Recruitment documents
Interview instructions
🏛️ Citizens
Government notices
Public-service information
Application instructions
Official circulars
👨‍👩‍👧 General Users
Important forms
Notices
Registration documents
Announcements
Instructions
🔐 Security

The Sarvam API key is stored only in the backend environment.

backend/.env

Example:

SARVAM_API_KEY=your_sarvam_api_key

The API key is:

Never placed in the React frontend
Never exposed to the browser
Never committed to GitHub
Protected using .gitignore

The .env file must remain local or be configured through environment variables during deployment.

⚙️ Installation & Setup
1. Clone the Repository
git clone YOUR_GITHUB_REPOSITORY_URL
cd Notice2Action
2. Backend Setup
cd backend

Create a virtual environment:

python3 -m venv venv

Activate it:

macOS / Linux
source venv/bin/activate

Install dependencies:

pip install -r requirements.txt
3. Configure Sarvam API Key

Create:

backend/.env

Add:

SARVAM_API_KEY=your_sarvam_api_key

Never commit this file.

4. Start Backend
uvicorn app.main:app --reload

Backend will run on:

http://localhost:8000

API documentation:

http://localhost:8000/docs
5. Frontend Setup

Open another terminal:

cd frontend

Install dependencies:

npm install

Start the development server:

npm run dev

The frontend will normally run on:

http://localhost:5173
🔑 Environment Variables

The backend requires:

SARVAM_API_KEY=your_sarvam_api_key

The frontend does not contain the Sarvam secret key.

For production deployment, configure the secret using the deployment platform's environment-variable system.

🚀 Production Architecture

For deployment, the recommended architecture is:

                   USER
                     │
                     ▼
              ┌──────────────┐
              │   Vercel     │
              │ React App    │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │   Render     │
              │ FastAPI API  │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │  Sarvam AI   │
              └──────────────┘

The Sarvam API key remains on the backend.

📈 Future Scope

Notice2Action can be extended with:

🔔 Deadline reminders
👤 User authentication
☁️ Cloud document storage
📊 Personalized action tracking
📱 Progressive Web App / mobile application
🗣️ Expanded regional-language voice support
📄 Additional document formats
🔗 Direct links to application portals
🧠 Personalized recommendations
📅 Calendar integration
🔔 Notification system
🏛️ Government-service integrations
🧪 Example User Journey
Step 1

User uploads a college scholarship notice.

Step 2

Notice2Action analyzes the document.

Step 3

The system produces:

What is this?
Eligibility
Important Dates
Required Documents
Action Plan
Important Conditions
Step 4

The user asks:

What documents do I need?
Step 5

The user can either:

Type the question

or:

🎙️ Speak the question
Step 6

The AI answers based on the uploaded document.

Step 7

The user can click:

🔊 Speak

to listen to the answer.

🧭 Product Philosophy

Notice2Action follows a simple principle:

INFORMATION
     ↓
UNDERSTANDING
     ↓
CLARITY
     ↓
ACTION

The product is designed around the idea that information is only useful when people can understand it and act on it.

🏆 Why This Matters

Millions of users receive important information through documents, notices and official communications.

However, the challenge is often not access to information.

The challenge is:

Understanding what the information means and what to do next.

Notice2Action attempts to solve this problem by combining:

AI + Documents + Voice + Indian Languages + Actionable Guidance

into one simple interface.

Notice2Action was built using Sarvam AI's language, document and speech capabilities to create a practical multilingual AI experience.

Core Technologies
Sarvam Document AI
        +
Sarvam-105B
        +
Saaras Speech-to-Text
        +
Bulbul v3 Text-to-Speech
        +
Sarvam Translate
        =
Notice2Action
👨‍💻 Project

Notice2Action — Your Personal Action Copilot

Built as a multilingual AI application focused on making important information:

Simple
Accessible
Multilingual
Voice-enabled
Actionable

## 🌍 From Information to Action

Notice2Action is built around a simple idea:

> **Understanding a document should be the beginning of an action, not the end of it.**

Whether it is a scholarship notice, college circular, government form, application, or important announcement, Notice2Action helps turn information into something people can actually understand and act upon.

**Built with ❤️ using Sarvam AI by Pranav Kumar Jha**



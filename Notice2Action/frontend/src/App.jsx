import { useEffect, useRef, useState } from "react";
import axios from "axios";

import {
  FileText,
  Upload,
  History,
  RefreshCw,
  Mic,
  MicOff,
  Volume2,
  Square,
  Send,
  Sparkles,
  GraduationCap,
  BriefcaseBusiness,
  Landmark,
  MessageCircle,
  ChevronDown,
  X,
  Plus,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import "./index.css";


/* =========================================================
   API
========================================================= */

const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8000";


/* =========================================================
   LANGUAGES
========================================================= */

const LANGUAGES = [
  {
    code: "en-IN",
    name: "English",
    native: "English",
  },
  {
    code: "hi-IN",
    name: "Hindi",
    native: "हिन्दी",
  },
  {
    code: "bn-IN",
    name: "Bengali",
    native: "বাংলা",
  },
  {
    code: "mr-IN",
    name: "Marathi",
    native: "मराठी",
  },
  {
    code: "ta-IN",
    name: "Tamil",
    native: "தமிழ்",
  },
  {
    code: "te-IN",
    name: "Telugu",
    native: "తెలుగు",
  },
  {
    code: "kn-IN",
    name: "Kannada",
    native: "ಕನ್ನಡ",
  },
  {
    code: "ml-IN",
    name: "Malayalam",
    native: "മലയാളം",
  },
  {
    code: "gu-IN",
    name: "Gujarati",
    native: "ગુજરાતી",
  },
  {
    code: "pa-IN",
    name: "Punjabi",
    native: "ਪੰਜਾਬੀ",
  },
  {
    code: "od-IN",
    name: "Odia",
    native: "ଓଡ଼ିଆ",
  },
  {
    code: "mai-IN",
    name: "Maithili",
    native: "मैथिली",
  },
];


/* =========================================================
   UI TRANSLATIONS
========================================================= */

const UI_TEXT = {
  "en-IN": {
    subtitle: "AI Document Assistant",
    poweredBy: "Powered by Sarvam AI",

    heroTitle:
      "Turn confusing documents into clear actions.",

    heroSubtitle:
      "Upload a notice, form or circular. Understand what it means and what you need to do next.",

    mattersTitle: "What matters to you?",

    mattersSubtitle:
      "We'll prioritize the information most relevant to you.",

    general: "General",
    student: "Student",
    jobSeeker: "Job seeker",
    citizen: "Citizen",

    uploadTitle: "Upload your document",
    uploadSubtitle: "PDF, JPG or PNG",
    chooseDocument: "Choose Document",

    analyzing: "Analyzing document...",
    actionPlan: "Your Action Plan",
    documentSummary: "Document Summary",

    chatTitle: "Ask about this document",
    chatPlaceholder:
      "Ask anything about this document...",

    send: "Send",

    quickQuestions: "Quick questions",

    whyImportant: "Why is this important?",
    whatSkills: "What do I need?",
    whatNext: "What should I do next?",
    deadline: "What is the deadline?",

    speak: "Speak",
    stop: "Stop",
    listening: "Listening...",
    processing: "Processing...",

    history: "History",
    newDocument: "New",

    whatIsThis: "What is this?",
    eligibility: "Eligibility",
    importantDates: "Important Dates",
    requiredDocuments: "Required Documents",
    actionPlanHeading: "Action Plan",
    importantConditions: "Important Conditions",

    noDocument:
      "Upload a document to get started.",

    couldNotPlayAudio:
      "Could not play the audio.",

    uploadSuccess:
      "Document uploaded successfully.",

    error:
      "Something went wrong. Please try again.",

    language: "Language",

    remove: "Remove",
  },

  "hi-IN": {
    subtitle: "AI दस्तावेज़ सहायक",
    poweredBy: "Sarvam AI द्वारा संचालित",

    heroTitle:
      "उलझे हुए दस्तावेज़ों को स्पष्ट कार्यों में बदलें।",

    heroSubtitle:
      "कोई सूचना, फॉर्म या परिपत्र अपलोड करें। जानें कि इसका क्या मतलब है और आपको आगे क्या करना है।",

    mattersTitle:
      "आपके लिए क्या महत्वपूर्ण है?",

    mattersSubtitle:
      "हम आपके लिए सबसे महत्वपूर्ण जानकारी को प्राथमिकता देंगे।",

    general: "सामान्य",
    student: "छात्र",
    jobSeeker: "नौकरी खोजने वाला",
    citizen: "नागरिक",

    uploadTitle:
      "अपना दस्तावेज़ अपलोड करें",

    uploadSubtitle:
      "PDF, JPG या PNG",

    chooseDocument:
      "दस्तावेज़ चुनें",

    analyzing:
      "दस्तावेज़ का विश्लेषण हो रहा है...",

    actionPlan:
      "आपकी कार्य योजना",

    documentSummary:
      "दस्तावेज़ का सारांश",

    chatTitle:
      "इस दस्तावेज़ के बारे में पूछें",

    chatPlaceholder:
      "इस दस्तावेज़ के बारे में कुछ भी पूछें...",

    send: "भेजें",

    quickQuestions:
      "त्वरित प्रश्न",

    whyImportant:
      "यह क्यों महत्वपूर्ण है?",

    whatSkills:
      "मुझे क्या चाहिए?",

    whatNext:
      "मुझे आगे क्या करना चाहिए?",

    deadline:
      "अंतिम तिथि क्या है?",

    speak: "बोलें",
    stop: "रोकें",
    listening: "सुन रहा है...",
    processing: "प्रक्रिया जारी है...",

    history: "इतिहास",
    newDocument: "नया",

    whatIsThis:
      "यह क्या है?",

    eligibility:
      "पात्रता",

    importantDates:
      "महत्वपूर्ण तिथियाँ",

    requiredDocuments:
      "आवश्यक दस्तावेज़",

    actionPlanHeading:
      "कार्य योजना",

    importantConditions:
      "महत्वपूर्ण शर्तें",

    noDocument:
      "शुरू करने के लिए कोई दस्तावेज़ अपलोड करें।",

    couldNotPlayAudio:
      "ऑडियो चलाया नहीं जा सका।",

    uploadSuccess:
      "दस्तावेज़ सफलतापूर्वक अपलोड हुआ।",

    error:
      "कुछ गलत हुआ। कृपया फिर से प्रयास करें।",

    language: "भाषा",

    remove: "हटाएँ",
  },

  "bn-IN": {
    subtitle: "AI ডকুমেন্ট সহায়ক",
    poweredBy: "Sarvam AI দ্বারা চালিত",

    heroTitle:
      "জটিল ডকুমেন্টকে পরিষ্কার করণীয় কাজে পরিবর্তন করুন।",

    heroSubtitle:
      "একটি নোটিশ, ফর্ম বা সার্কুলার আপলোড করুন। এর অর্থ এবং পরবর্তী করণীয় সহজে বুঝুন।",

    mattersTitle:
      "আপনার জন্য কী গুরুত্বপূর্ণ?",

    mattersSubtitle:
      "আমরা আপনার জন্য সবচেয়ে প্রাসঙ্গিক তথ্যকে অগ্রাধিকার দেব।",

    general: "সাধারণ",
    student: "শিক্ষার্থী",
    jobSeeker: "চাকরি প্রার্থী",
    citizen: "নাগরিক",

    uploadTitle:
      "আপনার ডকুমেন্ট আপলোড করুন",

    uploadSubtitle:
      "PDF, JPG অথবা PNG",

    chooseDocument:
      "ডকুমেন্ট নির্বাচন করুন",

    analyzing:
      "ডকুমেন্ট বিশ্লেষণ করা হচ্ছে...",

    actionPlan:
      "আপনার করণীয় পরিকল্পনা",

    documentSummary:
      "ডকুমেন্টের সারাংশ",

    chatTitle:
      "এই ডকুমেন্ট সম্পর্কে জিজ্ঞাসা করুন",

    chatPlaceholder:
      "এই ডকুমেন্ট সম্পর্কে যেকোনো প্রশ্ন করুন...",

    send: "পাঠান",

    quickQuestions:
      "দ্রুত প্রশ্ন",

    whyImportant:
      "এটি কেন গুরুত্বপূর্ণ?",

    whatSkills:
      "আমার কী প্রয়োজন?",

    whatNext:
      "আমার পরবর্তী পদক্ষেপ কী?",

    deadline:
      "শেষ তারিখ কী?",

    speak: "বলুন",
    stop: "থামান",
    listening: "শোনা হচ্ছে...",
    processing: "প্রক্রিয়া চলছে...",

    history: "ইতিহাস",
    newDocument: "নতুন",

    whatIsThis: "এটি কী?",
    eligibility: "যোগ্যতা",
    importantDates: "গুরুত্বপূর্ণ তারিখ",
    requiredDocuments: "প্রয়োজনীয় ডকুমেন্ট",
    actionPlanHeading: "করণীয় পরিকল্পনা",
    importantConditions: "গুরুত্বপূর্ণ শর্ত",

    noDocument:
      "শুরু করতে একটি ডকুমেন্ট আপলোড করুন।",

    couldNotPlayAudio:
      "অডিও চালানো যায়নি।",

    uploadSuccess:
      "ডকুমেন্ট সফলভাবে আপলোড হয়েছে।",

    error:
      "কিছু ভুল হয়েছে। আবার চেষ্টা করুন।",

    language: "ভাষা",
    remove: "সরান",
  },

  "mr-IN": {
    subtitle: "AI दस्तऐवज सहाय्यक",
    poweredBy: "Sarvam AI द्वारे समर्थित",

    heroTitle:
      "गोंधळात टाकणाऱ्या दस्तऐवजांचे स्पष्ट कृतींमध्ये रूपांतर करा.",

    heroSubtitle:
      "सूचना, फॉर्म किंवा परिपत्रक अपलोड करा. त्याचा अर्थ आणि पुढे काय करायचे ते समजून घ्या.",

    mattersTitle:
      "तुमच्यासाठी काय महत्त्वाचे आहे?",

    mattersSubtitle:
      "आम्ही तुमच्यासाठी सर्वात संबंधित माहितीला प्राधान्य देऊ.",

    general: "सामान्य",
    student: "विद्यार्थी",
    jobSeeker: "नोकरी शोधणारा",
    citizen: "नागरिक",

    uploadTitle:
      "तुमचा दस्तऐवज अपलोड करा",

    uploadSubtitle:
      "PDF, JPG किंवा PNG",

    chooseDocument:
      "दस्तऐवज निवडा",

    analyzing:
      "दस्तऐवजाचे विश्लेषण सुरू आहे...",

    actionPlan:
      "तुमची कृती योजना",

    documentSummary:
      "दस्तऐवजाचा सारांश",

    chatTitle:
      "या दस्तऐवजाबद्दल विचारा",

    chatPlaceholder:
      "या दस्तऐवजाबद्दल काहीही विचारा...",

    send: "पाठवा",

    quickQuestions:
      "जलद प्रश्न",

    whyImportant:
      "हे महत्त्वाचे का आहे?",

    whatSkills:
      "मला काय आवश्यक आहे?",

    whatNext:
      "मी पुढे काय करावे?",

    deadline:
      "अंतिम तारीख काय आहे?",

    speak: "बोला",
    stop: "थांबवा",
    listening: "ऐकत आहे...",
    processing: "प्रक्रिया सुरू आहे...",

    history: "इतिहास",
    newDocument: "नवीन",

    whatIsThis: "हे काय आहे?",
    eligibility: "पात्रता",
    importantDates: "महत्त्वाच्या तारखा",
    requiredDocuments: "आवश्यक दस्तऐवज",
    actionPlanHeading: "कृती योजना",
    importantConditions: "महत्त्वाच्या अटी",

    noDocument:
      "सुरुवात करण्यासाठी दस्तऐवज अपलोड करा.",

    couldNotPlayAudio:
      "ऑडिओ प्ले करता आला नाही.",

    uploadSuccess:
      "दस्तऐवज यशस्वीरित्या अपलोड झाला.",

    error:
      "काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.",

    language: "भाषा",
    remove: "काढा",
  },

  "ta-IN": {
    subtitle: "AI ஆவண உதவியாளர்",
    poweredBy: "Sarvam AI மூலம் இயக்கப்படுகிறது",

    heroTitle:
      "குழப்பமான ஆவணங்களை தெளிவான செயல்களாக மாற்றுங்கள்.",

    heroSubtitle:
      "அறிவிப்பு, படிவம் அல்லது சுற்றறிக்கையை பதிவேற்றுங்கள். அதன் பொருளையும் அடுத்து நீங்கள் செய்ய வேண்டியதையும் அறியுங்கள்.",

    mattersTitle:
      "உங்களுக்கு எது முக்கியம்?",

    mattersSubtitle:
      "உங்களுக்கு மிகவும் தொடர்புடைய தகவல்களுக்கு முன்னுரிமை அளிப்போம்.",

    general: "பொது",
    student: "மாணவர்",
    jobSeeker: "வேலை தேடுபவர்",
    citizen: "குடிமகன்",

    uploadTitle:
      "உங்கள் ஆவணத்தை பதிவேற்றுங்கள்",

    uploadSubtitle:
      "PDF, JPG அல்லது PNG",

    chooseDocument:
      "ஆவணத்தைத் தேர்ந்தெடுக்கவும்",

    analyzing:
      "ஆவணம் பகுப்பாய்வு செய்யப்படுகிறது...",

    actionPlan:
      "உங்கள் செயல்திட்டம்",

    documentSummary:
      "ஆவணச் சுருக்கம்",

    chatTitle:
      "இந்த ஆவணத்தைப் பற்றி கேளுங்கள்",

    chatPlaceholder:
      "இந்த ஆவணம் குறித்து ஏதேனும் கேளுங்கள்...",

    send: "அனுப்பு",

    quickQuestions:
      "விரைவு கேள்விகள்",

    whyImportant:
      "இது ஏன் முக்கியம்?",

    whatSkills:
      "எனக்கு என்ன தேவை?",

    whatNext:
      "அடுத்து நான் என்ன செய்ய வேண்டும்?",

    deadline:
      "கடைசி தேதி என்ன?",

    speak: "பேசுங்கள்",
    stop: "நிறுத்து",
    listening: "கேட்கிறது...",
    processing: "செயலாக்கப்படுகிறது...",

    history: "வரலாறு",
    newDocument: "புதியது",

    whatIsThis: "இது என்ன?",
    eligibility: "தகுதி",
    importantDates: "முக்கிய தேதிகள்",
    requiredDocuments: "தேவையான ஆவணங்கள்",
    actionPlanHeading: "செயல்திட்டம்",
    importantConditions: "முக்கிய நிபந்தனைகள்",

    noDocument:
      "தொடங்க ஒரு ஆவணத்தைப் பதிவேற்றுங்கள்.",

    couldNotPlayAudio:
      "ஆடியோவை இயக்க முடியவில்லை.",

    uploadSuccess:
      "ஆவணம் வெற்றிகரமாக பதிவேற்றப்பட்டது.",

    error:
      "ஏதோ தவறு ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.",

    language: "மொழி",
    remove: "அகற்று",
  },

  "te-IN": {
    subtitle: "AI డాక్యుమెంట్ సహాయకుడు",
    poweredBy: "Sarvam AI ద్వారా అందించబడింది",

    heroTitle:
      "గందరగోళమైన పత్రాలను స్పష్టమైన చర్యలుగా మార్చండి.",

    heroSubtitle:
      "నోటీసు, ఫారమ్ లేదా సర్క్యులర్‌ను అప్‌లోడ్ చేయండి. దాని అర్థం మరియు మీరు తర్వాత చేయాల్సిన పనిని తెలుసుకోండి.",

    mattersTitle:
      "మీకు ఏది ముఖ్యమైనది?",

    mattersSubtitle:
      "మీకు అత్యంత సంబంధిత సమాచారానికి ప్రాధాన్యత ఇస్తాము.",

    general: "సాధారణం",
    student: "విద్యార్థి",
    jobSeeker: "ఉద్యోగ అన్వేషకుడు",
    citizen: "పౌరుడు",

    uploadTitle:
      "మీ పత్రాన్ని అప్‌లోడ్ చేయండి",

    uploadSubtitle:
      "PDF, JPG లేదా PNG",

    chooseDocument:
      "పత్రాన్ని ఎంచుకోండి",

    analyzing:
      "పత్రాన్ని విశ్లేషిస్తున్నాము...",

    actionPlan:
      "మీ కార్యాచరణ ప్రణాళిక",

    documentSummary:
      "పత్రం సారాంశం",

    chatTitle:
      "ఈ పత్రం గురించి అడగండి",

    chatPlaceholder:
      "ఈ పత్రం గురించి ఏదైనా అడగండి...",

    send: "పంపండి",

    quickQuestions:
      "త్వరిత ప్రశ్నలు",

    whyImportant:
      "ఇది ఎందుకు ముఖ్యమైనది?",

    whatSkills:
      "నాకు ఏమి అవసరం?",

    whatNext:
      "నేను తర్వాత ఏమి చేయాలి?",

    deadline:
      "చివరి తేదీ ఏమిటి?",

    speak: "మాట్లాడండి",
    stop: "ఆపండి",
    listening: "వింటున్నాము...",
    processing: "ప్రాసెస్ చేస్తున్నాము...",

    history: "చరిత్ర",
    newDocument: "కొత్తది",

    whatIsThis: "ఇది ఏమిటి?",
    eligibility: "అర్హత",
    importantDates: "ముఖ్యమైన తేదీలు",
    requiredDocuments: "అవసరమైన పత్రాలు",
    actionPlanHeading: "కార్యాచరణ ప్రణాళిక",
    importantConditions: "ముఖ్యమైన షరతులు",

    noDocument:
      "ప్రారంభించడానికి ఒక పత్రాన్ని అప్‌లోడ్ చేయండి.",

    couldNotPlayAudio:
      "ఆడియోను ప్లే చేయలేకపోయాము.",

    uploadSuccess:
      "పత్రం విజయవంతంగా అప్‌లోడ్ చేయబడింది.",

    error:
      "ఏదో తప్పు జరిగింది. దయచేసి మళ్లీ ప్రయత్నించండి.",

    language: "భాష",
    remove: "తొలగించు",
  },

  "kn-IN": {
    subtitle: "AI ಡಾಕ್ಯುಮೆಂಟ್ ಸಹಾಯಕ",
    poweredBy: "Sarvam AI ಮೂಲಕ ಚಾಲಿತ",

    heroTitle:
      "ಗೊಂದಲದ ದಾಖಲೆಗಳನ್ನು ಸ್ಪಷ್ಟವಾದ ಕಾರ್ಯಗಳಾಗಿ ಪರಿವರ್ತಿಸಿ.",

    heroSubtitle:
      "ಸೂಚನೆ, ಫಾರ್ಮ್ ಅಥವಾ ಸುತ್ತೋಲೆಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ. ಅದರ ಅರ್ಥ ಮತ್ತು ಮುಂದೆ ನೀವು ಏನು ಮಾಡಬೇಕು ಎಂಬುದನ್ನು ತಿಳಿಯಿರಿ.",

    mattersTitle:
      "ನಿಮಗೆ ಯಾವುದು ಮುಖ್ಯ?",

    mattersSubtitle:
      "ನಿಮಗೆ ಹೆಚ್ಚು ಸಂಬಂಧಿಸಿದ ಮಾಹಿತಿಗೆ ಆದ್ಯತೆ ನೀಡುತ್ತೇವೆ.",

    general: "ಸಾಮಾನ್ಯ",
    student: "ವಿದ್ಯಾರ್ಥಿ",
    jobSeeker: "ಉದ್ಯೋಗ ಹುಡುಕುವವರು",
    citizen: "ನಾಗರಿಕ",

    uploadTitle:
      "ನಿಮ್ಮ ದಾಖಲೆಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",

    uploadSubtitle:
      "PDF, JPG ಅಥವಾ PNG",

    chooseDocument:
      "ದಾಖಲೆ ಆಯ್ಕೆಮಾಡಿ",

    analyzing:
      "ದಾಖಲೆಯನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",

    actionPlan:
      "ನಿಮ್ಮ ಕಾರ್ಯಯೋಜನೆ",

    documentSummary:
      "ದಾಖಲೆ ಸಾರಾಂಶ",

    chatTitle:
      "ಈ ದಾಖಲೆಯ ಬಗ್ಗೆ ಕೇಳಿ",

    chatPlaceholder:
      "ಈ ದಾಖಲೆಯ ಬಗ್ಗೆ ಏನಾದರೂ ಕೇಳಿ...",

    send: "ಕಳುಹಿಸಿ",

    quickQuestions:
      "ತ್ವರಿತ ಪ್ರಶ್ನೆಗಳು",

    whyImportant:
      "ಇದು ಏಕೆ ಮುಖ್ಯ?",

    whatSkills:
      "ನನಗೆ ಏನು ಬೇಕು?",

    whatNext:
      "ಮುಂದೆ ನಾನು ಏನು ಮಾಡಬೇಕು?",

    deadline:
      "ಕೊನೆಯ ದಿನಾಂಕ ಯಾವುದು?",

    speak: "ಮಾತನಾಡಿ",
    stop: "ನಿಲ್ಲಿಸಿ",
    listening: "ಕೇಳಲಾಗುತ್ತಿದೆ...",
    processing: "ಪ್ರಕ್ರಿಯೆ ನಡೆಯುತ್ತಿದೆ...",

    history: "ಇತಿಹಾಸ",
    newDocument: "ಹೊಸದು",

    whatIsThis: "ಇದು ಏನು?",
    eligibility: "ಅರ್ಹತೆ",
    importantDates: "ಪ್ರಮುಖ ದಿನಾಂಕಗಳು",
    requiredDocuments: "ಅಗತ್ಯ ದಾಖಲೆಗಳು",
    actionPlanHeading: "ಕಾರ್ಯಯೋಜನೆ",
    importantConditions: "ಪ್ರಮುಖ ಷರತ್ತುಗಳು",

    noDocument:
      "ಪ್ರಾರಂಭಿಸಲು ಒಂದು ದಾಖಲೆಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",

    couldNotPlayAudio:
      "ಆಡಿಯೊವನ್ನು ಪ್ಲೇ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",

    uploadSuccess:
      "ದಾಖಲೆ ಯಶಸ್ವಿಯಾಗಿ ಅಪ್‌ಲೋಡ್ ಆಗಿದೆ.",

    error:
      "ಏನೋ ತಪ್ಪಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",

    language: "ಭಾಷೆ",
    remove: "ತೆಗೆದುಹಾಕಿ",
  },

  "ml-IN": {
    subtitle: "AI ഡോക്യുമെന്റ് സഹായി",
    poweredBy: "Sarvam AI ഉപയോഗിച്ച്",

    heroTitle:
      "ആശയക്കുഴപ്പമുള്ള രേഖകളെ വ്യക്തമായ പ്രവർത്തനങ്ങളാക്കി മാറ്റുക.",

    heroSubtitle:
      "ഒരു അറിയിപ്പ്, ഫോം അല്ലെങ്കിൽ സർക്കുലർ അപ്‌ലോഡ് ചെയ്യുക. അതിന്റെ അർത്ഥവും അടുത്തതായി ചെയ്യേണ്ട കാര്യങ്ങളും മനസ്സിലാക്കുക.",

    mattersTitle:
      "നിങ്ങൾക്ക് എന്താണ് പ്രധാനപ്പെട്ടത്?",

    mattersSubtitle:
      "നിങ്ങൾക്ക് ഏറ്റവും പ്രസക്തമായ വിവരങ്ങൾക്ക് മുൻഗണന നൽകും.",

    general: "പൊതുവായത്",
    student: "വിദ്യാർത്ഥി",
    jobSeeker: "ജോലി അന്വേഷിക്കുന്നവർ",
    citizen: "പൗരൻ",

    uploadTitle:
      "നിങ്ങളുടെ രേഖ അപ്‌ലോഡ് ചെയ്യുക",

    uploadSubtitle:
      "PDF, JPG അല്ലെങ്കിൽ PNG",

    chooseDocument:
      "രേഖ തിരഞ്ഞെടുക്കുക",

    analyzing:
      "രേഖ വിശകലനം ചെയ്യുന്നു...",

    actionPlan:
      "നിങ്ങളുടെ പ്രവർത്തന പദ്ധതി",

    documentSummary:
      "രേഖയുടെ സംഗ്രഹം",

    chatTitle:
      "ഈ രേഖയെക്കുറിച്ച് ചോദിക്കുക",

    chatPlaceholder:
      "ഈ രേഖയെക്കുറിച്ച് എന്തും ചോദിക്കാം...",

    send: "അയയ്ക്കുക",

    quickQuestions:
      "ദ്രുത ചോദ്യങ്ങൾ",

    whyImportant:
      "ഇത് എന്തുകൊണ്ട് പ്രധാനമാണ്?",

    whatSkills:
      "എനിക്ക് എന്താണ് ആവശ്യം?",

    whatNext:
      "അടുത്തതായി ഞാൻ എന്ത് ചെയ്യണം?",

    deadline:
      "അവസാന തീയതി എന്താണ്?",

    speak: "സംസാരിക്കുക",
    stop: "നിർത്തുക",
    listening: "കേൾക്കുന്നു...",
    processing: "പ്രോസസ്സ് ചെയ്യുന്നു...",

    history: "ചരിത്രം",
    newDocument: "പുതിയത്",

    whatIsThis: "ഇത് എന്താണ്?",
    eligibility: "യോഗ്യത",
    importantDates: "പ്രധാന തീയതികൾ",
    requiredDocuments: "ആവശ്യമായ രേഖകൾ",
    actionPlanHeading: "പ്രവർത്തന പദ്ധതി",
    importantConditions: "പ്രധാന വ്യവസ്ഥകൾ",

    noDocument:
      "ആരംഭിക്കാൻ ഒരു രേഖ അപ്‌ലോഡ് ചെയ്യുക.",

    couldNotPlayAudio:
      "ഓഡിയോ പ്ലേ ചെയ്യാൻ കഴിഞ്ഞില്ല.",

    uploadSuccess:
      "രേഖ വിജയകരമായി അപ്‌ലോഡ് ചെയ്തു.",

    error:
      "എന്തോ തെറ്റായി. വീണ്ടും ശ്രമിക്കുക.",

    language: "ഭാഷ",
    remove: "നീക്കം ചെയ്യുക",
  },

  "gu-IN": {
    subtitle: "AI દસ્તાવેજ સહાયક",
    poweredBy: "Sarvam AI દ્વારા સંચાલિત",

    heroTitle:
      "ગૂંચવણભર્યા દસ્તાવેજોને સ્પષ્ટ કાર્યોમાં ફેરવો.",

    heroSubtitle:
      "નોટિસ, ફોર્મ અથવા પરિપત્ર અપલોડ કરો. તેનો અર્થ અને આગળ શું કરવું તે સમજો.",

    mattersTitle:
      "તમારા માટે શું મહત્વનું છે?",

    mattersSubtitle:
      "અમે તમારા માટે સૌથી સંબંધિત માહિતીને પ્રાથમિકતા આપીશું.",

    general: "સામાન્ય",
    student: "વિદ્યાર્થી",
    jobSeeker: "નોકરી શોધનાર",
    citizen: "નાગરિક",

    uploadTitle:
      "તમારો દસ્તાવેજ અપલોડ કરો",

    uploadSubtitle:
      "PDF, JPG અથવા PNG",

    chooseDocument:
      "દસ્તાવેજ પસંદ કરો",

    analyzing:
      "દસ્તાવેજનું વિશ્લેષણ થઈ રહ્યું છે...",

    actionPlan:
      "તમારી કાર્ય યોજના",

    documentSummary:
      "દસ્તાવેજનો સારાંશ",

    chatTitle:
      "આ દસ્તાવેજ વિશે પૂછો",

    chatPlaceholder:
      "આ દસ્તાવેજ વિશે કંઈપણ પૂછો...",

    send: "મોકલો",

    quickQuestions:
      "ઝડપી પ્રશ્નો",

    whyImportant:
      "આ શા માટે મહત્વનું છે?",

    whatSkills:
      "મારે શું જોઈએ?",

    whatNext:
      "મારે આગળ શું કરવું જોઈએ?",

    deadline:
      "અંતિમ તારીખ શું છે?",

    speak: "બોલો",
    stop: "રોકો",
    listening: "સાંભળી રહ્યા છીએ...",
    processing: "પ્રક્રિયા ચાલી રહી છે...",

    history: "ઇતિહાસ",
    newDocument: "નવું",

    whatIsThis: "આ શું છે?",
    eligibility: "પાત્રતા",
    importantDates: "મહત્વપૂર્ણ તારીખો",
    requiredDocuments: "જરૂરી દસ્તાવેજો",
    actionPlanHeading: "કાર્ય યોજના",
    importantConditions: "મહત્વપૂર્ણ શરતો",

    noDocument:
      "શરૂ કરવા માટે દસ્તાવેજ અપલોડ કરો.",

    couldNotPlayAudio:
      "ઓડિયો ચલાવી શકાયો નહીં.",

    uploadSuccess:
      "દસ્તાવેજ સફળતાપૂર્વક અપલોડ થયો.",

    error:
      "કંઈક ખોટું થયું. કૃપા કરીને ફરી પ્રયાસ કરો.",

    language: "ભાષા",
    remove: "દૂર કરો",
  },

  "pa-IN": {
    subtitle: "AI ਦਸਤਾਵੇਜ਼ ਸਹਾਇਕ",
    poweredBy: "Sarvam AI ਦੁਆਰਾ ਸੰਚਾਲਿਤ",

    heroTitle:
      "ਉਲਝਣ ਵਾਲੇ ਦਸਤਾਵੇਜ਼ਾਂ ਨੂੰ ਸਪਸ਼ਟ ਕੰਮਾਂ ਵਿੱਚ ਬਦਲੋ।",

    heroSubtitle:
      "ਨੋਟਿਸ, ਫਾਰਮ ਜਾਂ ਸਰਕੁਲਰ ਅੱਪਲੋਡ ਕਰੋ। ਇਸਦਾ ਮਤਲਬ ਅਤੇ ਅੱਗੇ ਕੀ ਕਰਨਾ ਹੈ ਸਮਝੋ।",

    mattersTitle:
      "ਤੁਹਾਡੇ ਲਈ ਕੀ ਮਹੱਤਵਪੂਰਨ ਹੈ?",

    mattersSubtitle:
      "ਅਸੀਂ ਤੁਹਾਡੇ ਲਈ ਸਭ ਤੋਂ ਸੰਬੰਧਿਤ ਜਾਣਕਾਰੀ ਨੂੰ ਤਰਜੀਹ ਦੇਵਾਂਗੇ।",

    general: "ਆਮ",
    student: "ਵਿਦਿਆਰਥੀ",
    jobSeeker: "ਨੌਕਰੀ ਲੱਭਣ ਵਾਲਾ",
    citizen: "ਨਾਗਰਿਕ",

    uploadTitle:
      "ਆਪਣਾ ਦਸਤਾਵੇਜ਼ ਅੱਪਲੋਡ ਕਰੋ",

    uploadSubtitle:
      "PDF, JPG ਜਾਂ PNG",

    chooseDocument:
      "ਦਸਤਾਵੇਜ਼ ਚੁਣੋ",

    analyzing:
      "ਦਸਤਾਵੇਜ਼ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਹੋ ਰਿਹਾ ਹੈ...",

    actionPlan:
      "ਤੁਹਾਡੀ ਕਾਰਵਾਈ ਯੋਜਨਾ",

    documentSummary:
      "ਦਸਤਾਵੇਜ਼ ਦਾ ਸਾਰ",

    chatTitle:
      "ਇਸ ਦਸਤਾਵੇਜ਼ ਬਾਰੇ ਪੁੱਛੋ",

    chatPlaceholder:
      "ਇਸ ਦਸਤਾਵੇਜ਼ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛੋ...",

    send: "ਭੇਜੋ",

    quickQuestions:
      "ਤੁਰੰਤ ਸਵਾਲ",

    whyImportant:
      "ਇਹ ਮਹੱਤਵਪੂਰਨ ਕਿਉਂ ਹੈ?",

    whatSkills:
      "ਮੈਨੂੰ ਕੀ ਚਾਹੀਦਾ ਹੈ?",

    whatNext:
      "ਮੈਨੂੰ ਅੱਗੇ ਕੀ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ?",

    deadline:
      "ਆਖਰੀ ਮਿਤੀ ਕੀ ਹੈ?",

    speak: "ਬੋਲੋ",
    stop: "ਰੋਕੋ",
    listening: "ਸੁਣ ਰਹੇ ਹਾਂ...",
    processing: "ਪ੍ਰਕਿਰਿਆ ਜਾਰੀ ਹੈ...",

    history: "ਇਤਿਹਾਸ",
    newDocument: "ਨਵਾਂ",

    whatIsThis: "ਇਹ ਕੀ ਹੈ?",
    eligibility: "ਯੋਗਤਾ",
    importantDates: "ਮਹੱਤਵਪੂਰਨ ਮਿਤੀਆਂ",
    requiredDocuments: "ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ਼",
    actionPlanHeading: "ਕਾਰਵਾਈ ਯੋਜਨਾ",
    importantConditions: "ਮਹੱਤਵਪੂਰਨ ਸ਼ਰਤਾਂ",

    noDocument:
      "ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਦਸਤਾਵੇਜ਼ ਅੱਪਲੋਡ ਕਰੋ।",

    couldNotPlayAudio:
      "ਆਡੀਓ ਚਲਾਇਆ ਨਹੀਂ ਜਾ ਸਕਿਆ।",

    uploadSuccess:
      "ਦਸਤਾਵੇਜ਼ ਸਫਲਤਾਪੂਰਵਕ ਅੱਪਲੋਡ ਹੋਇਆ।",

    error:
      "ਕੁਝ ਗਲਤ ਹੋਇਆ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",

    language: "ਭਾਸ਼ਾ",
    remove: "ਹਟਾਓ",
  },

  "mai-IN": {
    subtitle: "AI दस्तावेज सहायक",
    poweredBy: "Sarvam AI द्वारा संचालित",
    heroTitle: "जटिल दस्तावेज के स्पष्ट काम में बदलू।",
    heroSubtitle: "नोटिस, फॉर्म या सर्कुलर अपलोड करू। एकर मतलब आ अगिला कदम बुझू।",
    mattersTitle: "अहाँ लेल की महत्वपूर्ण अछि?",
    mattersSubtitle: "हम अहाँ लेल सबसे जरूरी जानकारी के प्राथमिकता देब।",
    general: "सामान्य",
    student: "छात्र",
    jobSeeker: "नौकरी खोजय वाला",
    citizen: "नागरिक",
    uploadTitle: "अपन दस्तावेज अपलोड करू",
    uploadSubtitle: "PDF, JPG या PNG",
    chooseDocument: "दस्तावेज चुनू",
    analyzing: "दस्तावेज के विश्लेषण भ' रहल अछि...",
    actionPlan: "अहाँक कार्य योजना",
    documentSummary: "दस्तावेज के सारांश",
    chatTitle: "ई दस्तावेज के बारे में पूछू",
    chatPlaceholder: "ई दस्तावेज के बारे में कोनो प्रश्न पूछू...",
    send: "भेजू",
    quickQuestions: "जल्दी प्रश्न",
    whyImportant: "ई किएक महत्वपूर्ण अछि?",
    whatSkills: "हमरा की चाही?",
    whatNext: "हमरा आगाँ की करबाक चाही?",
    deadline: "अंतिम तारीख की अछि?",
    speak: "सुनू",
    stop: "रोकू",
    listening: "सुनि रहल अछि...",
    processing: "प्रक्रिया चलि रहल अछि...",
    history: "इतिहास",
    newDocument: "नव",
    whatIsThis: "ई की अछि?",
    eligibility: "पात्रता",
    importantDates: "महत्वपूर्ण तारीख",
    requiredDocuments: "जरूरी दस्तावेज",
    actionPlanHeading: "कार्य योजना",
    importantConditions: "महत्वपूर्ण शर्त",
    noDocument: "शुरू करबाक लेल दस्तावेज अपलोड करू।",
    couldNotPlayAudio: "ऑडियो चलि नहि सकल।",
    uploadSuccess: "दस्तावेज सफलतापूर्वक अपलोड भेल।",
    error: "किछु गलत भेल। फेर प्रयास करू।",
    language: "भाषा",
    remove: "हटाउ",
  },

  "od-IN": {
    subtitle: "AI ଡକ୍ୟୁମେଣ୍ଟ ସହାୟକ",
    poweredBy: "Sarvam AI ଦ୍ୱାରା ପରିଚାଳିତ",

    heroTitle:
      "ଜଟିଳ ଡକ୍ୟୁମେଣ୍ଟକୁ ସ୍ପଷ୍ଟ କାର୍ଯ୍ୟରେ ପରିଣତ କରନ୍ତୁ।",

    heroSubtitle:
      "ନୋଟିସ୍, ଫର୍ମ କିମ୍ବା ସର୍କୁଲାର୍ ଅପଲୋଡ୍ କରନ୍ତୁ। ଏହାର ଅର୍ଥ ଏବଂ ପରବର୍ତ୍ତୀ କାର୍ଯ୍ୟ ବୁଝନ୍ତୁ।",

    mattersTitle:
      "ଆପଣଙ୍କ ପାଇଁ କ'ଣ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ?",

    mattersSubtitle:
      "ଆପଣଙ୍କ ପାଇଁ ସବୁଠାରୁ ପ୍ରାସଙ୍ଗିକ ସୂଚନାକୁ ଆମେ ପ୍ରାଥମିକତା ଦେବୁ।",

    general: "ସାଧାରଣ",
    student: "ଛାତ୍ର",
    jobSeeker: "ଚାକିରି ଖୋଜୁଥିବା ବ୍ୟକ୍ତି",
    citizen: "ନାଗରିକ",

    uploadTitle:
      "ଆପଣଙ୍କ ଡକ୍ୟୁମେଣ୍ଟ ଅପଲୋଡ୍ କରନ୍ତୁ",

    uploadSubtitle:
      "PDF, JPG କିମ୍ବା PNG",

    chooseDocument:
      "ଡକ୍ୟୁମେଣ୍ଟ ବାଛନ୍ତୁ",

    analyzing:
      "ଡକ୍ୟୁମେଣ୍ଟ ବିଶ୍ଳେଷଣ ହେଉଛି...",

    actionPlan:
      "ଆପଣଙ୍କ କାର୍ଯ୍ୟ ଯୋଜନା",

    documentSummary:
      "ଡକ୍ୟୁମେଣ୍ଟ ସାରାଂଶ",

    chatTitle:
      "ଏହି ଡକ୍ୟୁମେଣ୍ଟ ବିଷୟରେ ପଚାରନ୍ତୁ",

    chatPlaceholder:
      "ଏହି ଡକ୍ୟୁମେଣ୍ଟ ବିଷୟରେ କିଛି ପଚାରନ୍ତୁ...",

    send: "ପଠାନ୍ତୁ",

    quickQuestions:
      "ଦ୍ରୁତ ପ୍ରଶ୍ନ",

    whyImportant:
      "ଏହା କାହିଁକି ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ?",

    whatSkills:
      "ମୋତେ କ'ଣ ଦରକାର?",

    whatNext:
      "ମୁଁ ପରେ କ'ଣ କରିବି?",

    deadline:
      "ଶେଷ ତାରିଖ କ'ଣ?",

    speak: "କୁହନ୍ତୁ",
    stop: "ବନ୍ଦ କରନ୍ତୁ",
    listening: "ଶୁଣୁଛୁ...",
    processing: "ପ୍ରକ୍ରିୟା ଚାଲିଛି...",

    history: "ଇତିହାସ",
    newDocument: "ନୂଆ",

    whatIsThis: "ଏହା କ'ଣ?",
    eligibility: "ଯୋଗ୍ୟତା",
    importantDates: "ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ତାରିଖ",
    requiredDocuments: "ଆବଶ୍ୟକ ଡକ୍ୟୁମେଣ୍ଟ",
    actionPlanHeading: "କାର୍ଯ୍ୟ ଯୋଜନା",
    importantConditions: "ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ସର୍ତ୍ତ",

    noDocument:
      "ଆରମ୍ଭ କରିବାକୁ ଏକ ଡକ୍ୟୁମେଣ୍ଟ ଅପଲୋଡ୍ କରନ୍ତୁ।",

    couldNotPlayAudio:
      "ଅଡିଓ ଚାଲୁ କରାଯାଇପାରିଲା ନାହିଁ।",

    uploadSuccess:
      "ଡକ୍ୟୁମେଣ୍ଟ ସଫଳତାର ସହ ଅପଲୋଡ୍ ହୋଇଛି।",

    error:
      "କିଛି ଭୁଲ ହୋଇଛି। ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।",

    language: "ଭାଷା",
    remove: "ହଟାନ୍ତୁ",
  },
};


/* =========================================================
   APP
========================================================= */

function App() {

  const [selectedLanguage, setSelectedLanguage] =
    useState(
      localStorage.getItem(
        "notice2action-language"
      ) || "en-IN"
    );

  const t =
    UI_TEXT[selectedLanguage] ||
    UI_TEXT["en-IN"];


  const [selectedFocus, setSelectedFocus] =
    useState("general");


  const [selectedFile, setSelectedFile] =
    useState(null);


  const [documentText, setDocumentText] =
    useState("");


  const [actionPlan, setActionPlan] =
    useState("");


  const [loading, setLoading] =
    useState(false);


  const [error, setError] =
    useState("");


  const [messages, setMessages] =
    useState([]);


  const [question, setQuestion] =
    useState("");


  const [chatLoading, setChatLoading] =
    useState(false);


  const [isRecording, setIsRecording] =
    useState(false);


  const [transcribing, setTranscribing] =
    useState(false);


  const [playingAudio, setPlayingAudio] =
    useState(false);


  const [playingMessageId, setPlayingMessageId] =
    useState(null);


  const [history, setHistory] =
    useState(() => {
      try {
        return JSON.parse(
          localStorage.getItem(
            "notice2action-history"
          ) || "[]"
        );
      } catch {
        return [];
      }
    });


  const [showHistory, setShowHistory] =
    useState(false);


  const [audioError, setAudioError] =
    useState("");


  const fileInputRef =
    useRef(null);


  const mediaRecorderRef =
    useRef(null);


  const audioChunksRef =
    useRef([]);


  const audioRef =
    useRef(null);

  // Prevent overlapping TTS requests/audio. Only the latest request may play.
  const speechRequestRef = useRef(0);
  const ttsControllerRef = useRef(null);


  /* =======================================================
     LANGUAGE
  ======================================================= */

  const handleLanguageChange = (language) => {

    setSelectedLanguage(language);

    localStorage.setItem(
      "notice2action-language",
      language
    );

    setAudioError("");
  };


  /* =======================================================
     FILE SELECT
  ======================================================= */

  const handleFileChange = (event) => {

    const file =
      event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);

    setError("");

    setActionPlan("");

    setDocumentText("");

    setMessages([]);

    setAudioError("");
  };


  /* =======================================================
     ANALYZE DOCUMENT
  ======================================================= */

  const analyzeDocument = async () => {

    if (!selectedFile) {

      setError(
        t.noDocument
      );

      return;
    }

    setLoading(true);

    setError("");

    setActionPlan("");

    setMessages([]);

    try {

      const formData =
        new FormData();

      formData.append(
        "file",
        selectedFile
      );

      formData.append(
        "language",
        selectedLanguage
      );

      const response =
        await axios.post(
          `${API}/api/document/analyze`,
          formData,
          {
            timeout: 300000,
          }
        );

      const data =
        response.data;

      setDocumentText(
        data.document_text || ""
      );

      setActionPlan(
        data.action_plan || ""
      );

      setHistory((previous) => [
        {
          id: Date.now(),
          filename:
            selectedFile.name,
          language:
            selectedLanguage,
          actionPlan:
            data.action_plan || "",
          documentText:
            data.document_text || "",
          createdAt:
            new Date().toISOString(),
        },
        ...previous,
      ]);

    } catch (err) {

      console.error(err);

      const status =
        err.response?.status;

      setError(
        err.response?.data?.detail ||
        (status === 504
          ? "Document processing is taking too long. Please try the same PDF again."
          : t.error)
      );

    } finally {

      setLoading(false);
    }
  };


  /* =======================================================
     CHAT
  ======================================================= */

  const sendMessage = async (
    text = question
  ) => {

    const cleanText =
      text.trim();

    if (
      !cleanText ||
      !documentText
    ) {
      return;
    }

    setQuestion("");

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        content: cleanText,
      },
    ]);

    setChatLoading(true);

    try {

      const response =
        await axios.post(
          `${API}/api/chat/`,
          {
            message: cleanText,
            document_context:
              documentText,
            language:
              selectedLanguage,
          }
        );

      setMessages((previous) => [
        ...previous,
        {
          id:
            `assistant-${Date.now()}-${Math.random()
              .toString(36)
              .slice(2)}`,
          role: "assistant",
          content:
            response.data.response,
          language:
            response.data.language ||
            selectedLanguage,
        },
      ]);

    } catch (err) {

      console.error(err);

      setMessages((previous) => [
        ...previous,
        {
          id:
            `assistant-error-${Date.now()}`,
          role: "assistant",
          content:
            t.error,
          language:
            selectedLanguage,
        },
      ]);

    } finally {

      setChatLoading(false);
    }
  };


  /* =======================================================
     STOP AUDIO
  ======================================================= */

  const stopAudio = () => {

    // Invalidate any TTS request that is still waiting for the backend.
    speechRequestRef.current += 1;

    if (ttsControllerRef.current) {
      ttsControllerRef.current.abort();
      ttsControllerRef.current = null;
    }

    if (audioRef.current) {

      audioRef.current.pause();

      audioRef.current.currentTime = 0;

      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current = null;
    }

    setPlayingAudio(false);
    setPlayingMessageId(null);
  };


  /* =======================================================
     TEXT TO SPEECH
  ======================================================= */

  const speakText = async (
    text
  ) => {

    if (!text) return;

    // Stop both the current audio AND any previous pending TTS request.
    stopAudio();

    const requestId =
      speechRequestRef.current;

    const controller =
      new AbortController();

    ttsControllerRef.current =
      controller;

    setAudioError("");
    setPlayingMessageId(null);
    setPlayingAudio(true);

    try {

      const response =
        await axios.post(
          `${API}/api/voice/speak`,
          {
            text,
            language_code:
              selectedLanguage,
          },
          {
            signal: controller.signal,
          }
        );

      // User pressed Stop or started another TTS request.
      if (
        requestId !== speechRequestRef.current
      ) {
        return;
      }

      const base64 =
        response.data.audio;

      const audio =
        new Audio(
          `data:audio/wav;base64,${base64}`
        );

      audioRef.current =
        audio;

      audio.onended = () => {

        if (
          requestId !== speechRequestRef.current
        ) {
          return;
        }

        setPlayingAudio(false);
        audioRef.current = null;
        ttsControllerRef.current = null;
      };

      audio.onerror = () => {

        if (
          requestId !== speechRequestRef.current
        ) {
          return;
        }

        setPlayingAudio(false);
        setAudioError(
          t.couldNotPlayAudio
        );
        audioRef.current = null;
        ttsControllerRef.current = null;
      };

      await audio.play();

    } catch (err) {

      // Abort is expected when Stop is pressed or another TTS starts.
      if (
        err?.code === "ERR_CANCELED" ||
        err?.name === "CanceledError" ||
        err?.name === "AbortError"
      ) {
        return;
      }

      console.error(err);

      if (
        requestId === speechRequestRef.current
      ) {
        setPlayingAudio(false);
        setAudioError(
          t.couldNotPlayAudio
        );
      }
    } finally {

      if (
        requestId === speechRequestRef.current
      ) {
        ttsControllerRef.current = null;
      }
    }
  };


  /* =======================================================
     CHAT MESSAGE TEXT TO SPEECH
  ======================================================= */

  const speakChatMessage = async (
    text,
    messageId,
    languageCode = selectedLanguage
  ) => {

    if (!text) return;

    stopAudio();

    const requestId =
      speechRequestRef.current;

    const controller =
      new AbortController();

    ttsControllerRef.current =
      controller;

    setAudioError("");
    setPlayingMessageId(messageId);

    try {

      const response =
        await axios.post(
          `${API}/api/voice/speak`,
          {
            text,
            language_code:
              languageCode,
          },
          {
            signal: controller.signal,
          }
        );

      if (
        requestId !== speechRequestRef.current
      ) {
        return;
      }

      const base64 =
        response.data.audio;

      const audio =
        new Audio(
          `data:audio/wav;base64,${base64}`
        );

      audioRef.current =
        audio;

      audio.onended = () => {

        if (
          requestId !== speechRequestRef.current
        ) {
          return;
        }

        setPlayingMessageId(null);
        audioRef.current = null;
        ttsControllerRef.current = null;
      };

      audio.onerror = () => {

        if (
          requestId !== speechRequestRef.current
        ) {
          return;
        }

        setPlayingMessageId(null);
        setAudioError(
          t.couldNotPlayAudio
        );
        audioRef.current = null;
        ttsControllerRef.current = null;
      };

      await audio.play();

    } catch (err) {

      if (
        err?.code === "ERR_CANCELED" ||
        err?.name === "CanceledError" ||
        err?.name === "AbortError"
      ) {
        return;
      }

      console.error(err);

      if (
        requestId === speechRequestRef.current
      ) {
        setPlayingMessageId(null);
        setAudioError(
          err.response?.data?.detail ||
          t.couldNotPlayAudio
        );
      }

    } finally {

      if (
        requestId === speechRequestRef.current
      ) {
        ttsControllerRef.current = null;
      }
    }
  };


  /* =======================================================
     RECORDING
  ======================================================= */

  const startRecording = async () => {

    if (!documentText) return;

    try {

      const stream =
        await navigator.mediaDevices.getUserMedia(
          {
            audio: true,
          }
        );

      const recorder =
        new MediaRecorder(
          stream
        );

      mediaRecorderRef.current =
        recorder;

      audioChunksRef.current =
        [];

      recorder.ondataavailable =
        (event) => {

          if (
            event.data.size > 0
          ) {

            audioChunksRef.current.push(
              event.data
            );
          }
        };

      recorder.onstop =
        async () => {

          stream
            .getTracks()
            .forEach(
              (track) =>
                track.stop()
            );

          const blob =
            new Blob(
              audioChunksRef.current,
              {
                type:
                  "audio/webm",
              }
            );

          await transcribeAudio(
            blob
          );
        };

      recorder.start();

      setIsRecording(true);

    } catch (err) {

      console.error(err);

      setError(
        "Microphone permission is required."
      );
    }
  };


  const stopRecording = () => {

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !==
        "inactive"
    ) {

      mediaRecorderRef.current.stop();
    }

    setIsRecording(false);
  };


  /* =======================================================
     SPEECH TO TEXT
  ======================================================= */

  const transcribeAudio = async (
    blob
  ) => {

    setTranscribing(true);

    try {

      const formData =
        new FormData();

      formData.append(
        "file",
        blob,
        "recording.webm"
      );

      const response =
        await axios.post(
          `${API}/api/voice/transcribe`,
          formData
        );

      const transcript =
        response.data.transcript;

      if (transcript?.trim()) {

        setQuestion(
          transcript
        );
      }

    } catch (err) {

      console.error(err);

      setError(
        t.error
      );

    } finally {

      setTranscribing(false);
    }
  };


  /* =======================================================
     QUICK QUESTIONS
  ======================================================= */

  const quickQuestions = [
    t.whyImportant,
    t.whatSkills,
    t.whatNext,
    t.deadline,
  ];


  /* =======================================================
     NEW DOCUMENT
  ======================================================= */

  const newDocument = () => {

    stopAudio();

    setSelectedFile(null);

    setDocumentText("");

    setActionPlan("");

    setMessages([]);

    setQuestion("");

    setError("");

    setAudioError("");

    if (fileInputRef.current) {

      fileInputRef.current.value =
        "";
    }
  };


  /* =======================================================
     LOAD HISTORY
  ======================================================= */

  const loadHistory = (
    item
  ) => {

    stopAudio();

    setSelectedFile(null);

    setDocumentText(
      item.documentText
    );

    setActionPlan(
      item.actionPlan
    );

    const historyLanguage =
      item.language || "en-IN";

    setSelectedLanguage(historyLanguage);

    localStorage.setItem(
      "notice2action-language",
      historyLanguage
    );

    setMessages([]);

    setShowHistory(false);
  };


  useEffect(() => {
    try {
      localStorage.setItem(
        "notice2action-history",
        JSON.stringify(history.slice(0, 20))
      );
    } catch {
      // Ignore localStorage errors.
    }
  }, [history]);


  /* =======================================================
     CLEANUP
  ======================================================= */

  useEffect(() => {

    return () => {

      stopAudio();

      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !==
          "inactive"
      ) {

        mediaRecorderRef.current.stop();
      }
    };

  }, []);


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="app">

      {/* ================================================
          NAVBAR
      ================================================ */}

      <header className="navbar">

        <div className="brand">

          <div className="brand-icon">
            <FileText size={23} />
          </div>

          <div>
            <div className="brand-name">
              Notice2Action
            </div>

            <div className="brand-subtitle">
              {t.subtitle}
            </div>
          </div>

        </div>


        <div className="nav-actions">

          <button
            className="nav-button"
            onClick={() =>
              setShowHistory(true)
            }
          >
            <History size={17} />

            <span>
              {t.history}
            </span>
          </button>


          <button
            className="nav-button"
            onClick={newDocument}
          >
            <RefreshCw size={17} />

            <span>
              {t.newDocument}
            </span>
          </button>


          <select
            value={selectedLanguage}
            onChange={(e) =>
              handleLanguageChange(
                e.target.value
              )
            }
            className="language-select"
            aria-label={t.language}
          >

            {LANGUAGES.map(
              (language) => (

                <option
                  key={
                    language.code
                  }
                  value={
                    language.code
                  }
                >
                  {language.native}
                </option>
              )
            )}

          </select>

        </div>

      </header>


      {/* ================================================
          HISTORY DRAWER
      ================================================ */}

      {showHistory && (

        <div className="history-overlay">

          <div className="history-panel">

            <div className="history-header">

              <div>

                <h2>
                  {t.history}
                </h2>

              </div>

              <button
                className="icon-button"
                onClick={() =>
                  setShowHistory(false)
                }
              >
                <X size={20} />
              </button>

            </div>


            {history.length === 0 ? (

              <div className="empty-history">

                <History
                  size={35}
                />

                <p>
                  {t.noDocument}
                </p>

              </div>

            ) : (

              <div className="history-list">

                {history.map(
                  (item) => (

                    <button
                      key={item.id}
                      className="history-item"
                      onClick={() =>
                        loadHistory(
                          item
                        )
                      }
                    >

                      <FileText
                        size={20}
                      />

                      <div>

                        <strong>
                          {
                            item.filename
                          }
                        </strong>

                        <span>
                          {
                            LANGUAGES.find(
                              (lang) =>
                                lang.code ===
                                item.language
                            )?.native ||
                            "English"
                          }
                        </span>

                      </div>

                    </button>
                  )
                )}

              </div>
            )}

          </div>

        </div>
      )}


      {/* ================================================
          MAIN
      ================================================ */}

      <main className="main">

        {/* ============================================
            HERO
        ============================================ */}

        <section className="hero">

          <div className="powered-pill">

            <Sparkles size={15} />

            {t.poweredBy}

          </div>


          <h1>
            {t.heroTitle}
          </h1>


          <p>
            {t.heroSubtitle}
          </p>

        </section>


        {/* ============================================
            FOCUS
        ============================================ */}

        <section className="card focus-card">

          <h2>
            {t.mattersTitle}
          </h2>

          <p className="section-description">
            {t.mattersSubtitle}
          </p>


          <div className="focus-options">

            <button
              className={
                selectedFocus ===
                "general"
                  ? "focus-option active"
                  : "focus-option"
              }
              onClick={() =>
                setSelectedFocus(
                  "general"
                )
              }
            >
              📄

              <span>
                {t.general}
              </span>
            </button>


            <button
              className={
                selectedFocus ===
                "student"
                  ? "focus-option active"
                  : "focus-option"
              }
              onClick={() =>
                setSelectedFocus(
                  "student"
                )
              }
            >
              <GraduationCap
                size={17}
              />

              <span>
                {t.student}
              </span>
            </button>


            <button
              className={
                selectedFocus ===
                "job"
                  ? "focus-option active"
                  : "focus-option"
              }
              onClick={() =>
                setSelectedFocus(
                  "job"
                )
              }
            >
              <BriefcaseBusiness
                size={17}
              />

              <span>
                {t.jobSeeker}
              </span>
            </button>


            <button
              className={
                selectedFocus ===
                "citizen"
                  ? "focus-option active"
                  : "focus-option"
              }
              onClick={() =>
                setSelectedFocus(
                  "citizen"
                )
              }
            >
              <Landmark
                size={17}
              />

              <span>
                {t.citizen}
              </span>
            </button>

          </div>

        </section>


        {/* ============================================
            UPLOAD
        ============================================ */}

        <section className="card upload-card">

          <div className="upload-icon">
            <Upload size={25} />
          </div>


          {selectedFile ? (

            <div className="selected-file">

              <div className="file-name">
                {selectedFile.name}
              </div>

              <div className="file-type">
                PDF, JPG or PNG
              </div>

            </div>

          ) : (

            <div>

              <h3>
                {t.uploadTitle}
              </h3>

              <p>
                {t.uploadSubtitle}
              </p>

            </div>
          )}


          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={
              handleFileChange
            }
            hidden
          />


          <button
            className="primary-button"
            onClick={() =>
              fileInputRef.current?.click()
            }
          >

            <Upload size={17} />

            {t.chooseDocument}

          </button>


          {selectedFile && (

            <button
              className="analyze-button"
              style={{
                display: "flex",
                width: "min(100%, 340px)",
                margin: "14px auto 0",
              }}
              onClick={
                analyzeDocument
              }
              disabled={loading}
            >

              {loading ? (
                <>
                  <Loader2
                    size={17}
                    className="spin"
                  />

                  {t.analyzing}
                </>
              ) : (
                <>
                  <Sparkles
                    size={17}
                  />

                  {t.actionPlan}
                </>
              )}

            </button>
          )}


          {error && (

            <div className="error-message">

              <AlertCircle
                size={17}
              />

              {error}

            </div>
          )}


          {audioError && (

            <div className="error-message">

              <AlertCircle
                size={17}
              />

              {audioError}

            </div>
          )}

        </section>


        {/* ============================================
            ACTION PLAN
        ============================================ */}

        {actionPlan && (

          <section className="card result-card">

            <div className="result-header">

              <div>

                <div className="result-label">

                  <CheckCircle2
                    size={18}
                  />

                  {t.actionPlan}

                </div>

                <h2>
                  {selectedFile?.name ||
                    t.documentSummary}
                </h2>

              </div>


              {playingAudio ? (

                <button
                  className="stop-button"
                  onClick={
                    stopAudio
                  }
                >

                  <Square
                    size={16}
                    fill="currentColor"
                  />

                  {t.stop}

                </button>

              ) : (

                <button
                  className="speak-button"
                  onClick={() =>
                    speakText(
                      actionPlan
                    )
                  }
                >

                  <Volume2
                    size={17}
                  />

                  {t.speak}

                </button>
              )}

            </div>


            <div className="action-plan-content">

              {actionPlan
                .split("\n")
                .map(
                  (line, index) => {

                    const clean =
                      line.trim();

                    if (!clean) {
                      return (
                        <div
                          key={index}
                          className="space-line"
                        />
                      );
                    }

                    if (
                      /^#{1,6}\\s+/.test(
                        clean
                      )
                    ) {

                      return (
                        <h3
                          key={index}
                        >
                          {clean.replace(
                            /^#{1,6}\\s+/,
                            ""
                          )}
                        </h3>
                      );
                    }

                    if (
                      clean.startsWith(
                        "- "
                      )
                    ) {

                      return (
                        <li
                          key={index}
                        >
                          {clean.replace(
                            "- ",
                            ""
                          )}
                        </li>
                      );
                    }

                    return (
                      <p
                        key={index}
                      >
                        {clean}
                      </p>
                    );
                  }
                )}

            </div>

          </section>
        )}


        {/* ============================================
            CHAT
        ============================================ */}

        {documentText && (

          <section className="card chat-card">

            <div className="chat-header">

              <div>

                <div className="result-label">

                  <MessageCircle
                    size={18}
                  />

                  {t.chatTitle}

                </div>

              </div>

            </div>


            {/* MESSAGES */}

            <div className="messages">

              {messages.map(
                (message, index) => (

                  <div
                    key={index}
                    className={
                      message.role ===
                      "user"
                        ? "message user-message"
                        : "message assistant-message"
                    }
                    style={
                      message.role === "assistant" &&
                      message.id
                        ? {
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "6px",
                          }
                        : undefined
                    }
                  >
                    <div>
                      {message.content}
                    </div>

                    {message.role === "assistant" &&
                      message.id && (
                        <button
                          type="button"
                          onClick={() => {
                            if (
                              playingMessageId ===
                              message.id
                            ) {
                              stopAudio();
                            } else {
                              speakChatMessage(
                                message.content,
                                message.id,
                                message.language ||
                                  selectedLanguage
                              );
                            }
                          }}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            whiteSpace: "nowrap",
                            minWidth: "78px",
                            height: "34px",
                            gap: "6px",
                            marginTop: "2px",
                            padding: "6px 12px",
                            border: "1px solid rgba(15, 23, 42, 0.12)",
                            borderRadius: "8px",
                            background: "rgba(255,255,255,0.9)",
                            color: "#374151",
                            cursor: "pointer",
                            fontSize: "12px",
                            fontWeight: 600,
                            lineHeight: 1,
                          }}
                        >
                          {playingMessageId === message.id ? (
                            <>
                              <Square
                                size={13}
                                fill="currentColor"
                              />
                              {t.stop}
                            </>
                          ) : (
                            <>
                              <Volume2 size={14} />
                              {t.speak}
                            </>
                          )}
                        </button>
                      )}
                  </div>
                )
              )}


              {chatLoading && (

                <div className="message assistant-message">

                  <Loader2
                    size={16}
                    className="spin"
                  />

                  {t.processing}

                </div>
              )}

            </div>


            {/* QUICK QUESTIONS */}

            <div className="quick-questions">

              <div className="quick-title">
                {t.quickQuestions}
              </div>

              <div className="quick-buttons">

                {quickQuestions.map(
                  (item) => (

                    <button
                      key={item}
                      onClick={() =>
                        sendMessage(
                          item
                        )
                      }
                    >
                      {item}
                    </button>
                  )
                )}

              </div>

            </div>


            {/* INPUT */}

            <div className="chat-input-row">

              <input
                value={question}
                onChange={(e) =>
                  setQuestion(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {

                  if (
                    e.key ===
                    "Enter"
                  ) {

                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder={
                  t.chatPlaceholder
                }
              />


              <button
                className={
                  isRecording
                    ? "mic-button recording"
                    : "mic-button"
                }
                onClick={
                  isRecording
                    ? stopRecording
                    : startRecording
                }
                disabled={
                  !documentText ||
                  transcribing
                }
                title={
                  !documentText
                    ? t.noDocument
                    : undefined
                }
              >

                {isRecording ? (

                  <MicOff size={18} />

                ) : (

                  <Mic size={18} />

                )}

              </button>


              <button
                className="send-button"
                onClick={() =>
                  sendMessage()
                }
                disabled={
                  !question.trim() ||
                  chatLoading
                }
              >

                <Send size={18} />

              </button>

            </div>


            {transcribing && (

              <div className="transcribing">

                <Loader2
                  size={15}
                  className="spin"
                />

                {t.processing}

              </div>
            )}

          </section>
        )}

      </main>

    </div>
  );
}


export default App;
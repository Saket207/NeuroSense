"""
NeuroSense Multilingual Clinical Language Registry
=================================================
Data-driven registry for voice prompts, UI captions, ASR hints, and text normalization.
Launch languages: English ('en'), Hindi ('hi'), Kannada ('kn').
Designed for plug-and-play extension to Tamil ('ta'), Telugu ('te'), Malayalam ('ml'),
Bengali ('bn'), and Marathi ('mr').
"""

from typing import Dict, Any, List, Optional
import unicodedata
import re

SUPPORTED_LANGUAGES = {
    "en": {"name": "English", "native": "English", "asr_code": "en"},
    "hi": {"name": "Hindi", "native": "हिन्दी", "asr_code": "hi"},
    "kn": {"name": "Kannada", "native": "ಕನ್ನಡ", "asr_code": "kn"},
    "ta": {"name": "Tamil", "native": "தமிழ்", "asr_code": "ta"},
    "te": {"name": "Telugu", "native": "తెలుగు", "asr_code": "te"},
    "ml": {"name": "Malayalam", "native": "മലയാളം", "asr_code": "ml"},
    "bn": {"name": "Bengali", "native": "বাংলা", "asr_code": "bn"},
    "mr": {"name": "Marathi", "native": "मराठी", "asr_code": "mr"},
}

# Simple spoken conversational prompts (not formal or textbook language)
VOICE_PROMPTS: Dict[str, Dict[str, str]] = {
    "en": {
        "welcome": "Hello. We will do a gentle check of some questions about your life.",
        "hearing_check": "Can you hear my voice clearly?",
        "practice_question": "To practice, please tell me: What is your favourite colour?",
        "start_test": "Thank you. Let us begin with the first question.",
        "take_your_time": "Take your time. Do you want me to repeat the question?",
        "neutral_thanks": "Thank you. Let us move to the next one.",
        "unclear_retry": "I could not hear that clearly. Could you please say that once more?",
        "cued_prefix": "Here is a hint:",
        "recognition_prefix": "Is it:",
        "helper_rule": "Please let the elder answer on their own without helping.",
        "too_noisy": "It is a bit noisy here. Please move to a quieter spot.",
        "test_complete": "All done. Thank you so much for your time and effort today.",
    },
    "hi": {
        "welcome": "नमस्ते। आज हम आपकी ज़िंदगी के बारे में कुछ आसान बातें करेंगे।",
        "hearing_check": "क्या आपको मेरी आवाज़ साफ़ सुनाई दे रही है?",
        "practice_question": "अभ्यास के लिए बताइए: आपका पसंदीदा रंग कौन सा है?",
        "start_test": "धन्यवाद। चलिए अब पहला सवाल पूछते हैं।",
        "take_your_time": "आराम से सोचिए। क्या मैं सवाल दोबारा बोलूँ?",
        "neutral_thanks": "धन्यवाद। अब अगला सवाल सुनते हैं।",
        "unclear_retry": "आवाज़ साफ़ नहीं आई। कृपया एक बार फिर से बोलिए।",
        "cued_prefix": "एक छोटा सा संकेत:",
        "recognition_prefix": "क्या यह है:",
        "helper_rule": "कृपया बड़े-बुजुर्ग को खुद जवाब देने दें, मदद न करें।",
        "too_noisy": "यहाँ थोड़ा शोर है। कृपया किसी शांत कमरे में चलें।",
        "test_complete": "बहुत-बहुत धन्यवाद। आज के सभी सवाल पूरे हो गए हैं।",
    },
    "kn": {
        "welcome": "ನಮಸ್ಕಾರ. ಇಂದು ನಿಮ್ಮ ಜೀವನದ ಕೆಲವು ಸರಳ ವಿಷಯಗಳ ಬಗ್ಗೆ ಮಾತನಾಡೋಣ.",
        "hearing_check": "ನನ್ನ ಧ್ವನಿ ನಿಮಗೆ ಸ್ಪಷ್ಟವಾಗಿ ಕೇಳಿಸುತ್ತಿದೆಯೇ?",
        "practice_question": "ಅಭ್ಯಾಸಕ್ಕಾಗಿ ಹೇಳಿ: ನಿಮಗೆ ಇಷ್ಟವಾದ ಬಣ್ಣ ಯಾವುದು?",
        "start_test": "ಧನ್ಯವಾದಗಳು. ಈಗ ಮೊದಲ ಪ್ರಶ್ನೆಗೆ ಹೋಗೋಣ.",
        "take_your_time": "ನಿಧಾನವಾಗಿ ಯೋಚಿಸಿ ಹೇಳಿ. ಪ್ರಶ್ನೆಯನ್ನು ಮತ್ತೆ ಹೇಳಲೇ?",
        "neutral_thanks": "ಧನ್ಯವಾದಗಳು. ಮುಂದಿನ ಪ್ರಶ್ನೆಗೆ ಹೋಗೋಣ.",
        "unclear_retry": "ಧ್ವನಿ ಸ್ಪಷ್ಟವಾಗಿ ಕೇಳಿಸಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಇನ್ನೊಮ್ಮೆ ಹೇಳಿ.",
        "cued_prefix": "ಒಂದು ಸಣ್ಣ ಸುಳಿವು:",
        "recognition_prefix": "ಇವುಗಳಲ್ಲಿ ಯಾವುದಿರಬಹುದು:",
        "helper_rule": "ದಯವಿಟ್ಟು ಹಿರಿಯರಿಗೆ ತಾವಾಗಿಯೇ ಉತ್ತರಿಸಲು ಬಿಡಿ, ಸುಳಿವು ಕೊಡಬೇಡಿ.",
        "too_noisy": "ಇಲ್ಲಿ ಗದ್ದಲವಿದೆ. ದಯವಿಟ್ಟು ಶಾಂತವಾದ ಜಾಗಕ್ಕೆ ಹೋಗಿ.",
        "test_complete": "ತುಂಬಾ ಧನ್ಯವಾದಗಳು. ಇಂದಿನ ಪರೀಕ್ಷೆ ಪೂರ್ಣಗೊಂಡಿದೆ.",
    },
}

# Number words mapping to digits for robust numeric matching
NUMBER_WORDS: Dict[str, Dict[str, int]] = {
    "en": {
        "zero": 0, "one": 1, "two": 2, "three": 3, "four": 4, "five": 5,
        "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10,
        "eleven": 11, "twelve": 12, "thirteen": 13, "fourteen": 14, "fifteen": 15,
        "sixteen": 16, "seventeen": 17, "eighteen": 18, "nineteen": 19, "twenty": 20,
        "thirty": 30, "forty": 40, "fifty": 50, "sixty": 60, "seventy": 70,
        "eighty": 80, "ninety": 90, "hundred": 100, "thousand": 1000,
    },
    "hi": {
        "शून्य": 0, "एक": 1, "दो": 2, "तीन": 3, "चार": 4, "पांच": 5, "पाँच": 5,
        "छह": 6, "सात": 7, "आठ": 8, "नौ": 9, "दस": 10,
        "ग्यारह": 11, "बारह": 12, "तेरह": 13, "चौदह": 14, "पंद्रह": 15,
        "सोलह": 16, "सत्रह": 17, "अठारह": 18, "उन्नीस": 19, "बीस": 20,
        "इक्कीस": 21, "बाईस": 22, "तेईस": 23, "चौबीस": 24, "पच्चीस": 25,
        "छब्बीस": 26, "सत्ताईस": 27, "अट्ठाईस": 28, "उनतीस": 29, "तीस": 30,
        "इकतीस": 31, "बत्तीस": 32, "तैंतीस": 33, "चौंतीस": 34, "पैंतीस": 35,
        "छत्तीस": 36, "सैंतीस": 37, "अड़तीस": 38, "उनतालीस": 39, "चालीस": 40,
        "इकतालीस": 41, "बयालीस": 42, "तैंतालीस": 43, "चवालीस": 44, "पैंतालीस": 45,
        "छियालीस": 46, "सैंतालीस": 47, "अड़तालीस": 48, "उनचास": 49, "पचास": 50,
        "इक्यावन": 51, "बावन": 52, "तिरेपन": 53, "चौवन": 54, "पचपन": 55,
        "छप्पन": 56, "सत्तावन": 57, "अट्ठावन": 58, "उनसठ": 59, "साठ": 60,
        "इकसठ": 61, "बासठ": 62, "तिरसठ": 63, "चौंसठ": 64, "पैंसठ": 65,
        "छियासठ": 66, "सरसठ": 67, "अड़सठ": 68, "उनहत्तर": 69, "सत्तर": 70,
        "इकहत्तर": 71, "बहत्तर": 72, "तिहत्तर": 73, "चौहत्तर": 74, "पचहत्तर": 75,
        "छिहत्तर": 76, "सतहत्तर": 77, "अठहत्तर": 78, "उन्नासी": 79, "अस्सी": 80,
        "इक्यासी": 81, "बयासी": 82, "तिरासी": 83, "चौरासी": 84, "पचासी": 85,
        "छियासी": 86, "सत्तासी": 87, "अट्ठासी": 88, "नवासी": 89, "नब्बे": 90,
        "इक्यानवे": 91, "बानवे": 92, "तिरानवे": 93, "चौरानवे": 94, "पिचानवे": 95,
        "छियानवे": 96, "सत्तानवे": 97, "अट्ठानवे": 98, "निन्यानवे": 99, "सौ": 100, "हज़ार": 1000,
    },
    "kn": {
        "ಸೊನ್ನೆ": 0, "ಒಂದು": 1, "ಎರಡು": 2, "ಮೂರು": 3, "ನಾಲ್ಕು": 4, "ಐದು": 5,
        "ಆರು": 6, "ಏಳು": 7, "ಎಂಟು": 8, "ಒಂಬತ್ತು": 9, "ಹತ್ತು": 10,
        "ಹನ್ನೊಂದು": 11, "ಹನ್ನೆರಡು": 12, "ಹದಿಮೂರು": 13, "ಹದಿನಾಲ್ಕು": 14, "ಹದಿನೈದು": 15,
        "ಹದಿನಾರು": 16, "ಹದಿನೇಳು": 17, "ಹದಿನೆಂಟು": 18, "ಹತ್ತೊಂಬತ್ತು": 19, "ಇಪ್ಪತ್ತು": 20,
        "ಮೂವತ್ತು": 30, "ನಲವತ್ತು": 40, "ಐವತ್ತು": 50, "ಅರವತ್ತು": 60, "ಎಪ್ಪತ್ತು": 70,
        "ಎಂಬತ್ತು": 80, "ತೊಂಬತ್ತು": 90, "ನೂರು": 100, "ಸಾವಿರ": 1000,
    },
}

def get_voice_prompt(lang: str, key: str) -> str:
    """Returns spoken voice prompt for language code with safe English fallback."""
    table = VOICE_PROMPTS.get(lang, VOICE_PROMPTS["en"])
    return table.get(key, VOICE_PROMPTS["en"].get(key, ""))

def get_asr_code(lang: str) -> str:
    """Returns ISO ASR code for Whisper or speech engine."""
    info = SUPPORTED_LANGUAGES.get(lang, SUPPORTED_LANGUAGES["en"])
    return info["asr_code"]

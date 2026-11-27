/**
 * NeuroSense Frontend Language Registry
 * =====================================
 * Launch Languages: English ('en'), Hindi ('hi'), Kannada ('kn')
 * Extensible to Tamil, Telugu, Malayalam, Bengali, Marathi.
 */

export type SupportedLang = "en" | "hi" | "kn" | "ta" | "te" | "ml" | "bn" | "mr"

export interface LanguageMeta {
  code: SupportedLang
  name: string
  nativeName: string
  asrCode: string
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: "en", name: "English", nativeName: "English", asrCode: "en" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", asrCode: "hi" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", asrCode: "kn" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", asrCode: "ta" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", asrCode: "te" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", asrCode: "ml" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", asrCode: "bn" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", asrCode: "mr" },
]

export const UI_STRINGS: Record<string, Record<string, string>> = {
  en: {
    appTitle: "Family Life Memory Check",
    clinicalSubtitle: "Personalized Autobiographical Screening Aid",
    startScreening: "Start Memory Check",
    repeatQuestion: "Repeat Question",
    listening: "Listening...",
    takeYourTime: "Take your time. Do you want me to repeat?",
    nextQuestion: "Next Question",
    hearingCheckTitle: "Can you hear clearly?",
    hearingCheckYes: "Yes, I can hear",
    hearingCheckNo: "No, speak louder",
    tooNoisyTitle: "Room is noisy",
    tooNoisyMsg: "Please move to a quieter room for best results.",
    practiceTitle: "Practice Question (Not Scored)",
    practiceQuestion:
      "To practice, please tell me: What is your favourite colour?",
    helperRuleTitle: "Rule for Family / Helper",
    helperRuleDesc:
      "Please do not give hints or answer for the elder. Let them respond in their own words.",
    disclaimer:
      "This is a screening aid, not a diagnosis. Only a doctor can diagnose. Many factors such as tiredness, hearing loss, low mood, or medication can affect results.",
    inconclusive: "Inconclusive: Please re-test in better conditions",
    greenLabel: "No concerning signs found in this screening",
    amberLabel: "Signs worth a clinical check",
    redLabel: "Suggest seeing a doctor soon",
    test_complete:
      "Screening completed successfully. Review your personalized cognitive score and memory analysis below.",
    testCompleteTitle: "Life Memory Check Completed!",
    viewDetailedAnalysis: "View Detailed Clinical Trends & Report",
    returnHome: "Return to Home",
    retakeTest: "Retake Memory Check",
  },
  hi: {
    appTitle: "पारिवारिक जीवन स्मृति जाँच",
    clinicalSubtitle: "व्यक्तिगत जीवन अनुभव आधारित स्क्रीनिंग सहायता",
    startScreening: "जाँच शुरू करें",
    repeatQuestion: "सवाल दोबारा सुनें",
    listening: "सुन रहे हैं...",
    takeYourTime: "आराम से सोचिए। क्या सवाल दोहराएँ?",
    nextQuestion: "अगला सवाल",
    hearingCheckTitle: "क्या आवाज़ साफ़ सुनाई दे रही है?",
    hearingCheckYes: "हाँ, साफ़ सुनाई दे रही है",
    hearingCheckNo: "नहीं, थोड़ा तेज़ बोलिए",
    tooNoisyTitle: "कमरे में शोर है",
    tooNoisyMsg: "सटीक परिणाम के लिए कृपया किसी शांत जगह पर बैठें।",
    practiceTitle: "अभ्यास सवाल (इसके अंक नहीं हैं)",
    practiceQuestion: "अभ्यास के लिए बताइए: आपका पसंदीदा रंग कौन सा है?",
    helperRuleTitle: "सहायक व परिवार के लिए नियम",
    helperRuleDesc: "कृपया बड़े-बुजुर्ग को कोई संकेत न दें। उन्हें अपने शब्दों में खुद जवाब देने दें।",
    disclaimer:
      "यह केवल एक स्क्रीनिंग सहायता है, चिकित्सीय निदान नहीं। केवल एक योग्य डॉक्टर ही निदान कर सकता है। थकान, सुनने में कमी, उदासी या दवाइयों का असर भी परिणामों पर पड़ सकता है।",
    inconclusive: "अपूर्ण जाँच: कृपया बेहतर व शांत माहौल में दोबारा जाँच करें",
    greenLabel: "इस जाँच में कोई चिंताजनक संकेत नहीं दिखे",
    amberLabel: "कुछ लक्षण जिन पर डॉक्टर से परामर्श लेना उचित होगा",
    redLabel: "जल्द डॉक्टर से चिकित्सीय जाँच कराने की सलाह दी जाती है",
    test_complete:
      "स्मृति जाँच सफलतापूर्वक पूरी हो गई है। नीचे अपना व्यक्तिगत स्कोर और विश्लेषण देखें।",
    testCompleteTitle: "जीवन स्मृति जाँच पूर्ण!",
    viewDetailedAnalysis: "विस्तृत क्लिनिकल रिपोर्ट व रुझान देखें",
    returnHome: "होमपेज पर वापस जाएँ",
    retakeTest: "जाँच दोबारा शुरू करें",
  },
  kn: {
    appTitle: "ಕುಟುಂಬ ಜೀವನ ಸ್ಮೃತಿ ಪರೀಕ್ಷೆ",
    clinicalSubtitle: "ವೈಯಕ್ತಿಕ ಜೀವನ ಅನುಭವ ಆಧಾರಿತ ಪ್ರಾಥಮಿಕ ತಪಾಸಣೆ",
    startScreening: "ಪರೀಕ್ಷೆ ಪ್ರಾರಂಭಿಸಿ",
    repeatQuestion: "ಪ್ರಶ್ನೆ ಮತ್ತೆ ಹೇಳಿ",
    listening: "ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇವೆ...",
    takeYourTime: "ನಿಧಾನವಾಗಿ ಯೋಚಿಸಿ. ಪ್ರಶ್ನೆ ಮತ್ತೆ ಹೇಳಲೇ?",
    nextQuestion: "ಮುಂದಿನ ಪ್ರಶ್ನೆ",
    hearingCheckTitle: "ಧ್ವನಿ ಸ್ಪಷ್ಟವಾಗಿ ಕೇಳಿಸುತ್ತಿದೆಯೇ?",
    hearingCheckYes: "ಹೌದು, ಕೇಳಿಸುತ್ತಿದೆ",
    hearingCheckNo: "ಇಲ್ಲ, ಸ್ವಲ್ಪ ಜೋರಾಗಿ ಹೇಳಿ",
    tooNoisyTitle: "ಕೋಣೆಯಲ್ಲಿ ಗದ್ದಲವಿದೆ",
    tooNoisyMsg: "ಉತ್ತಮ ಫಲಿತಾಂಶಕ್ಕಾಗಿ ದಯವಿಟ್ಟು ಶಾಂತವಾದ ಸ್ಥಳಕ್ಕೆ ಹೋಗಿ.",
    practiceTitle: "ಅಭ್ಯಾಸ ಪ್ರಶ್ನೆ (ಅಂಕಗಳಿಲ್ಲ)",
    practiceQuestion: "ಅಭ್ಯಾಸಕ್ಕಾಗಿ ಹೇಳಿ: ನಿಮಗೆ ಇಷ್ಟವಾದ ಬಣ್ಣ ಯಾವುದು?",
    helperRuleTitle: "ಕುಟುಂಬಸ್ಥರಿಗೆ ಪ್ರಮುಖ ಸೂಚನೆ",
    helperRuleDesc: "ದಯವಿಟ್ಟು ಹಿರಿಯರಿಗೆ ಉತ್ತರ ಹೇಳಿಕೊಡಬೇಡಿ. ಅವರೇ ತಮ್ಮ ಮಾತಿನಲ್ಲಿ ಉತ್ತರಿಸಲಿ.",
    disclaimer:
      "ಇದು ಕೇವಲ ಪ್ರಾಥಮಿಕ ತಪಾಸಣಾ ಸಹಾಯಕ, ರೋಗನಿರ್ಣಯವಲ್ಲ. ಕೇವಲ ವೈದ್ಯರು ಮಾತ್ರ ರೋಗನಿರ್ಣಯ ಮಾಡಬಹುದು. ಆಯಾಸ, ಶ್ರವಣದೋಷ ಅಥವಾ ಔಷಧಗಳು ಫಲಿತಾಂಶದ ಮೇಲೆ ಪ್ರಭಾವ ಬೀರಬಹುದು.",
    inconclusive: "ಅಪೂರ್ಣ: ದಯವಿಟ್ಟು ಶಾಂತ ವಾತಾವರಣದಲ್ಲಿ ಪುನಃ ಪರೀಕ್ಷಿಸಿ",
    greenLabel: "ಈ ತಪಾಸಣೆಯಲ್ಲಿ ಯಾವುದೇ ಆತಂಕಕಾರಿ ಲಕ್ಷಣ ಕಂಡುಬಂದಿಲ್ಲ",
    amberLabel: "ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಲು ಪರಿಗಣಿಸಬಹುದಾದ ಲಕ್ಷಣಗಳು",
    redLabel: "ಶೀಘ್ರದಲ್ಲೇ ವೈದ್ಯರಿಂದ ತಪಾಸಣೆ ಮಾಡಿಸಿಕೊಳ್ಳಲು ಸಲಹೆ ನೀಡಲಾಗುತ್ತದೆ",
    test_complete:
      "ಸ್ಮೃತಿ ತಪಾಸಣೆ ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಂಡಿದೆ. ನಿಮ್ಮ ಅಂಕಗಳು ಮತ್ತು ವಿವರವಾದ ವಿಶ್ಲೇಷಣೆಯನ್ನು ಕೆಳಗೆ ಪರಿಶೀಲಿಸಿ.",
    testCompleteTitle: "ಜೀವನ ಸ್ಮೃತಿ ತಪಾಸಣೆ ಪೂರ್ಣಗೊಂಡಿದೆ!",
    viewDetailedAnalysis: "ವಿವರವಾದ ಕ್ಲಿನಿಕಲ್ ವರದಿ ಮತ್ತು ಪ್ರವೃತ್ತಿಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    returnHome: "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",
    retakeTest: "ತಪಾಸಣೆಯನ್ನು ಪುನರಾವರ್ತಿಸಿ",
  },
}

export function getUIText(lang: SupportedLang, key: string): string {
  const table = UI_STRINGS[lang] || UI_STRINGS.en
  return table[key] || UI_STRINGS.en[key] || key
}

export function getUIString(lang: string, key: string): string {
  return getUIText((lang || "en") as SupportedLang, key)
}

export function getVoicePrompt(lang: string, key: string): string {
  return getUIText((lang || "en") as SupportedLang, key)
}

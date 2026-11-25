export type HomepageLang = "en" | "hi" | "kn"

export interface HomepageTranslations {
  // Nav
  navHow: string
  navWhy: string
  navLanguages: string
  navWorkers: string
  navFaq: string
  navCta: string

  // Hero
  heroBadge: string
  heroTitle: string
  heroSub: string
  heroCta1: string
  heroCta2: string
  heroDisclaimer: string
  heroRecalledBadge: string
  heroFactLabel: string
  heroFactValue: string
  heroVoiceQuery: string
  heroElderSpeech: string

  // Problem
  problemTitle: string
  problemSub: string
  problemCard1Title: string
  problemCard1Desc: string
  problemCard2Title: string
  problemCard2Desc: string
  problemCard3Title: string
  problemCard3Desc: string
  problemCard4Title: string
  problemCard4Desc: string

  // How it works
  howTitle: string
  howSub: string
  howStep1Title: string
  howStep1Desc: string
  howStep2Title: string
  howStep2Desc: string
  howStep3Title: string
  howStep3Desc: string
  howStep4Title: string
  howStep4Desc: string

  // Life Memory Check (Differentiator)
  lifeTitle: string
  lifeSub: string
  lifeBadge: string
  lifeWhy1Title: string
  lifeWhy1Desc: string
  lifeWhy2Title: string
  lifeWhy2Desc: string
  lifeWhy3Title: string
  lifeWhy3Desc: string
  lifeFact1: string
  lifeFact2: string
  lifeFact3: string
  lifeFreeRecall: string
  lifeCue: string
  lifeRecognition: string
  lifeRecalled: string
  lifeCueNeeded: string

  // Languages
  langTitle: string
  langSub: string
  langMore: string
  langVoiceFirst: string
  langVoiceFirstDesc: string
  langGreetingEn: string
  langGreetingHi: string
  langGreetingKn: string

  // Audience (ASHA & Families)
  audTitle: string
  audSub: string
  audWorkersTitle: string
  audWorker1: string
  audWorker2: string
  audWorker3: string
  audFamiliesTitle: string
  audFamily1: string
  audFamily2: string
  audFamily3: string

  // Sample Report
  reportTitle: string
  reportSub: string
  reportLabel: string
  reportPatientName: string
  reportPatientMeta: string
  reportOverallStatus: string
  reportConfidence: string
  reportConfidenceHigh: string
  reportMemoryScore: string
  reportFluencyScore: string
  reportCadenceScore: string
  reportSummaryText: string
  reportInconclusiveNote: string
  reportDisclaimer: string

  // Privacy
  privTitle: string
  privSub: string
  privConsentTitle: string
  privConsentDesc: string
  privMinimalTitle: string
  privMinimalDesc: string
  privDeleteTitle: string
  privDeleteDesc: string
  privNoDiagnosisTitle: string
  privNoDiagnosisDesc: string

  // FAQ
  faqTitle: string
  faqSub: string
  faq1Q: string
  faq1A: string
  faq2Q: string
  faq2A: string
  faq3Q: string
  faq3A: string
  faq4Q: string
  faq4A: string
  faq5Q: string
  faq5A: string
  faq6Q: string
  faq6A: string

  // CTA
  ctaTitle: string
  ctaSub: string
  ctaButton: string

  // Footer
  footerTagline: string
  footerDisclaimer: string
  footerRights: string
}

const en: HomepageTranslations = {
  // Nav
  navHow: "How it works",
  navWhy: "Why it is different",
  navLanguages: "Languages",
  navWorkers: "For health workers",
  navFaq: "FAQ",
  navCta: "Start screening",

  // Hero
  heroBadge: "Screening aid, not a diagnosis",
  heroTitle: "Spot memory changes early, kindly, in your own language",
  heroSub:
    "A simple, voice-first cognitive screening tool designed for families and community health workers in India. No reading or writing needed. Family records real life facts, the elder speaks naturally, and together you get a clear, explainable baseline.",
  heroCta1: "Start a screening",
  heroCta2: "See how it works",
  heroDisclaimer:
    "This is a screening aid, not a diagnosis. Only a qualified doctor can diagnose cognitive conditions.",
  heroRecalledBadge: "Verified Recalled",
  heroFactLabel: "Life Fact (Grandchild)",
  heroFactValue: "Aarav (lives in Bengaluru)",
  heroVoiceQuery: "Who came to visit you last Sunday with sweets?",
  heroElderSpeech:
    "Aarav came from Bengaluru! He brought my favourite kaju katli.",

  // Problem
  problemTitle: "Why early cognitive signs are missed across India",
  problemSub:
    "Millions of families notice small memory slips but lack simple, accessible ways to verify them before decline progresses.",
  problemCard1Title: "Dismissed as normal ageing",
  problemCard1Desc:
    "Families often think forgetfulness is just a part of growing older, delaying medical attention until daily independence is affected.",
  problemCard2Title: "Specialists are far away",
  problemCard2Desc:
    "Rural and semi-urban communities often lack neurologists, geriatricians, and specialized memory clinics within reachable distance.",
  problemCard3Title: "Standard tests require literacy",
  problemCard3Desc:
    "Traditional pen-and-paper tests require schooling, clock-drawing, and arithmetic, making them unfair for non-literate elders.",
  problemCard4Title: "Language & cultural bias",
  problemCard4Desc:
    "Generic Western questionnaires do not reflect Indian family structures, native languages, or regional cultural contexts.",

  // How it works
  howTitle: "How NeuroSense works",
  howSub:
    "A 4-step compassionate journey that takes less than five minutes, requiring no literacy or clinical training.",
  howStep1Title: "1. Family records verified facts",
  howStep1Desc:
    "A caregiver or ASHA worker enters meaningful facts about the elder's life: native village, children, recent visits, and festivals.",
  howStep2Title: "2. Elder speaks naturally",
  howStep2Desc:
    "The app asks friendly, conversational questions by voice in their mother tongue. The elder answers naturally without stress.",
  howStep3Title: "3. Three-stage gentle retrieval",
  howStep3Desc:
    "If free recall is missed, the app offers a polite conversational cue, then recognition choices, testing retrieval depth with care.",
  howStep4Title: "4. Clear, doctor-ready report",
  howStep4Desc:
    "Combines the life memory check, voice cadence, and family observation into an explainable summary ready for clinical consultation.",

  // Life Memory Check
  lifeTitle: "The Hero Feature: Family-Verified Life Memory Check",
  lifeSub:
    "Why ask generic textbook questions when you can test personally meaningful recall from their own life?",
  lifeBadge: "Differentiating Innovation",
  lifeWhy1Title: "Removes education bias",
  lifeWhy1Desc:
    "An elder does not need schooling or arithmetic to remember their native village or favourite grandchild.",
  lifeWhy2Title: "Sensitive to recent events",
  lifeWhy2Desc:
    "Early Alzheimer's affects recent episodic memories first. Asking about last week's family visit catches subtle early shifts.",
  lifeWhy3Title: "Provides concrete evidence",
  lifeWhy3Desc:
    "Gives doctors specific, objective observations ('could not recall daughter's wedding town') instead of vague family worries.",
  lifeFact1: "Grandchild's name",
  lifeFact2: "Native village",
  lifeFact3: "Last Sunday's visitor",
  lifeFreeRecall: "Free Recall (Unassisted)",
  lifeCue: "Gentle Cue (Context hint)",
  lifeRecognition: "Recognition Choice",
  lifeRecalled: "Recalled with full accuracy",
  lifeCueNeeded: "Needed gentle cue, then recalled",

  // Languages
  langTitle: "Built for every voice across India",
  langSub:
    "Cognitive health is universal. Everyone deserves screening in the mother tongue they grew up speaking.",
  langMore:
    "Marathi, Bengali, Tamil, and Telugu arriving in upcoming release updates.",
  langVoiceFirst: "100% Voice-First Experience",
  langVoiceFirstDesc:
    "Elders never have to read text on glass or press tiny buttons. They just listen and talk back naturally.",
  langGreetingEn: "Hello! How was your morning walk today?",
  langGreetingHi: "नमस्ते! आज सुबह का नाश्ता कैसा रहा?",
  langGreetingKn: "ನಮಸ್ಕಾರ! ಇವತ್ತಿನ ದಿನ ಹೇಗಿತ್ತು?",

  // Audience
  audTitle: "Designed for both frontlines and homes",
  audSub:
    "Whether deployed by an ASHA worker in a village or used by a son or daughter at home, NeuroSense fits right in.",
  audWorkersTitle: "For ASHA & Community Health Workers",
  audWorker1: "Rapid 3-5 minute voice screening requiring no pen or paper.",
  audWorker2: "Repeatable on monthly visits to establish personal baselines.",
  audWorker3:
    "Generates standardized ABDM-ready referral summaries for PHC doctors.",
  audFamiliesTitle: "For Family Caregivers",
  audFamily1:
    "Peace of mind without putting your loved one through a stressful exam.",
  audFamily2: "Objective observations you can bring to your family physician.",
  audFamily3:
    "Tracks subtle memory and voice stability trends over weeks and months.",

  // Sample Report
  reportTitle: "Explainable results families and doctors can trust",
  reportSub:
    "No black-box mystery numbers. Every score explains exactly which recall stages were successful and what factors were considered.",
  reportLabel: "SAMPLE SCREENING REPORT (FICTIONAL PERSON)",
  reportPatientName: "Lakshmi Devi, Age 74",
  reportPatientMeta: "Language: Kannada | Informant: Daughter (Pooja)",
  reportOverallStatus: "Signs worth a clinical check",
  reportConfidence: "Screening Confidence",
  reportConfidenceHigh: "High (Clean audio, complete answers)",
  reportMemoryScore: "Personal Recall: 7 / 10 facts (2 cued)",
  reportFluencyScore: "Speech Fluency: 88 wpm (Normal cadence)",
  reportCadenceScore: "Pause Latency: 1.8s (Mild hesitation on recent facts)",
  reportSummaryText:
    "Remote episodic memories (wedding, hometown) intact. Recent episodic events (Sunday visitor, morning medication) showed retrieval delays responsive to cues. Clinical evaluation recommended.",
  reportInconclusiveNote:
    "Honest uncertainty: if background noise or speech volume makes acoustic analysis unreliable, the engine flags 'Inconclusive — Please re-test' rather than guessing.",
  reportDisclaimer:
    "This screening aid is not a medical diagnosis. Only a qualified medical doctor can diagnose cognitive conditions.",

  // Privacy
  privTitle: "Built with privacy, consent, and clinical ethics",
  privSub:
    "Health data is deeply personal. We treat every voice sample with strict data ethics and transparent consent.",
  privConsentTitle: "Explicit, informed consent",
  privConsentDesc:
    "We ask for explicit permission before every audio session starts. Family members can review questions beforehand.",
  privMinimalTitle: "Minimal data collection",
  privMinimalDesc:
    "We only collect speech features and verified facts necessary for cognitive screening. No unnecessary personal tracking.",
  privDeleteTitle: "Permanent deletion anytime",
  privDeleteDesc:
    "Caregivers can erase any recorded screening session or family fact profile permanently with a single tap.",
  privNoDiagnosisTitle: "Strict clinical boundary",
  privNoDiagnosisDesc:
    "We never claim to diagnose or label anyone. Results are phrased responsibly as screening flags for medical consultation.",

  // FAQ
  faqTitle: "Frequently asked questions",
  faqSub:
    "Straightforward answers to the questions families and healthcare workers ask most.",
  faq1Q: "Is NeuroSense a medical diagnosis?",
  faq1A:
    "No, absolutely not. NeuroSense is a preliminary screening and referral-support tool. It identifies patterns that may be worth a doctor's attention. Only a qualified medical professional (such as a neurologist or psychiatrist) can diagnose dementia or cognitive conditions.",
  faq2Q: "Who is NeuroSense intended for?",
  faq2A:
    "It is built for elderly individuals (typically 60+), operated by a caring family member at home or by a community healthcare worker (such as an ASHA or ANM worker) in clinic or home visits.",
  faq3Q: "Which languages are supported right now?",
  faq3A:
    "English, Hindi (हिन्दी), and Kannada (ಕನ್ನಡ) are supported at launch for voice questions, speech recognition, and matching, with Marathi, Bengali, Tamil, and Telugu designed into the pipeline.",
  faq4Q: "Does the voice check require an internet connection?",
  faq4A:
    "Yes. The speech recognition (Faster-Whisper) and quantum-hybrid screening pipeline run on our secure backend server, requiring an active internet connection to process audio and generate the report.",
  faq5Q: "How are voice recordings and family facts used?",
  faq5A:
    "Voice recordings are processed solely to measure acoustic speech features (tempo, pauses, pitch variation) and transcribe responses to match against the verified facts you entered. They are never shared, sold, or used for commercial advertising.",
  faq6Q:
    "What should a family do if results show 'Signs worth a clinical check'?",
  faq6A:
    "Do not panic. Many temporary and reversible factors—including vitamin B12 deficiency, thyroid imbalance, poor sleep, medication side-effects, or mood changes—can cause memory slips. Download the clinical PDF summary and schedule an evaluation with a physician or neurologist.",

  // CTA
  ctaTitle: "Check on the memory and well-being of someone you love today",
  ctaSub:
    "Takes less than five minutes. Requires no paperwork. Gives your family a clear, compassionate baseline.",
  ctaButton: "Start a free screening",

  // Footer
  footerTagline:
    "Compassionate, voice-first cognitive screening for India's elderly.",
  footerDisclaimer:
    "NeuroSense is a screening aid, not a diagnostic tool. Only a qualified medical professional can diagnose cognitive conditions. Many factors such as fatigue, hearing difficulty, mood, or medication can affect results.",
  footerRights: "© 2026 NeuroSense. Open-access healthcare initiative.",
}

const hi: HomepageTranslations = {
  // Nav
  navHow: "यह कैसे काम करता है",
  navWhy: "यह अलग क्यों है",
  navLanguages: "भाषाएं",
  navWorkers: "स्वास्थ्य कर्मियों के लिए",
  navFaq: "अक्सर पूछे जाने वाले सवाल",
  navCta: "जांच शुरू करें",

  // Hero
  heroBadge: "शुरुआती जांच सहायक, चिकित्सीय निदान नहीं",
  heroTitle: "याद से जुड़ी चिंताओं को जल्दी पहचानें, अपनी भाषा में",
  heroSub:
    "भारत के बुजुर्गों और परिवारों के लिए आवाज़ पर आधारित सरल जांच साधन। पढ़ना या लिखना बिल्कुल ज़रूरी नहीं। परिवार अपने जीवन की सच्ची बातें दर्ज करता है, बुजुर्ग सहजता से बोलते हैं, और आपको मिलता है एक स्पष्ट और भरोसेमंद आधार।",
  heroCta1: "जांच शुरू करें",
  heroCta2: "देखें यह कैसे काम करता है",
  heroDisclaimer:
    "यह एक प्रारंभिक जांच साधन है, कोई डॉक्टरी निदान नहीं। केवल योग्य डॉक्टर ही निदान कर सकते हैं।",
  heroRecalledBadge: "सत्यापित याद",
  heroFactLabel: "जीवन की बात (पोता)",
  heroFactValue: "आरव (बेंगलुरु में रहता है)",
  heroVoiceQuery: "पिछले रविवार आपसे मिलने कौन आया था?",
  heroElderSpeech: "आरव आया था बेंगलुरु से! मेरी पसंदीदा काजू कतली लाया था।",

  // Problem
  problemTitle: "भारत में शुरुआती संज्ञानात्मक बदलाव क्यों छूट जाते हैं?",
  problemSub:
    "लाखों परिवार शुरुआती भूलने की आदत देखते हैं, लेकिन डॉक्टर के पास जाने से पहले सरल जांच का कोई साधन नहीं होता।",
  problemCard1Title: "बुढ़ापे का सामान्य हिस्सा मान लेना",
  problemCard1Desc:
    "परिवार अक्सर सोचते हैं कि भूलना बढ़ती उम्र का सामान्य हिस्सा है, जिससे सही समय पर डॉक्टर से मिलने में देरी हो जाती है।",
  problemCard2Title: "विशेषज्ञ डॉक्टर बहुत दूर हैं",
  problemCard2Desc:
    "ग्रामीण और छोटे शहरों में न्यूरोलॉजिस्ट और स्मृति क्लिनिक आसानी से उपलब्ध नहीं होते।",
  problemCard3Title: "पारंपरिक टेस्ट में पढ़ना-लिखना जरूरी",
  problemCard3Desc:
    "पुराने कागजी टेस्ट में लिखना, चित्र बनाना और गणित करना पड़ता है, जो कम पढ़े-लिखे बुजुर्गों के लिए कठिन है।",
  problemCard4Title: "भाषा और संस्कृति की बाधा",
  problemCard4Desc:
    "विदेशी प्रश्नावली भारतीय पारिवारिक परिवेश और क्षेत्रीय भाषाओं के अनुकूल नहीं होतीं।",

  // How it works
  howTitle: "NeuroSense कैसे काम करता है",
  howSub:
    "4 सरल और सम्मानजनक चरण जो पांच मिनट से कम समय लेते हैं। किसी डॉक्टरी प्रशिक्षण की आवश्यकता नहीं।",
  howStep1Title: "1. परिवार सच्ची बातें दर्ज करता है",
  howStep1Desc:
    "परिवार का सदस्य बुजुर्ग के जीवन से जुड़ी बातें दर्ज करता है: पैतृक गांव, बच्चे, हाल के मेहमान और पसंदीदा त्योहार।",
  howStep2Title: "2. बुजुर्ग स्वाभाविक रूप से बोलते हैं",
  howStep2Desc:
    "ऐप उनकी मातृभाषा में आवाज़ के ज़रिए दोस्ताना बातचीत करता है। बुजुर्ग बिना किसी तनाव के जवाब देते हैं।",
  howStep3Title: "3. तीन-स्तरीय सौम्य स्मरण",
  howStep3Desc:
    "यदि बात तुरंत याद न आए, तो ऐप धीरे से संकेत देता है और फिर विकल्प प्रदान करता है।",
  howStep4Title: "4. डॉक्टर के लिए तैयार स्पष्ट रिपोर्ट",
  howStep4Desc:
    "स्मृति जांच, आवाज़ की गति और परिवार के अवलोकन को मिलाकर डॉक्टर को दिखाने योग्य रिपोर्ट तैयार होती है।",

  // Life Memory Check
  lifeTitle: "मुख्य विशेषता: परिवार द्वारा सत्यापित जीवन स्मृति जांच",
  lifeSub: "किताबी सवालों के बजाय उनके अपने जीवन की सच्ची यादों की जांच क्यों न की जाए?",
  lifeBadge: "अनोखी विशेषता",
  lifeWhy1Title: "शिक्षा की कोई बाध्यता नहीं",
  lifeWhy1Desc:
    "अपने पैतृक गांव या पोते का नाम याद रखने के लिए स्कूली पढ़ाई या गणित की आवश्यकता नहीं होती।",
  lifeWhy2Title: "हाल की घटनाओं के प्रति संवेदनशील",
  lifeWhy2Desc:
    "शुरुआती बदलावों में हाल की यादें पहले प्रभावित होती हैं। पिछले हफ्ते की मुलाकात पूछने से शुरुआती संकेत पकड़े जा सकते हैं।",
  lifeWhy3Title: "ठोस और स्पष्ट प्रमाण",
  lifeWhy3Desc:
    "डॉक्टर को अस्पष्ट चिंता के बजाय स्पष्ट विवरण मिलता है ('दामाद का गांव याद करने में संकेत की जरूरत पड़ी')।",
  lifeFact1: "पोते का नाम",
  lifeFact2: "पैतृक गांव",
  lifeFact3: "पिछले रविवार का मेहमान",
  lifeFreeRecall: "सहज स्मरण (बिना किसी संकेत के)",
  lifeCue: "सौम्य संकेत (हल्की याद दिलाना)",
  lifeRecognition: "विकल्प पहचान",
  lifeRecalled: "पूरी शुद्धता से याद किया",
  lifeCueNeeded: "संकेत के बाद सफलतापूर्वक याद किया",

  // Languages
  langTitle: "भारत की हर आवाज़ के लिए निर्मित",
  langSub:
    "मानसिक स्वास्थ्य सबका अधिकार है। हर बुजुर्ग को अपनी मातृभाषा में जांच का अधिकार है।",
  langMore: "मराठी, बंगाली, तमिल और तेलुगु आगामी अपडेट में उपलब्ध कराई जा रही हैं।",
  langVoiceFirst: "100% आवाज़ पर आधारित",
  langVoiceFirstDesc:
    "बुजुर्गों को स्क्रीन पर छोटे बटन दबाने या पढ़ने की जरूरत नहीं। वे सिर्फ सुनते हैं और बोलते हैं।",
  langGreetingEn: "Hello! How was your morning walk today?",
  langGreetingHi: "नमस्ते! आज सुबह का नाश्ता कैसा रहा?",
  langGreetingKn: "ನಮಸ್ಕಾರ! ಇವತ್ತಿನ ದಿನ ಹೇಗಿತ್ತು?",

  // Audience
  audTitle: "आशा कार्यकर्ताओं और परिवारों दोनों के लिए",
  audSub:
    "चाहे गांव में आशा कार्यकर्ता उपयोग करें या घर पर बेटा-बेटी, यह साधन सबके अनुकूल है।",
  audWorkersTitle: "आशा और स्वास्थ्य कार्यकर्ताओं के लिए",
  audWorker1: "कागज़-कलम के बिना 3-5 मिनट में त्वरित आवाज़ जांच।",
  audWorker2: "मासिक दौरों में व्यक्ति का व्यक्तिगत स्तर ट्रैक करने में सहायक।",
  audWorker3: "पीएचसी डॉक्टर के लिए मानकीकृत रेफरल रिपोर्ट तैयार करता है।",
  audFamiliesTitle: "परिवार और देखभाल करने वालों के लिए",
  audFamily1: "बुजुर्ग को बिना तनाव में डाले मानसिक स्वास्थ्य की देखभाल।",
  audFamily2: "डॉक्टर को दिखाने के लिए ठोस और समझने योग्य जानकारी।",
  audFamily3: "हफ्तों और महीनों में आवाज़ और याददाश्त के बदलावों को ट्रैक करें।",

  // Sample Report
  reportTitle: "स्पष्ट और पारदर्शी परिणाम जिन पर भरोसा किया जा सके",
  reportSub:
    "कोई गुप्त नंबर नहीं। हर परिणाम साफ बताता है कि कौन सी याद में संकेत की आवश्यकता पड़ी।",
  reportLabel: "नमूना जांच रिपोर्ट (काल्पनिक व्यक्ति)",
  reportPatientName: "लक्ष्मी देवी, आयु 74 वर्ष",
  reportPatientMeta: "भाषा: कन्नड़ | परिवार सदस्य: बेटी (पूजा)",
  reportOverallStatus: "डॉक्टरी जांच की सलाह योग्य संकेत",
  reportConfidence: "जांच का विश्वास स्तर",
  reportConfidenceHigh: "उच्च (स्पष्ट आवाज़, पूर्ण उत्तर)",
  reportMemoryScore: "व्यक्तिगत स्मृति: 10 में से 7 सही (2 में संकेत लिया)",
  reportFluencyScore: "बोलने की गति: 88 शब्द/मिनट (सामान्य गति)",
  reportCadenceScore: "बोलने में ठहराव: 1.8 सेकंड (हाल की बातों पर हल्का ठहराव)",
  reportSummaryText:
    "पुरानी यादें (शादी, गांव) बिल्कुल स्पष्ट। हाल की घटनाएं (रविवार का मेहमान, सुबह की दवा) याद करने में संकेत की आवश्यकता पड़ी। डॉक्टर से परामर्श की सलाह दी जाती है।",
  reportInconclusiveNote:
    "ईमानदार अनिश्चितता: यदि शोर या धीमी आवाज़ के कारण जांच स्पष्ट न हो, तो ऐप गलत अंदाज़ा लगाने के बजाय 'अस्पष्ट — कृपया दोबारा जांचें' दिखाता है।",
  reportDisclaimer:
    "यह एक प्रारंभिक जांच साधन है, कोई डॉक्टरी निदान नहीं। केवल योग्य डॉक्टर ही निदान कर सकते हैं।",

  // Privacy
  privTitle: "गोपनीयता, सहमति और चिकित्सीय नैतिकता के साथ निर्मित",
  privSub:
    "स्वास्थ्य डेटा बेहद निजी होता है। हम हर आवाज़ के नमूने की पूरी सुरक्षा सुनिश्चित करते हैं।",
  privConsentTitle: "स्पष्ट और पूर्व सहमति",
  privConsentDesc: "हर जांच से पहले परिवार और बुजुर्ग की सहमति ली जाती है।",
  privMinimalTitle: "न्यूनतम डेटा संग्रह",
  privMinimalDesc:
    "हम केवल जांच के लिए जरूरी आवाज़ के लक्षण और पारिवारिक बातें ही लेते हैं।",
  privDeleteTitle: "जब चाहें डेटा हटाएं",
  privDeleteDesc: "एक क्लिक में किसी भी जांच का डेटा हमेशा के लिए हटाया जा सकता है।",
  privNoDiagnosisTitle: "स्पष्ट चिकित्सीय सीमा",
  privNoDiagnosisDesc:
    "हम कभी किसी बीमारी का लेबल नहीं लगाते। हम केवल डॉक्टर से सलाह का सुझाव देते हैं।",

  // FAQ
  faqTitle: "अक्सर पूछे जाने वाले सवाल",
  faqSub:
    "परिवारों और स्वास्थ्य कार्यकर्ताओं द्वारा सबसे ज्यादा पूछे जाने वाले प्रश्नों के सरल उत्तर।",
  faq1Q: "क्या NeuroSense कोई डॉक्टरी निदान (Diagnosis) है?",
  faq1A:
    "नहीं, बिल्कुल नहीं। NeuroSense एक प्रारंभिक जांच और रेफरल-सहायक साधन है। यह केवल उन संकेतों को पहचानता है जिन पर डॉक्टर का ध्यान जाना चाहिए। मनोभ्रंश (Dementia) या अल्जाइमर का निदान केवल योग्य न्यूरोलॉजिस्ट या चिकित्सक ही कर सकते हैं।",
  faq2Q: "यह साधन किसके लिए बनाया गया है?",
  faq2A:
    "यह 60 वर्ष या उससे अधिक आयु के बुजुर्गों के लिए है, जिसका उपयोग उनके परिवार के सदस्य घर पर या आशा/स्वास्थ्य कार्यकर्ता अपने दौरों में कर सकते हैं।",
  faq3Q: "वर्तमान में कौन-कौन सी भाषाएं उपलब्ध हैं?",
  faq3A:
    "अभी अंग्रेजी, हिन्दी और कन्नड़ उपलब्ध हैं। मराठी, बंगाली, तमिल और तेलुगु पर काम चल रहा है।",
  faq4Q: "क्या इसके लिए इंटरनेट की आवश्यकता होती है?",
  faq4A:
    "हाँ। आवाज़ की पहचान और सुरक्षित विश्लेषण हमारे बैकएंड सर्वर पर होता है, जिसके लिए इंटरनेट कनेक्शन जरूरी है।",
  faq5Q: "आवाज़ की रिकॉर्डिंग का उपयोग कैसे होता है?",
  faq5A:
    "आवाज़ का उपयोग केवल ठहराव, बोलने की गति और परिवार द्वारा दर्ज की गई बातों से मिलान करने के लिए होता है। इसे कभी किसी बाहरी कंपनी को नहीं बेचा जाता।",
  faq6Q: "यदि परिणाम 'डॉक्टरी जांच योग्य संकेत' दिखाए तो क्या करें?",
  faq6A:
    "घबराएं नहीं। विटामिन B12 की कमी, थायरॉयड, नींद की कमी या दवाइयों के प्रभाव से भी भूलने की समस्या हो सकती है। ऐप से पीडीएफ रिपोर्ट डाउनलोड करें और अपने डॉक्टर से मिलें।",

  // CTA
  ctaTitle: "आज ही अपने किसी प्रियजन की याददाश्त और स्वास्थ्य की जांच करें",
  ctaSub:
    "5 मिनट से कम समय लगता है। कोई कागज़ात नहीं। अपने परिवार के लिए एक स्पष्ट आधार तैयार करें।",
  ctaButton: "मुफ्त जांच शुरू करें",

  // Footer
  footerTagline: "भारत के बुजुर्गों के लिए आवाज़-आधारित संवेदनशील स्मृति जांच।",
  footerDisclaimer:
    "NeuroSense एक जांच सहायता साधन है, कोई निदान उपकरण नहीं। केवल योग्य डॉक्टर ही निदान कर सकते हैं। थकान, सुनने में कठिनाई या दवाइयों से भी परिणाम प्रभावित हो सकते हैं।",
  footerRights: "© 2026 NeuroSense. जन-स्वास्थ्य पहल।",
}

const kn: HomepageTranslations = {
  // Nav
  navHow: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
  navWhy: "ಇದು ಹೇಗೆ ಭಿನ್ನವಾಗಿದೆ",
  navLanguages: "ಭಾಷೆಗಳು",
  navWorkers: "ಆರೋಗ್ಯ ಕಾರ್ಯಕರ್ತರಿಗೆ",
  navFaq: "ಪ್ರಶ್ನೋತ್ತರ",
  navCta: "ಪರೀಕ್ಷೆ ಪ್ರಾರಂಭಿಸಿ",

  // Hero
  heroBadge: "ಪ್ರಾಥಮಿಕ ಪರೀಕ್ಷಾ ಸಾಧನ, ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯವಲ್ಲ",
  heroTitle: "ನೆನಪಿನ ಬದಲಾವಣೆಗಳನ್ನು ಬೇಗನೆ ಗುರುತಿಸಿ, ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ",
  heroSub:
    "ಭಾರತದ ಹಿರಿಯರಿಗೆ ಮತ್ತು ಕುಟುಂಬಗಳಿಗೆ ಧ್ವನಿ ಆಧಾರಿತ ಸರಳ ಪರೀಕ್ಷಾ ಸಾಧನ. ಓದುವುದು ಅಥವಾ ಬರೆಯುವುದು ಬೇಕಾಗಿಲ್ಲ. ಕುಟುಂಬದವರು ನೈಜ ಜೀವನದ ವಿಷಯಗಳನ್ನು ದಾಖಲಿಸುತ್ತಾರೆ, ಹಿರಿಯರು ಸಹಜವಾಗಿ ಮಾತನಾಡುತ್ತಾರೆ, ಮತ್ತು ಸ್ಪಷ್ಟ ಫಲಿತಾಂಶ ಸಿಗುತ್ತದೆ.",
  heroCta1: "ಪರೀಕ್ಷೆ ಪ್ರಾರಂಭಿಸಿ",
  heroCta2: "ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ ನೋಡಿ",
  heroDisclaimer:
    "ಇದು ಪ್ರಾಥಮಿಕ ಪರೀಕ್ಷಾ ಸಾಧನವಾಗಿದೆ, ರೋಗನಿರ್ಣಯವಲ್ಲ. ಅರ್ಹ ವೈದ್ಯರು ಮಾತ್ರ ರೋಗನಿರ್ಣಯ ಮಾಡಬಹುದು.",
  heroRecalledBadge: "ದೃಢೀಕೃತ ನೆನಪು",
  heroFactLabel: "ಜೀವನದ ಮಾಹಿತಿ (ಮೊಮ್ಮಗ)",
  heroFactValue: "ಆರವ್ (ಬೆಂಗಳೂರಿನಲ್ಲಿ ವಾಸ)",
  heroVoiceQuery: "ಕಳೆದ ಭಾನುವಾರ ನಿಮ್ಮನ್ನು ನೋಡಲು ಸಿಹಿ ತಂದುಕೊಟ್ಟವರು ಯಾರು?",
  heroElderSpeech: "ಆರವ್ ಬೆಂಗಳೂರಿನಿಂದ ಬಂದಿದ್ದ! ನನ್ನಿಷ್ಟದ ಕಾಜು ಕತ್ಲಿ ತಂದಿದ್ದ.",

  // Problem
  problemTitle: "ಭಾರತದಲ್ಲಿ ಆರಂಭಿಕ ನೆನಪಿನ ಬದಲಾವಣೆಗಳು ಏಕೆ ಗಮನಕ್ಕೆ ಬರುವುದಿಲ್ಲ?",
  problemSub:
    "ಲಕ್ಷಾಂತರ ಕುಟುಂಬಗಳು ಮರೆವಿನ ಸಣ್ಣ ಲಕ್ಷಣಗಳನ್ನು ಗಮನಿಸಿದರೂ, ಸುಲಭ ತಪಾಸಣೆಯ ಕೊರತೆಯಿಂದ ವೈದ್ಯರ ಬಳಿ ಹೋಗುವುದು ತಡವಾಗುತ್ತದೆ.",
  problemCard1Title: "ವಯಸ್ಸಾದ ಸಹಜ ಲಕ್ಷಣವೆಂದು ಭಾವಿಸುವುದು",
  problemCard1Desc:
    "ಮರೆಯುವುದು ವೃದ್ಧಾಪ್ಯದ ಸಹಜ ಭಾಗವೆಂದು ಕುಟುಂಬಗಳು ಭಾವಿಸುವುದರಿಂದ, ಆರಂಭಿಕ ಹಂತದಲ್ಲಿ ಚಿಕಿತ್ಸೆ ಸಿಗುವುದು ತಡವಾಗುತ್ತದೆ.",
  problemCard2Title: "ತಜ್ಞ ವೈದ್ಯರು ದೂರವಿರುವುದು",
  problemCard2Desc:
    "ಗ್ರಾಮೀಣ ಮತ್ತು ಅರೆ-ನಗರ ಪ್ರದೇಶಗಳಲ್ಲಿ ನರರೋಗ ತಜ್ಞರು ಮತ್ತು ನೆನಪಿನ ಕ್ಲಿನಿಕ್‌ಗಳು ಸುಲಭವಾಗಿ ಸಿಗುವುದಿಲ್ಲ.",
  problemCard3Title: "ಹಳೆಯ ಪರೀಕ್ಷೆಗಳಿಗೆ ಓದು-ಬರಹ ಅಗತ್ಯ",
  problemCard3Desc:
    "ಕಾಗದದ ಪರೀಕ್ಷೆಗಳಲ್ಲಿ ಬರೆಯುವುದು, ಚಿತ್ರ ಬಿಡಿಸುವುದು ಮತ್ತು ಲೆಕ್ಕ ಬೇಕಾಗುತ್ತದೆ, ಇದು ಅನಕ್ಷರಸ್ಥ ಹಿರಿಯರಿಗೆ ಕಷ್ಟಕರ.",
  problemCard4Title: "ಭಾಷೆ ಮತ್ತು ಸಂಸ್ಕೃತಿಯ ತೊಡಕು",
  problemCard4Desc:
    "ಪಾಶ್ಚಿಮಾತ್ಯ ಪ್ರಶ್ನೆಗಳು ಭಾರತೀಯ ಕುಟುಂಬ ವ್ಯವಸ್ಥೆ ಮತ್ತು ಪ್ರಾದೇಶಿಕ ಭಾಷೆಗಳಿಗೆ ಸರಿಹೊಂದುವುದಿಲ್ಲ.",

  // How it works
  howTitle: "NeuroSense ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
  howSub: "ಐದು ನಿಮಿಷಕ್ಕಿಂತ ಕಡಿಮೆ ಸಮಯ ತೆಗೆದುಕೊಳ್ಳುವ 4 ಸರಳ ಮತ್ತು ಗೌರವಾನ್ವಿತ ಹಂತಗಳು.",
  howStep1Title: "1. ಕುಟುಂಬದವರು ವಿಷಯಗಳನ್ನು ದಾಖಲಿಸುತ್ತಾರೆ",
  howStep1Desc:
    "ಹಿರಿಯರ ಜೀವನದ ನೈಜ ವಿಷಯಗಳನ್ನು ದಾಖಲಿಸಲಾಗುತ್ತದೆ: ಹುಟ್ಟೂರು, ಮಕ್ಕಳು, ಇತ್ತೀಚಿನ ಭೇಟಿಗಳು ಮತ್ತು ಹಬ್ಬಗಳು.",
  howStep2Title: "2. ಹಿರಿಯರು ಸಹಜವಾಗಿ ಮಾತನಾಡುತ್ತಾರೆ",
  howStep2Desc:
    "ಆ್ಯಪ್ ಅವರ ಮಾತೃಭಾಷೆಯಲ್ಲಿ ಧ್ವನಿಯ ಮೂಲಕ ಸಲುಗೆಯಿಂದ ಮಾತನಾಡುತ್ತದೆ. ಹಿರಿಯರು ಯಾವುದೇ ಒತ್ತಡವಿಲ್ಲದೆ ಉತ್ತರಿಸುತ್ತಾರೆ.",
  howStep3Title: "3. ಮೂರು ಹಂತದ ಸೌಮ್ಯ ನೆನಪಿಸುವಿಕೆ",
  howStep3Desc: "ತಕ್ಷಣ ನೆನಪಾಗದಿದ್ದರೆ, ಆ್ಯಪ್ ಸಣ್ಣ ಸುಳಿವು ನೀಡುತ್ತದೆ ಮತ್ತು ಆಯ್ಕೆಗಳನ್ನು ತೋರಿಸುತ್ತದೆ.",
  howStep4Title: "4. ವೈದ್ಯರಿಗೆ ಸಿದ್ಧಪಡಿಸಿದ ಸ್ಪಷ್ಟ ವರದಿ",
  howStep4Desc:
    "ನೆನಪಿನ ಪರೀಕ್ಷೆ, ಧ್ವನಿಯ ವೇಗ ಮತ್ತು ಕುಟುಂಬದ ಅವಲೋಕನವನ್ನು ಒಗ್ಗೂಡಿಸಿ ವೈದ್ಯರಿಗೆ ತೋರಿಸಬಹುದಾದ ವರದಿ ಸಿದ್ಧವಾಗುತ್ತದೆ.",

  // Life Memory Check
  lifeTitle: "ಮುಖ್ಯ ಆಕರ್ಷಣೆ: ಕುಟುಂಬ ದೃಢೀಕೃತ ಜೀವನ ನೆನಪಿನ ಪರೀಕ್ಷೆ",
  lifeSub:
    "ಪುಸ್ತಕದ ಪ್ರಶ್ನೆಗಳ ಬದಲು ಅವರ ಸ್ವಂತ ಜೀವನದ ನೆನಪುಗಳನ್ನು ಪರೀಕ್ಷಿಸುವುದು ಹೆಚ್ಚು ಸೂಕ್ತವಲ್ಲವೇ?",
  lifeBadge: "ವಿಶಿಷ್ಟ ಆವಿಷ್ಕಾರ",
  lifeWhy1Title: "ಶಿಕ್ಷಣದ ಅಗತ್ಯವಿಲ್ಲ",
  lifeWhy1Desc:
    "ತಮ್ಮ ಹುಟ್ಟೂರು ಅಥವಾ ಮೊಮ್ಮಗನ ಹೆಸರನ್ನು ನೆನಪಿಸಿಕೊಳ್ಳಲು ಶಾಲಾ ಶಿಕ್ಷಣ ಅಥವಾ ಗಣಿತದ ಅಗತ್ಯವಿಲ್ಲ.",
  lifeWhy2Title: "ಇತ್ತೀಚಿನ ಘಟನೆಗಳಿಗೆ ಸಂವೇದನಾಶೀಲ",
  lifeWhy2Desc:
    "ಆರಂಭಿಕ ಮರೆವಿನಲ್ಲಿ ಇತ್ತೀಚಿನ ನೆನಪುಗಳು ಮೊದಲು ಮರೆಯಾಗುತ್ತವೆ. ಕಳೆದ ವಾರದ ಭೇಟಿ ಕೇಳುವುದರಿಂದ ಆರಂಭಿಕ ಲಕ್ಷಣಗಳು ಬೇಗ ತಿಳಿಯುತ್ತವೆ.",
  lifeWhy3Title: "ನಿಖರ ಪುರಾವೆ ನೀಡುತ್ತದೆ",
  lifeWhy3Desc:
    "ಅಸ್ಪಷ್ಟ ಚಿಂತೆಯ ಬದಲು ವೈದ್ಯರಿಗೆ ನಿರ್ದಿಷ್ಟ ಮಾಹಿತಿ ಸಿಗುತ್ತದೆ ('ಮಗಳ ಊರು ನೆನಪಿಸಿಕೊಳ್ಳಲು ಸುಳಿವು ಬೇಕಾಯಿತು').",
  lifeFact1: "ಮೊಮ್ಮಗನ ಹೆಸರು",
  lifeFact2: "ಹುಟ್ಟೂರು",
  lifeFact3: "ಕಳೆದ ಭಾನುವಾರದ ಅತಿಥಿ",
  lifeFreeRecall: "ಸಹಜ ಸ್ಮರಣೆ (ಸುಳಿವು ಇಲ್ಲದೆ)",
  lifeCue: "ಸೌಮ್ಯ ಸುಳಿವು (ಸಣ್ಣ ನೆನಪಿಸುವಿಕೆ)",
  lifeRecognition: "ಆಯ್ಕೆ ಗುರುತಿಸುವಿಕೆ",
  lifeRecalled: "ಸಂಪೂರ್ಣ ನಿಖರವಾಗಿ ನೆನಪಿಸಿಕೊಂಡರು",
  lifeCueNeeded: "ಸುಳಿವು ನೀಡಿದ ನಂತರ ನೆನಪಿಸಿಕೊಂಡರು",

  // Languages
  langTitle: "ಭಾರತದ ಪ್ರತಿಯೊಂದು ಧ್ವನಿಗಾಗಿ ನಿರ್ಮಿತ",
  langSub:
    "ನೆನಪಿನ ಆರೋಗ್ಯ ಎಲ್ಲರ ಹಕ್ಕು. ಪ್ರತಿಯೊಬ್ಬರಿಗೂ ತಮ್ಮ ಮಾತೃಭಾಷೆಯಲ್ಲಿ ಪರೀಕ್ಷೆ ಪಡೆಯುವ ಅವಕಾಶವಿರಬೇಕು.",
  langMore: "ಮರಾಠಿ, ಬಂಗಾಳಿ, ತಮಿಳು ಮತ್ತು ತೆಲುಗು ಭಾಷೆಗಳು ಮುಂದಿನ ನವೀಕರಣದಲ್ಲಿ ಬರಲಿವೆ.",
  langVoiceFirst: "100% ಧ್ವನಿ ಆಧಾರಿತ ಅನುಭವ",
  langVoiceFirstDesc:
    "ಹಿರಿಯರು ಪರದೆಯ ಮೇಲೆ ಸಣ್ಣ ಅಕ್ಷರಗಳನ್ನು ಓದುವುದು ಅಥವಾ ಗುಂಡಿಗಳನ್ನು ಒತ್ತಬೇಕಾಗಿಲ್ಲ. ಕೇವಲ ಕೇಳಿ ಮಾತನಾಡಿದರೆ ಸಾಕು.",
  langGreetingEn: "Hello! How was your morning walk today?",
  langGreetingHi: "नमस्ते! आज सुबह का नाश्ता कैसा रहा?",
  langGreetingKn: "ನಮಸ್ಕಾರ! ಇವತ್ತಿನ ದಿನ ಹೇಗಿತ್ತು?",

  // Audience
  audTitle: "ಆಶಾ ಕಾರ್ಯಕರ್ತೆಯರು ಮತ್ತು ಕುಟುಂಬಗಳಿಗೆ",
  audSub:
    "ಗ್ರಾಮದಲ್ಲಿ ಆಶಾ ಕಾರ್ಯಕರ್ತೆ ಬಳಸಲಿ ಅಥವಾ ಮನೆಯಲ್ಲಿ ಮಗ-ಮಗಳು ಬಳಸಲಿ, ಇದು ಎಲ್ಲರಿಗೂ ಸರಿಹೊಂದುತ್ತದೆ.",
  audWorkersTitle: "ಆಶಾ ಮತ್ತು ಆರೋಗ್ಯ ಕಾರ್ಯಕರ್ತರಿಗೆ",
  audWorker1: "ಕಾಗದ-ಪೆನ್ನು ಇಲ್ಲದೆ 3-5 ನಿಮಿಷಗಳಲ್ಲಿ ಧ್ವನಿ ಪರೀಕ್ಷೆ.",
  audWorker2: "ಮಾಸಿಕ ಭೇಟಿಗಳಲ್ಲಿ ವ್ಯಕ್ತಿಯ ಪ್ರಗತಿ ಗಮನಿಸಲು ಸಹಕಾರಿ.",
  audWorker3: "ವೈದ್ಯರಿಗೆ ನೀಡಲು ABDM ಮಾನ್ಯತೆಯುಳ್ಳ ಶಿಫಾರಸು ವರದಿ ನೀಡುತ್ತದೆ.",
  audFamiliesTitle: "ಕುಟುಂಬದವರಿಗೆ",
  audFamily1: "ಹಿರಿಯರಿಗೆ ಒತ್ತಡವಿಲ್ಲದೆ ನೆನಪಿನ ಶಕ್ತಿಯ ಪರೀಕ್ಷೆ.",
  audFamily2: "ವೈದ್ಯರಿಗೆ ತೋರಿಸಲು ನಿಖರ ಮತ್ತು ಸ್ಪಷ್ಟ ಮಾಹಿತಿ.",
  audFamily3: "ವಾರಗಳು ಮತ್ತು ತಿಂಗಳುಗಳಲ್ಲಿ ನೆನಪಿನ ಬದಲಾವಣೆಗಳನ್ನು ಗಮನಿಸಿ.",

  // Sample Report
  reportTitle: "ಕುಟುಂಬಗಳು ಮತ್ತು ವೈದ್ಯರು ನಂಬಬಹುದಾದ ಸ್ಪಷ್ಟ ವರದಿ",
  reportSub: "ಯಾವುದೇ ರಹಸ್ಯ ಸಂಖ್ಯೆಗಳಿಲ್ಲ. ಪ್ರತಿ ಹಂತದ ವಿವರಣೆಯನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ತೋರಿಸುತ್ತದೆ.",
  reportLabel: "ಮಾದರಿ ಪರೀಕ್ಷಾ ವರದಿ (ಕಾಲ್ಪನಿಕ ವ್ಯಕ್ತಿ)",
  reportPatientName: "ಲಕ್ಷ್ಮಿ ದೇವಿ, ವಯಸ್ಸು 74",
  reportPatientMeta: "ಭಾಷೆ: ಕನ್ನಡ | ಮಾಹಿತಿ ನೀಡಿದವರು: ಮಗಳು (ಪೂಜಾ)",
  reportOverallStatus: "ವೈದ್ಯಕೀಯ ತಪಾಸಣೆಗೆ ಶಿಫಾರಸು ಮಾಡಲಾದ ಲಕ್ಷಣಗಳು",
  reportConfidence: "ಪರೀಕ್ಷೆಯ ವಿಶ್ವಾಸಾರ್ಹತೆ",
  reportConfidenceHigh: "ಉತ್ತಮ (ಸ್ಪಷ್ಟ ಧ್ವನಿ, ಸಂಪೂರ್ಣ ಉತ್ತರಗಳು)",
  reportMemoryScore: "ವೈಯಕ್ತಿಕ ಸ್ಮರಣೆ: 10 ರಲ್ಲಿ 7 ಸರಿ (2 ಸುಳಿವು ಪಡೆದವು)",
  reportFluencyScore: "ಮಾತಿನ ವೇಗ: 88 ಪದ/ನಿಮಿಷ (ಸಾಮಾನ್ಯ ವೇಗ)",
  reportCadenceScore: "ಮಾತಿನ ನಿಲುಗಡೆ: 1.8 ಸೆಕೆಂಡ್ (ಇತ್ತೀಚಿನ ವಿಷಯಗಳಲ್ಲಿ ಸಣ್ಣ ತಡವರಿಸುವಿಕೆ)",
  reportSummaryText:
    "ಹಳೆಯ ನೆನಪುಗಳು (ಮದುವೆ, ಹುಟ್ಟೂರು) ಸ್ಪಷ್ಟವಾಗಿವೆ. ಇತ್ತೀಚಿನ ಘಟನೆಗಳಿಗೆ (ಭಾನುವಾರದ ಅತಿಥಿ, ಔಷಧಿ) ಸುಳಿವು ಬೇಕಾಯಿತು. ವೈದ್ಯರ ಭೇಟಿಗೆ ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ.",
  reportInconclusiveNote:
    "ಪಾರದರ್ಶಕತೆ: ಗದ್ದಲ ಅಥವಾ ಧ್ವನಿ ಕಡಿಮೆಯಿದ್ದರೆ, ಆ್ಯಪ್ ತಪ್ಪಾಗಿ ಊಹಿಸುವ ಬದಲು 'ಅಸ್ಪಷ್ಟ — ದಯವಿಟ್ಟು ಮರುಪರೀಕ್ಷಿಸಿ' ಎಂದು ತಿಳಿಸುತ್ತದೆ.",
  reportDisclaimer:
    "ಇದು ಪ್ರಾಥಮಿಕ ಪರೀಕ್ಷಾ ಸಾಧನವಾಗಿದೆ, ರೋಗನಿರ್ಣಯವಲ್ಲ. ಅರ್ಹ ವೈದ್ಯರು ಮಾತ್ರ ರೋಗನಿರ್ಣಯ ಮಾಡಬಹುದು.",

  // Privacy
  privTitle: "ಗೌಪ್ಯತೆ, ಸಮ್ಮತಿ ಮತ್ತು ವೈದ್ಯಕೀಯ ನೈತಿಕತೆಯೊಂದಿಗೆ ನಿರ್ಮಿತ",
  privSub:
    "ಆರೋಗ್ಯ ಮಾಹಿತಿ ಅತ್ಯಂತ ವೈಯಕ್ತಿಕ. ನಾವು ಪ್ರತಿಯೊಂದು ಧ್ವನಿ ಮಾದರಿಯನ್ನು ಎಚ್ಚರಿಕೆಯಿಂದ ಕಾಪಾಡುತ್ತೇವೆ.",
  privConsentTitle: "ಸ್ಪಷ್ಟ ಸಮ್ಮತಿ",
  privConsentDesc: "ಪ್ರತಿ ಪರೀಕ್ಷೆಗೂ ಮುನ್ನ ಕುಟುಂಬದ ಮತ್ತು ಹಿರಿಯರ ಅನುಮತಿ ಪಡೆಯಲಾಗುತ್ತದೆ.",
  privMinimalTitle: "ಕನಿಷ್ಠ ಮಾಹಿತಿ ಸಂಗ್ರಹ",
  privMinimalDesc:
    "ಪರೀಕ್ಷೆಗೆ ಅಗತ್ಯವಾದ ಧ್ವನಿ ಲಕ್ಷಣಗಳು ಮತ್ತು ನೈಜ ಮಾಹಿತಿಯನ್ನು ಮಾತ್ರ ಸಂಗ್ರಹಿಸುತ್ತೇವೆ.",
  privDeleteTitle: "ಯಾವಾಗ ಬೇಕಾದರೂ ಅಳಿಸಿ",
  privDeleteDesc: "ಒಂದು ಕ್ಲಿಕ್‌ನಲ್ಲಿ ಯಾವುದೇ ಪರೀಕ್ಷೆಯ ಮಾಹಿತಿಯನ್ನು ಶಾಶ್ವತವಾಗಿ ಅಳಿಸಬಹುದು.",
  privNoDiagnosisTitle: "ವೈದ್ಯಕೀಯ ಮಿತಿ",
  privNoDiagnosisDesc:
    "ನಾವು ಯಾರ ಮೇಲೂ ರೋಗದ ಹೆಸರು ಹಚ್ಚುವುದಿಲ್ಲ. ಕೇವಲ ವೈದ್ಯರನ್ನು ಭೇಟಿಯಾಗಲು ಸಲಹೆ ನೀಡುತ್ತೇವೆ.",

  // FAQ
  faqTitle: "ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು",
  faqSub: "ಕುಟುಂಬಗಳು ಮತ್ತು ಆರೋಗ್ಯ ಕಾರ್ಯಕರ್ತರು ಹೆಚ್ಚಾಗಿ ಕೇಳುವ ಪ್ರಶ್ನೆಗಳಿಗೆ ನೇರ ಉತ್ತರಗಳು.",
  faq1Q: "NeuroSense ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯವೇ?",
  faq1A:
    "ಖಂಡಿತವಾಗಿಯೂ ಇಲ್ಲ. NeuroSense ಒಂದು ಪ್ರಾಥಮಿಕ ಪರೀಕ್ಷೆ ಮತ್ತು ಶಿಫಾರಸು ಸಾಧನ. ಕೇವಲ ಅರ್ಹ ನರರೋಗ ತಜ್ಞರು ಅಥವಾ ವೈದ್ಯರು ಮಾತ್ರ ಡಿಮೆನ್ಶಿಯಾ ಅಥವಾ ನೆನಪಿನ ಕಾಯಿಲೆಯನ್ನು ಪತ್ತೆಹಚ್ಚಲು ಸಾಧ್ಯ.",
  faq2Q: "ಇದು ಯಾರಿಗೆ ಉಪಯುಕ್ತ?",
  faq2A:
    "60 ವರ್ಷ ಮೇಲ್ಪಟ್ಟ ಹಿರಿಯರಿಗೆ, ಅವರ ಕುಟುಂಬದವರು ಮನೆಯಲ್ಲಿ ಅಥವಾ ಆಶಾ ಕಾರ್ಯಕರ್ತೆಯರು ತಮ್ಮ ಭೇಟಿಗಳಲ್ಲಿ ಬಳಸಬಹುದು.",
  faq3Q: "ಯಾವ ಭಾಷೆಗಳು ಲಭ್ಯವಿವೆ?",
  faq3A:
    "ಪ್ರಸ್ತುತ ಇಂಗ್ಲಿಷ್, ಹಿಂದಿ ಮತ್ತು ಕನ್ನಡ ಲಭ್ಯವಿವೆ. ಮರಾಠಿ, ಬಂಗಾಳಿ, ತಮಿಳು ಮತ್ತು ತೆಲುಗು ಭಾಷೆಗಳನ್ನು ಅಭಿವೃದ್ಧಿಪಡಿಸಲಾಗುತ್ತಿದೆ.",
  faq4Q: "ಧ್ವನಿ ಪರೀಕ್ಷೆಗೆ ಇಂಟರ್ನೆಟ್ ಅಗತ್ಯವಿದೆಯೇ?",
  faq4A:
    "ಹೌದು. ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆ ಮತ್ತು ವಿಶ್ಲೇಷಣೆ ನಮ್ಮ ಸುರಕ್ಷಿತ ಸರ್ವರ್‌ನಲ್ಲಿ ನಡೆಯುವುದರಿಂದ ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕ ಅಗತ್ಯವಿದೆ.",
  faq5Q: "ಧ್ವನಿ ರೆಕಾರ್ಡಿಂಗ್‌ಗಳನ್ನು ಹೇಗೆ ಬಳಸಲಾಗುತ್ತದೆ?",
  faq5A:
    "ಧ್ವನಿಯನ್ನು ಕೇವಲ ಮಾತಿನ ವೇಗ, ನಿಲುಗಡೆ ಮತ್ತು ಕುಟುಂಬ ನೀಡಿದ ಮಾಹಿತಿಯೊಂದಿಗೆ ಹೊಂದಿಸಲು ಮಾತ್ರ ಬಳಸಲಾಗುತ್ತದೆ. ಯಾವುದೇ ಜಾಹೀರಾತಿಗಾಗಿ ಬಳಸುವುದಿಲ್ಲ.",
  faq6Q: "ಫಲಿತಾಂಶದಲ್ಲಿ 'ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ' ಎಂದು ಬಂದರೆ ಏನು ಮಾಡಬೇಕು?",
  faq6A:
    "ಆತಂಕಪಡಬೇಡಿ. ವಿಟಮಿನ್ B12 ಕೊರತೆ, ಥೈರಾಯ್ಡ್, ನಿದ್ರೆಯ ಕೊರತೆ ಅಥವಾ ಔಷಧಿಗಳ ಪರಿಣಾಮದಿಂದಲೂ ಮರೆವು ಉಂಟಾಗಬಹುದು. ಪಿಡಿಎಫ್ ವರದಿಯನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ ವೈದ್ಯರನ್ನು ಭೇಟಿ ಮಾಡಿ.",

  // CTA
  ctaTitle: "ಇಂದೇ ನಿಮ್ಮ ಪ್ರೀತಿಪಾತ್ರರ ನೆನಪಿನ ಶಕ್ತಿಯನ್ನು ಪರೀಕ್ಷಿಸಿ",
  ctaSub:
    "ಐದು ನಿಮಿಷಕ್ಕಿಂತ ಕಡಿಮೆ ಸಮಯ. ಯಾವುದೇ ಕಾಗದಪತ್ರಗಳಿಲ್ಲ. ನಿಮ್ಮ ಕುಟುಂಬಕ್ಕಾಗಿ ಸ್ಪಷ್ಟ ಆರಂಭಿಕ ನೆಲೆ ಸಿದ್ಧಪಡಿಸಿ.",
  ctaButton: "ಉಚಿತ ಪರೀಕ್ಷೆ ಪ್ರಾರಂಭಿಸಿ",

  // Footer
  footerTagline: "ಭಾರತದ ಹಿರಿಯರಿಗಾಗಿ ಕರುಣಾಮಯಿ ಧ್ವನಿ ಆಧಾರಿತ ನೆನಪಿನ ಪರೀಕ್ಷೆ.",
  footerDisclaimer:
    "NeuroSense ಒಂದು ಪರೀಕ್ಷಾ ಸಾಧನವಾಗಿದೆ, ರೋಗನಿರ್ಣಯವಲ್ಲ. ಅರ್ಹ ವೈದ್ಯರು ಮಾತ್ರ ರೋಗನಿರ್ಣಯ ಮಾಡಬಹುದು. ಆಯಾಸ, ಕಿವಿ ಕೇಳದಿರುವುದು ಅಥವಾ ಔಷಧಿಗಳಿಂದಲೂ ಫಲಿತಾಂಶ ಬದಲಾಗಬಹುದು.",
  footerRights: "© 2026 NeuroSense. ಸಾರ್ವಜನಿಕ ಆರೋಗ್ಯ ಉಪಕ್ರಮ.",
}

export const homepageI18n: Record<HomepageLang, HomepageTranslations> = {
  en,
  hi,
  kn,
}

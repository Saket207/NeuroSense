export type LanguageCode = "en" | "hi" | "kn"

export interface HomepageContent {
  nav: {
    howItWorks: string
    lifeMemory: string
    science: string
    languages: string
    faq: string
    startScreening: string
  }
  hero: {
    pill: string
    headline: string
    subheadline: string
    ctaPrimary: string
    ctaSecondary: string
    disclaimer: string
    sampleFact: string
    sampleAnswer: string
    recalledStatus: string
  }
  stats: {
    avatarText: string
    stat1Number: string
    stat1Label: string
    stat2Number: string
    stat2Label: string
    stat3Number: string
    stat3Label: string
  }
  threeCards: {
    sectionHeading: string
    sectionSub: string
    card1Badge: string
    card1Num: string
    card1Title: string
    card1Desc: string
    card2Badge: string
    card2Num: string
    card2Title: string
    card2Desc: string
    card3Badge: string
    card3Num: string
    card3Title: string
    card3Desc: string
  }
  timeline: {
    sectionHeading: string
    sectionSub: string
    step1Chip: string
    step1Label: string
    step1Title: string
    step1Year: string
    step1YearLabel: string
    step1Desc: string
    step2Chip: string
    step2Label: string
    step2Title: string
    step2Year: string
    step2YearLabel: string
    step2Desc: string
    step3Chip: string
    step3Label: string
    step3Title: string
    step3Year: string
    step3YearLabel: string
    step3Desc: string
    step4Chip: string
    step4Label: string
    step4Title: string
    step4Year: string
    step4YearLabel: string
    step4Desc: string
  }
  metrics: {
    sectionHeading: string
    sectionSub: string
    pillarTitle: string
    pillarDesc: string
    stat1Val: string
    stat1Desc: string
    stat2Val: string
    stat2Desc: string
    stat3Val: string
    stat3Desc: string
  }
  splitFeature: {
    sectionHeading: string
    sectionSub: string
    overlay1Title: string
    overlay1Val: string
    overlay1Desc: string
    overlay2Title: string
    overlay2Val: string
    overlay2Desc: string
    principleTitle: string
    principleLabel: string
  }
  marquee: {
    sectionHeading: string
    sectionSub: string
    pillsRow1: string[]
    pillsRow2: string[]
  }
  faq: {
    sectionHeading: string
    leftCardTitle: string
    leftCardDesc: string
    leftCardButton: string
    items: Array<{ q: string a: string }>
  }
  footer: {
    tagline: string
    disclaimer: string
    col1Title: string
    col1Links: string[]
    col2Title: string
    col2Links: string[]
    col3Title: string
    col3Links: string[]
    copyright: string
  }
}

export const translations: Record<LanguageCode, HomepageContent> = {
  en: {
    nav: {
      howItWorks: "How It Works",
      lifeMemory: "Life Memory Check",
      science: "The Science",
      languages: "Languages",
      faq: "FAQ",
      startScreening: "Start Screening",
    },
    hero: {
      pill: "A screening aid, not a diagnosis",
      headline: "Spot memory changes early and kindly, in your own language.",
      subheadline:
        "A voice-first, multilingual preliminary cognitive screening and referral-support tool for India's elderly. No reading or writing needed.",
      ctaPrimary: "Start a Screening",
      ctaSecondary: "See How It Works",
      disclaimer:
        "A screening aid, not a diagnosis. Only a doctor can diagnose.",
      sampleFact: "Grandson's nickname: Munna",
      sampleAnswer: "Our Munna came to visit us last Sunday...",
      recalledStatus: "✓ Free Recall Verified",
    },
    stats: {
      avatarText: "3 Langs",
      stat1Number: "3",
      stat1Label: "Launch Languages",
      stat2Number: "10",
      stat2Label: "Personal Life Facts",
      stat3Number: "0",
      stat3Label: "Reading or Writing Needed",
    },
    threeCards: {
      sectionHeading: "Smarter screening for every family",
      sectionSub:
        "Designed specifically to overcome schooling, literacy, and cultural bias in traditional memory testing.",
      card1Badge: "Easy Access",
      card1Num: "01",
      card1Title: "Voice-First in Mother Tongue",
      card1Desc:
        "Spoken naturally in Kannada, Hindi, or English. Removes literacy barriers so elders never feel tested.",
      card2Badge: "Personal Care",
      card2Num: "02",
      card2Title: "Family-Verified Life Memory Check",
      card2Desc:
        "Questions are based on the elder's own life facts—family names, native town, and recent events.",
      card3Badge: "Connected Support",
      card3Num: "03",
      card3Title: "Doctor-Ready Referral Report",
      card3Desc:
        "Generates an objective summary with confidence levels, ready for consultation with a doctor.",
    },
    timeline: {
      sectionHeading: "How a screening works",
      sectionSub:
        "A calm, four-stage process designed to support families and community health workers with dignity.",
      step1Chip: "01",
      step1Label: "Step 1: Family Setup",
      step1Title: "Family Records Life Facts",
      step1Year: "10",
      step1YearLabel: "Personal Facts",
      step1Desc:
        "A family member or ASHA worker records 10 verified life facts and 16 everyday-life change observations before screening begins.",
      step2Chip: "02",
      step2Label: "Step 2: Voice Check",
      step2Title: "A Friendly Conversation",
      step2Year: "0",
      step2YearLabel: "Written Forms",
      step2Desc:
        "The elder has a relaxed spoken conversation with the device in their mother tongue, answering questions about their own life.",
      step3Chip: "03",
      step3Label: "Step 3: Staged Retrieval",
      step3Title: "Recall, Cue, Recognition",
      step3Year: "3",
      step3YearLabel: "Retrieval Stages",
      step3Desc:
        "If an answer is missed, gentle cues and multiple-choice options are provided—mirroring how neurologists assess memory retrieval.",
      step4Chip: "04",
      step4Label: "Step 4: Clinical Support",
      step4Title: "Clear, Actionable Report",
      step4Year: "1",
      step4YearLabel: "Unified Summary",
      step4Desc:
        "Generates an objective Cognitive Stability Index, confidence indicator, and ABDM-compliant clinical summary for doctors.",
    },
    metrics: {
      sectionHeading: "The science behind the screening",
      sectionSub:
        "Combining personal memory recall, acoustic voice stability, and family observations into one explainable score.",
      pillarTitle: "Three Independent Clinical Signals",
      pillarDesc:
        "By cross-referencing acoustic cadence, staged retrieval memory, and informant everyday observations, false alarms are minimized.",
      stat1Val: "3",
      stat1Desc: "Assessment stages (Recall, Cue, Recognition)",
      stat2Val: "16",
      stat2Desc: "Everyday observation points from family",
      stat3Val: "100%",
      stat3Desc: "Explainable factors behind every result",
    },
    splitFeature: {
      sectionHeading: "Screening that knows your family",
      sectionSub:
        "Generic questions fail across India's diverse cultures. By comparing answers to verified facts from the elder's own life, we measure real recall.",
      overlay1Title: "Voice Cadence",
      overlay1Val: "94%",
      overlay1Desc: "Acoustic speech stability index",
      overlay2Title: "Life Recall",
      overlay2Val: "10/10",
      overlay2Desc: "Verified personal memory points",
      principleTitle:
        "Built for families and health workers, not for diagnosis.",
      principleLabel: "Our Core Clinical Principle",
    },
    marquee: {
      sectionHeading: "Built for every Indian community",
      sectionSub:
        "Multilingual, accessible, and grounded in community healthcare realities.",
      pillsRow1: [
        "Voice-First Screening",
        "ಕನ್ನಡ (Kannada)",
        "Zero Literacy Required",
        "Episodic Memory Check",
        "हिन्दी (Hindi)",
        "ABDM Doctor Report",
      ],
      pillsRow2: [
        "Doctor Referral Aid",
        "Family-Verified Facts",
        "English",
        "Acoustic Fluency Analysis",
        "Privacy Protected",
        "Community Health Ready",
      ],
    },
    faq: {
      sectionHeading: "Commonly Asked Questions",
      leftCardTitle: "Have questions about screening?",
      leftCardDesc:
        "Our tool is designed to support families and community healthcare workers with dignity, privacy, and clinical transparency.",
      leftCardButton: "Start a Screening",
      items: [
        {
          q: "Is this a diagnostic test for dementia or Alzheimer's?",
          a: "No. NeuroSense is strictly a preliminary screening aid and referral-support tool. It cannot and does not diagnose any medical condition. Only a qualified doctor can diagnose.",
        },
        {
          q: "Who should use this screening tool?",
          a: "It is designed for elderly individuals whose families or local health workers (such as ASHA workers) want an objective, respectful baseline check on memory and speech cadence.",
        },
        {
          q: "Which languages are supported?",
          a: "Currently English, Hindi (हिन्दी), and Kannada (ಕನ್ನಡ) are fully supported, with more regional Indian languages in active design.",
        },
        {
          q: "How are personal family memories protected?",
          a: "Family facts and audio recordings are stored securely with explicit consent. Your data is private, encrypted, and never sold or shared with third parties.",
        },
        {
          q: "What happens after completing a screening?",
          a: "You receive an explainable report with a confidence level and next steps. If concerning signs are found, you can download a structured summary to take to a physician or neurologist.",
        },
      ],
    },
    footer: {
      tagline:
        "A voice-first, multilingual preliminary cognitive screening and referral-support tool for India's elderly.",
      disclaimer:
        "This is a screening aid, not a diagnosis. Only a doctor can diagnose. Many factors such as tiredness, hearing loss, low mood, or medication can affect results.",
      col1Title: "Product",
      col1Links: [
        "How It Works",
        "Life Memory Check",
        "Doctor Report",
        "ASHA Workflow",
      ],
      col2Title: "Languages",
      col2Links: ["English", "हिन्दी (Hindi)", "ಕನ್ನಡ (Kannada)"],
      col3Title: "Privacy & Ethics",
      col3Links: ["Clinical Safety", "Data Encryption", "Consent Policy"],
      copyright:
        "© 2026 NeuroSense. Dedicated to earlier, kinder memory care for India's elders.",
    },
  },

  hi: {
    nav: {
      howItWorks: "यह कैसे काम करता है",
      lifeMemory: "स्मृति जांच",
      science: "विज्ञान",
      languages: "भाषाएं",
      faq: "प्रश्नोत्तरी",
      startScreening: "जांच शुरू करें",
    },
    hero: {
      pill: "जांच सहायता, कोई निदान नहीं",
      headline: "याददाश्त के बदलावों को समय पर और अपनी भाषा में पहचानें।",
      subheadline:
        "बुजुर्गों के लिए आवाज-आधारित, बहुभाषी प्रारंभिक स्क्रीनिंग और डॉक्टर परामर्श सहायता टूल। पढ़ने-लिखने की कोई आवश्यकता नहीं।",
      ctaPrimary: "जांच शुरू करें",
      ctaSecondary: "प्रक्रिया देखें",
      disclaimer: "यह केवल स्क्रीनिंग सहायता है, कोई डॉक्टरी निदान नहीं।",
      sampleFact: "पोते का नाम: मुन्ना",
      sampleAnswer: "हमारा मुन्ना पिछले रविवार को हमसे मिलने आया था...",
      recalledStatus: "✓ स्मरण सत्यापित",
    },
    stats: {
      avatarText: "3 भाषाएं",
      stat1Number: "3",
      stat1Label: "शुरुआती भाषाएं",
      stat2Number: "10",
      stat2Label: "परिवार-सत्यापित तथ्य",
      stat3Number: "0",
      stat3Label: "पढ़ने-लिखने की ज़रूरत",
    },
    threeCards: {
      sectionHeading: "हर परिवार के लिए सुगम और गरिमापूर्ण जांच",
      sectionSub:
        "पारंपरिक परीक्षणों में भाषा, शिक्षा और सांस्कृतिक पूर्वाग्रहों को दूर करने के लिए विशेष रूप से डिज़ाइन किया गया।",
      card1Badge: "सहज पहुँच",
      card1Num: "01",
      card1Title: "मातृभाषा में बोलकर जांच",
      card1Desc:
        "कन्नड़, हिंदी या अंग्रेजी में स्वाभाविक बातचीत। निरक्षरता की कोई बाधा नहीं, कोई परीक्षा जैसा तनाव नहीं।",
      card2Badge: "व्यक्तिगत देखभाल",
      card2Num: "02",
      card2Title: "पारिवारिक जीवन स्मृति जांच",
      card2Desc:
        "प्रश्न बुजुर्ग के अपने जीवन के तथ्यों पर आधारित होते हैं—परिवार के सदस्यों के नाम, पैतृक गाँव और हाल की घटनाएं।",
      card3Badge: "चिकित्सा सहयोग",
      card3Num: "03",
      card3Title: "डॉक्टर के लिए स्पष्ट रिपोर्ट",
      card3Desc:
        "विश्वसनीयता स्तर के साथ एक स्पष्ट रिपोर्ट तैयार करता है, जिसे डॉक्टर को दिखाया जा सकता है।",
    },
    timeline: {
      sectionHeading: "जांच कैसे काम करती है",
      sectionSub: "चार सरल चरणों में एक गरिमापूर्ण और तनाव-मुक्त स्क्रीनिंग प्रक्रिया।",
      step1Chip: "01",
      step1Label: "पहला चरण: पारिवारिक विवरण",
      step1Title: "परिवार जीवन के तथ्य जोड़ता है",
      step1Year: "10",
      step1YearLabel: "सत्यापित तथ्य",
      step1Desc:
        "परिवार का सदस्य या आशा कार्यकर्ता बुजुर्ग के जीवन के 10 सत्यापित तथ्य और दैनिक अवलोकन दर्ज करते हैं।",
      step2Chip: "02",
      step2Label: "दूसरा चरण: आवाज आधारित संवाद",
      step2Title: "सहज और आत्मीय बातचीत",
      step2Year: "0",
      step2YearLabel: "लिखित फॉर्म",
      step2Desc:
        "बुजुर्ग अपनी मातृभाषा में सहज बातचीत करते हैं और अपने जीवन से जुड़े सरल सवालों के जवाब देते हैं।",
      step3Chip: "03",
      step3Label: "तीसरा चरण: चरणबद्ध सहायता",
      step3Title: "स्मरण, संकेत, पहचान",
      step3Year: "3",
      step3YearLabel: "स्मरण चरण",
      step3Desc:
        "यदि कोई उत्तर याद न आए, तो हल्के संकेत और विकल्प दिए जाते हैं—जैसे न्यूरोलॉजिस्ट जांच करते हैं।",
      step4Chip: "04",
      step4Label: "चौथा चरण: परामर्श रिपोर्ट",
      step4Title: "स्पष्ट और उपयोगी रिपोर्ट",
      step4Year: "1",
      step4YearLabel: "एकल रिपोर्ट",
      step4Desc:
        "एक स्पष्ट संज्ञानात्मक स्थिरता सूचकांक और डॉक्टर के लिए संदर्भ सारांश तैयार किया जाता है।",
    },
    metrics: {
      sectionHeading: "स्क्रीनिंग के पीछे का विज्ञान",
      sectionSub:
        "व्यक्तिगत स्मृति, आवाज की स्थिरता और पारिवारिक अवलोकनों का एक पारदर्शी और वैज्ञानिक विश्लेषण।",
      pillarTitle: "तीन स्वतंत्र नैदानिक संकेत",
      pillarDesc:
        "आवाज की गति, स्मृति प्रतिधारण और पारिवारिक अवलोकनों को मिलाकर भ्रामक परिणामों को रोका जाता है।",
      stat1Val: "3",
      stat1Desc: "पुनर्प्राप्ति चरण (स्वतंत्र, संकेत, पहचान)",
      stat2Val: "16",
      stat2Desc: "दैनिक जीवन के पारिवारिक अवलोकन बिंदु",
      stat3Val: "100%",
      stat3Desc: "परिणाम के पीछे के पारदर्शी कारक",
    },
    splitFeature: {
      sectionHeading: "स्क्रीनिंग जो आपके परिवार को जानती है",
      sectionSub:
        "सामान्य किताबी सवाल भारत की विविधता में सही परिणाम नहीं देते। बुजुर्ग के अपने जीवन के अनुभवों से सही स्मृति जांची जाती है।",
      overlay1Title: "आवाज की स्थिरता",
      overlay1Val: "94%",
      overlay1Desc: "ध्वनिक स्थिरता सूचकांक",
      overlay2Title: "जीवन स्मृति",
      overlay2Val: "10/10",
      overlay2Desc: "सत्यापित व्यक्तिगत स्मृति बिंदु",
      principleTitle:
        "परिवारों और स्वास्थ्य कार्यकर्ताओं के लिए निर्मित, निदान के लिए नहीं।",
      principleLabel: "हमारा मुख्य नैदानिक सिद्धांत",
    },
    marquee: {
      sectionHeading: "भारतीय समुदायों के लिए निर्मित",
      sectionSub: "बहुभाषी, सुलभ और सामुदायिक स्वास्थ्य की वास्तविकताओं पर आधारित।",
      pillsRow1: [
        "आवाज-आधारित स्क्रीनिंग",
        "ಕನ್ನಡ (कन्नड़)",
        "निरक्षरता बाधा मुक्त",
        "जीवन स्मृति जांच",
        "हिन्दी (हिंदी)",
        "डॉक्टर रिपोर्ट तैयार",
      ],
      pillsRow2: [
        "डॉक्टर परामर्श सहायता",
        "पारिवारिक सत्यापित तथ्य",
        "English (अंग्रेजी)",
        "ध्वनि प्रवाह विश्लेषण",
        "गोपनीयता सुरक्षित",
        "आशा कार्यकर्ता अनुकूल",
      ],
    },
    faq: {
      sectionHeading: "अक्सर पूछे जाने वाले प्रश्न",
      leftCardTitle: "क्या आपके कोई प्रश्न हैं?",
      leftCardDesc:
        "हमारा टूल परिवारों और स्वास्थ्य कार्यकर्ताओं को सम्मान, गोपनीयता और पारदर्शिता के साथ सहयोग देने के लिए बनाया गया है।",
      leftCardButton: "जांच शुरू करें",
      items: [
        {
          q: "क्या यह डिमेंशिया या अल्जाइमर का डॉक्टरी निदान है?",
          a: "नहीं। न्यूरोसेंस केवल एक प्रारंभिक स्क्रीनिंग सहायता और डॉक्टर परामर्श सहायता टूल है। यह किसी भी स्थिति का निदान नहीं करता। केवल डॉक्टर ही निदान कर सकते हैं।",
        },
        {
          q: "इस टूल का उपयोग किसे करना चाहिए?",
          a: "यह उन बुजुर्गों के लिए है जिनके परिवार या आशा कार्यकर्ता उनकी याददाश्त और वाणी की सामान्य स्थिति का एक शुरुआती आकलन चाहते हैं।",
        },
        {
          q: "कौन सी भाषाएं उपलब्ध हैं?",
          a: "वर्तमान में हिंदी, कन्नड़ और अंग्रेजी पूरी तरह समर्थित हैं। अन्य भारतीय भाषाओं पर कार्य जारी है।",
        },
        {
          q: "पारिवारिक जानकारी कैसे सुरक्षित रहती है?",
          a: "पारिवारिक तथ्य और ऑडियो आपकी स्पष्ट सहमति से सुरक्षित और एन्क्रिप्टेड रखे जाते हैं। डेटा कभी बेचा या साझा नहीं किया जाता।",
        },
        {
          q: "जांच के बाद क्या करना चाहिए?",
          a: "आपको एक विस्तृत रिपोर्ट मिलती है। यदि कोई चिंताजनक संकेत दिखाई दें, तो रिपोर्ट लेकर किसी योग्य डॉक्टर या न्यूरोलॉजिस्ट से परामर्श लें।",
        },
      ],
    },
    footer: {
      tagline:
        "बुजुर्गों के लिए आवाज-आधारित, बहुभाषी प्रारंभिक संज्ञानात्मक स्क्रीनिंग सहायता।",
      disclaimer:
        "यह केवल एक स्क्रीनिंग सहायता है, निदान नहीं। केवल डॉक्टर ही निदान कर सकते हैं। थकान, सुनने में कमी, या दवाइयों का असर भी परिणामों पर पड़ सकता है।",
      col1Title: "उत्पाद",
      col1Links: ["प्रक्रिया", "स्मृति जांच", "डॉक्टर रिपोर्ट", "आशा वर्कफ़्लो"],
      col2Title: "भाषाएं",
      col2Links: ["English", "हिन्दी (Hindi)", "ಕನ್ನಡ (Kannada)"],
      col3Title: "गोपनीयता व नैतिकता",
      col3Links: ["नैदानिक सुरक्षा", "डेटा सुरक्षा", "सहमति नीति"],
      copyright:
        "© 2026 NeuroSense. बुजुर्गों की सम्मानजनक और समय पर देखभाल के लिए समर्पित।",
    },
  },

  kn: {
    nav: {
      howItWorks: "ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ",
      lifeMemory: "ನೆನಪಿನ ಪರೀಕ್ಷೆ",
      science: "ವಿಜ್ಞಾನ",
      languages: "ಭಾಷೆಗಳು",
      faq: "ಪ್ರಶ್ನೋತ್ತರ",
      startScreening: "ಪರೀಕ್ಷೆ ಪ್ರಾರಂಭಿಸಿ",
    },
    hero: {
      pill: "ತಪಾಸಣಾ ನೆರವು, ರೋಗನಿರ್ಣಯವಲ್ಲ",
      headline: "ನೆನಪಿನ ಬದಲಾವಣೆಗಳನ್ನು ಮುಂಚಿತವಾಗಿ ಮತ್ತು ನಿಮ್ಮದೇ ಭಾಷೆಯಲ್ಲಿ ಗುರುತಿಸಿ.",
      subheadline:
        "ಹಿರಿಯರಿಗಾಗಿ ಧ್ವನಿ-ಆಧಾರಿತ, ಬಹುಭಾಷಾ ಪ್ರಾಥಮಿಕ ಅರಿವಿನ ತಪಾಸಣಾ ಸಾಧನ. ಓದು-ಬರಹದ ಅಗತ್ಯವಿಲ್ಲ.",
      ctaPrimary: "ಪರೀಕ್ಷೆ ಪ್ರಾರಂಭಿಸಿ",
      ctaSecondary: "ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ ನೋಡಿ",
      disclaimer: "ಇದು ಕೇವಲ ತಪಾಸಣಾ ನೆರವು, ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯವಲ್ಲ.",
      sampleFact: "ಮೊಮ್ಮಗನ ಹೆಸರು: ಆಕಾಶ್",
      sampleAnswer: "ನಮ್ಮ ಆಕಾಶ್ ಕಳೆದ ಭಾನುವಾರ ನಮ್ಮನ್ನು ನೋಡಲು ಬಂದಿದ್ದ...",
      recalledStatus: "✓ ನೆನಪಿಸಿಕೊಂಡಿದ್ದಾರೆ",
    },
    stats: {
      avatarText: "3 ಭಾಷೆಗಳು",
      stat1Number: "3",
      stat1Label: "ಆರಂಭಿಕ ಭಾಷೆಗಳು",
      stat2Number: "10",
      stat2Label: "ಕುಟುಂಬದ ದೃಢೀಕೃತ ಅಂಶಗಳು",
      stat3Number: "0",
      stat3Label: "ಓದು-ಬರಹದ ಅಗತ್ಯವಿಲ್ಲ",
    },
    threeCards: {
      sectionHeading: "ಪ್ರತಿ ಕುಟುಂಬಕ್ಕೂ ಸೂಕ್ತವಾದ ಸರಳ ತಪಾಸಣೆ",
      sectionSub:
        "ಸಾಂಪ್ರದಾಯಿಕ ಪರೀಕ್ಷೆಗಳಲ್ಲಿರುವ ಶೈಕ್ಷಣಿಕ ಮತ್ತು ಭಾಷಾ ತಾರತಮ್ಯವನ್ನು ನಿವಾರಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.",
      card1Badge: "ಸುಲಭ ಪ್ರವೇಶ",
      card1Num: "01",
      card1Title: "ಮಾತೃಭಾಷೆಯಲ್ಲಿ ಧ್ವನಿ ಸಂಭಾಷಣೆ",
      card1Desc:
        "ಕನ್ನಡ, ಹಿಂದಿ ಅಥವಾ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಸಹಜ ಮಾತುಕತೆ. ಓದು-ಬರಹ ಬಾರದ ಹಿರಿಯರಿಗೂ ಪರೀಕ್ಷೆಯ ಭಯವಿಲ್ಲದೆ ಸಲೀಸು.",
      card2Badge: "ವೈಯಕ್ತಿಕ ಕಾಳಜಿ",
      card2Num: "02",
      card2Title: "ಕುಟುಂಬದ ಜೀವನ ಸ್ಮೃತಿ ಪರಿಶೀಲನೆ",
      card2Desc:
        "ಪ್ರಶ್ನೆಗಳು ಹಿರಿಯರ ಸ್ವಂತ ಜೀವನದ ಸತ್ಯಗಳ ಮೇಲೆ ಆಧಾರಿತವಾಗಿರುತ್ತವೆ—ಕುಟುಂಬದವರ ಹೆಸರು, ಹುಟ್ಟೂರು ಮತ್ತು ಇತ್ತೀಚಿನ ಘಟನೆಗಳು.",
      card3Badge: "ವೈದ್ಯಕೀಯ ನೆರವು",
      card3Num: "03",
      card3Title: "ವೈದ್ಯರಿಗೆ ಸೂಕ್ತವಾದ ವರದಿ",
      card3Desc:
        "ವೈದ್ಯರ ಬಳಿ ಚರ್ಚಿಸಲು ಸ್ಪಷ್ಟವಾದ ಮತ್ತು ವಸ್ತುನಿಷ್ಠ ಸಾರಾಂಶ ವರದಿಯನ್ನು ಸಿದ್ಧಪಡಿಸುತ್ತದೆ.",
    },
    timeline: {
      sectionHeading: "ತಪಾಸಣೆ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ",
      sectionSub: "ಹಿರಿಯರ ಗೌರವ ಕಾಪಾಡುವ ನಾಲ್ಕು ಸರಳ ಹಂತಗಳ ಪ್ರಕ್ರಿಯೆ.",
      step1Chip: "01",
      step1Label: "ಹಂತ 1: ಕುಟುಂಬದ ವಿವರ",
      step1Title: "ಕುಟುಂಬದವರು ವಿವರ ದಾಖಲಿಸುತ್ತಾರೆ",
      step1Year: "10",
      step1YearLabel: "ವೈಯಕ್ತಿಕ ಸತ್ಯಗಳು",
      step1Desc:
        "ಕುಟುಂಬದವರು ಅಥವಾ ಆಶಾ ಕಾರ್ಯಕರ್ತೆಯರು ಹಿರಿಯರ 10 ನೈಜ ಸತ್ಯಗಳು ಮತ್ತು ದೈನಂದಿನ ಅವಲೋಕನಗಳನ್ನು ದಾಖಲಿಸುತ್ತಾರೆ.",
      step2Chip: "02",
      step2Label: "ಹಂತ 2: ಧ್ವನಿ ಸಂಭಾಷಣೆ",
      step2Title: "ಆಪ್ತವಾದ ಮಾತುಕತೆ",
      step2Year: "0",
      step2YearLabel: "ಲಿಖಿತ ನಮೂನೆಗಳಿಲ್ಲ",
      step2Desc:
        "ಹಿರಿಯರು ತಮ್ಮ ಮಾತೃಭಾಷೆಯಲ್ಲಿ ಸಾಧನದೊಂದಿಗೆ ಮುಕ್ತವಾಗಿ ಮಾತನಾಡಿ, ತಮ್ಮ ಜೀವನದ ಸರಳ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸುತ್ತಾರೆ.",
      step3Chip: "03",
      step3Label: "ಹಂತ 3: ಹಂತ ಹಂತದ ನೆನಪಿಸುವಿಕೆ",
      step3Title: "ನೆನಪು, ಸುಳಿವು, ಗುರುತಿಸುವಿಕೆ",
      step3Year: "3",
      step3YearLabel: "ಪರಿಶೀಲನಾ ಹಂತಗಳು",
      step3Desc:
        "ಉತ್ತರ ನೆನಪಾಗದಿದ್ದರೆ ಮೃದುವಾದ ಸುಳಿವುಗಳನ್ನು ನೀಡಲಾಗುತ್ತದೆ—ತಜ್ಞ ವೈದ್ಯರು ಪರಿಶೀಲಿಸುವ ವಿಧಾನದಂತೆಯೇ.",
      step4Chip: "04",
      step4Label: "ಹಂತ 4: ಸ್ಪಷ್ಟ ವರದಿ",
      step4Title: "ಮುಂದಿನ ಕ್ರಮಕ್ಕೆ ಸಹಾಯಕ ವರದಿ",
      step4Year: "1",
      step4YearLabel: "ವಸ್ತುನಿಷ್ಠ ವರದಿ",
      step4Desc:
        "ವೈದ್ಯರ ಸಂಪರ್ಕಕ್ಕಾಗಿ ಸ್ಪಷ್ಟ ಅರಿವಿನ ಸ್ಥಿರತೆ ಸೂಚ್ಯಂಕ ಮತ್ತು ಕ್ಲಿನಿಕಲ್ ಸಾರಾಂಶವನ್ನು ನೀಡುತ್ತದೆ.",
    },
    metrics: {
      sectionHeading: "ತಪಾಸಣೆಯ ವೈಜ್ಞಾನಿಕ ಹಿನ್ನೆಲೆ",
      sectionSub: "ವೈಯಕ್ತಿಕ ನೆನಪು, ಧ್ವನಿಯ ಹರಿವು ಮತ್ತು ಕುಟುಂಬದ ಅವಲೋಕನಗಳ ಸಂಯೋಜಿತ ವಿಶ್ಲೇಷಣೆ.",
      pillarTitle: "ಮೂರು ಸ್ವತಂತ್ರ ಕ್ಲಿನಿಕಲ್ ಸಂಕೇತಗಳು",
      pillarDesc:
        "ಧ್ವನಿಯ ಏರಿಳಿತ, ನೆನಪಿನ ಶಕ್ತಿ ಮತ್ತು ದೈನಂದಿನ ನಡವಳಿಕೆಯನ್ನು ಒಟ್ಟಾಗಿ ಪರಿಶೀಲಿಸಿ ನಿಖರತೆ ಹೆಚ್ಚಿಸಲಾಗುತ್ತದೆ.",
      stat1Val: "3",
      stat1Desc: "ನೆನಪಿಸಿಕೊಳ್ಳುವ ಹಂತಗಳು (ಮುಕ್ತ, ಸುಳಿವು, ಆಯ್ಕೆ)",
      stat2Val: "16",
      stat2Desc: "ಕುಟುಂಬದ ದೈನಂದಿನ ನಡವಳಿಕೆ ಪರಿಶೀಲನಾ ಅಂಶಗಳು",
      stat3Val: "100%",
      stat3Desc: "ಪ್ರತಿ ಫಲಿತಾಂಶದ ಹಿಂದಿನ ಸ್ಪಷ್ಟ ಕಾರಣಗಳು",
    },
    splitFeature: {
      sectionHeading: "ನಿಮ್ಮ ಕುಟುಂಬವನ್ನು ಅರಿತ ತಪಾಸಣೆ",
      sectionSub:
        "ಸಾಮಾನ್ಯ ಪುಸ್ತಕದ ಪ್ರಶ್ನೆಗಳು ಹಿರಿಯರಿಗೆ ಹೊಂದಾಣಿಕೆಯಾಗುವುದಿಲ್ಲ. ಅವರ ಸ್ವಂತ ಜೀವನದ ನೆನಪುಗಳನ್ನು ಕೇಳುವುದರಿಂದ ನೈಜ ಸ್ಥಿತಿ ತಿಳಿಯುತ್ತದೆ.",
      overlay1Title: "ಧ್ವನಿ ಸ್ಥಿರತೆ",
      overlay1Val: "94%",
      overlay1Desc: "ಧ್ವನಿ ಸ್ಥಿರತೆ ಸೂಚ್ಯಂಕ",
      overlay2Title: "ಜೀವನ ನೆನಪು",
      overlay2Val: "10/10",
      overlay2Desc: "ದೃಢೀಕೃತ ವೈಯಕ್ತಿಕ ನೆನಪಿನ ಅಂಶಗಳು",
      principleTitle:
        "ಕುಟುಂಬಗಳು ಮತ್ತು ಆರೋಗ್ಯ ಕಾರ್ಯಕರ್ತರಿಗಾಗಿ ರಚಿಸಲಾಗಿದೆ, ರೋಗನಿರ್ಣಯಕ್ಕಾಗಿ ಅಲ್ಲ.",
      principleLabel: "ನಮ್ಮ ಮುಖ್ಯ ನೈತಿಕ ತತ್ವ",
    },
    marquee: {
      sectionHeading: "ಭಾರತದ ಪ್ರತಿಯೊಂದು ಸಮುದಾಯಕ್ಕಾಗಿ",
      sectionSub: "ಬಹುಭಾಷಾ, ಸುಲಭ ಪ್ರವೇಶ ಮತ್ತು ಗ್ರಾಮೀಣ ಆರೋಗ್ಯ ವಾಸ್ತವಗಳಿಗೆ ಹೊಂದಿಕೊಳ್ಳುವಂತಿದೆ.",
      pillsRow1: [
        "ಧ್ವನಿ-ಆಧಾರಿತ ತಪಾಸಣೆ",
        "ಕನ್ನಡ (Kannada)",
        "ಅಕ್ಷರ ಜ್ಞಾನದ ಅಗತ್ಯವಿಲ್ಲ",
        "ಜೀವನ ಸ್ಮೃತಿ ಪರೀಕ್ಷೆ",
        "हिन्दी (Hindi)",
        "ವೈದ್ಯರಿಗೆ ನೀಡುವ ವರದಿ",
      ],
      pillsRow2: [
        "ವೈದ್ಯರ ಸಂಪರ್ಕ ನೆರವು",
        "ಕುಟುಂಬ-ದೃಢೀಕೃತ ಸತ್ಯಗಳು",
        "English (ಇಂಗ್ಲಿಷ್)",
        "ಧ್ವನಿ ಹರಿವಿನ ವಿಶ್ಲೇಷಣೆ",
        "ಗೌಪ್ಯತೆ ರಕ್ಷಿತ",
        "ಆಶಾ ಕಾರ್ಯಕರ್ತೆಯರಿಗೆ ಸುಲಭ",
      ],
    },
    faq: {
      sectionHeading: "ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು",
      leftCardTitle: "ತಪಾಸಣೆಯ ಕುರಿತು ಪ್ರಶ್ನೆಗಳಿವೆಯೇ?",
      leftCardDesc:
        "ನಮ್ಮ ತಪಾಸಣಾ ಸಾಧನವು ಕುಟುಂಬಗಳಿಗೆ ಮತ್ತು ಆರೋಗ್ಯ ಕಾರ್ಯಕರ್ತೆಯರಿಗೆ ಗೌರವ, ಗೌಪ್ಯತೆ ಮತ್ತು ಪಾರದರ್ಶಕತೆಯೊಂದಿಗೆ ನೆರವಾಗಲು ರಚಿಸಲಾಗಿದೆ.",
      leftCardButton: "ಪರೀಕ್ಷೆ ಪ್ರಾರಂಭಿಸಿ",
      items: [
        {
          q: "ಇದು ಆಲ್ಝೈಮರ್ಸ್ ಅಥವಾ ಬುದ್ಧಿಮಾಂದ್ಯತೆಯ ಅಂತಿಮ ರೋಗನಿರ್ಣಯವೇ?",
          a: "ಖಂಡಿತ ಇಲ್ಲ. ನ್ಯೂರೋಸೆನ್ಸ್ ಕೇವಲ ಪ್ರಾಥಮಿಕ ತಪಾಸಣೆ ಮತ್ತು ವೈದ್ಯಕೀಯ ಸಂಪರ್ಕ ನೆರವಿನ ಸಾಧನವಾಗಿದೆ. ಇದು ಯಾವುದೇ ರೋಗನಿರ್ಣಯ ಮಾಡುವುದಿಲ್ಲ. ಅರ್ಹ ವೈದ್ಯರು ಮಾತ್ರ ರೋಗನಿರ್ಣಯ ಮಾಡಬಲ್ಲರು.",
        },
        {
          q: "ಈ ತಪಾಸಣೆಯನ್ನು ಯಾರು ಬಳಸಬಹುದು?",
          a: "ಹಿರಿಯರ ನೆನಪಿನ ಶಕ್ತಿ ಮತ್ತು ಮಾತಿನ ಹರಿವಿನ ಆರಂಭಿಕ ಬದಲಾವಣೆಗಳನ್ನು ಗೌರವಯುತವಾಗಿ ತಿಳಿಯಲು ಬಯಸುವ ಕುಟುಂಬಗಳು ಅಥವಾ ಆಶಾ ಕಾರ್ಯಕರ್ತೆಯರು ಇದನ್ನು ಬಳಸಬಹುದು.",
        },
        {
          q: "ಯಾವ ಭಾಷೆಗಳು ಲಭ್ಯವಿವೆ?",
          a: "ಪ್ರಸ್ತುತ ಕನ್ನಡ, ಹಿಂದಿ ಮತ್ತು ಇಂಗ್ಲಿಷ್ ಭಾಷೆಗಳು ಲಭ್ಯವಿವೆ. ಶೀಘ್ರದಲ್ಲೇ ಇತರ ಭಾರತೀಯ ಭಾಷೆಗಳು ಸೇರ್ಪಡೆಯಾಗಲಿವೆ.",
        },
        {
          q: "ಕುಟುಂಬದ ವೈಯಕ್ತಿಕ ವಿವರಗಳು ಹೇಗೆ ಸುರಕ್ಷಿತವಾಗಿರುತ್ತವೆ?",
          a: "ಕುಟುಂಬದ ವಿವರಗಳು ಮತ್ತು ಧ್ವನಿ ಮುದ್ರಣಗಳು ನಿಮ್ಮ ಸಂಪೂರ್ಣ ಒಪ್ಪಿಗೆಯೊಂದಿಗೆ ಗೂಢಲಿಪೀಕರಿಸಲ್ಪಟ್ಟು (encrypted) ರಕ್ಷಿಸಲ್ಪಡುತ್ತವೆ. ಮಾಹಿತಿಯನ್ನು ಬೇರೆಯವರೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಲಾಗುವುದಿಲ್ಲ.",
        },
        {
          q: "ತಪಾಸಣೆ ಮುಗಿದ ನಂತರ ಏನು ಮಾಡಬೇಕು?",
          a: "ನಿಮಗೆ ಸ್ಪಷ್ಟವಾದ ಸಾರಾಂಶ ವರದಿ ದೊರೆಯುತ್ತದೆ. ಒಂದು ವೇಳೆ ಯಾವುದೇ ಎಚ್ಚರಿಕೆಯ ಅಂಶಗಳಿದ್ದರೆ, ಆ ವರದಿಯೊಂದಿಗೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ ಸಮಾಲೋಚನೆ ನಡೆಸಬಹುದು.",
        },
      ],
    },
    footer: {
      tagline: "ಹಿರಿಯರಿಗಾಗಿ ಧ್ವನಿ-ಆಧಾರಿತ, ಬಹುಭಾಷಾ ಪ್ರಾಥಮಿಕ ಅರಿವಿನ ತಪಾಸಣಾ ಸಹಾಯಕ ಸಾಧನ.",
      disclaimer:
        "ಇದು ತಪಾಸಣಾ ನೆರವು, ರೋಗನಿರ್ಣಯವಲ್ಲ. ವೈದ್ಯರು ಮಾತ್ರ ರೋಗನಿರ್ಣಯ ಮಾಡಬಲ್ಲರು. ಆಯಾಸ, ಶ್ರವಣ ದೋಷ, ಮನಸ್ಥಿತಿ ಅಥವಾ ಔಷಧಗಳು ಕೂಡ ಫಲಿತಾಂಶದ ಮೇಲೆ ಪ್ರಭಾವ ಬೀರಬಹುದು.",
      col1Title: "ಉತ್ಪನ್ನ",
      col1Links: ["ಕಾರ್ಯವಿಧಾನ", "ಜೀವನ ಸ್ಮೃತಿ", "ವೈದ್ಯರ ವರದಿ", "ಆಶಾ ವರ್ಕ್‌ಫ್ಲೋ"],
      col2Title: "ಭಾಷೆಗಳು",
      col2Links: ["English", "हिन्दी (Hindi)", "ಕನ್ನಡ (Kannada)"],
      col3Title: "ಗೌಪ್ಯತೆ ಮತ್ತು ನಿಯಮಗಳು",
      col3Links: ["ಕ್ಲಿನಿಕಲ್ ಸುರಕ್ಷತೆ", "ಡೇಟಾ ರಕ್ಷಣೆ", "ಸಮ್ಮತಿ ನೀತಿ"],
      copyright: "© 2026 NeuroSense. ಹಿರಿಯರ ಮುಂಚಿತ ಹಾಗೂ ಪ್ರೀತಿಯ ಆರೈಕೆಗಾಗಿ ಸಮರ್ಪಿತ.",
    },
  },
}

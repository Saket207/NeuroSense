/**
 * NeuroSense Default Life Facts & Informant Questionnaire Items
 * =============================================================
 */

import { DailyLifeQuestionItem, LifeFactItem } from "../types/familySetup"

export const DEFAULT_REQUIRED_LIFE_FACTS: Omit<LifeFactItem, "id">[] = [
  {
    factKey: "child_name",
    category: "people",
    defaultPrompt: {
      en: "What is the name of your son or daughter you are closest to?",
      hi: "आपके जिस बेटे या बेटी से आप सबसे करीब हैं, उनका नाम क्या है?",
      kn: "ನಿಮಗೆ ಹತ್ತಿರವಾದ ನಿಮ್ಮ ಮಗ ಅಥವಾ ಮಗಳ ಹೆಸರೇನು?",
    },
    questionText:
      "What is the name of your son or daughter you are closest to?",
    verifiedAnswer: "",
    acceptedAliases: [],
    cue: "They are your elder/younger child.",
    distractors: ["Ravi Kumar", "Suresh Sharma"],
    isSensitive: false,
  },
  {
    factKey: "grandchild_name",
    category: "people",
    defaultPrompt: {
      en: "What is the name of your grandchild who visits you?",
      hi: "आपके पोते, पोती या नाती का क्या नाम है?",
      kn: "ನಿಮ್ಮ ಮೊಮ್ಮಗ ಅಥವಾ ಮೊಮ್ಮಗಳ ಹೆಸರೇನು?",
    },
    questionText: "What is the name of your grandchild who visits you?",
    verifiedAnswer: "",
    acceptedAliases: [],
    cue: "They are in school or college.",
    distractors: ["Aarav", "Pooja"],
    isSensitive: false,
  },
  {
    factKey: "spouse_name",
    category: "people",
    defaultPrompt: {
      en: "What is the name of your husband or wife?",
      hi: "आपके पति या पत्नी का क्या नाम है?",
      kn: "ನಿಮ್ಮ ಪತಿ ಅಥವಾ ಪತ್ನಿಯ ಹೆಸರೇನು?",
    },
    questionText: "What is the name of your husband or wife?",
    verifiedAnswer: "",
    acceptedAliases: [],
    cue: "Your life partner.",
    distractors: ["Shanti Devi", "Kamala Bai"],
    isSensitive: false,
  },
  {
    factKey: "native_village",
    category: "place",
    defaultPrompt: {
      en: "What is the name of your native village or hometown where you grew up?",
      hi: "आपके पैतृक गाँव या शहर का क्या नाम है जहाँ आपका बचपन बीता?",
      kn: "ನಿಮ್ಮ ಹುಟ್ಟೂರು ಅಥವಾ ಬಾಲ್ಯ ಕಳೆದ ಊರಿನ ಹೆಸರೇನು?",
    },
    questionText:
      "What is the name of your native village or hometown where you grew up?",
    verifiedAnswer: "",
    acceptedAliases: [],
    cue: "It is near your ancestral district.",
    distractors: ["Belgaum", "Varanasi"],
    isSensitive: false,
  },
  {
    factKey: "wedding_year",
    category: "history",
    isNumeric: true,
    defaultPrompt: {
      en: "In what year were you married, or how many years has it been?",
      hi: "आपकी शादी किस साल में हुई थी, या शादी को कितने साल हो चुके हैं?",
      kn: "ನಿಮ್ಮ ಮದುವೆಯಾದ ವರ್ಷ ಯಾವುದು ಅಥವಾ ಮದುವೆಯಾಗಿ ಎಷ್ಟು ವರ್ಷಗಳಾಗಿವೆ?",
    },
    questionText:
      "In what year were you married, or how many years has it been?",
    verifiedAnswer: "",
    acceptedAliases: [],
    cue: "Think about the decade.",
    distractors: ["1972", "1985"],
    isSensitive: false,
  },
  {
    factKey: "former_occupation",
    category: "history",
    defaultPrompt: {
      en: "What main occupation or work did you do in your working years?",
      hi: "आपने अपनी ज़िंदगी में मुख्य रूप से क्या काम, खेती या नौकरी की?",
      kn: "ನಿಮ್ಮ ಜೀವನದಲ್ಲಿ ನೀವು ಮಾಡಿದ ಮುಖ್ಯ ಉದ್ಯೋಗ ಅಥವಾ ಕೆಲಸ ಯಾವುದು?",
    },
    questionText:
      "What main occupation or work did you do in your working years?",
    verifiedAnswer: "",
    acceptedAliases: [],
    cue: "Your daily work routine.",
    distractors: ["Teacher", "Farmer"],
    isSensitive: false,
  },
  {
    factKey: "favourite_food",
    category: "preference",
    defaultPrompt: {
      en: "What is your all-time favourite dish or sweet to eat?",
      hi: "आपका सबसे पसंदीदा खाना या मिठाई कौन सी है?",
      kn: "ನಿಮಗೆ ತಿನ್ನಲು ಅತ್ಯಂತ ಇಷ್ಟವಾದ ಊಟ ಅಥವಾ ಸಿಹಿ ತಿನಿಸು ಯಾವುದು?",
    },
    questionText: "What is your all-time favourite dish or sweet to eat?",
    verifiedAnswer: "",
    acceptedAliases: [],
    cue: "A traditional food you enjoy.",
    distractors: ["Kheer", "Halwa"],
    isSensitive: false,
  },
  {
    factKey: "family_festival",
    category: "preference",
    defaultPrompt: {
      en: "Which festival does your family celebrate most happily together?",
      hi: "आपके परिवार में कौन सा त्यौहार सबसे उत्साह से मनाया जाता है?",
      kn: "ನಿಮ್ಮ ಮನೆಯಲ್ಲಿ ಅತ್ಯಂತ ಸಂಭ್ರಮದಿಂದ ಆಚರಿಸುವ ಹಬ್ಬ ಯಾವುದು?",
    },
    questionText:
      "Which festival does your family celebrate most happily together?",
    verifiedAnswer: "",
    acceptedAliases: [],
    cue: "A major annual festival.",
    distractors: ["Diwali", "Ugadi"],
    isSensitive: false,
  },
  {
    factKey: "close_friend",
    category: "people",
    defaultPrompt: {
      en: "What is the name of your close friend or trusted neighbour?",
      hi: "आपके किसी पुराने दोस्त या पड़ोस के करीबी व्यक्ति का क्या नाम है?",
      kn: "ನಿಮ್ಮ ಆಪ್ತ ಸ್ನೇಹಿತ ಅಥವಾ ನೆರೆಹೊರೆಯವರ ಹೆಸರೇನು?",
    },
    questionText: "What is the name of your close friend or trusted neighbour?",
    verifiedAnswer: "",
    acceptedAliases: [],
    cue: "Someone who lives nearby.",
    distractors: ["Sharma Ji", "Patil Uncle"],
    isSensitive: false,
  },
  {
    factKey: "nearby_landmark",
    category: "place",
    defaultPrompt: {
      en: "What well-known temple, market, or bus stop is very close to your house?",
      hi: "आपके घर के सबसे पास कौन सा प्रसिद्ध मंदिर, बाज़ार या बस स्टैंड है?",
      kn: "ನಿಮ್ಮ ಮನೆಯ ಪಕ್ಕದಲ್ಲಿರುವ ಪ್ರಸಿದ್ಧ ದೇವಸ್ಥಾನ, ಮಾರುಕಟ್ಟೆ ಅಥವಾ ಬಸ್ ನಿಲ್ದಾಣ ಯಾವುದು?",
    },
    questionText:
      "What well-known temple, market, or bus stop is very close to your house?",
    verifiedAnswer: "",
    acceptedAliases: [],
    cue: "A place everyone in the area knows.",
    distractors: ["Main Bus Stand", "Shiva Temple"],
    isSensitive: false,
  },
]

export const DEFAULT_RECENT_EVENT_FACTS: Omit<LifeFactItem, "id">[] = [
  {
    factKey: "recent_visitor",
    category: "recent_event",
    isRecentEvent: true,
    defaultPrompt: {
      en: "Who came to visit our house this past weekend or a few days ago?",
      hi: "पिछले रविवार या कुछ दिन पहले हमारे घर कौन मिलने आया था?",
      kn: "ಕಳೆದ ಭಾನುವಾರ ಅಥವಾ ಕೆಲವು ದಿನಗಳ ಹಿಂದೆ ನಮ್ಮ ಮನೆಗೆ ಯಾರು ಬಂದಿದ್ದರು?",
    },
    questionText:
      "Who came to visit our house this past weekend or a few days ago?",
    verifiedAnswer: "",
    acceptedAliases: [],
    cue: "Someone from family or neighbourhood who visited recently.",
    distractors: ["Uncle Ramesh", "Pooja's family"],
    isSensitive: false,
  },
  {
    factKey: "recent_outing",
    category: "recent_event",
    isRecentEvent: true,
    defaultPrompt: {
      en: "Where did we go together last week for an outing or temple visit?",
      hi: "पिछले हफ़्ते हम सब साथ में कहाँ गए थे घूमने या मंदिर?",
      kn: "ಕಳೆದ ವಾರ ನಾವೆಲ್ಲರೂ ಒಟ್ಟಾಗಿ ಎಲ್ಲಿಗೆ ಹೋಗಿದ್ದೆವು?",
    },
    questionText:
      "Where did we go together last week for an outing or temple visit?",
    verifiedAnswer: "",
    acceptedAliases: [],
    cue: "A local visit last week.",
    distractors: ["Community Garden", "Town Market"],
    isSensitive: false,
  },
]

export const DEFAULT_DAILY_LIFE_ITEMS: Omit<DailyLifeQuestionItem, "id">[] = [
  {
    domain: "memory",
    isSafetyItem: false,
    questionText: "Repeats the same question or story within a short time",
    frequency: "never",
    onset: "not_sure",
  },
  {
    domain: "memory",
    isSafetyItem: false,
    questionText:
      "Forgets recent events (such as a visitor, a phone call, or what was eaten today)",
    frequency: "never",
    onset: "not_sure",
  },
  {
    domain: "memory",
    isSafetyItem: false,
    questionText:
      "Misplaces familiar everyday things and cannot retrace steps to find them",
    frequency: "never",
    onset: "not_sure",
  },
  {
    domain: "orientation",
    isSafetyItem: true,
    questionText:
      "Gets lost or disoriented on a familiar route, street, or neighbourhood",
    frequency: "never",
    onset: "not_sure",
  },
  {
    domain: "orientation",
    isSafetyItem: false,
    questionText:
      "Is confused about the current day of the week, month, date, or season",
    frequency: "never",
    onset: "not_sure",
  },
  {
    domain: "daily_tasks_money",
    isSafetyItem: false,
    questionText:
      "Has trouble handling money: calculating change, paying bills, or recognizing currency",
    frequency: "never",
    onset: "not_sure",
  },
  {
    domain: "daily_tasks_money",
    isSafetyItem: true,
    questionText:
      "Forgets regular medications or accidentally takes them twice",
    frequency: "never",
    onset: "not_sure",
  },
  {
    domain: "language",
    isSafetyItem: false,
    questionText:
      "Has noticeable trouble finding common words or loses the thread mid-sentence",
    frequency: "never",
    onset: "not_sure",
  },
  {
    domain: "language",
    isSafetyItem: false,
    questionText:
      "Has difficulty following conversations, stories, or TV programmes",
    frequency: "never",
    onset: "not_sure",
  },
  {
    domain: "memory",
    isSafetyItem: false,
    questionText:
      "Forgets names of close family members, grandchildren, or close friends",
    frequency: "never",
    onset: "not_sure",
  },
  {
    domain: "daily_tasks_money",
    isSafetyItem: false,
    questionText:
      "Struggles with routine tasks they did for decades (cooking, phone, TV remote)",
    frequency: "never",
    onset: "not_sure",
  },
  {
    domain: "safety",
    isSafetyItem: true,
    questionText:
      "Leaves the stove, gas burner, water taps, or house door unattended",
    frequency: "never",
    onset: "not_sure",
  },
  {
    domain: "behaviour_mood",
    isSafetyItem: false,
    questionText:
      "Noticeable change in mood or personality (more irritable, suspicious, withdrawn, or anxious)",
    frequency: "never",
    onset: "not_sure",
  },
  {
    domain: "behaviour_mood",
    isSafetyItem: false,
    questionText:
      "Lost interest in lifelong hobbies, religious prayers, socializing, or visiting people",
    frequency: "never",
    onset: "not_sure",
  },
  {
    domain: "safety",
    isSafetyItem: true,
    questionText:
      "Shows impaired judgement (falls for phone scams, gives away money inappropriately)",
    frequency: "never",
    onset: "not_sure",
  },
  {
    domain: "safety",
    isSafetyItem: true,
    questionText:
      "Significant sleep disturbance, disorientation at night, or nocturnal wandering",
    frequency: "never",
    onset: "not_sure",
  },
]

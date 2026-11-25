"""
NeuroSense Scenario Generator
=============================
Creates the 6 canonical fictional demo scenarios in demo/scenarios/<id>/
Each scenario contains:
  - profile.json (exact FamilySetupRecord schema)
  - answers_script.json (spoken words per question and stage)
  - intent.md (developer-only design intent documentation)
  - history/ (for savitri and lakshmi)
"""

import json
import os
from pathlib import Path
from datetime import datetime, timedelta

true = True
false = False

BASE_DIR = Path(__file__).resolve().parent.parent
DEMO_DIR = BASE_DIR / "demo" / "scenarios"
DEMO_DIR.mkdir(parents=True, exist_ok=True)

today = datetime.now()
date_recent_1 = (today - timedelta(days=3)).strftime("%Y-%m-%d")
date_recent_2 = (today - timedelta(days=6)).strftime("%Y-%m-%d")

SCENARIOS = {
    "lakshmi": {
        "profile": {
            "id": "setup_lakshmi_demo",
            "patientId": "demo_lakshmi",
            "version": 1,
            "createdAt": today.isoformat(),
            "updatedAt": today.isoformat(),
            "elderProfile": {
                "fullName": "Lakshmi K.",
                "age": 72,
                "gender": "Female",
                "languagesSpoken": ["Kannada", "English"],
                "preferredTestingLanguage": "kn",
                "dialectOrRegion": "South Karnataka (Mysuru)",
                "schoolingYears": 12,
                "literacyStatus": "can_read_write",
                "informantName": "Ramesh (Son)",
                "informantRelationship": "Child",
                "informantMeetingFrequency": "daily",
                "livingArrangement": "with_family",
            },
            "lifeFacts": [
                {
                    "id": "fact_1", "factKey": "child_name", "category": "people",
                    "questionText": "ನಿಮಗೆ ಹತ್ತಿರವಾದ ನಿಮ್ಮ ಮಗ ಅಥವಾ ಮಗಳ ಹೆಸರೇನು?",
                    "defaultPrompt": {"en": "What is the name of your child?", "hi": "आपके बच्चे का नाम क्या है?", "kn": "ನಿಮಗೆ ಹತ್ತಿರವಾದ ನಿಮ್ಮ ಮಗ ಅಥವಾ ಮಗಳ ಹೆಸರೇನು?"},
                    "verifiedAnswer": "ರಮೇಶ್", "acceptedAliases": ["ರಾಮು", "ರಮೇಶ"], "cue": "ನಿಮ್ಮ ಹಿರಿಯ ಮಗ.", "distractors": ["ಸುರೇಶ್", "ಆನಂದ್"], "isSensitive": false
                },
                {
                    "id": "fact_2", "factKey": "grandchild_name", "category": "people",
                    "questionText": "ನಿಮ್ಮ ಮೊಮ್ಮಗಳ ಹೆಸರೇನು?",
                    "defaultPrompt": {"en": "What is the name of your grandchild?", "hi": "आपकी पोती का क्या नाम है?", "kn": "ನಿಮ್ಮ ಮೊಮ್ಮಗಳ ಹೆಸರೇನು?"},
                    "verifiedAnswer": "ಅನನ್ಯ", "acceptedAliases": ["ಅನು"], "cue": "ಕಾಲೇಜಿಗೆ ಹೋಗುವ ಹುಡುಗಿ.", "distractors": ["ಪೂಜಾ", "ಸ್ನೇಹ"], "isSensitive": false
                },
                {
                    "id": "fact_3", "factKey": "spouse_name", "category": "people",
                    "questionText": "ನಿಮ್ಮ ಪತಿಯ ಹೆಸರೇನು?",
                    "defaultPrompt": {"en": "What is the name of your husband?", "hi": "आपके पति का क्या नाम है?", "kn": "ನಿಮ್ಮ ಪತಿಯ ಹೆಸರೇನು?"},
                    "verifiedAnswer": "ಶ್ರೀನಿವಾಸನ್", "acceptedAliases": ["ಶ್ರೀನಿವಾಸ್", "ಸೀನ"], "cue": "ನಿಮ್ಮ ಜೀವನ ಸಂಗಾತಿ.", "distractors": ["ವೆಂಕಟೇಶ್", "ರಾಮಮೂರ್ತಿ"], "isSensitive": false
                },
                {
                    "id": "fact_4", "factKey": "native_village", "category": "place",
                    "questionText": "ನಿಮ್ಮ ಹುಟ್ಟೂರು ಯಾವುದು?",
                    "defaultPrompt": {"en": "What is your native hometown?", "hi": "आपका पैतृक गाँव कौन सा है?", "kn": "ನಿಮ್ಮ ಹುಟ್ಟೂರು ಯಾವುದು?"},
                    "verifiedAnswer": "ಮೈಸೂರು", "acceptedAliases": ["ಮೈಸೂರು ನಗರ"], "cue": "ಅರಮನೆ ನಗರಿ.", "distractors": ["ಹಾಸನ", "ಮಂಡ್ಯ"], "isSensitive": false
                },
                {
                    "id": "fact_5", "factKey": "wedding_year", "category": "history", "isNumeric": True,
                    "questionText": "ನಿಮ್ಮ ಮದುವೆಯಾದ ವರ್ಷ ಯಾವುದು?",
                    "defaultPrompt": {"en": "In what year were you married?", "hi": "आपकी शादी किस वर्ष हुई थी?", "kn": "ನಿಮ್ಮ ಮದುವೆಯಾದ ವರ್ಷ ಯಾವುದು?"},
                    "verifiedAnswer": "1974", "acceptedAliases": ["74"], "cue": "ಎಪ್ಪತ್ತರ ದಶಕ.", "distractors": ["1970", "1980"], "isSensitive": false
                },
                {
                    "id": "fact_6", "factKey": "former_occupation", "category": "history",
                    "questionText": "ನೀವು ಮಾಡಿದ ಮುಖ್ಯ ಕೆಲಸ ಅಥವಾ ಉದ್ಯೋಗ ಯಾವುದು?",
                    "defaultPrompt": {"en": "What occupation did you do?", "hi": "आप क्या काम करते थे?", "kn": "ನೀವು ಮಾಡಿದ ಮುಖ್ಯ ಕೆಲಸ ಅಥವಾ ಉದ್ಯೋಗ ಯಾವುದು?"},
                    "verifiedAnswer": "ಶಿಕ್ಷಕಿ", "acceptedAliases": ["ಟೀಚರ್", "ಶಾಲಾ ಶಿಕ್ಷಕಿ"], "cue": "ಶಾಲೆಗೆ ಹೋಗಿ ಪಾಠ ಮಾಡುತ್ತಿದ್ದಿರಿ.", "distractors": ["ಬ್ಯಾಂಕ್ ನೌಕರ", "ಗುಮಾಸ್ತ"], "isSensitive": false
                },
                {
                    "id": "fact_7", "factKey": "favourite_food", "category": "preference",
                    "questionText": "ನಿಮಗೆ ಅತ್ಯಂತ ಇಷ್ಟವಾದ ಸಿಹಿ ತಿನಿಸು ಯಾವುದು?",
                    "defaultPrompt": {"en": "What is your favourite sweet?", "hi": "आपकी पसंदीदा मिठाई कौन सी है?", "kn": "ನಿಮಗೆ ಅತ್ಯಂತ ಇಷ್ಟವಾದ ಸಿಹಿ ತಿನಿಸು ಯಾವುದು?"},
                    "verifiedAnswer": "ಮೈಸೂರ್ ಪಾಕ್", "acceptedAliases": ["ಮೈಸೂರು ಪಾಕು"], "cue": "ಮೈಸೂರಿನ ಸಾಂಪ್ರದಾಯಿಕ ಸಿಹಿ.", "distractors": ["ಲಾಡು", "ಪೇಡ"], "isSensitive": false
                },
                {
                    "id": "fact_8", "factKey": "family_festival", "category": "preference",
                    "questionText": "ಮನೆಯಲ್ಲಿ ಸಂಭ್ರಮದಿಂದ ಆಚರಿಸುವ ಹಬ್ಬ ಯಾವುದು?",
                    "defaultPrompt": {"en": "Which festival do you celebrate?", "hi": "कौन सा त्यौहार मनाते हैं?", "kn": "ಮನೆಯಲ್ಲಿ ಸಂಭ್ರಮದಿಂದ ಆಚರಿಸುವ ಹಬ್ಬ ಯಾವುದು?"},
                    "verifiedAnswer": "ಯುಗಾದಿ", "acceptedAliases": ["ಉಗಾದಿ"], "cue": "ವರ್ಷದ ಹೊಸ ಹಬ್ಬ.", "distractors": ["ದೀಪಾವಳಿ", "ದಸರಾ"], "isSensitive": false
                },
                {
                    "id": "fact_9", "factKey": "close_friend", "category": "people",
                    "questionText": "ನಿಮ್ಮ ಆಪ್ತ ಸ್ನೇಹಿತೆಯ ಹೆಸರೇನು?",
                    "defaultPrompt": {"en": "What is the name of your close friend?", "hi": "आपकी सहेली का क्या नाम है?", "kn": "ನಿಮ್ಮ ಆಪ್ತ ಸ್ನೇಹಿತೆಯ ಹೆಸರೇನು?"},
                    "verifiedAnswer": "ಶಾಂತ", "acceptedAliases": ["ಶಾಂತಮ್ಮ"], "cue": "ಪಕ್ಕದ ಮನೆಯವರು.", "distractors": ["ಗೀತಾ", "ಸರೋಜ"], "isSensitive": false
                },
                {
                    "id": "fact_10", "factKey": "nearby_landmark", "category": "place",
                    "questionText": "ಮನೆಯ ಹತ್ತಿರವಿರುವ ಪ್ರಸಿದ್ಧ ಸ್ಥಳ ಯಾವುದು?",
                    "defaultPrompt": {"en": "What landmark is close to your home?", "hi": "घर के पास कौन सी जगह है?", "kn": "ಮನೆಯ ಹತ್ತಿರವಿರುವ ಪ್ರಸಿದ್ಧ ಸ್ಥಳ ಯಾವುದು?"},
                    "verifiedAnswer": "ಚಾಮುಂಡಿ ಸರ್ಕಲ್", "acceptedAliases": ["ಚಾಮುಂಡಿ ವೃತ್ತ"], "cue": "ದೊಡ್ಡ ವೃತ್ತ.", "distractors": ["ಬಸ್ ನಿಲ್ದಾಣ", "ರೈಲ್ವೆ ಸ್ಟೇಷನ್"], "isSensitive": false
                },
                {
                    "id": "fact_recent_1", "factKey": "recent_visitor", "category": "recent_event", "isRecentEvent": True, "eventDate": date_recent_1,
                    "questionText": "ಕಳೆದ ವಾರಾಂತ್ಯದಲ್ಲಿ ಮನೆಗೆ ಯಾರು ಬಂದಿದ್ದರು?",
                    "defaultPrompt": {"en": "Who visited recently?", "hi": "हाल ही में कौन मिलने आया था?", "kn": "ಕಳೆದ ವಾರಾಂತ್ಯದಲ್ಲಿ ಮನೆಗೆ ಯಾರು ಬಂದಿದ್ದರು?"},
                    "verifiedAnswer": "ರೋಹನ್", "acceptedAliases": ["ರೋಹಿತ್"], "cue": "ಬೆಂಗಳೂರಿನಿಂದ ಬಂದ ಸಂಬಂಧಿಕರು.", "distractors": ["ಪ್ರಕಾಶ್", "ಮಹೇಶ್"], "isSensitive": false
                },
                {
                    "id": "fact_recent_2", "factKey": "recent_outing", "category": "recent_event", "isRecentEvent": True, "eventDate": date_recent_2,
                    "questionText": "ಕಳೆದ ವಾರ ನಾವೆಲ್ಲರೂ ಎಲ್ಲಿಗೆ ಹೋಗಿದ್ದೆವು?",
                    "defaultPrompt": {"en": "Where did we go on an outing last week?", "hi": "पिछले हफ्ते हम कहाँ गए थे?", "kn": "ಕಳೆದ ವಾರ ನಾವೆಲ್ಲರೂ ಎಲ್ಲಿಗೆ ಹೋಗಿದ್ದೆವು?"},
                    "verifiedAnswer": "ಕೆ ಆರ್ ಎಸ್", "acceptedAliases": ["ಬೃಂದಾವನ", "ಕೆಆರ್‌ಎಸ್ ಡ್ಯಾಮ್"], "cue": "ನೀರು ಮತ್ತು ಉದ್ಯಾನವನವಿರುವ ಜಾಗ.", "distractors": ["ಚಾಮುಂಡಿ ಬೆಟ್ಟ", "ಚಿತ್ರಕಲಾ ಪರಿಷತ್ತು"], "isSensitive": false
                }
            ],
            "dailyLifeQuestionnaire": [
                {"id": "item_1", "domain": "memory", "isSafetyItem": False, "questionText": "Repeats the same question or story within a short time", "frequency": "never", "onset": "not_sure"},
                {"id": "item_2", "domain": "memory", "isSafetyItem": False, "questionText": "Forgets recent events (visitor, call, or what was eaten today)", "frequency": "never", "onset": "not_sure"},
                {"id": "item_3", "domain": "memory", "isSafetyItem": False, "questionText": "Misplaces familiar everyday things and cannot retrace steps", "frequency": "sometimes", "onset": "over_3_years"},
                {"id": "item_4", "domain": "orientation", "isSafetyItem": True, "questionText": "Gets lost or disoriented on a familiar route or street", "frequency": "never", "onset": "not_sure"},
                {"id": "item_5", "domain": "orientation", "isSafetyItem": False, "questionText": "Is confused about current day of week, month, or season", "frequency": "never", "onset": "not_sure"},
                {"id": "item_6", "domain": "daily_tasks_money", "isSafetyItem": False, "questionText": "Has trouble handling money: change, bills, or currency", "frequency": "never", "onset": "not_sure"},
                {"id": "item_7", "domain": "daily_tasks_money", "isSafetyItem": True, "questionText": "Forgets regular medications or takes them twice", "frequency": "never", "onset": "not_sure"},
                {"id": "item_8", "domain": "language", "isSafetyItem": False, "questionText": "Has noticeable trouble finding common words mid-sentence", "frequency": "never", "onset": "not_sure"},
                {"id": "item_9", "domain": "language", "isSafetyItem": False, "questionText": "Has difficulty following conversations, stories, or TV", "frequency": "never", "onset": "not_sure"},
                {"id": "item_10", "domain": "memory", "isSafetyItem": False, "questionText": "Forgets names of close family members or grandchildren", "frequency": "never", "onset": "not_sure"},
                {"id": "item_11", "domain": "daily_tasks_money", "isSafetyItem": False, "questionText": "Struggles with routine tasks done for decades", "frequency": "never", "onset": "not_sure"},
                {"id": "item_12", "domain": "safety", "isSafetyItem": True, "questionText": "Leaves stove, gas burner, or house door unattended", "frequency": "never", "onset": "not_sure"},
                {"id": "item_13", "domain": "behaviour_mood", "isSafetyItem": False, "questionText": "Noticeable change in mood (irritable, suspicious, withdrawn)", "frequency": "never", "onset": "not_sure"},
                {"id": "item_14", "domain": "behaviour_mood", "isSafetyItem": False, "questionText": "Lost interest in lifelong hobbies or socializing", "frequency": "never", "onset": "not_sure"},
                {"id": "item_15", "domain": "safety", "isSafetyItem": True, "questionText": "Shows impaired judgement (falls for scams, gives money)", "frequency": "never", "onset": "not_sure"},
                {"id": "item_16", "domain": "safety", "isSafetyItem": True, "questionText": "Significant sleep disturbance, disorientation at night", "frequency": "never", "onset": "not_sure"},
            ],
            "confounders": {
                "hearingDifficulty": False, "hasHearingAid": False, "visionDifficulty": False,
                "poorSleepRecently": False, "recentBereavement": False, "recentIllnessOrHospitalStay": False,
                "sedatingMedicines": False, "alcoholUse": False, "todayStateTired": False, "todayStateUnwellOrAnxious": False
            },
            "consent": {
                "informantConsentGiven": True, "informantConsentTimestamp": today.isoformat(),
                "informantConsentSignatureOrName": "Ramesh K.", "elderSpokenAssentGiven": True,
                "elderAssentTimestamp": today.isoformat()
            }
        },
        "answers_script": {
            "fact_1": {"stage": "free", "spoken": "ನನ್ನ ಮಗ ರಮೇಶ."},
            "fact_2": {"stage": "free", "spoken": "ಅನು, ನನ್ನ ಮುದ್ದಾದ ಮೊಮ್ಮಗಳು ಅನನ್ಯ."},
            "fact_3": {"stage": "free", "spoken": "ಶ್ರೀನಿವಾಸನ್."},
            "fact_4": {"stage": "free", "spoken": "ನಾವು ಹುಟ್ಟಿದ್ದು ಮೈಸೂರಿನಲ್ಲಿ."},
            "fact_5": {"stage": "free", "spoken": "1974 ರಲ್ಲಿ ಮದುವೆ ಆಯಿತು."},
            "fact_6": {"stage": "free", "spoken": "ನಾನು ಶಾಲಾ ಶಿಕ್ಷಕಿ ಆಗಿದ್ದೆ."},
            "fact_7": {"stage": "free", "spoken": "ಮೈಸೂರ್ ಪಾಕ್ ನಂಗೆ ತುಂಬಾ ಇಷ್ಟ."},
            "fact_8": {"stage": "free", "spoken": "ಯುಗಾದಿ ಹಬ್ಬ ಸಂಭ್ರಮದಿಂದ ಮಾಡ್ತೀವಿ."},
            "fact_9": {"stage": "free", "spoken": "ಶಾಂತಮ್ಮ, ನಮ್ಮ ಪಕ್ಕದ ಮನೆ ಶಾಂತ."},
            "fact_10": {"stage": "cued", "spoken": "ಚಾಮುಂಡಿ ಸರ್ಕಲ್."},
            "fact_recent_1": {"stage": "free", "spoken": "ರೋಹನ್ ಬಂದಿದ್ದ ನಮ್ಮ ಮನೆಗೆ."},
            "fact_recent_2": {"stage": "free", "spoken": "ಕೆ ಆರ್ ಎಸ್ ಗೆ ಹೋಗಿದ್ವಿ ಡ್ಯಾಮ್ ನೋಡೋಕೆ."}
        },
        "intent": "# Lakshmi: Healthy Baseline\nIllustrates a typical healthy elder in Kannada: 9 prompt free recalls, 1 cued, both recent events recalled, low informant concern. Designed to compute into Green risk tier with high confidence."
    },

    "ramesh": {
        "profile": {
            "id": "setup_ramesh_demo",
            "patientId": "demo_ramesh",
            "version": 1,
            "createdAt": today.isoformat(),
            "updatedAt": today.isoformat(),
            "elderProfile": {
                "fullName": "Rameshwar Prasad",
                "age": 68,
                "gender": "Male",
                "languagesSpoken": ["Hindi"],
                "preferredTestingLanguage": "hi",
                "dialectOrRegion": "Awadhi / Uttar Pradesh",
                "schoolingYears": 0,
                "literacyStatus": "cannot_read_write",
                "informantName": "Sunita (Daughter)",
                "informantRelationship": "Child",
                "informantMeetingFrequency": "daily",
                "livingArrangement": "with_family",
            },
            "lifeFacts": [
                {"id": "fact_1", "factKey": "child_name", "category": "people", "questionText": "आपके जिस बेटे या बेटी से आप सबसे करीब हैं, उनका नाम क्या है?", "defaultPrompt": {"en": "Child name?", "hi": "आपके जिस बेटे या बेटी से आप सबसे करीब हैं, उनका नाम क्या है?", "kn": "ಮಗ/ಮಗಳ ಹೆಸರು?"}, "verifiedAnswer": "सुनीता", "acceptedAliases": ["सोनी"], "cue": "आपकी बेटी.", "distractors": ["आरती", "ममता"], "isSensitive": false},
                {"id": "fact_2", "factKey": "grandchild_name", "category": "people", "questionText": "आपके पोते या नाती का क्या नाम है?", "defaultPrompt": {"en": "Grandchild name?", "hi": "आपके पोते या नाती का क्या नाम है?", "kn": "ಮೊಮ್ಮಕ್ಕಳ ಹೆಸರು?"}, "verifiedAnswer": "अमित", "acceptedAliases": ["अमू"], "cue": "गाँव में रहता है.", "distractors": ["राहुल", "सोनू"], "isSensitive": false},
                {"id": "fact_3", "factKey": "spouse_name", "category": "people", "questionText": "आपकी पत्नी का क्या नाम है?", "defaultPrompt": {"en": "Spouse name?", "hi": "आपकी पत्नी का क्या नाम है?", "kn": "ಪತ್ನಿಯ ಹೆಸರು?"}, "verifiedAnswer": "कांती", "acceptedAliases": ["कांती देवी"], "cue": "आपकी धर्मपत्नी.", "distractors": ["कमला", "शान्ति"], "isSensitive": false},
                {"id": "fact_4", "factKey": "native_village", "category": "place", "questionText": "आपके पैतृक गाँव का क्या नाम है?", "defaultPrompt": {"en": "Native village?", "hi": "आपके पैतृक गाँव का क्या नाम है?", "kn": "ಹುಟ್ಟೂರು?"}, "verifiedAnswer": "सीतापुर", "acceptedAliases": ["सीतापुर गाँव"], "cue": "गाँव जहाँ खेत हैं.", "distractors": ["हरदोई", "उन्नाव"], "isSensitive": false},
                {"id": "fact_5", "factKey": "wedding_year", "category": "history", "isNumeric": True, "questionText": "आपकी शादी किस साल में हुई थी?", "defaultPrompt": {"en": "Wedding year?", "hi": "आपकी शादी किस साल में हुई थी?", "kn": "ಮದುವೆ ವರ್ಷ?"}, "verifiedAnswer": "1976", "acceptedAliases": ["76"], "cue": "सत्तर के दशक में.", "distractors": ["1970", "1982"], "isSensitive": false},
                {"id": "fact_6", "factKey": "former_occupation", "category": "history", "questionText": "आपने मुख्य रूप से क्या काम किया?", "defaultPrompt": {"en": "Occupation?", "hi": "आपने मुख्य रूप से क्या काम किया?", "kn": "ಕೆಲಸ?"}, "verifiedAnswer": "किसान", "acceptedAliases": ["खेती", "खेती किसानी"], "cue": "खेत में हल चलाते थे.", "distractors": ["दुकान", "ड्राइवर"], "isSensitive": false},
                {"id": "fact_7", "factKey": "favourite_food", "category": "preference", "questionText": "आपकी पसंदीदा मिठाई कौन सी है?", "defaultPrompt": {"en": "Favourite food?", "hi": "आपकी पसंदीदा मिठाई कौन सी है?", "kn": "ಊಟ/ಸಿಹಿ?"}, "verifiedAnswer": "जलेबी", "acceptedAliases": ["गरम जलेबी"], "cue": "गोल-गोल रस वाली.", "distractors": ["लड्डू", "पेड़ा"], "isSensitive": false},
                {"id": "fact_8", "factKey": "family_festival", "category": "preference", "questionText": "परिवार में कौन सा त्यौहार सबसे उत्साह से मनाते हैं?", "defaultPrompt": {"en": "Festival?", "hi": "परिवार में कौन सा त्यौहार सबसे उत्साह से मनाते हैं?", "kn": "ಹಬ್ಬ?"}, "verifiedAnswer": "होली", "acceptedAliases": ["फाग"], "cue": "रंगों का त्यौहार.", "distractors": ["दीवाली", "दशहरा"], "isSensitive": false},
                {"id": "fact_9", "factKey": "close_friend", "category": "people", "questionText": "आपके पुराने दोस्त का क्या नाम है?", "defaultPrompt": {"en": "Friend?", "hi": "आपके पुराने दोस्त का क्या नाम है?", "kn": "ಸ್ನೇಹಿತ?"}, "verifiedAnswer": "रामफल", "acceptedAliases": ["रामफल भाई"], "cue": "साथ में खेती करते थे.", "distractors": ["श्यामू", "मंगत"], "isSensitive": false},
                {"id": "fact_10", "factKey": "nearby_landmark", "category": "place", "questionText": "गाँव के पास कौन सी जानी-मानी जगह है?", "defaultPrompt": {"en": "Landmark?", "hi": "गाँव के पास कौन सी जानी-मानी जगह है?", "kn": "ಗುರುತು?"}, "verifiedAnswer": "पुरानी चुंगी", "acceptedAliases": ["चुंगी"], "cue": "सड़क का मोड़.", "distractors": ["नहर पुल", "रेलवे फाटक"], "isSensitive": false},
                {"id": "fact_recent_1", "factKey": "recent_visitor", "category": "recent_event", "isRecentEvent": True, "eventDate": date_recent_1, "questionText": "पिछले रविवार कौन मिलने आया था?", "defaultPrompt": {"en": "Recent visitor?", "hi": "पिछले रविवार कौन मिलने आया था?", "kn": "ಬಂದವರು?"}, "verifiedAnswer": "पंकज", "acceptedAliases": ["पंकज भतीजा"], "cue": "शहर से आया था.", "distractors": ["राकेश", "दिनेश"], "isSensitive": false},
                {"id": "fact_recent_2", "factKey": "recent_outing", "category": "recent_event", "isRecentEvent": True, "eventDate": date_recent_2, "questionText": "पिछले हफ्ते हम सब कहाँ गए थे?", "defaultPrompt": {"en": "Recent outing?", "hi": "पिछले हफ्ते हम सब कहाँ गए थे?", "kn": "ಹೋದ ಜಾಗ?"}, "verifiedAnswer": "गंगा घाट", "acceptedAliases": ["नदी किनारे", "घाट"], "cue": "स्नान करने गए थे.", "distractors": ["तहसील", "अस्पताल"], "isSensitive": false}
            ],
            "dailyLifeQuestionnaire": [
                {"id": f"item_{i+1}", "domain": "memory", "isSafetyItem": False, "questionText": f"Questionnaire item {i+1}", "frequency": "never", "onset": "not_sure"}
                for i in range(16)
            ],
            "confounders": {k: False for k in ["hearingDifficulty", "hasHearingAid", "visionDifficulty", "poorSleepRecently", "recentBereavement", "recentIllnessOrHospitalStay", "sedatingMedicines", "alcoholUse", "todayStateTired", "todayStateUnwellOrAnxious"]},
            "consent": {"informantConsentGiven": True, "informantConsentTimestamp": today.isoformat(), "informantConsentSignatureOrName": "Sunita", "elderSpokenAssentGiven": True, "elderAssentTimestamp": today.isoformat()}
        },
        "answers_script": {
            "fact_1": {"stage": "free", "spoken": "हमार बिटिया सुनीता."},
            "fact_2": {"stage": "free", "spoken": "नाती अमित."},
            "fact_3": {"stage": "free", "spoken": "कांती, हमारी घरवाली."},
            "fact_4": {"stage": "free", "spoken": "हम सीतापुर गाँव के हैं जी."},
            "fact_5": {"stage": "free", "spoken": "शादी 1978 में भई रही."},  # partial within +/- 2y tolerance of 1976
            "fact_6": {"stage": "free", "spoken": "जिंदगी भर खेती किसानी करे हैं."},
            "fact_7": {"stage": "free", "spoken": "गरम जलेबी बहुत नीक लागत है."},
            "fact_8": {"stage": "free", "spoken": "होली मनाते हैं सब मिलके."},
            "fact_9": {"stage": "cued", "spoken": "रामफल भाई."},
            "fact_10": {"stage": "free", "spoken": "पुरानी चुंगी."},
            "fact_recent_1": {"stage": "free", "spoken": "पंकज आवा रहा."},
            "fact_recent_2": {"stage": "free", "spoken": "गंगा घाट गए रहे."}
        },
        "intent": "# Ramesh: Literacy-Free Demonstration\nDemonstrates that an illiterate rural elder with zero formal schooling performs well because questions test autobiographical lived memory. Evaluates to Green tier with education adjustment applied."
    },

    "savitri": {
        "profile": {
            "id": "setup_savitri_demo",
            "patientId": "demo_savitri",
            "version": 1,
            "createdAt": today.isoformat(),
            "updatedAt": today.isoformat(),
            "elderProfile": {
                "fullName": "Savitri Nair",
                "age": 75,
                "gender": "Female",
                "languagesSpoken": ["English", "Malayalam"],
                "preferredTestingLanguage": "en",
                "dialectOrRegion": "Kerala / Urban Bengaluru",
                "schoolingYears": 15,
                "literacyStatus": "can_read_write",
                "informantName": "Deepa (Daughter)",
                "informantRelationship": "Child",
                "informantMeetingFrequency": "several_per_week",
                "livingArrangement": "with_family",
            },
            "lifeFacts": [
                {"id": "fact_1", "factKey": "child_name", "category": "people", "questionText": "What is the name of your daughter?", "defaultPrompt": {"en": "What is the name of your daughter?", "hi": "आपकी बेटी का नाम क्या है?", "kn": "ನಿಮ್ಮ ಮಗಳ ಹೆಸರು?"}, "verifiedAnswer": "Deepa", "acceptedAliases": ["Deepu"], "cue": "Your daughter who is here today.", "distractors": ["Divya", "Geetha"], "isSensitive": false},
                {"id": "fact_2", "factKey": "grandchild_name", "category": "people", "questionText": "What is the name of your grandson?", "defaultPrompt": {"en": "What is the name of your grandson?", "hi": "पोते का नाम?", "kn": "ಮೊಮ್ಮಗನ ಹೆಸರು?"}, "verifiedAnswer": "Karan", "acceptedAliases": ["Karun"], "cue": "He plays tennis.", "distractors": ["Rohan", "Varun"], "isSensitive": false},
                {"id": "fact_3", "factKey": "spouse_name", "category": "people", "questionText": "What is your late husband's name?", "defaultPrompt": {"en": "Spouse name?", "hi": "पति का नाम?", "kn": "ಪತಿಯ ಹೆಸರು?"}, "verifiedAnswer": "Madhavan", "acceptedAliases": ["Madhav"], "cue": "Your husband.", "distractors": ["Narayanan", "Menon"], "isSensitive": false},
                {"id": "fact_4", "factKey": "native_village", "category": "place", "questionText": "Where were you born?", "defaultPrompt": {"en": "Where were you born?", "hi": "जन्म कहाँ हुआ?", "kn": "ಹುಟ್ಟೂರು?"}, "verifiedAnswer": "Kottayam", "acceptedAliases": ["Kottayam town"], "cue": "In central Kerala.", "distractors": ["Thrissur", "Kochi"], "isSensitive": false},
                {"id": "fact_5", "factKey": "wedding_year", "category": "history", "isNumeric": True, "questionText": "What year were you married?", "defaultPrompt": {"en": "Wedding year?", "hi": "शादी का साल?", "kn": "ಮದುವೆ ವರ್ಷ?"}, "verifiedAnswer": "1972", "acceptedAliases": ["72"], "cue": "In the early seventies.", "distractors": ["1968", "1978"], "isSensitive": false},
                {"id": "fact_6", "factKey": "former_occupation", "category": "history", "questionText": "What career did you have?", "defaultPrompt": {"en": "What career did you have?", "hi": "क्या नौकरी करते थे?", "kn": "ಉದ್ಯೋಗ?"}, "verifiedAnswer": "Nurse", "acceptedAliases": ["Head Nurse", "Nursing"], "cue": "You worked in the hospital.", "distractors": ["Doctor", "Teacher"], "isSensitive": false},
                {"id": "fact_7", "factKey": "favourite_food", "category": "preference", "questionText": "What is your favourite breakfast dish?", "defaultPrompt": {"en": "Favourite food?", "hi": "पसंदीदा खाना?", "kn": "ಇಷ್ಟದ ಊಟ?"}, "verifiedAnswer": "Appam", "acceptedAliases": ["Appam and stew"], "cue": "Traditional Kerala dish.", "distractors": ["Dosa", "Idli"], "isSensitive": false},
                {"id": "fact_8", "factKey": "family_festival", "category": "preference", "questionText": "Which festival do you celebrate most?", "defaultPrompt": {"en": "Festival?", "hi": "त्यौहार?", "kn": "ಹಬ್ಬ?"}, "verifiedAnswer": "Onam", "acceptedAliases": ["Thiruvonam"], "cue": "Harvest festival.", "distractors": ["Vishu", "Christmas"], "isSensitive": false},
                {"id": "fact_9", "factKey": "close_friend", "category": "people", "questionText": "What is your nursing friend's name?", "defaultPrompt": {"en": "Close friend?", "hi": "दोस्त का नाम?", "kn": "ಸ್ನೇಹಿತೆ?"}, "verifiedAnswer": "Mary", "acceptedAliases": ["Mary sister"], "cue": "She lives down the lane.", "distractors": ["Leela", "Saramma"], "isSensitive": false},
                {"id": "fact_10", "factKey": "nearby_landmark", "category": "place", "questionText": "What landmark is near your house?", "defaultPrompt": {"en": "Nearby landmark?", "hi": "पास का लैंडमार्क?", "kn": "ಸ್ಥಳ?"}, "verifiedAnswer": "St Jude Church", "acceptedAliases": ["The church", "St Jude"], "cue": "The big church at the corner.", "distractors": ["Railway Station", "Post Office"], "isSensitive": false},
                {"id": "fact_recent_1", "factKey": "recent_visitor", "category": "recent_event", "isRecentEvent": True, "eventDate": date_recent_1, "questionText": "Who visited us three days ago on Sunday?", "defaultPrompt": {"en": "Recent visitor?", "hi": "हाल ही में कौन आया था?", "kn": "ಬಂದವರು?"}, "verifiedAnswer": "Sunil", "acceptedAliases": ["Sunil cousin"], "cue": "Your cousin from Chennai.", "distractors": ["Rajesh", "Mohan"], "isSensitive": false},
                {"id": "fact_recent_2", "factKey": "recent_outing", "category": "recent_event", "isRecentEvent": True, "eventDate": date_recent_2, "questionText": "Where did we go for an outing last Friday?", "defaultPrompt": {"en": "Recent outing?", "hi": "कहाँ गए थे?", "kn": "ಹೋದ ಜಾಗ?"}, "verifiedAnswer": "Lalbagh", "acceptedAliases": ["Lalbagh garden", "Lalbagh Botanical Garden"], "cue": "The botanical garden with flower shows.", "distractors": ["Cubbon Park", "Phoenix Mall"], "isSensitive": false}
            ],
            "dailyLifeQuestionnaire": [
                {"id": "item_1", "domain": "memory", "isSafetyItem": False, "questionText": "Repeats same story or question", "frequency": "sometimes", "onset": "6_to_12_months"},
                {"id": "item_2", "domain": "memory", "isSafetyItem": False, "questionText": "Forgets recent events", "frequency": "often", "onset": "6_to_12_months"},
                {"id": "item_3", "domain": "memory", "isSafetyItem": False, "questionText": "Misplaces keys and spectacles", "frequency": "sometimes", "onset": "6_to_12_months"},
                {"id": "item_4", "domain": "orientation", "isSafetyItem": True, "questionText": "Gets disoriented", "frequency": "rarely", "onset": "6_to_12_months"},
                {"id": "item_5", "domain": "orientation", "isSafetyItem": False, "questionText": "Confused about dates", "frequency": "sometimes", "onset": "6_to_12_months"},
                {"id": "item_6", "domain": "daily_tasks_money", "isSafetyItem": False, "questionText": "Trouble handling money", "frequency": "rarely", "onset": "6_to_12_months"},
                {"id": "item_7", "domain": "daily_tasks_money", "isSafetyItem": True, "questionText": "Forgets medication", "frequency": "sometimes", "onset": "6_to_12_months"},
                {"id": "item_8", "domain": "language", "isSafetyItem": False, "questionText": "Word finding difficulty", "frequency": "sometimes", "onset": "6_to_12_months"},
                {"id": "item_9", "domain": "language", "isSafetyItem": False, "questionText": "Following conversations", "frequency": "rarely", "onset": "6_to_12_months"},
                {"id": "item_10", "domain": "memory", "isSafetyItem": False, "questionText": "Forgets acquaintances", "frequency": "rarely", "onset": "6_to_12_months"},
                {"id": "item_11", "domain": "daily_tasks_money", "isSafetyItem": False, "questionText": "Struggles with appliances", "frequency": "rarely", "onset": "6_to_12_months"},
                {"id": "item_12", "domain": "safety", "isSafetyItem": True, "questionText": "Leaves stove unattended", "frequency": "never", "onset": "not_sure"},
                {"id": "item_13", "domain": "behaviour_mood", "isSafetyItem": False, "questionText": "Change in mood", "frequency": "rarely", "onset": "6_to_12_months"},
                {"id": "item_14", "domain": "behaviour_mood", "isSafetyItem": False, "questionText": "Lost interest in hobbies", "frequency": "rarely", "onset": "6_to_12_months"},
                {"id": "item_15", "domain": "safety", "isSafetyItem": True, "questionText": "Impaired judgment", "frequency": "never", "onset": "not_sure"},
                {"id": "item_16", "domain": "safety", "isSafetyItem": True, "questionText": "Nocturnal wandering", "frequency": "never", "onset": "not_sure"},
            ],
            "confounders": {k: False for k in ["hearingDifficulty", "hasHearingAid", "visionDifficulty", "poorSleepRecently", "recentBereavement", "recentIllnessOrHospitalStay", "sedatingMedicines", "alcoholUse", "todayStateTired", "todayStateUnwellOrAnxious"]},
            "consent": {"informantConsentGiven": True, "informantConsentTimestamp": today.isoformat(), "informantConsentSignatureOrName": "Deepa Nair", "elderSpokenAssentGiven": True, "elderAssentTimestamp": today.isoformat()}
        },
        "answers_script": {
            "fact_1": {"stage": "free", "spoken": "Deepa, my daughter."},
            "fact_2": {"stage": "free", "spoken": "Karan."},
            "fact_3": {"stage": "free", "spoken": "Madhavan."},
            "fact_4": {"stage": "free", "spoken": "I was born in Kottayam."},
            "fact_5": {"stage": "cued", "spoken": "Nineteen seventy two."},
            "fact_6": {"stage": "cued", "spoken": "I worked as a Nurse."},
            "fact_7": {"stage": "free", "spoken": "Appam and stew."},
            "fact_8": {"stage": "cued", "spoken": "Onam."},
            "fact_9": {"stage": "recognition", "spoken": "Mary."},
            "fact_10": {"stage": "free", "spoken": "St Jude Church."},
            "fact_recent_1": {"stage": "cued", "spoken": "Sunil came."},
            "fact_recent_2": {"stage": "recognition", "spoken": "Lalbagh."}
        },
        "intent": "# Savitri: Mild Concerns + Visible Trend\nIllustrates mild memory changes where elder preserves some remote memories but requires cues for recent events and dates. Has 2 earlier sessions to display downward longitudinal slope into Amber tier."
    },

    "abdul": {
        "profile": {
            "id": "setup_abdul_demo",
            "patientId": "demo_abdul",
            "version": 1,
            "createdAt": today.isoformat(),
            "updatedAt": today.isoformat(),
            "elderProfile": {
                "fullName": "Abdul Rahim",
                "age": 79,
                "gender": "Male",
                "languagesSpoken": ["Hindi", "Urdu"],
                "preferredTestingLanguage": "hi",
                "dialectOrRegion": "Lucknow / Old City",
                "schoolingYears": 5,
                "literacyStatus": "can_read_only",
                "informantName": "Tariq (Son)",
                "informantRelationship": "Child",
                "informantMeetingFrequency": "daily",
                "livingArrangement": "with_family",
            },
            "lifeFacts": [
                {"id": "fact_1", "factKey": "child_name", "category": "people", "questionText": "आपके बेटे का क्या नाम है?", "defaultPrompt": {"en": "Child?", "hi": "आपके बेटे का क्या नाम है?", "kn": "ಮಗ?"}, "verifiedAnswer": "तारिक", "acceptedAliases": ["तारिक मियाँ"], "cue": "आपका बड़ा बेटा.", "distractors": ["असद", "इरफ़ान"], "isSensitive": false},
                {"id": "fact_2", "factKey": "grandchild_name", "category": "people", "questionText": "आपकी पोती का क्या नाम है?", "defaultPrompt": {"en": "Grandchild?", "hi": "आपकी पोती का क्या नाम है?", "kn": "ಮೊಮ್ಮಗಳು?"}, "verifiedAnswer": "ज़ोया", "acceptedAliases": ["गुड्डी"], "cue": "छोटी बच्ची.", "distractors": ["फ़ातिमा", "ज़ीनत"], "isSensitive": false},
                {"id": "fact_3", "factKey": "spouse_name", "category": "people", "questionText": "आपकी बीवी का क्या नाम है?", "defaultPrompt": {"en": "Spouse?", "hi": "आपकी बीवी का क्या नाम है?", "kn": "ಪತ್ನಿ?"}, "verifiedAnswer": "नसरीन", "acceptedAliases": ["नसरीन बेगम"], "cue": "आपकी बेगम.", "distractors": ["रज़िया", "शकीला"], "isSensitive": false},
                {"id": "fact_4", "factKey": "native_village", "category": "place", "questionText": "आपका पैतृक शहर कौन सा है?", "defaultPrompt": {"en": "Native city?", "hi": "आपका पैतृक शहर कौन सा है?", "kn": "ಊರು?"}, "verifiedAnswer": "लखनऊ", "acceptedAliases": ["पुराना लखनऊ"], "cue": "नवाबों का शहर.", "distractors": ["कानपुर", "फैज़ाबाद"], "isSensitive": false},
                {"id": "fact_5", "factKey": "wedding_year", "category": "history", "isNumeric": True, "questionText": "शादी किस साल में हुई थी?", "defaultPrompt": {"en": "Wedding year?", "hi": "शादी किस साल में हुई थी?", "kn": "ಮದುವೆ ವರ್ಷ?"}, "verifiedAnswer": "1968", "acceptedAliases": ["68"], "cue": "बहुत पुरानी बात है.", "distractors": ["1962", "1975"], "isSensitive": false},
                {"id": "fact_6", "factKey": "former_occupation", "category": "history", "questionText": "आप क्या काम करते थे?", "defaultPrompt": {"en": "Work?", "hi": "आप क्या काम करते थे?", "kn": "ಕೆಲಸ?"}, "verifiedAnswer": "दुकानदार", "acceptedAliases": ["दुकान", "कपड़े की दुकान"], "cue": "अमीनबाद में दुकान थी.", "distractors": ["मास्टरजी", "मुंशी"], "isSensitive": false},
                {"id": "fact_7", "factKey": "favourite_food", "category": "preference", "questionText": "आपका सबसे पसंदीदा खाना क्या है?", "defaultPrompt": {"en": "Food?", "hi": "आपका सबसे पसंदीदा खाना क्या है?", "kn": "ಊಟ?"}, "verifiedAnswer": "बिरयानी", "acceptedAliases": ["गोश्त बिरयानी"], "cue": "चावल और गोश्त का पकवान.", "distractors": ["निहारी", "कबाब"], "isSensitive": false},
                {"id": "fact_8", "factKey": "family_festival", "category": "preference", "questionText": "घर में सबसे बड़ा त्यौहार कौन सा है?", "defaultPrompt": {"en": "Festival?", "hi": "घर में सबसे बड़ा त्यौहार कौन सा है?", "kn": "ಹಬ್ಬ?"}, "verifiedAnswer": "ईद", "acceptedAliases": ["ईद उल फितर", "बड़ी ईद"], "cue": "सेवइयों वाला त्यौहार.", "distractors": ["बकरीद", "मोहर्रम"], "isSensitive": false},
                {"id": "fact_9", "factKey": "close_friend", "category": "people", "questionText": "आपके पुराने दोस्त का क्या नाम है?", "defaultPrompt": {"en": "Friend?", "hi": "आपके पुराने दोस्त का क्या नाम है?", "kn": "ಸ್ನೇಹಿತ?"}, "verifiedAnswer": "बशीर", "acceptedAliases": ["बशीर चाचा"], "cue": "साथ में नमाज़ पढ़ते थे.", "distractors": ["कासिम", "रशीद"], "isSensitive": false},
                {"id": "fact_10", "factKey": "nearby_landmark", "category": "place", "questionText": "घर के पास मशहूर जगह कौन सी है?", "defaultPrompt": {"en": "Landmark?", "hi": "घर के पास मशहूर जगह कौन सी है?", "kn": "ಜಾಗ?"}, "verifiedAnswer": "घंटाघर", "acceptedAliases": ["क्लॉक टॉवर"], "cue": "बड़ी घड़ी वाला मीनार.", "distractors": ["रूमी दरवाज़ा", "इमामबाड़ा"], "isSensitive": false},
                {"id": "fact_recent_1", "factKey": "recent_visitor", "category": "recent_event", "isRecentEvent": True, "eventDate": date_recent_1, "questionText": "पिछले इतवार कौन मिलने आया था?", "defaultPrompt": {"en": "Recent visitor?", "hi": "पिछले इतवार कौन मिलने आया था?", "kn": "ಬಂದವರು?"}, "verifiedAnswer": "इरफ़ान", "acceptedAliases": ["इरफ़ान भाई"], "cue": "कानपुर से आए थे.", "distractors": ["अकबर", "शब्बीर"], "isSensitive": false},
                {"id": "fact_recent_2", "factKey": "recent_outing", "category": "recent_event", "isRecentEvent": True, "eventDate": date_recent_2, "questionText": "पिछले हफ्ते हम कहाँ गए थे?", "defaultPrompt": {"en": "Outing?", "hi": "पिछले हफ्ते हम कहाँ गए थे?", "kn": "ಹೋದ ಜಾಗ?"}, "verifiedAnswer": "हज़रतगंज", "acceptedAliases": ["गंज"], "cue": "शाम को बाज़ार गए थे.", "distractors": ["चौक", "आलमबाग"], "isSensitive": false}
            ],
            "dailyLifeQuestionnaire": [
                {"id": "item_1", "domain": "memory", "isSafetyItem": False, "questionText": "Repeats stories", "frequency": "often", "onset": "under_6_months"},
                {"id": "item_2", "domain": "memory", "isSafetyItem": False, "questionText": "Forgets recent events", "frequency": "often", "onset": "under_6_months"},
                {"id": "item_3", "domain": "memory", "isSafetyItem": False, "questionText": "Misplaces things", "frequency": "often", "onset": "under_6_months"},
                {"id": "item_4", "domain": "orientation", "isSafetyItem": True, "questionText": "Gets lost outside", "frequency": "sometimes", "onset": "under_6_months"},
                {"id": "item_5", "domain": "orientation", "isSafetyItem": False, "questionText": "Confused about dates", "frequency": "often", "onset": "under_6_months"},
                {"id": "item_6", "domain": "daily_tasks_money", "isSafetyItem": False, "questionText": "Money handling errors", "frequency": "often", "onset": "under_6_months"},
                {"id": "item_7", "domain": "daily_tasks_money", "isSafetyItem": True, "questionText": "Medication errors", "frequency": "often", "onset": "under_6_months"},
                {"id": "item_8", "domain": "language", "isSafetyItem": False, "questionText": "Word-finding struggles", "frequency": "often", "onset": "under_6_months"},
                {"id": "item_9", "domain": "language", "isSafetyItem": False, "questionText": "Following stories", "frequency": "often", "onset": "under_6_months"},
                {"id": "item_10", "domain": "memory", "isSafetyItem": False, "questionText": "Forgets family names", "frequency": "sometimes", "onset": "under_6_months"},
                {"id": "item_11", "domain": "daily_tasks_money", "isSafetyItem": False, "questionText": "Struggles with routine tasks", "frequency": "often", "onset": "under_6_months"},
                {"id": "item_12", "domain": "safety", "isSafetyItem": True, "questionText": "Leaves stove unattended", "frequency": "often", "onset": "under_6_months"},  # SAFETY TRIGGER!
                {"id": "item_13", "domain": "behaviour_mood", "isSafetyItem": False, "questionText": "Mood changes", "frequency": "sometimes", "onset": "under_6_months"},
                {"id": "item_14", "domain": "behaviour_mood", "isSafetyItem": False, "questionText": "Lost interest in hobbies", "frequency": "often", "onset": "under_6_months"},
                {"id": "item_15", "domain": "safety", "isSafetyItem": True, "questionText": "Impaired judgment", "frequency": "sometimes", "onset": "under_6_months"},
                {"id": "item_16", "domain": "safety", "isSafetyItem": True, "questionText": "Nocturnal confusion", "frequency": "sometimes", "onset": "under_6_months"},
            ],
            "confounders": {k: False for k in ["hearingDifficulty", "hasHearingAid", "visionDifficulty", "poorSleepRecently", "recentBereavement", "recentIllnessOrHospitalStay", "sedatingMedicines", "alcoholUse", "todayStateTired", "todayStateUnwellOrAnxious"]},
            "consent": {"informantConsentGiven": True, "informantConsentTimestamp": today.isoformat(), "informantConsentSignatureOrName": "Tariq Rahim", "elderSpokenAssentGiven": True, "elderAssentTimestamp": today.isoformat()}
        },
        "answers_script": {
            "fact_1": {"stage": "free", "spoken": "तारिक मियाँ."},
            "fact_2": {"stage": "recognition", "spoken": "ज़ोया."},
            "fact_3": {"stage": "cued", "spoken": "नसरीन बेगम."},
            "fact_4": {"stage": "free", "spoken": "लखनऊ."},
            "fact_5": {"stage": "recognition", "spoken": "उन्नीस सौ अड़सठ."},
            "fact_6": {"stage": "recognition", "spoken": "दुकानदार."},
            "fact_7": {"stage": "free", "spoken": "कुछ याद नहीं आ रहा है."},  # no answer
            "fact_8": {"stage": "cued", "spoken": "ईद."},
            "fact_9": {"stage": "free", "spoken": "मालूम नहीं."},
            "fact_10": {"stage": "free", "spoken": "घंटाघर."},
            "fact_recent_1": {"stage": "free", "spoken": "कोई नहीं आया."},
            "fact_recent_2": {"stage": "free", "spoken": "कहीं नहीं गए."}
        },
        "intent": "# Abdul: Concerning Pattern & Safety Override\nIllustrates severe autobiographical and episodic recall difficulty coupled with frequent informant concerns and a critical recent safety hazard (gas stove left on <6m). Evaluates into Red risk tier with mandatory safety alert."
    },

    "kamala": {
        "profile": {
            "id": "setup_kamala_demo",
            "patientId": "demo_kamala",
            "version": 1,
            "createdAt": today.isoformat(),
            "updatedAt": today.isoformat(),
            "elderProfile": {
                "fullName": "Kamala Rao",
                "age": 70,
                "gender": "Female",
                "languagesSpoken": ["Kannada"],
                "preferredTestingLanguage": "kn",
                "dialectOrRegion": "Central Karnataka (Shivamogga)",
                "schoolingYears": 8,
                "literacyStatus": "can_read_write",
                "informantName": "Chetan (Nephew)",
                "informantRelationship": "Other Relative",
                "informantMeetingFrequency": "rarely",
                "livingArrangement": "with_family",
            },
            "lifeFacts": [
                {"id": "fact_1", "factKey": "child_name", "category": "people", "questionText": "ನಿಮ್ಮ ಮಗನ ಹೆಸರೇನು?", "defaultPrompt": {"en": "Son?", "hi": "बेटा?", "kn": "ನಿಮ್ಮ ಮಗನ ಹೆಸರೇನು?"}, "verifiedAnswer": "ಪ್ರಸಾದ್", "acceptedAliases": ["ಪ್ರಸನ್ನ"], "cue": "ನಿಮ್ಮ ಮಗ.", "distractors": ["ರವೀಂದ್ರ", "ರಾಜೇಶ್"], "isSensitive": false},
                {"id": "fact_2", "factKey": "grandchild_name", "category": "people", "questionText": "ನಿಮ್ಮ ಮೊಮ್ಮಗನ ಹೆಸರೇನು?", "defaultPrompt": {"en": "Grandchild?", "hi": "पोता?", "kn": "ಮೊಮ್ಮಗ?"}, "verifiedAnswer": "ವರುಣ್", "acceptedAliases": ["ಚಿಂಟು"], "cue": "ಶಾಲೆಗೆ ಹೋಗುವ ಹುಡುಗ.", "distractors": ["ಚರಣ್", "ದೀಪಕ್"], "isSensitive": false},
                {"id": "fact_3", "factKey": "spouse_name", "category": "people", "questionText": "ನಿಮ್ಮ ಪತಿಯ ಹೆಸರೇನು?", "defaultPrompt": {"en": "Spouse?", "hi": "पति?", "kn": "ಪತಿ?"}, "verifiedAnswer": "ವೆಂಕಟೇಶ್", "acceptedAliases": ["ವೆಂಕು"], "cue": "ನಿಮ್ಮ ಪತಿ.", "distractors": ["ನರಸಿಂಹ", "ಕೃಷ್ಣ"], "isSensitive": false},
                {"id": "fact_4", "factKey": "native_village", "category": "place", "questionText": "ನಿಮ್ಮ ಹುಟ್ಟೂರು ಯಾವುದು?", "defaultPrompt": {"en": "Hometown?", "hi": "गाँव?", "kn": "ಹುಟ್ಟೂರು?"}, "verifiedAnswer": "ಶಿವಮೊಗ್ಗ", "acceptedAliases": ["ಶಿಮೊಗ"], "cue": "ತುಂಗಾ ನದಿ ತೀರ.", "distractors": ["ಭದ್ರಾವತಿ", "ಚಿಕ್ಕಮಗಳೂರು"], "isSensitive": false},
                {"id": "fact_5", "factKey": "wedding_year", "category": "history", "isNumeric": True, "questionText": "ನಿಮ್ಮ ಮದುವೆಯಾದ ವರ್ಷ ಯಾವುದು?", "defaultPrompt": {"en": "Wedding year?", "hi": "शादी का साल?", "kn": "ಮದುವೆ ವರ್ಷ?"}, "verifiedAnswer": "1978", "acceptedAliases": ["78"], "cue": "ಎಪ್ಪತ್ತರ ದಶಕದ ಕೊನೆ.", "distractors": ["1973", "1983"], "isSensitive": false},
                {"id": "fact_6", "factKey": "former_occupation", "category": "history", "questionText": "ನೀವು ಮಾಡಿದ ಮುಖ್ಯ ಕೆಲಸ ಯಾವುದು?", "defaultPrompt": {"en": "Work?", "hi": "काम?", "kn": "ಕೆಲಸ?"}, "verifiedAnswer": "ಮನೆ ಕೆಲಸ", "acceptedAliases": ["ಗೃಹಿಣಿ"], "cue": "ಮನೆಯನ್ನು ನೋಡಿಕೊಳ್ಳುತ್ತಿದ್ದಿರಿ.", "distractors": ["ಶಿಕ್ಷಕಿ", "ಉದ್ಯೋಗಿ"], "isSensitive": false},
                {"id": "fact_7", "factKey": "favourite_food", "category": "preference", "questionText": "ನಿಮಗೆ ಅತ್ಯಂತ ಇಷ್ಟವಾದ ಊಟ ಯಾವುದು?", "defaultPrompt": {"en": "Food?", "hi": "खाना?", "kn": "ಊಟ?"}, "verifiedAnswer": "ಬಿಸಿ ಬೇಳೆ ಬಾತ್", "acceptedAliases": ["ಹುಳಿಅನ್ನ"], "cue": "ತರಕಾರಿ ಬೇಳೆ ಅನ್ನ.", "distractors": ["ಚಿತ್ರಾನ್ನ", "ಪುಳಿಯೋಗರೆ"], "isSensitive": false},
                {"id": "fact_8", "factKey": "family_festival", "category": "preference", "questionText": "ಮನೆಯಲ್ಲಿ ಸಂಭ್ರಮದಿಂದ ಆಚರಿಸುವ ಹಬ್ಬ ಯಾವುದು?", "defaultPrompt": {"en": "Festival?", "hi": "त्यौहार?", "kn": "ಹಬ್ಬ?"}, "verifiedAnswer": "ಗಣೇಶ ಚತುರ್ಥಿ", "acceptedAliases": ["ಗಣೇಶ ಹಬ್ಬ"], "cue": "ಮೋದಕ ಮಾಡುವ ಹಬ್ಬ.", "distractors": ["ಯುಗಾದಿ", "ದೀಪಾವಳಿ"], "isSensitive": false},
                {"id": "fact_9", "factKey": "close_friend", "category": "people", "questionText": "ನಿಮ್ಮ ಆಪ್ತ ಸ್ನೇಹಿತೆಯ ಹೆಸರೇನು?", "defaultPrompt": {"en": "Friend?", "hi": "सहेली?", "kn": "ಸ್ನೇಹಿತೆ?"}, "verifiedAnswer": "ಸುಜಾತ", "acceptedAliases": ["ಸುಜಾತಾ"], "cue": "ಬಾಲ್ಯದ ಸ್ನೇಹಿತೆ.", "distractors": ["ಕಮಲಾ", "ಪ್ರೇಮ"], "isSensitive": false},
                {"id": "fact_10", "factKey": "nearby_landmark", "category": "place", "questionText": "ಮನೆಯ ಹತ್ತಿರವಿರುವ ಗುರುತು ಯಾವುದು?", "defaultPrompt": {"en": "Landmark?", "hi": "जगह?", "kn": "ಜಾಗ?"}, "verifiedAnswer": "ಗಾಂಧಿ ಸರ್ಕಲ್", "acceptedAliases": ["ಗಾಂಧಿ ವೃತ್ತ"], "cue": "ಮುಖ್ಯ ವೃತ್ತ.", "distractors": ["ಬಸ್ ಸ್ಟ್ಯಾಂಡ್", "ಪೋಸ್ಟ್ ಆಫೀಸ್"], "isSensitive": false},
                {"id": "fact_recent_1", "factKey": "recent_visitor", "category": "recent_event", "isRecentEvent": True, "eventDate": date_recent_1, "questionText": "ಕಳೆದ ವಾರ ಮನೆಗೆ ಯಾರು ಬಂದಿದ್ದರು?", "defaultPrompt": {"en": "Visitor?", "hi": "आने वाले?", "kn": "ಬಂದವರು?"}, "verifiedAnswer": "ಮಂಜುಳ", "acceptedAliases": ["ಮಂಜು"], "cue": "ನಿಮ್ಮ ಅಕ್ಕ.", "distractors": ["ಲತಾ", "ಗೌರಿ"], "isSensitive": false},
                {"id": "fact_recent_2", "factKey": "recent_outing", "category": "recent_event", "isRecentEvent": True, "eventDate": date_recent_2, "questionText": "ಕಳೆದ ವಾರ ನಾವು ಎಲ್ಲಿಗೆ ಹೋಗಿದ್ದೆವು?", "defaultPrompt": {"en": "Outing?", "hi": "कहाँ गए?", "kn": "ಹೋದ ಜಾಗ?"}, "verifiedAnswer": "ಇಸ್ಕಾನ್ ದೇವಾಲಯ", "acceptedAliases": ["ಇಸ್ಕಾನ್"], "cue": "ಕೃಷ್ಣನ ದೊಡ್ಡ ದೇವಸ್ಥಾನ.", "distractors": ["ಲಾಲ್‌ಬಾಗ್", "ಮಾರುಕಟ್ಟೆ"], "isSensitive": false}
            ],
            "dailyLifeQuestionnaire": [
                {"id": "item_1", "domain": "memory", "isSafetyItem": False, "questionText": "Repeats stories", "frequency": "often", "onset": "over_3_years"},
                {"id": "item_2", "domain": "memory", "isSafetyItem": False, "questionText": "Forgets recent events", "frequency": "often", "onset": "over_3_years"},
                {"id": "item_3", "domain": "memory", "isSafetyItem": False, "questionText": "Misplaces items", "frequency": "often", "onset": "over_3_years"},
                {"id": "item_4", "domain": "orientation", "isSafetyItem": True, "questionText": "Gets lost", "frequency": "rarely", "onset": "over_3_years"},
                {"id": "item_5", "domain": "orientation", "isSafetyItem": False, "questionText": "Confused about dates", "frequency": "often", "onset": "over_3_years"},
                {"id": "item_6", "domain": "daily_tasks_money", "isSafetyItem": False, "questionText": "Money difficulties", "frequency": "often", "onset": "over_3_years"},
                {"id": "item_7", "domain": "daily_tasks_money", "isSafetyItem": True, "questionText": "Forgets medication", "frequency": "often", "onset": "over_3_years"},
                {"id": "item_8", "domain": "language", "isSafetyItem": False, "questionText": "Word finding problems", "frequency": "often", "onset": "over_3_years"},
                {"id": "item_9", "domain": "language", "isSafetyItem": False, "questionText": "Following conversations", "frequency": "often", "onset": "over_3_years"},
                {"id": "item_10", "domain": "memory", "isSafetyItem": False, "questionText": "Forgets names", "frequency": "often", "onset": "over_3_years"},
                {"id": "item_11", "domain": "daily_tasks_money", "isSafetyItem": False, "questionText": "Routine task struggle", "frequency": "often", "onset": "over_3_years"},
                {"id": "item_12", "domain": "safety", "isSafetyItem": True, "questionText": "Leaves stove on", "frequency": "never", "onset": "not_sure"},
                {"id": "item_13", "domain": "behaviour_mood", "isSafetyItem": False, "questionText": "Mood changes", "frequency": "often", "onset": "over_3_years"},
                {"id": "item_14", "domain": "behaviour_mood", "isSafetyItem": False, "questionText": "Lost interest in hobbies", "frequency": "often", "onset": "over_3_years"},
                {"id": "item_15", "domain": "safety", "isSafetyItem": True, "questionText": "Impaired judgment", "frequency": "never", "onset": "not_sure"},
                {"id": "item_16", "domain": "safety", "isSafetyItem": True, "questionText": "Night wandering", "frequency": "never", "onset": "not_sure"},
            ],
            "confounders": {k: False for k in ["hearingDifficulty", "hasHearingAid", "visionDifficulty", "poorSleepRecently", "recentBereavement", "recentIllnessOrHospitalStay", "sedatingMedicines", "alcoholUse", "todayStateTired", "todayStateUnwellOrAnxious"]},
            "consent": {"informantConsentGiven": True, "informantConsentTimestamp": today.isoformat(), "informantConsentSignatureOrName": "Chetan", "elderSpokenAssentGiven": True, "elderAssentTimestamp": today.isoformat()}
        },
        "answers_script": {
            "fact_1": {"stage": "free", "spoken": "ನನ್ನ ಮಗ ಪ್ರಸಾದ್."},
            "fact_2": {"stage": "free", "spoken": "ವರುಣ್, ಚಿಂಟು ಅಂತ ಕರೀತೀವಿ."},
            "fact_3": {"stage": "free", "spoken": "ವೆಂಕಟೇಶ್."},
            "fact_4": {"stage": "free", "spoken": "ಶಿವಮೊಗ್ಗ."},
            "fact_5": {"stage": "free", "spoken": "1978."},
            "fact_6": {"stage": "free", "spoken": "ಮನೆ ಕೆಲಸ ಗೃಹಿಣಿ."},
            "fact_7": {"stage": "free", "spoken": "ಬಿಸಿ ಬೇಳೆ ಬಾತ್."},
            "fact_8": {"stage": "free", "spoken": "ಗಣೇಶ ಹಬ್ಬ."},
            "fact_9": {"stage": "cued", "spoken": "ಸುಜಾತ."},
            "fact_10": {"stage": "free", "spoken": "ಗಾಂಧಿ ಸರ್ಕಲ್."},
            "fact_recent_1": {"stage": "free", "spoken": "ಮಂಜುಳಕ್ಕ ಬಂದಿದ್ದರು."},
            "fact_recent_2": {"stage": "free", "spoken": "ಇಸ್ಕಾನ್ ದೇವಸ್ಥಾನಕ್ಕೆ ಹೋಗಿದ್ವಿ."}
        },
        "intent": "# Kamala: Discordance Flag (High Family Concern, High Elder Performance)\nIllustrates the clinical discordance pattern: distant nephew rates high daily concern, but elder answers all personal life facts fluently. Triggers HIGH_INFORMANT_HIGH_ELDER clinical discordance flag."
    },

    "narayan": {
        "profile": {
            "id": "setup_narayan_demo",
            "patientId": "demo_narayan",
            "version": 1,
            "createdAt": today.isoformat(),
            "updatedAt": today.isoformat(),
            "elderProfile": {
                "fullName": "Narayan Kulkarni",
                "age": 77,
                "gender": "Male",
                "languagesSpoken": ["Kannada", "English"],
                "preferredTestingLanguage": "kn",
                "dialectOrRegion": "North Karnataka (Dharwad)",
                "schoolingYears": 10,
                "literacyStatus": "can_read_write",
                "informantName": "Shashi (Son)",
                "informantRelationship": "Child",
                "informantMeetingFrequency": "weekly",
                "livingArrangement": "with_family",
            },
            "lifeFacts": [
                {"id": "fact_1", "factKey": "child_name", "category": "people", "questionText": "ನಿಮ್ಮ ಮಗನ ಹೆಸರೇನು?", "defaultPrompt": {"en": "Son?", "hi": "बेटा?", "kn": "ನಿಮ್ಮ ಮಗನ ಹೆಸರೇನು?"}, "verifiedAnswer": "ಶಶಿ", "acceptedAliases": ["ಶಶಿಧರ್"], "cue": "ನಿಮ್ಮ ಮಗ.", "distractors": ["ಆನಂದ", "ರವೀಂದ್ರ"], "isSensitive": false},
                {"id": "fact_2", "factKey": "grandchild_name", "category": "people", "questionText": "ನಿಮ್ಮ ಮೊಮ್ಮಗನ ಹೆಸರೇನು?", "defaultPrompt": {"en": "Grandchild?", "hi": "पोता?", "kn": "ಮೊಮ್ಮಗ?"}, "verifiedAnswer": "ದೀಪಕ್", "acceptedAliases": ["ದೀಪು"], "cue": "ಹೈಸ್ಕೂಲ್ ಹುಡುಗ.", "distractors": ["ಚೇತನ್", "ಪ್ರವೀಣ್"], "isSensitive": false},
                {"id": "fact_3", "factKey": "spouse_name", "category": "people", "questionText": "ನಿಮ್ಮ ಪತ್ನಿಯ ಹೆಸರೇನು?", "defaultPrompt": {"en": "Spouse?", "hi": "पत्नी?", "kn": "ಪತ್ನಿ?"}, "verifiedAnswer": "ಗಿರಿಜಾ", "acceptedAliases": ["ಗಿರಿಜಮ್ಮ"], "cue": "ನಿಮ್ಮ ಹೆಂಡತಿ.", "distractors": ["ಸರೋಜ", "ಲಕ್ಷ್ಮಿ"], "isSensitive": false},
                {"id": "fact_4", "factKey": "native_village", "category": "place", "questionText": "ನಿಮ್ಮ ಹುಟ್ಟೂರು ಯಾವುದು?", "defaultPrompt": {"en": "Hometown?", "hi": "गाँव?", "kn": "ಹುಟ್ಟೂರು?"}, "verifiedAnswer": "ಧಾರವಾಡ", "acceptedAliases": ["ಧಾರವಾಡ ಜಿಲ್ಲೆ"], "cue": "ಉತ್ತರ ಕರ್ನಾಟಕದ ಊರು.", "distractors": ["ಹುಬ್ಬಳ್ಳಿ", "ಬೆಳಗಾವಿ"], "isSensitive": false},
                {"id": "fact_5", "factKey": "wedding_year", "category": "history", "isNumeric": True, "questionText": "ನಿಮ್ಮ ಮದುವೆಯಾದ ವರ್ಷ ಯಾವುದು?", "defaultPrompt": {"en": "Wedding year?", "hi": "शादी?", "kn": "ಮದುವೆ ವರ್ಷ?"}, "verifiedAnswer": "1973", "acceptedAliases": ["73"], "cue": "ಎಪ್ಪತ್ತರ ದಶಕ.", "distractors": ["1969", "1980"], "isSensitive": false},
                {"id": "fact_6", "factKey": "former_occupation", "category": "history", "questionText": "ನೀವು ಮಾಡಿದ ಮುಖ್ಯ ಉದ್ಯೋಗ ಯಾವುದು?", "defaultPrompt": {"en": "Work?", "hi": "काम?", "kn": "ಕೆಲಸ?"}, "verifiedAnswer": "ಗುಮಾಸ್ತ", "acceptedAliases": ["ಕ್ಲರ್ಕ್", "ಆಫೀಸ್ ಕ್ಲರ್ಕ್"], "cue": "ಸರ್ಕಾರಿ ಕಚೇರಿಯಲ್ಲಿ ಲೆಕ್ಕ ಬರೆಯುತ್ತಿದ್ದಿರಿ.", "distractors": ["ಅಧ್ಯಾಪಕ", "ಇಂಜಿನಿಯರ್"], "isSensitive": false},
                {"id": "fact_7", "factKey": "favourite_food", "category": "preference", "questionText": "ನಿಮಗೆ ಅತ್ಯಂತ ಇಷ್ಟವಾದ ತಿನಿಸು ಯಾವುದು?", "defaultPrompt": {"en": "Sweet?", "hi": "मिठाई?", "kn": "ತಿನಿಸು?"}, "verifiedAnswer": "ಧಾರವಾಡ ಪೇಡ", "acceptedAliases": ["ಪೇಡ"], "cue": "ಧಾರವಾಡದ ಹೆಸರುವಾಸಿ ಸಿಹಿ.", "distractors": ["ಜಹಾಂಗೀರ್", "ಬರ್ಫಿ"], "isSensitive": false},
                {"id": "fact_8", "factKey": "family_festival", "category": "preference", "questionText": "ಮನೆಯಲ್ಲಿ ಸಂಭ್ರಮದಿಂದ ಆಚರಿಸುವ ಹಬ್ಬ ಯಾವುದು?", "defaultPrompt": {"en": "Festival?", "hi": "त्यौहार?", "kn": "ಹಬ್ಬ?"}, "verifiedAnswer": "ದೀಪಾವಳಿ", "acceptedAliases": ["ದಿವಾಳಿ"], "cue": "ದೀಪಗಳ ಹಬ್ಬ.", "distractors": ["ದಸರಾ", "ಸಂಕ್ರಾಂತಿ"], "isSensitive": false},
                {"id": "fact_9", "factKey": "close_friend", "category": "people", "questionText": "ನಿಮ್ಮ ಹಳೆಯ ಸ್ನೇಹಿತರ ಹೆಸರೇನು?", "defaultPrompt": {"en": "Friend?", "hi": "दोस्त?", "kn": "ಸ್ನೇಹಿತ?"}, "verifiedAnswer": "ಕುಲಕರ್ಣಿ", "acceptedAliases": ["ಕುಲಕರ್ಣಿ ಸರ್"], "cue": "ಕಚೇರಿಯ ಸ್ನೇಹಿತರು.", "distractors": ["ಜೋಶಿ", "ದೇಸಾಯಿ"], "isSensitive": false},
                {"id": "fact_10", "factKey": "nearby_landmark", "category": "place", "questionText": "ಮನೆಯ ಹತ್ತಿರವಿರುವ ಜಾಗ ಯಾವುದು?", "defaultPrompt": {"en": "Landmark?", "hi": "जगह?", "kn": "ಜಾಗ?"}, "verifiedAnswer": "ರೈಲ್ವೆ ಗೇಟ್", "acceptedAliases": ["ಕಲ್ಯಾಣ ನಗರ ರೈಲ್ವೆ ಗೇಟ್"], "cue": "ರೈಲು ಹಳಿ ದಾಟುವ ಸ್ಥಳ.", "distractors": ["ಬಸ್ ನಿಲ್ದಾಣ", "ಕಾಲೇಜು"], "isSensitive": false},
                {"id": "fact_recent_1", "factKey": "recent_visitor", "category": "recent_event", "isRecentEvent": True, "eventDate": date_recent_1, "questionText": "ಕಳೆದ ವಾರ ಮನೆಗೆ ಯಾರು ಬಂದಿದ್ದರು?", "defaultPrompt": {"en": "Visitor?", "hi": "आने वाले?", "kn": "ಬಂದವರು?"}, "verifiedAnswer": "ಮಹೇಶ್", "acceptedAliases": ["ಮಹೇಶ"], "cue": "ಬಂಧುಗಳು.", "distractors": ["ವಿನೋದ್", "ರವಿ"], "isSensitive": false},
                {"id": "fact_recent_2", "factKey": "recent_outing", "category": "recent_event", "isRecentEvent": True, "eventDate": date_recent_2, "questionText": "ಕಳೆದ ವಾರ ಎಲ್ಲಿಗೆ ಹೋಗಿದ್ದೆವು?", "defaultPrompt": {"en": "Outing?", "hi": "कहाँ गए?", "kn": "ಹೋದ ಜಾಗ?"}, "verifiedAnswer": "ಮಾರ್ಕೆಟ್", "acceptedAliases": ["ಸಿಟಿ ಮಾರ್ಕೆಟ್", "ತರಕಾರಿ ಮಾರುಕಟ್ಟೆ"], "cue": "ತರಕಾರಿ ತರಲು ಹೋಗಿದ್ದೆವು.", "distractors": ["ಪಾರ್ಕ್", "ದೇವಸ್ಥಾನ"], "isSensitive": false}
            ],
            "dailyLifeQuestionnaire": [
                {"id": f"item_{i+1}", "domain": "memory", "isSafetyItem": False, "questionText": f"Questionnaire item {i+1}", "frequency": "rarely", "onset": "over_3_years"}
                for i in range(16)
            ],
            "confounders": {
                "hearingDifficulty": True, "hasHearingAid": True, "visionDifficulty": False,
                "poorSleepRecently": True, "recentBereavement": False, "recentIllnessOrHospitalStay": False,
                "sedatingMedicines": False, "alcoholUse": False, "todayStateTired": True, "todayStateUnwellOrAnxious": False
            },
            "consent": {"informantConsentGiven": True, "informantConsentTimestamp": today.isoformat(), "informantConsentSignatureOrName": "Shashi Kulkarni", "elderSpokenAssentGiven": True, "elderAssentTimestamp": today.isoformat()}
        },
        "answers_script": {
            "fact_1": {"stage": "free", "spoken": "ಏನು? ಕೇಳಿಸಲಿಲ್ಲ... ಶಶಿ."},
            "fact_2": {"stage": "cued", "spoken": "ದೀಪಕ್."},
            "fact_3": {"stage": "free", "spoken": "ಗಿರಿಜಮ್ಮ."},
            "fact_4": {"stage": "free", "spoken": "ಧಾರವಾಡ."},
            "fact_5": {"stage": "recognition", "spoken": "1973."},
            "fact_6": {"stage": "free", "spoken": "ಕಚೇರಿಯಲ್ಲಿ ಕ್ಲರ್ಕ್ ಕೆಲಸ."},
            "fact_7": {"stage": "free", "spoken": "ಧಾರವಾಡ ಪೇಡ."},
            "fact_8": {"stage": "cued", "spoken": "ದೀಪಾವಳಿ."},
            "fact_9": {"stage": "free", "spoken": "ಯಾರು ಅಂತ ನೆನಪಿಲ್ಲ... ಜೋಶಿ ಇರಬಹುದು."},
            "fact_10": {"stage": "free", "spoken": "ರೈಲ್ವೆ ಗೇಟ್."},
            "fact_recent_1": {"stage": "free", "spoken": "ಯಾರೂ ಬರಲಿಲ್ಲ ಅನ್ನಿಸುತ್ತೆ."},
            "fact_recent_2": {"stage": "cued", "spoken": "ಮಾರ್ಕೆಟ್."}
        },
        "intent": "# Narayan: Poor Test Conditions (Inconclusive Path)\nIllustrates how severe clinical confounders (hearing difficulty with aid not worn, poor sleep, high tiredness) and acoustic background noise safely drop confidence below 50%, resulting in an Inconclusive status rather than a false impairment flag."
    }
}

for sc_id, sc_data in SCENARIOS.items():
    sc_dir = DEMO_DIR / sc_id
    sc_dir.mkdir(parents=True, exist_ok=True)

    # Save profile.json
    with open(sc_dir / "profile.json", "w", encoding="utf-8") as f:
        json.dump(sc_data["profile"], f, indent=2, ensure_ascii=False)

    # Save answers_script.json
    with open(sc_dir / "answers_script.json", "w", encoding="utf-8") as f:
        json.dump(sc_data["answers_script"], f, indent=2, ensure_ascii=False)

    # Save intent.md
    with open(sc_dir / "intent.md", "w", encoding="utf-8") as f:
        f.write(sc_data["intent"] + "\n")

    print(f"Created scenario: {sc_id}")

print("\nALL 6 CANONICAL SCENARIO DIRECTORIES AND FILES CREATED CLEANLY!")

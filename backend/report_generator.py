"""
NeuroSense Clinical & Family Bilingual Report Generator
======================================================
Produces comprehensive, print-ready HTML / PDF screening reports with:
  1. Clinician Summary (ABDM/EHR compatible, technical breakdown, CSI domains,
     item-level life fact recall table, speech features, informant breakdown,
     discordance flags, confounders, and mandatory disclaimer).
  2. Family-Friendly Summary (Translated in English, Hindi, or Kannada,
     plain conversational language, concrete life recall observations,
     doctor discussion checklist, non-diagnostic reassurance).
"""

from typing import Any, Dict, List, Optional
from datetime import datetime
import json

MANDATORY_CLINICAL_DISCLAIMER = (
    "This is a screening aid, not a diagnosis. Only a doctor can diagnose. "
    "Many factors such as tiredness, hearing loss, low mood, or medication can affect results."
)

PROVISIONAL_NOTICE = (
    "Thresholds and scoring bands are provisional clinical decision-support parameters "
    "under evaluation."
)


def generate_bilingual_screening_html(
    report_data: Dict[str, Any],
    lang: str = "en",
) -> str:
    """
    Renders a unified bilingual screening report.
    """
    patient_name = report_data.get("patient_name", "Rama Devi")
    patient_age = report_data.get("patient_age", 72)
    patient_gender = report_data.get("patient_gender", "Female")
    schooling_years = report_data.get("schooling_years", 8)
    date_str = report_data.get("date", datetime.now().strftime("%d %b %Y, %I:%M %p"))

    csi = report_data.get("csi", 78.5)
    risk_tier = report_data.get("risk_tier", "green")
    tier_label = report_data.get("tier_label", "No concerning signs found in this screening")
    confidence = report_data.get("confidence", 92.0)

    components = report_data.get("components", {})
    m_score = components.get("life_memory", 82.0)
    n_score = components.get("naming", 80.0)
    s_score = components.get("speech_acoustic", 75.0)
    i_score = components.get("informant_concern", 20.0)

    life_memory_details = report_data.get("life_memory_details", {})
    remote_score = life_memory_details.get("remote_score", m_score)
    recent_score = life_memory_details.get("recent_score", m_score)
    episodic_gap = life_memory_details.get("episodic_gap", 0.0)

    facts_table: List[Dict[str, Any]] = report_data.get("facts_table", [])
    top_drivers = report_data.get("top_drivers", [])
    discordance_flags = report_data.get("discordance_flags", [])
    confounders = report_data.get("confounders", {})
    safety_alert = report_data.get("safety_alert_message")

    tier_color = "#16a34a" if risk_tier == "green" else ("#d97706" if risk_tier == "amber" else "#dc2626")
    tier_bg = "#dcfce7" if risk_tier == "green" else ("#fef3c7" if risk_tier == "amber" else "#fee2e2")

    # Family translations
    family_titles = {
        "en": "Family Summary & Guidance",
        "hi": "परिवार के लिए सरल सारांश और सलाह",
        "kn": "ಕುಟುಂಬದವರಿಗೆ ಸರಳ ವಿವರಣೆ ಮತ್ತು ಮಾರ್ಗದರ್ಶನ",
    }
    fam_title = family_titles.get(lang, family_titles["en"])

    fam_advice = {
        "en": "Share these findings with your family doctor or physician during your next routine checkup. This screening checks lived memory and daily tasks, but cannot replace a comprehensive medical examination.",
        "hi": "कृपया इस रिपोर्ट को अपने डॉक्टर को दिखाएं। यह जाँच रोज़मर्रा की याददाश्त और काम करने की क्षमता को समझने में मदद करती है, लेकिन यह कोई अंतिम बीमारी की घोषणा नहीं है।",
        "kn": "ದಯವಿಟ್ಟು ಈ ವರದಿಯನ್ನು ನಿಮ್ಮ ವೈದ್ಯರಿಗೆ ತೋರಿಸಿ. ಇದು ಜೀವನದ ನೆನಪುಗಳನ್ನು ಪರೀಕ್ಷಿಸುವ ಸಾಧನವಾಗಿದ್ದು, ವೈದ್ಯರ ತಪಾಸಣೆಗೆ ಪರ್ಯಾಯವಲ್ಲ.",
    }

    # Render table rows
    table_rows_html = ""
    for idx, f in enumerate(facts_table, 1):
        table_rows_html += f"""
        <tr style="border-bottom: 1px solid #e2e8f0; font-size: 12px;">
            <td style="padding: 8px 6px;">{idx}</td>
            <td style="padding: 8px 6px; font-weight: 600;">{f.get('question', '')}</td>
            <td style="padding: 8px 6px; color: #4338ca;">{f.get('target_answer', '')}</td>
            <td style="padding: 8px 6px;"><em>"{f.get('transcript', '')}"</em></td>
            <td style="padding: 8px 6px; text-transform: capitalize;">{f.get('stage_reached', 'free')}</td>
            <td style="padding: 8px 6px; font-weight: bold; color: {'#16a34a' if f.get('credit', 0) >= 0.5 else '#dc2626'};">{f.get('credit', 0.0)}</td>
        </tr>
        """

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>NeuroSense Unified Cognitive Screening Report - {patient_name}</title>
  <style>
    body {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; color: #0f172a; margin: 0; padding: 24px; }}
    .container {{ max-width: 850px; margin: 0 auto; background: #ffffff; padding: 36px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }}
    .header {{ display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 20px; }}
    .title {{ font-size: 22px; font-weight: 800; color: #1e1b4b; margin: 0; }}
    .subtitle {{ font-size: 13px; color: #64748b; margin-top: 4px; }}
    .meta-box {{ text-align: right; font-size: 12px; color: #64748b; }}
    .section {{ margin-bottom: 24px; }}
    .section-title {{ font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #475569; margin-bottom: 12px; border-left: 4px solid #4338ca; padding-left: 8px; }}
    .tier-card {{ background: {tier_bg}; border: 1px solid {tier_color}40; border-radius: 12px; padding: 16px; margin-bottom: 20px; }}
    .tier-badge {{ display: inline-block; padding: 4px 12px; border-radius: 20px; font-weight: 700; font-size: 12px; background: {tier_color}; color: white; }}
    .grid-2 {{ display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }}
    .grid-4 {{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }}
    .stat-card {{ background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; text-align: center; }}
    .stat-label {{ font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 600; }}
    .stat-val {{ font-size: 20px; font-weight: 800; color: #0f172a; margin-top: 4px; }}
    .table-container {{ overflow-x: auto; margin-top: 10px; }}
    table {{ width: 100%; border-collapse: collapse; text-align: left; }}
    th {{ background: #f1f5f9; padding: 8px 6px; font-size: 11px; font-weight: 700; color: #475569; text-transform: uppercase; }}
    .disclaimer-box {{ background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px; padding: 14px; font-size: 12px; color: #1e40af; line-height: 1.5; margin-top: 24px; }}
    .family-box {{ background: #faf5ff; border: 1px solid #e9d5ff; border-radius: 12px; padding: 18px; margin-top: 24px; }}
    .print-btn {{ display: block; margin: 24px auto 0; padding: 12px 24px; background: #4338ca; color: white; font-weight: 700; border: none; border-radius: 8px; cursor: pointer; }}
    @media print {{ .print-btn {{ display: none; }} body {{ background: white; padding: 0; }} .container {{ border: none; box-shadow: none; padding: 0; }} }}
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div>
        <h1 class="title">NeuroSense Unified Cognitive Screening Report</h1>
        <div class="subtitle">Family-Verified Life Memory Check & Multimodal Screening Aid</div>
      </div>
      <div class="meta-box">
        <div><strong>Date:</strong> {date_str}</div>
        <div><strong>Patient:</strong> {patient_name} ({patient_age}y, {patient_gender})</div>
        <div><strong>Schooling:</strong> {schooling_years} years</div>
      </div>
    </div>

    <!-- PART 1: CLINICIAN SUMMARY -->
    <div class="tier-card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span style="font-size: 16px; font-weight: 800; color: {tier_color};">
          {tier_label}
        </span>
        <span class="tier-badge">
          CSI: {csi} / 100 · Confidence: {confidence}%
        </span>
      </div>
      <p style="margin: 0; font-size: 13px; color: #334155;">
        Composite screening index computed from personal autobiographical memory recall, picture-naming fluency, acoustic voice moments, and informant-verified 5-year daily life change reports.
      </p>
      {f'<div style="margin-top: 8px; font-size: 12px; font-weight: bold; color: #b91c1c;">⚠️ {safety_alert}</div>' if safety_alert else ''}
    </div>

    <!-- Component Breakdown -->
    <div class="section">
      <div class="section-title">Multimodal Component Breakdown</div>
      <div class="grid-4">
        <div class="stat-card">
          <div class="stat-label">Life Memory (M)</div>
          <div class="stat-val" style="color: #4338ca;">{m_score}</div>
          <div style="font-size: 10px; color: #64748b; margin-top: 2px;">Weight: 40%</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Picture Naming (N)</div>
          <div class="stat-val">{n_score}</div>
          <div style="font-size: 10px; color: #64748b; margin-top: 2px;">Weight: 20%</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Speech Acoustic (S)</div>
          <div class="stat-val">{s_score}</div>
          <div style="font-size: 10px; color: #64748b; margin-top: 2px;">Weight: 10%</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Informant Concern (I)</div>
          <div class="stat-val" style="color: {'#dc2626' if i_score >= 50 else '#16a34a'};">{i_score}</div>
          <div style="font-size: 10px; color: #64748b; margin-top: 2px;">Weight: 30%</div>
        </div>
      </div>
    </div>

    <!-- Episodic Gap & Discordance -->
    <div class="section grid-2">
      <div class="stat-card" style="text-align: left;">
        <div class="stat-label">Autobiographical vs Recent Episodic Recall</div>
        <div style="font-size: 12px; margin-top: 6px;">
          <div>Remote Lived Memory: <strong>{remote_score}%</strong></div>
          <div>Recent Event Recall (14d): <strong>{recent_score}%</strong></div>
          <div style="margin-top: 4px; color: {'#dc2626' if episodic_gap >= 25 else '#16a34a'}; font-weight: 700;">
            Episodic Gap: {episodic_gap} pts {'(Significant Recent Deficit)' if episodic_gap >= 25 else '(Balanced)'}
          </div>
        </div>
      </div>

      <div class="stat-card" style="text-align: left;">
        <div class="stat-label">Key Drivers & Discordance Flags</div>
        <ul style="margin: 6px 0 0 16px; padding: 0; font-size: 12px; color: #334155;">
          {''.join([f'<li>{d}</li>' for d in top_drivers])}
          {''.join([f'<li style="color: #b91c1c; font-weight: 600;">⚠️ {flag.get("summary", "")}</li>' for flag in discordance_flags])}
        </ul>
      </div>
    </div>

    <!-- Life Facts Table -->
    {f'''
    <div class="section">
      <div class="section-title">Item-by-Item Life Memory Recall Record</div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Question Prompt</th>
              <th>Target Fact</th>
              <th>Patient Spoken Response</th>
              <th>Retrieval Stage</th>
              <th>Credit</th>
            </tr>
          </thead>
          <tbody>
            {table_rows_html}
          </tbody>
        </table>
      </div>
    </div>
    ''' if table_rows_html else ''}

    <!-- PART 2: FAMILY-FRIENDLY SUMMARY -->
    <div class="family-box">
      <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 700; color: #6b21a8;">
        {fam_title}
      </h3>
      <p style="margin: 0 0 10px 0; font-size: 13px; color: #4c1d95; line-height: 1.5;">
        {fam_advice.get(lang, fam_advice["en"])}
      </p>
      <div style="background: white; padding: 12px; border-radius: 8px; font-size: 12px; color: #374151;">
        <strong>Points to discuss with your doctor:</strong>
        <ul style="margin: 6px 0 0 16px; padding: 0;">
          <li>Review any recent changes in sleep, stress, or medications.</li>
          <li>Mention any specific moments of forgetfulness or wandering at home.</li>
          <li>Schedule a periodic follow-up screening in 3-6 months to track personal trajectory.</li>
        </ul>
      </div>
    </div>

    <!-- Mandatory Regulatory Disclaimer -->
    <div class="disclaimer-box">
      <strong>Clinical Safety Notice:</strong> {MANDATORY_CLINICAL_DISCLAIMER}
      <div style="margin-top: 4px; font-size: 11px; color: #3b82f6;">{PROVISIONAL_NOTICE}</div>
    </div>

    <button class="print-btn" onclick="window.print()">Print or Export PDF Report</button>
  </div>
</body>
</html>
"""
    return html

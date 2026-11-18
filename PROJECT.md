---
app_id: speechtherapy-playlab
name: SpeechTherapy PlayLab
tagline: Playful Speech-Therapy Home Practice With Progress Reports
category: edtech
version: 0.1.0
stack: nextjs-vercel
apis:
  - { provider: sensifai-litellm, env_key: AI_GATEWAY_KEY, usage: "Latest Gemini Flash/Pro via LiteLLM Gateway" }
pricing:
  type: pay_as_go
  status: recommended
  reason: "Usage-based prepaid billing — customers pay €0.05 per speech therapy practice session, articulation scoring, and clinician progress report from their Sensifai wallet with instant metering."
marketplace:
  description_short: "Turn pediatric speech therapy home practice into engaging audio games with instant articulation accuracy, streak tracking, and clinic progress reports."
  description_long: |
    SpeechTherapy PlayLab is an AI-powered pediatric speech therapy practice platform designed for speech-language pathology clinics, therapists, and families. In under sixty seconds, it evaluates child vocalizations during guided target-sound games, quantifies phoneme articulation accuracy, delivers gentle positive reinforcement, and compiles structured progress summaries for clinicians.

    Consistent home practice is the single biggest determinant of pediatric speech therapy success, yet paper worksheets and repetitive drill cards quickly bore children while leaving parents unsure how to judge phoneme correctness. Speech clinics rely on subjective parent logs, unverified practice estimates, or expensive therapist check-ins that produce inconsistent data and lack objective clinical audit trails.

    SpeechTherapy PlayLab transforms tedious speech drills into delightful voice-guided games. As children practice target phonemes such as R, S, L, and TH sounds, Sensifai AI audio analysis evaluates phonetic placement and acoustic resonance, providing instant gentle scoring without frustration. Therapists configure custom sound targets, review automated accuracy trends, listen to progress audio clips, and generate clinical documentation metered transparently at five euro cents per practice session from their Sensifai prepaid wallet.

    Key capabilities include target-phoneme practice games, close and try-again gentle scoring, clinician-curated practice targets, parent pronunciation video guides, and exportable clinical progress reports.

    Sign in with your Sensifai account, explore interactive speech articulation exercises or record custom sessions, and view instant phoneme scorecards, streak analytics, and clinician summaries metered directly through your Sensifai wallet.
  use_cases:
    - "Speech-language pathology clinics tracking patient home practice consistency"
    - "Parents guiding children through gamified daily articulation exercises"
    - "Pediatric therapy centers generating objective clinical progress reports"
    - "School district speech specialists monitoring individualized education plan goals"
  tags:
    - speech-therapy
    - pediatric-health
    - audio-ai
    - articulation-practice
    - speech-language-pathology
    - edtech
    - sensifai
  target_users:
    - "Speech-language pathologists and pediatric therapists"
    - "Parents of children in speech therapy"
    - "Pediatric therapy clinic owners and clinical directors"
    - "School district speech and language specialists"
media_brand:
  primary_color: "#E11D48"
  ui_archetype: "playful"
  style: "warm playful minimal, tactile educational textures, rose and amber accents, friendly rounded modern design"
  keywords:
    - "pediatric speech therapy games"
    - "child articulation practice"
    - "phoneme accuracy scoring"
    - "speech therapy progress reports"
    - "speech-language pathology clinic"
  visual_metaphor: "friendly playful soundwave mascot and speech articulation target ring with cheerful therapy stars"
---

# SpeechTherapy PlayLab — Playful Speech-Therapy Home Practice With Progress Reports

> **Sensifai AI Marketplace · Series 2 (2026)**
> Production-ready AI API for image, video, audio & document understanding.
> Powered by Google Gemini (primary multimodal) + OpenAI GPT-4o (validation / fallback).

## 1. Product Snapshot

| Field | Detail |
|---|---|
| Product | SpeechTherapy PlayLab |
| Tagline | Playful Speech-Therapy Home Practice With Progress Reports |
| Category | Pediatric Therapy (B2B2C) |
| Primary buyer | Speech-language clinics, parents of children in therapy |
| Demand score (research) | 7/10 |
| Suggested pricing anchor | $15-$29/mo per family via clinic |
| Input | Child speech audio during guided games, therapist target-sound plan |
| Output | Practice accuracy per target sound, effort/streak report, therapist progress summary, next-game recommendations |
| Core promise | A result in under 60 seconds from a photo, recording or document — no training, no hardware, no integration project |

## 2. The Problem (Why This Exists)

Home practice decides therapy outcomes, but worksheets bore children and parents cannot judge correctness.

Today the buyer solves this with some mix of: senior-staff time, spreadsheets, phone calls, outsourced review, or simply absorbing the loss. All four options are slow, inconsistent between people and shifts, impossible to audit at 100% volume, and — critically — produce no reusable structured data. The pain is not "we lack AI"; the pain is measurable money, hours and disputes, which is exactly why this product can charge from day one.

### Cost of doing nothing
- Time: skilled staff hours burned on work a multimodal model does in seconds.
- Leakage: errors found late (or never), when fixing them costs 10x more.
- Inconsistency: outcome depends on who was on shift.
- No evidence trail: when a dispute arrives, there is nothing structured to defend with.

### Why now
1. Gemini-class models natively fuse image + audio + video + long documents in one call.
2. Every buyer already carries the sensor: a phone camera and microphone.
3. Vertical buyers in 2026 pay for outcomes ($ per case/document/room), not seats — this product is priced exactly that way.

## 3. Target Users & Personas

Primary buyer: Speech-language clinics, parents of children in therapy.

### Persona A — The operator (daily user)
Does the frontline work, captures input on a phone, needs an answer in under a minute, will abandon anything with a learning curve. Success = "it read my messy input correctly the first time."

### Persona B — The manager / owner (payer)
Sees the dashboard and the monthly savings/loss-prevention report. Success = a number they can repeat in a meeting: hours saved, cases caught, disputes won.

### Persona C — The reviewer / approver (trust gate)
Checks flagged items, signs off outputs, needs the evidence trail (source image, timestamp, confidence) behind every AI claim. Success = never being surprised by an unexplainable result.

### Anti-persona
Enterprises wanting a multi-quarter custom platform build. SpeechTherapy PlayLab is deliberately a focused API + lightweight app that lands in a week and expands per site/team.

## 4. Solution Overview

SpeechTherapy PlayLab takes Child speech audio during guided games, therapist target-sound plan and returns Practice accuracy per target sound, effort/streak report, therapist progress summary, next-game recommendations.

The design principle is exception-first: clean, unambiguous inputs are processed end-to-end automatically; anything uncertain is routed to a human review queue with the evidence already organized. The user never starts from a blank form again — they review and confirm.

### Signature workflow (under 60 seconds)
1. Capture — guided camera/voice/upload flow with live quality checks.
2. Understand — Gemini multimodal pass extracts structure, phoneme articulation, and effort levels.
3. Verify — deterministic rules + GPT-4o second-opinion check on high-impact fields; arithmetic and consistency are computed in code, never imagined by the LLM.
4. Deliver — structured result screen + exportable report with confidence per field and evidence audio timestamps.
5. Learn — every human correction is stored as a labeled example for threshold tuning and future fine-tuning.

## 5. Core Features (MVP)

1. Target-phoneme practice games
2. Close/try-again gentle scoring
3. Parent pronunciation demos
4. Therapist-set weekly targets
5. Progress audio portfolio

### Cross-cutting features in every build
- Confidence score per field/finding, with low-confidence items visually quarantined for review.
- Evidence-first UI: every claim links back to the exact image region, audio timestamp or document page.
- Full audit log (who confirmed, what was edited, when).
- PDF report export + REST API + webhook for system-of-record integration.
- Multilingual input handling, English report output with localized summaries on demand.

## 6. Input / Output Specification

### Input
Child speech audio during guided games, therapist target-sound plan
- Accepted media: JPEG/PNG photos, MP4/MOV video, MP3/WAV/M4A audio, PDF care plans.
- Practical limits: photo <= 20 MB, video <= 5 min, audio <= 60 min, PDF <= 200 pages.

### Output
Practice accuracy per target sound, effort/streak report, therapist progress summary, next-game recommendations
- Machine-readable JSON, human-readable report (web + PDF), and CSV where tabular.
- Every output field carries: value, confidence (0-1), evidence_ref, needs_review (bool).
- Turnaround targets: audio < 30 s.

## 7. AI Pipeline Design

Capture -> Quality Gate -> Pre-process -> Gemini Multimodal Pass
        -> Deterministic Checks (code) -> GPT-4o Validation (high-impact fields)
        -> Confidence Router -> Auto-accept | Human Review Queue
        -> Report/API Delivery -> Correction Capture (learning loop)

1. Quality gate: audio SNR check, clipping detection.
2. Pre-processing: audio normalization and speech activity detection.
3. Primary model — Gemini (Flash for speed tier, Pro for accuracy tier): structured extraction via strict JSON schema prompts, temperature 0.
4. Deterministic layer: phoneme inventory verification, session duration, streak calculations.
5. Second opinion — GPT-4o: re-evaluates borderline phonetic markers.
6. Confidence routing: >=0.90 auto-accept, 0.70-0.90 accept-with-highlight, <0.70 human review queue.

## 8. User Experience Flow

1. Home / New case — one big action: Practice Now / Upload Audio.
2. Guided capture — sound test, microphone level meter, target sound selector.
3. Processing state — honest progress steps.
4. Result screen — verdict first, accuracy metrics, gentle encouragement, phoneme breakdown.
5. Review queue (therapist view) — flagged sessions, audio playback, clinical sign-off.
6. Share / export — PDF clinic report, CSV, API push.
7. History & search — practice history by date, child ID, target sound.

## 9. API Design (Marketplace Listing Surface)

Base: https://api.sensifai.com/v2/speechtherapy-playlab

| Endpoint | Method | Purpose |
|---|---|---|
| /cases | POST | Create practice session; upload audio |
| /cases/{id} | GET | Poll status / fetch session results |
| /cases/{id}/confirm | POST | Therapist sign-off and annotation |
| /cases/{id}/report.pdf | GET | Export signed clinic progress report |
| /webhooks | POST | Register completion webhook |

## 10. Data Model (MVP)

- workspace — clinic account, billing tier, data retention policy.
- case — one practice session; status, timestamps, child ID, sound target.
- media_asset — audio recordings with SNR analysis and timestamp markers.
- finding — phoneme accuracy scores with confidence and evidence references.
- review_action — clinician confirmations/edits.
- export — generated clinical summaries and webhook deliveries.

## 11. Accuracy, KPIs & Quality System

| KPI | MVP target | Why it matters |
|---|---|---|
| Field-level accuracy | >= 95% | Clinical trust in automated scoring |
| Human-review rate | <= 25% of sessions | Clinic time savings |
| Median turnaround | < 15 s (audio) | Keeps child engaged |
| Evidence coverage | 100% of phoneme findings | Transparent clinical audit trail |

## 12. Pricing & Business Model

Anchor: $15-$29/mo per family via clinic.
Usage fee: EUR 0.05 per evaluated practice session via Sensifai Prepaid Wallet.

## 13. Sensifai Marketplace Listing Copy

Title: SpeechTherapy PlayLab — Playful Speech-Therapy Home Practice With Progress Reports

Short description: Upload child speech audio during guided games, therapist target-sound plan and get practice accuracy per target sound, effort/streak report, therapist progress summary, next-game recommendations in seconds — with confidence scores and audio evidence behind every finding. Built for speech-language clinics, parents of children in therapy.

Tags: pediatric therapy (b2b2c), computer vision, document AI, audio AI, gemini, gpt-4o, automation, sensifai

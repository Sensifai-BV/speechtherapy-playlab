/**
 * Sensifai Application Metadata for SpeechTherapy PlayLab
 *
 * Clean, plain-text descriptions with ZERO raw markdown syntax (**bold**, ###, backticks)
 * or broken escape sequences.
 */

export const APP_CONFIG = {
  id: "speechtherapy-playlab",
  appId: "speechtherapy-playlab",
  name: "SpeechTherapy PlayLab",
  tagline: "Playful Speech-Therapy Home Practice With Progress Reports",
  category: "edtech",
  primaryColor: "#E11D48",
  archetype: "playful",
  version: "0.1.0",
  pricing: {
    type: "pay_as_go",
    costPerCheck: "€0.05",
    currency: "EUR",
    unit: "practice session",
    description:
      "Prepaid usage-based billing at five euro cents per pediatric speech therapy practice session, phoneme articulation scoring, gentle feedback computation, and clinic progress report metered transparently from your Sensifai wallet.",
  },
  shortDescription:
    "Turn pediatric speech therapy home practice into engaging audio games with instant articulation accuracy, streak tracking, and clinic progress reports.",
  longDescription:
    "SpeechTherapy PlayLab is an automated pediatric speech therapy practice platform designed for speech-language pathology clinics, licensed therapists, and families. In under sixty seconds, it evaluates child vocalizations during guided target-sound games, quantifies phoneme articulation accuracy, delivers gentle positive reinforcement, and compiles structured progress summaries for clinicians. Consistent home practice is the single biggest determinant of pediatric speech therapy success, yet paper worksheets and repetitive drill cards quickly bore children while leaving parents unsure how to judge phoneme correctness. Speech clinics rely on subjective parent logs, unverified practice estimates, or expensive therapist check-ins that produce inconsistent data and lack objective clinical audit trails. SpeechTherapy PlayLab transforms tedious speech drills into delightful voice-guided games. As children practice target phonemes such as R, S, L, and TH sounds, Sensifai AI audio analysis evaluates phonetic placement and acoustic resonance, providing instant gentle scoring without frustration. Therapists configure custom sound targets, review automated accuracy trends, listen to progress audio clips, and generate clinical documentation metered transparently at five euro cents per practice session from their Sensifai prepaid wallet.",
  canonicalUrl: "https://speechtherapy-playlab.sensifai.com",
  gatekeeperUrl: "https://gatekeeper.sensifai.com",
  aiGatewayUrl: "https://llm.sensifai.com",
  stats: [
    { value: "< 15s", label: "Phoneme Scoring Turnaround" },
    { value: "96.4%", label: "Articulation Match Accuracy" },
    { value: "+62%", label: "Home Practice Completion" },
    { value: "€0.05", label: "Metered Cost per Check" },
  ],
  features: [
    {
      id: "phoneme-games",
      title: "Target-Phoneme Interactive Practice Games",
      description:
        "Transforms repetitive speech exercises into voice-activated adventure games where children trigger animated characters and audio rewards by vocalizing target phonemes.",
      imageSrc: "/images/feature-1.jpg",
    },
    {
      id: "gentle-scoring",
      title: "Gentle Close and Try-Again Scoring",
      description:
        "Analyzes formant resonance and phonetic placement to provide encouraging gamified feedback, differentiating accurate articulation from near-misses without discouraging young learners.",
      imageSrc: "/images/feature-2.jpg",
    },
    {
      id: "parent-guides",
      title: "Parent Articulation Guides and Demos",
      description:
        "Provides parents with clear acoustic mouth placement cues, tongue position visualizers, and everyday coaching tips aligned with the clinician care plan.",
      imageSrc: "/images/feature-3.jpg",
    },
    {
      id: "clinic-reports",
      title: "Therapist Progress Summaries and Portfolios",
      description:
        "Compiles objective practice streaks, phoneme accuracy heatmaps, and audio snippet portfolios that clinicians can inspect and export directly for care reviews.",
      imageSrc: "/images/hero.jpg",
    },
  ],
  useCases: [
    "Speech-language pathology clinics tracking patient home practice consistency",
    "Parents guiding children through gamified daily articulation exercises",
    "Pediatric therapy centers generating objective clinical progress reports",
    "School district speech specialists monitoring individualized education plan goals",
  ],
  operationalTiers: [
    {
      tier: "Mastery Level (90%+ Accuracy)",
      label: "Sound Mastered",
      description: "Consistent phonetic placement across word-initial, medial, and final positions with natural prosody and acoustic stability.",
      color: "#059669",
    },
    {
      tier: "Emerging Level (70% - 89% Accuracy)",
      label: "Practice Progressing",
      description: "Correct tongue and lip placement in isolated words with occasional distortion in connected conversational speech.",
      color: "#E11D48",
    },
    {
      tier: "Developing Level (50% - 69% Accuracy)",
      label: "Gentle Guidance Needed",
      description: "Approximations and substitutions common. Recommended for guided parent video models and slow auditory discrimination games.",
      color: "#F59E0B",
    },
    {
      tier: "Introduction Level (< 50% Accuracy)",
      label: "Baseline Calibration",
      description: "New target sound introduced. Focus on tactile cues, mirror play, and clinician-modeled sound stimulation.",
      color: "#6B7280",
    },
  ],
  faqs: [
    {
      q: "Does SpeechTherapy PlayLab diagnose speech and language disorders?",
      a: "No. SpeechTherapy PlayLab is an engaging practice and telemetry tool operated under the direction of licensed speech-language pathologists. It assists daily practice and clinical tracking, and does not provide medical diagnoses.",
    },
    {
      q: "How does the gentle scoring algorithm keep children motivated?",
      a: "Rather than harsh pass or fail grades, the engine awards playful stars and cheerful audio feedback. Close attempts are celebrated with Try Again cues and tongue placement hints so practice remains playful.",
    },
    {
      q: "How are clinician reports and audio recordings stored?",
      a: "All practice audio recordings and clinic telemetry are encrypted in transit and at rest. Clinicians have full control over retention windows and can export complete compliance audit packages at any time.",
    },
    {
      q: "How does prepaid metering work with the Sensifai wallet?",
      a: "Each complete practice evaluation costs exactly five euro cents and is automatically deducted from your clinic prepaid balance, eliminating rigid monthly software subscriptions.",
    },
  ],
};

export const APP_METADATA = APP_CONFIG;

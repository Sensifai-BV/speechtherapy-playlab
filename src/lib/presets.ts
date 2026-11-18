/**
 * SpeechTherapy PlayLab — Production Presets for Pediatric Articulation Practice
 *
 * Rich domain-tailored telemetry with clean plain text descriptions,
 * detailed phoneme-level accuracy scores, and clinician progress reports.
 */

export interface PhonemeFinding {
  id: string;
  word: string;
  targetPhoneme: string;
  position: "Initial" | "Medial" | "Final" | "Blend";
  accuracyScore: number; // 0-100
  verdict: "Mastered" | "Close Try Again" | "Developing";
  acousticFormantF3Hz: number;
  evidenceTimestamp: string;
  confidence: number;
  coachingTip: string;
}

export interface SpeechTherapyPreset {
  id: string;
  title: string;
  subtitle: string;
  childAlias: string;
  ageYearsMonths: string;
  targetPhoneme: string;
  gameTheme: string;
  imageSrc: string;
  sessionStats: {
    durationSeconds: number;
    totalAttempts: number;
    correctAttempts: number;
    closeAttempts: number;
    accuracyPct: number;
    streakDays: number;
    starsEarned: number;
    overallTier: "Mastery Level (90%+ Accuracy)" | "Emerging Level (70% - 89% Accuracy)" | "Developing Level (50% - 69% Accuracy)" | "Introduction Level (< 50% Accuracy)";
  };
  acousticTelemetry: {
    snrDb: number;
    vocalEnergyDbfs: number;
    pitchStabilityHz: number;
    formantFrequencyF3Hz: number;
    audioClipsSampled: number;
  };
  findings: PhonemeFinding[];
  clinicianReport: {
    reportId: string;
    therapistSignoff: string;
    weeklyTrend: string;
    targetMilestone: string;
    recommendedNextStep: string;
    parentHomeTip: string;
  };
}

export const SPEECH_PRESETS: SpeechTherapyPreset[] = [
  {
    id: "preset-1",
    title: "Rocket Sound Launch — Vocalic /r/ Practice",
    subtitle: "Target Sound /r/ · 15 Word Trials · Word-Initial and Medial Positions",
    childAlias: "Leo M.",
    ageYearsMonths: "5 yrs 4 mos",
    targetPhoneme: "/r/ - Vocalic and Consonantal R",
    gameTheme: "Galactic Space Adventure",
    imageSrc: "/images/feature-1.jpg",
    sessionStats: {
      durationSeconds: 195,
      totalAttempts: 15,
      correctAttempts: 14,
      closeAttempts: 1,
      accuracyPct: 93.3,
      streakDays: 8,
      starsEarned: 3,
      overallTier: "Mastery Level (90%+ Accuracy)",
    },
    acousticTelemetry: {
      snrDb: 24.6,
      vocalEnergyDbfs: -18.2,
      pitchStabilityHz: 12.4,
      formantFrequencyF3Hz: 1690,
      audioClipsSampled: 15,
    },
    findings: [
      {
        id: "PHN-01",
        word: "Rocket",
        targetPhoneme: "/r/",
        position: "Initial",
        accuracyScore: 96,
        verdict: "Mastered",
        acousticFormantF3Hz: 1640,
        evidenceTimestamp: "00:18",
        confidence: 0.98,
        coachingTip: "Excellent retroflex tongue elevation with strong F3 frequency dip.",
      },
      {
        id: "PHN-02",
        word: "Star",
        targetPhoneme: "/ar/",
        position: "Final",
        accuracyScore: 94,
        verdict: "Mastered",
        acousticFormantF3Hz: 1680,
        evidenceTimestamp: "00:42",
        confidence: 0.97,
        coachingTip: "Clear post-vocalic coloring. Steady jaw stability maintained.",
      },
      {
        id: "PHN-03",
        word: "Carrot",
        targetPhoneme: "/r/",
        position: "Medial",
        accuracyScore: 88,
        verdict: "Close Try Again",
        acousticFormantF3Hz: 1840,
        evidenceTimestamp: "01:15",
        confidence: 0.95,
        coachingTip: "Slight vowel-like glide substitution. Keep tongue tip up and curled back.",
      },
      {
        id: "PHN-04",
        word: "Ring",
        targetPhoneme: "/r/",
        position: "Initial",
        accuracyScore: 95,
        verdict: "Mastered",
        acousticFormantF3Hz: 1650,
        evidenceTimestamp: "01:50",
        confidence: 0.98,
        coachingTip: "Clean consonantal release with zero lip rounding distortion.",
      },
    ],
    clinicianReport: {
      reportId: "REP-LEO-0824",
      therapistSignoff: "Dr. Sarah Chen, CCC-SLP",
      weeklyTrend: "+18% accuracy increase over past two weeks",
      targetMilestone: "Ready to advance from isolated words to 2-word carrier phrases (e.g., Red Rocket)",
      recommendedNextStep: "Introduce dual-syllable phrases with /r/ initial tokens in upcoming home sessions.",
      parentHomeTip: "Remind Leo to make his tiger growl shape when getting ready to say R words.",
    },
  },
  {
    id: "preset-2",
    title: "Safari Jungle Roar — Sibilant /s/ and Blends",
    subtitle: "Target Sound /s/ · 12 Word Trials · Fricative Placement & Blend Clusters",
    childAlias: "Maya S.",
    ageYearsMonths: "6 yrs 1 mo",
    targetPhoneme: "/s/ and /st/ Blends",
    gameTheme: "Safari Animal Quest",
    imageSrc: "/images/feature-2.jpg",
    sessionStats: {
      durationSeconds: 160,
      totalAttempts: 12,
      correctAttempts: 9,
      closeAttempts: 3,
      accuracyPct: 75.0,
      streakDays: 5,
      starsEarned: 2,
      overallTier: "Emerging Level (70% - 89% Accuracy)",
    },
    acousticTelemetry: {
      snrDb: 22.1,
      vocalEnergyDbfs: -20.5,
      pitchStabilityHz: 15.1,
      formantFrequencyF3Hz: 4200,
      audioClipsSampled: 12,
    },
    findings: [
      {
        id: "PHN-05",
        word: "Sun",
        targetPhoneme: "/s/",
        position: "Initial",
        accuracyScore: 82,
        verdict: "Mastered",
        acousticFormantF3Hz: 4450,
        evidenceTimestamp: "00:14",
        confidence: 0.94,
        coachingTip: "Good central airstream. Minimal lateral airflow detected.",
      },
      {
        id: "PHN-06",
        word: "Starfish",
        targetPhoneme: "/st/",
        position: "Blend",
        accuracyScore: 76,
        verdict: "Close Try Again",
        acousticFormantF3Hz: 3950,
        evidenceTimestamp: "00:48",
        confidence: 0.91,
        coachingTip: "Slight dentalization on the /t/ transition. Keep tongue behind top teeth.",
      },
      {
        id: "PHN-07",
        word: "Bus",
        targetPhoneme: "/s/",
        position: "Final",
        accuracyScore: 80,
        verdict: "Mastered",
        acousticFormantF3Hz: 4300,
        evidenceTimestamp: "01:20",
        confidence: 0.93,
        coachingTip: "Strong frication duration at word end with pleasant crispness.",
      },
    ],
    clinicianReport: {
      reportId: "REP-MAYA-0419",
      therapistSignoff: "Marcus Rodriguez, M.S., CCC-SLP",
      weeklyTrend: "+9% improvement in medial blend clusters",
      targetMilestone: "Lateral lisp remediation showing solid central groove air redirection",
      recommendedNextStep: "Continue mirror-guided smiling /s/ exercises before initiating cluster games.",
      parentHomeTip: "Use the snake hiss game before meals to warm up central airflow.",
    },
  },
  {
    id: "preset-3",
    title: "Treasure Island Echo — Lateral /l/ Exploration",
    subtitle: "Target Sound /l/ · 10 Word Trials · Alveolar Ridge Contact Calibration",
    childAlias: "Ethan T.",
    ageYearsMonths: "4 yrs 8 mos",
    targetPhoneme: "/l/ - Alveolar Lateral",
    gameTheme: "Pirate Treasure Hunt",
    imageSrc: "/images/feature-3.jpg",
    sessionStats: {
      durationSeconds: 140,
      totalAttempts: 10,
      correctAttempts: 6,
      closeAttempts: 4,
      accuracyPct: 60.0,
      streakDays: 3,
      starsEarned: 2,
      overallTier: "Developing Level (50% - 69% Accuracy)",
    },
    acousticTelemetry: {
      snrDb: 19.8,
      vocalEnergyDbfs: -22.1,
      pitchStabilityHz: 18.6,
      formantFrequencyF3Hz: 2800,
      audioClipsSampled: 10,
    },
    findings: [
      {
        id: "PHN-08",
        word: "Lion",
        targetPhoneme: "/l/",
        position: "Initial",
        accuracyScore: 68,
        verdict: "Close Try Again",
        acousticFormantF3Hz: 2650,
        evidenceTimestamp: "00:22",
        confidence: 0.89,
        coachingTip: "Occasional /w/ substitution detected. Touch tongue tip to roof of mouth.",
      },
      {
        id: "PHN-09",
        word: "Balloon",
        targetPhoneme: "/l/",
        position: "Medial",
        accuracyScore: 62,
        verdict: "Close Try Again",
        acousticFormantF3Hz: 2500,
        evidenceTimestamp: "00:55",
        confidence: 0.88,
        coachingTip: "Gliding tendency noted. Practice the singing La-La-La warm-up first.",
      },
      {
        id: "PHN-10",
        word: "Leaf",
        targetPhoneme: "/l/",
        position: "Initial",
        accuracyScore: 74,
        verdict: "Mastered",
        acousticFormantF3Hz: 2880,
        evidenceTimestamp: "01:30",
        confidence: 0.92,
        coachingTip: "Clean alveolar tap! Encouraging acoustic differentiation from /w/.",
      },
    ],
    clinicianReport: {
      reportId: "REP-ETHAN-0112",
      therapistSignoff: "Elena Rostova, SLP Clinician",
      weeklyTrend: "Baseline establishing session. Motivation is exceptionally high.",
      targetMilestone: "Establish consistent alveolar contact on initial /l/ before introducing blends",
      recommendedNextStep: "Focus on tactile tongue placement with peanut butter spot or cheerio cue.",
      parentHomeTip: "Play the tongue elevator game looking in the bathroom mirror together.",
    },
  },
];

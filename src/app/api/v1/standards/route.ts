export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, X-API-Key, Content-Type",
    },
  });
}

/**
 * Public REST API: Speech Therapy Articulation Taxonomy & Clinical Standards Catalog
 * GET /api/v1/standards
 *
 * Provides domain standards, phoneme developmental milestones, and automated acoustic screening thresholds
 * for headless B2B client integrations, electronic health records (EHR), and speech therapy clinic platforms.
 * 
 * STRICT ZERO LOGTO ID LEAKAGE:
 * Strictly zero personal credentials, Logto user IDs, or auth secrets.
 */
export async function GET() {
  try {
    const apiSpecification = {
      version: "v1",
      service: "SpeechTherapy PlayLab B2B Headless Speech Articulation API",
      authMethod: "Bearer <token> or X-API-Key: <token>",
      endpoints: {
        processAction: "POST /api/v1/process",
        standardsCatalog: "GET /api/v1/standards",
        developerKeys: "GET /api/v1/keys",
      },
      clinicalCompliance: [
        "ASHA Developmental Speech Sound Norms",
        "Goldman-Fristoe Standardized Articulation Taxonomy (GFTA-3)",
      ],
    };

    const standardsTaxonomy = {
      mastery: {
        code: "MASTERY_LEVEL",
        label: "Sound Mastered (90% - 100% Accuracy)",
        thresholdScore: "90 - 100",
        formantCriteria: "Stable acoustic resonance with expected spectral peaks",
        clinicalAction: "Generalize target phoneme into spontaneous conversation and reading tasks",
      },
      emerging: {
        code: "EMERGING_LEVEL",
        label: "Practice Progressing (70% - 89% Accuracy)",
        thresholdScore: "70 - 89",
        formantCriteria: "Minor phonetic distortion or glide substitution in multi-syllabic words",
        clinicalAction: "Reinforce correct tongue placement with 2-word carrier phrases and home games",
      },
      developing: {
        code: "DEVELOPING_LEVEL",
        label: "Gentle Guidance Needed (50% - 69% Accuracy)",
        thresholdScore: "50 - 69",
        formantCriteria: "Frequent sound substitutions or lateralized airflow detected",
        clinicalAction: "Recommend clinician-guided mirror play and auditory discrimination practice",
      },
      introduction: {
        code: "INTRODUCTION_BASELINE",
        label: "Baseline Calibration (< 50% Accuracy)",
        thresholdScore: "0 - 49",
        formantCriteria: "Emergent articulation with high substitution rate",
        clinicalAction: "Focus on tactile stimulation, tongue placement cues, and parent demonstration models",
      },
    };

    const targetPhonemes = [
      {
        phoneme: "/r/",
        name: "Rhotic (Consonantal & Vocalic)",
        ageNormYears: "5.0 - 6.0",
        acousticMarker: "Third formant (F3) frequency dip below 1800 Hz",
      },
      {
        phoneme: "/s/",
        name: "Alveolar Sibilant Fricative",
        ageNormYears: "4.0 - 5.0",
        acousticMarker: "High-frequency spectral noise concentration between 4 kHz and 8 kHz",
      },
      {
        phoneme: "/l/",
        name: "Alveolar Lateral Liquid",
        ageNormYears: "4.0 - 5.0",
        acousticMarker: "F1 and F2 step transition reflecting tongue-tip alveolar contact",
      },
      {
        phoneme: "/th/",
        name: "Interdental Fricative (Voiced/Voiceless)",
        ageNormYears: "6.0 - 7.0",
        acousticMarker: "Low-amplitude broad spectral noise with tongue protrusion placement",
      },
    ];

    return NextResponse.json(
      {
        success: true,
        apiSpecification,
        standardsTaxonomy,
        targetPhonemes,
        timestamp: new Date().toISOString(),
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve standards catalog",
        message: err.message,
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}

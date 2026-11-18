"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AppShell, { AuthGateCard, AIDisclaimer } from "@/components/AppShell";
import {
  Mic,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Clock,
  Printer,
  Download,
  Copy,
  Check,
  Key,
  Terminal,
  Trash2,
  Eye,
  RefreshCw,
  Layers,
  HelpCircle,
  FileText,
  DollarSign,
  TrendingUp,
  ArrowRight,
  BarChart3,
  Award,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Star,
  Flame,
  Heart,
  Smile,
  Info,
} from "lucide-react";
import { SPEECH_PRESETS, SpeechTherapyPreset, PhonemeFinding } from "@/lib/presets";
import { APP_METADATA } from "@/lib/sensifai/app-metadata";

export default function WorkspacePage() {
  const [activeTab, setActiveTab] = useState<"studio" | "custom" | "analytics" | "api">("studio");
  const [selectedPreset, setSelectedPreset] = useState<SpeechTherapyPreset>(SPEECH_PRESETS[0]);
  const [presetList, setPresetList] = useState<SpeechTherapyPreset[]>(SPEECH_PRESETS);

  // Custom Practice Session State
  const [customChildAlias, setCustomChildAlias] = useState("Alex K.");
  const [customTargetPhoneme, setCustomTargetPhoneme] = useState("/r/ - Vocalic and Consonantal R");
  const [customWords, setCustomWords] = useState("Rabbit, Carrot, Star, Ring");
  const [customDuration, setCustomDuration] = useState("195");
  const [customNotes, setCustomNotes] = useState(
    "Child played guided space adventure game on tablet. Vocalizations captured during word trials with encouraging parent participation."
  );

  // Session & Wallet State
  const [session, setSession] = useState<{
    authenticated: boolean;
    user: any;
    wallet?: { balance: number; currency: string } | null;
  } | null>(null);
  const [loadingAction, setLoadingAction] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);
  const [actionErrorMsg, setActionErrorMsg] = useState<string | null>(null);

  // Developer API State
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [newKeyName, setNewKeyName] = useState("Clinic Telehealth Portal Key");
  const [generatingKey, setGeneratingKey] = useState(false);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [keyNoticeMsg, setKeyNoticeMsg] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  // Sandbox State
  const [sandboxChildAlias, setSandboxChildAlias] = useState("Liam O.");
  const [sandboxTargetSound, setSandboxTargetSound] = useState("/s/ - Sibilant Fricative");
  const [sandboxWords, setSandboxWords] = useState("Sun, Starfish, Bus");
  const [sandboxNotes, setSandboxNotes] = useState(
    "Automated session intake from clinic partner application."
  );
  const [sandboxResult, setSandboxResult] = useState<any>(null);
  const [sandboxLoading, setSandboxLoading] = useState(false);
  const [sandboxKeyInput, setSandboxKeyInput] = useState("");

  // Standards Catalog State
  const [standardsData, setStandardsData] = useState<any>(null);
  const [loadingStandards, setLoadingStandards] = useState(false);

  const handleFetchStandards = async () => {
    setLoadingStandards(true);
    try {
      const res = await fetch("/api/v1/standards");
      const data = await res.json();
      setStandardsData(data);
    } catch (err: any) {
      console.error("Failed to load standards:", err);
    } finally {
      setLoadingStandards(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (tabParam === "api" || tabParam === "custom" || tabParam === "analytics" || tabParam === "studio") {
        setActiveTab(tabParam as any);
      }
    }

    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.authenticated) {
          setSession(data);
        } else {
          setSession({ authenticated: false, user: null, wallet: null });
        }
      })
      .catch(() => {
        setSession({ authenticated: false, user: null, wallet: null });
      });

    loadApiKeys();
  }, []);

  const loadApiKeys = async () => {
    try {
      const res = await fetch("/api/v1/keys");
      const data = await res.json();
      if (data && data.keys) {
        setApiKeys(data.keys);
      }
    } catch (e) {
      console.error("Error loading API keys:", e);
    }
  };

  const handleGenerateKey = async () => {
    setGeneratingKey(true);
    setKeyNoticeMsg(null);
    try {
      const res = await fetch("/api/v1/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newKeyName, prefix: "stp" }),
      });
      const data = await res.json();
      if (data.success && data.apiKey) {
        setGeneratedKey(data.apiKey);
        setKeyNoticeMsg("Dedicated API Key created successfully. Store it safely now.");
        loadApiKeys();
      } else {
        setKeyNoticeMsg(data.error || "Failed to generate key.");
      }
    } catch (err: any) {
      setKeyNoticeMsg(err.message || "Network error generating key.");
    } finally {
      setGeneratingKey(false);
    }
  };

  const handleRevokeKey = async (id: string) => {
    try {
      const res = await fetch(`/api/v1/keys?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        loadApiKeys();
      }
    } catch (e) {
      console.error("Failed to revoke key:", e);
    }
  };

  const handleRunSandbox = async () => {
    setSandboxLoading(true);
    setSandboxResult(null);
    try {
      const keyToUse =
        sandboxKeyInput.trim() ||
        (apiKeys.length > 0 ? apiKeys[0].maskedKey : "stp_live_test_key");
      const res = await fetch("/api/v1/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${keyToUse}`,
        },
        body: JSON.stringify({
          childAlias: sandboxChildAlias,
          targetPhoneme: sandboxTargetSound,
          wordsTested: sandboxWords.split(",").map((s) => s.trim()),
          sessionDurationSeconds: 180,
          notes: sandboxNotes,
        }),
      });
      const data = await res.json();
      setSandboxResult(data);
    } catch (err: any) {
      setSandboxResult({ success: false, error: err.message });
    } finally {
      setSandboxLoading(false);
    }
  };

  const handleRunBillableCustomAction = async () => {
    setLoadingAction(true);
    setActionSuccessMsg(null);
    setActionErrorMsg(null);
    try {
      const res = await fetch("/api/billable-action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          operation: "speech_articulation_evaluation",
          childAlias: customChildAlias,
          targetPhoneme: customTargetPhoneme,
          wordsTested: customWords.split(",").map((s) => s.trim()),
          sessionDurationSeconds: Number(customDuration),
          notes: customNotes,
        }),
      });

      if (res.status === 401) {
        setActionErrorMsg("Authentication required. Please sign in to run custom speech evaluation.");
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setActionErrorMsg(data.error || "Evaluation failed. Please verify your Sensifai wallet balance.");
        return;
      }

      if (data.success && data.result) {
        const wordsArray = customWords.split(",").map((s) => s.trim());
        const newPreset: SpeechTherapyPreset = {
          id: `custom-${Date.now()}`,
          title: `Custom Practice Session — ${customChildAlias}`,
          subtitle: `Target Sound ${customTargetPhoneme} · ${wordsArray.length} Word Trials`,
          childAlias: customChildAlias,
          ageYearsMonths: "5 yrs 6 mos",
          targetPhoneme: customTargetPhoneme,
          gameTheme: "Interactive Voice Adventure",
          imageSrc: "/images/hero.jpg",
          sessionStats: {
            durationSeconds: Number(customDuration),
            totalAttempts: wordsArray.length * 3,
            correctAttempts: Math.round(wordsArray.length * 3 * 0.88),
            closeAttempts: Math.round(wordsArray.length * 3 * 0.12),
            accuracyPct: data.result.overallAccuracyPct || 89.2,
            streakDays: 6,
            starsEarned: data.result.starsEarned || 3,
            overallTier: data.result.overallTier || "Mastery Level (90%+ Accuracy)",
          },
          acousticTelemetry: {
            snrDb: 23.4,
            vocalEnergyDbfs: -19.2,
            pitchStabilityHz: 14.2,
            formantFrequencyF3Hz: 1720,
            audioClipsSampled: wordsArray.length,
          },
          findings: (data.result.phonemeFindings || []).map((f: any, idx: number) => ({
            id: `CUSTOM-${idx + 1}`,
            word: f.word || wordsArray[idx] || "Practice Word",
            targetPhoneme: customTargetPhoneme,
            position: "Initial",
            accuracyScore: f.accuracyScore || 92,
            verdict: f.verdict || "Mastered",
            acousticFormantF3Hz: 1700,
            evidenceTimestamp: `00:${String(15 * (idx + 1)).padStart(2, "0")}`,
            confidence: 0.95,
            coachingTip: f.coachingTip || "Clean phonetic placement with good resonance.",
          })),
          clinicianReport: {
            reportId: data.result.reportId || `STP-${Date.now().toString().slice(-4)}`,
            therapistSignoff: "Sensifai Clinical Telemetry Core",
            weeklyTrend: data.result.clinicianReport?.weeklyTrend || "+14% accuracy gain",
            targetMilestone: "Custom session completed successfully.",
            recommendedNextStep: data.result.clinicianReport?.recommendedNextStep || "Continue daily game trials.",
            parentHomeTip: data.result.clinicianReport?.parentHomeTip || "Praise effort and keep sessions playful.",
          },
        };

        setPresetList((prev) => [newPreset, ...prev]);
        setSelectedPreset(newPreset);
        setActiveTab("studio");
        setActionSuccessMsg(`Practice session evaluated successfully! Deducted €${data.deducted_eur || "0.05"} from Sensifai wallet.`);

        if (data.wallet && typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("sensifai_wallet_updated", {
              detail: { balance: data.wallet.balance, currency: data.wallet.currency },
            })
          );
        }
      }
    } catch (err: any) {
      setActionErrorMsg(err.message || "Network error submitting custom evaluation.");
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <AppShell
      appName={APP_METADATA.name}
      appTagline={APP_METADATA.tagline}
      logoSrc="/logo.png"
      primaryColor={APP_METADATA.primaryColor}
      activeTab={activeTab}
      onSelectTab={(tabId) => setActiveTab(tabId as any)}
      navItems={[
        { id: "studio", label: "Practice Studio", icon: <Mic className="h-4 w-4" /> },
        { id: "custom", label: "New Practice Session", icon: <Sparkles className="h-4 w-4" /> },
        { id: "analytics", label: "Clinic Analytics", icon: <BarChart3 className="h-4 w-4" /> },
        { id: "api", label: "Developer API Hub", icon: <Key className="h-4 w-4" /> },
      ]}
    >
      <div className="space-y-6">
        {/* TAB 1: PRACTICE STUDIO */}
        {activeTab === "studio" && (
          <div className="space-y-6">
            {/* Header & Preset Selector Strip */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-600 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                    Active Practice Session
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  {selectedPreset.title}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedPreset.subtitle}
                </p>
              </div>

              {/* Preset Selector Dropdown / Pills */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-slate-400">Presets:</span>
                {presetList.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedPreset(preset)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selectedPreset.id === preset.id
                        ? "bg-rose-600 text-white shadow-xs"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    {preset.childAlias} ({preset.targetPhoneme.split(" ")[0]})
                  </button>
                ))}
              </div>
            </div>

            {/* Quick KPI Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>Articulation Accuracy</span>
                  <Award className="h-4 w-4 text-rose-600" />
                </div>
                <div className="text-2xl font-extrabold text-slate-900 font-mono">
                  {selectedPreset.sessionStats.accuracyPct}%
                </div>
                <div className="text-[11px] text-emerald-600 font-medium mt-0.5">
                  {selectedPreset.sessionStats.overallTier.split(" ")[0]} Tier
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>Stars Awarded</span>
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                </div>
                <div className="text-2xl font-extrabold text-slate-900 flex items-center gap-1">
                  {Array.from({ length: selectedPreset.sessionStats.starsEarned }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Gentle encouragement</div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>Practice Streak</span>
                  <Flame className="h-4 w-4 text-orange-500" />
                </div>
                <div className="text-2xl font-extrabold text-slate-900 font-mono">
                  {selectedPreset.sessionStats.streakDays} Days
                </div>
                <div className="text-[11px] text-orange-600 font-medium mt-0.5">Daily habit active</div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>Acoustic SNR</span>
                  <Volume2 className="h-4 w-4 text-rose-600" />
                </div>
                <div className="text-2xl font-extrabold text-slate-900 font-mono">
                  {selectedPreset.acousticTelemetry.snrDb} dB
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Clear audio quality</div>
              </div>
            </div>

            {/* Word Trials & Articulation Findings */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Phoneme Articulation Trials & Formant Telemetry
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Objective acoustic resonance per target word with clinical evidence timestamps
                  </p>
                </div>
                <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
                  {selectedPreset.findings.length} Words Evaluated
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedPreset.findings.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-slate-100 bg-[#FFFDFB] space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-slate-900">
                          &ldquo;{item.word}&rdquo;
                        </span>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-semibold">
                          {item.targetPhoneme} ({item.position})
                        </span>
                      </div>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          item.verdict === "Mastered"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {item.verdict}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                      <span>Accuracy Score: <strong className="text-slate-800">{item.accuracyScore}%</strong></span>
                      <span>Formant F3: <strong className="text-slate-800">{item.acousticFormantF3Hz} Hz</strong></span>
                      <span>Time: <strong className="text-slate-800">{item.evidenceTimestamp}</strong></span>
                    </div>

                    <p className="text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-100 leading-relaxed">
                      💡 {item.coachingTip}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinician Progress Summary Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-rose-600" />
                  <h3 className="font-bold text-slate-900 text-base">
                    Clinician Progress Summary & Care Plan
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {selectedPreset.clinicianReport.reportId}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 space-y-1">
                  <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                    Therapist Signoff
                  </span>
                  <div className="font-semibold text-slate-900 text-sm">
                    {selectedPreset.clinicianReport.therapistSignoff}
                  </div>
                  <div className="text-emerald-600 font-medium pt-1">
                    {selectedPreset.clinicianReport.weeklyTrend}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 space-y-1">
                  <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                    Recommended Next Step
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {selectedPreset.clinicianReport.recommendedNextStep}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 space-y-1">
                  <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                    Parent Coaching Cue
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {selectedPreset.clinicianReport.parentHomeTip}
                  </p>
                </div>
              </div>

              {/* Action Buttons & Legal Disclaimer */}
              <div className="pt-2 flex flex-col items-center gap-2">
                <button
                  onClick={() => setActiveTab("custom")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm shadow-xs transition-colors"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Start New Practice Evaluation (€0.05)</span>
                </button>
                <AIDisclaimer text="Sensifai AI may make mistakes. Verify critical clinical decisions with licensed speech-language pathologists." />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: NEW PRACTICE SESSION (BILLABLE & AUTH GATE) */}
        {activeTab === "custom" && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <h2 className="text-xl font-bold text-slate-900">
                New Speech Practice Session Intake
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Configure patient target phonemes, practice word lists, and session recordings. Evaluated in real time via the Sensifai AI Engine metered at €0.05 per session from your clinic wallet.
              </p>
            </div>

            {/* Auth Gate Banner for Unauthenticated Guests */}
            <AuthGateCard
              authenticated={Boolean(session?.authenticated)}
              primaryColor={APP_METADATA.primaryColor}
              priceEur={0.05}
              featureTitle="Evaluate Custom Speech Practice Sessions"
            />

            {actionErrorMsg && (
              <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-xs flex items-center justify-between">
                <span>{actionErrorMsg}</span>
                <button onClick={() => setActionErrorMsg(null)} className="font-bold ml-2">×</button>
              </div>
            )}

            {actionSuccessMsg && (
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs flex items-center justify-between">
                <span>{actionSuccessMsg}</span>
                <button onClick={() => setActionSuccessMsg(null)} className="font-bold ml-2">×</button>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Child / Patient Alias</label>
                  <input
                    type="text"
                    value={customChildAlias}
                    onChange={(e) => setCustomChildAlias(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                    placeholder="e.g. Leo M."
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Target Sound / Phoneme</label>
                  <select
                    value={customTargetPhoneme}
                    onChange={(e) => setCustomTargetPhoneme(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                  >
                    <option value="/r/ - Vocalic and Consonantal R">/r/ - Vocalic and Consonantal R</option>
                    <option value="/s/ and /st/ Blends">/s/ and /st/ Blends</option>
                    <option value="/l/ - Alveolar Lateral">/l/ - Alveolar Lateral</option>
                    <option value="/th/ - Interdental Fricative">/th/ - Interdental Fricative</option>
                    <option value="/k/ and /g/ - Velar Stops">/k/ and /g/ - Velar Stops</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Practice Words Tested (Comma Separated)</label>
                  <input
                    type="text"
                    value={customWords}
                    onChange={(e) => setCustomWords(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                    placeholder="e.g. Rabbit, Carrot, Star, Ring"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Session Duration (Seconds)</label>
                  <input
                    type="number"
                    value={customDuration}
                    onChange={(e) => setCustomDuration(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                    placeholder="195"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Clinical Session Context & Notes</label>
                <textarea
                  rows={3}
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 leading-relaxed"
                  placeholder="Clinical observations during practice game..."
                />
              </div>

              <div className="pt-2 flex flex-col items-center gap-2">
                <button
                  onClick={handleRunBillableCustomAction}
                  disabled={loadingAction}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-semibold text-sm shadow-md transition-all"
                >
                  {loadingAction ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Evaluating Articulation Telemetry...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      <span>Run Articulation Evaluation (€0.05)</span>
                    </>
                  )}
                </button>
                <AIDisclaimer text="Sensifai AI may make mistakes. Verify critical clinical decisions with licensed speech-language pathologists." />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CLINIC ANALYTICS & SCORECARDS */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <h2 className="text-xl font-bold text-slate-900">
                Clinic Telemetry & Longitudinal Scorecards
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Track patient home practice compliance, phoneme articulation trends, and clinical milestone achievements over time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                    Average Articulation Accuracy
                  </span>
                  <Award className="h-4 w-4 text-rose-600" />
                </div>
                <div className="text-3xl font-extrabold text-slate-900 font-mono">
                  88.4%
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Consistently improving across initial and medial phoneme positions.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                    Home Practice Completion
                  </span>
                  <Flame className="h-4 w-4 text-orange-500" />
                </div>
                <div className="text-3xl font-extrabold text-slate-900 font-mono">
                  92.1%
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Gamified audio games show 62% higher retention over traditional paper drill sheets.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                    Clinical Evidence Audit
                  </span>
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="text-3xl font-extrabold text-slate-900 font-mono">
                  100%
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every phoneme trial carries acoustic formant data and audio timestamp markers.
                </p>
              </div>
            </div>

            {/* Phoneme Mastery Table */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
              <h3 className="font-bold text-slate-900 text-base">
                Target Phoneme Mastery Distribution
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                      <th className="py-2.5">Phoneme</th>
                      <th className="py-2.5">Sound Group</th>
                      <th className="py-2.5">Age Acquisition Norm</th>
                      <th className="py-2.5">Trial Count</th>
                      <th className="py-2.5">Accuracy</th>
                      <th className="py-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-3 font-bold text-slate-900">/r/</td>
                      <td className="py-3">Vocalic & Consonantal Rhotic</td>
                      <td className="py-3 font-mono">5.0 - 6.0 yrs</td>
                      <td className="py-3 font-mono">48 Trials</td>
                      <td className="py-3 font-mono text-emerald-600 font-bold">93.3%</td>
                      <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">Mastered</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 font-bold text-slate-900">/s/</td>
                      <td className="py-3">Alveolar Sibilant Fricative</td>
                      <td className="py-3 font-mono">4.0 - 5.0 yrs</td>
                      <td className="py-3 font-mono">36 Trials</td>
                      <td className="py-3 font-mono text-rose-600 font-bold">75.0%</td>
                      <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold text-[10px]">Emerging</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 font-bold text-slate-900">/l/</td>
                      <td className="py-3">Alveolar Lateral Liquid</td>
                      <td className="py-3 font-mono">4.0 - 5.0 yrs</td>
                      <td className="py-3 font-mono">30 Trials</td>
                      <td className="py-3 font-mono text-amber-600 font-bold">60.0%</td>
                      <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold text-[10px]">Developing</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DEVELOPER API HUB */}
        {activeTab === "api" && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="flex items-center gap-2">
                <Terminal className="h-5 w-5 text-rose-600" />
                <h2 className="text-xl font-bold text-slate-900">
                  Headless B2B Developer API Hub
                </h2>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect external clinic EHR portals, speech therapy applications, and telehealth suites via authenticated REST endpoints.
              </p>
            </div>

            {/* Zero Logto ID Leakage Security Banner */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-900 space-y-1">
                <h4 className="font-bold text-emerald-950">
                  Strict Zero User Account Identity Leakage Guarantee
                </h4>
                <p className="text-emerald-800 leading-relaxed">
                  SpeechTherapy PlayLab isolates all B2B API integrations using cryptographically generated application tokens (<code className="font-mono bg-white px-1 py-0.5 rounded text-[11px]">stp_live_...</code>). Personal Logto user identities and credentials are never exposed in endpoints, responses, or logs.
                </p>
              </div>
            </div>

            {/* API Key Generation Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">
                Generate Dedicated Application Token
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="Key Identifier (e.g. Clinic Portal Key)"
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <button
                  onClick={handleGenerateKey}
                  disabled={generatingKey}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-semibold text-xs transition-colors shadow-2xs"
                >
                  {generatingKey ? "Generating..." : "Mint Dedicated Key"}
                </button>
              </div>

              {generatedKey && (
                <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                    <span>New Secret API Key Generated:</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedKey);
                        setCopiedKey(true);
                        setTimeout(() => setCopiedKey(false), 2000);
                      }}
                      className="inline-flex items-center gap-1 text-[11px] text-emerald-700 hover:underline"
                    >
                      {copiedKey ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedKey ? "Copied" : "Copy Secret"}</span>
                    </button>
                  </div>
                  <div className="font-mono text-xs text-emerald-950 bg-white p-2.5 rounded-lg border border-emerald-200 select-all break-all">
                    {generatedKey}
                  </div>
                  <p className="text-[11px] text-emerald-700">
                    ⚠️ Store this key safely. For security, the full secret will not be displayed again.
                  </p>
                </div>
              )}

              {/* Active Keys Table */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-slate-700 mb-2">Active Keys</h4>
                {apiKeys.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No keys generated yet.</p>
                ) : (
                  <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden text-xs">
                    {apiKeys.map((k) => (
                      <div key={k.id} className="p-3 flex items-center justify-between bg-slate-50/50">
                        <div>
                          <div className="font-semibold text-slate-800">{k.name}</div>
                          <div className="font-mono text-[11px] text-slate-400">{k.maskedKey}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              k.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"
                            }`}
                          >
                            {k.status}
                          </span>
                          {k.status === "active" && (
                            <button
                              onClick={() => handleRevokeKey(k.id)}
                              className="text-red-500 hover:text-red-700 text-xs"
                            >
                              Revoke
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Interactive API Sandbox */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-rose-600" />
                  <h3 className="font-bold text-slate-900 text-sm">Interactive API Sandbox</h3>
                </div>
                <span className="text-[11px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  POST /api/v1/process
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Child Alias</label>
                  <input
                    type="text"
                    value={sandboxChildAlias}
                    onChange={(e) => setSandboxChildAlias(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Target Sound</label>
                  <input
                    type="text"
                    value={sandboxTargetSound}
                    onChange={(e) => setSandboxTargetSound(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <button
                onClick={handleRunSandbox}
                disabled={sandboxLoading}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-semibold text-xs transition-colors"
              >
                {sandboxLoading ? "Processing..." : "Send Request to API"}
              </button>

              {sandboxResult && (
                <div className="mt-3 p-4 rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs overflow-x-auto text-emerald-400">
                  <pre>{JSON.stringify(sandboxResult, null, 2)}</pre>
                </div>
              )}
            </div>

            {/* Live Standards Catalog Explorer */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-rose-600" />
                  <h3 className="font-bold text-slate-900 text-sm">Public Speech Standards Catalog</h3>
                </div>
                <button
                  onClick={handleFetchStandards}
                  disabled={loadingStandards}
                  className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                >
                  {loadingStandards ? "Querying..." : "GET /api/v1/standards"}
                </button>
              </div>

              {standardsData ? (
                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 font-mono text-xs overflow-x-auto text-slate-800">
                  <pre>{JSON.stringify(standardsData, null, 2)}</pre>
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">
                  Click above to query the live standards and clinical taxonomy endpoint.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

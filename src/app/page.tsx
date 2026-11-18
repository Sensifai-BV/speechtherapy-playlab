import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { APP_METADATA } from "@/lib/sensifai/app-metadata";
import {
  Mic,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Layers,
  Activity,
  Terminal,
  HelpCircle,
  Eye,
  Check,
  Volume2,
  Award,
  BookOpen,
  Heart,
  Smile,
  BarChart3,
  Calendar,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FFFDFB] text-[#1E293B] flex flex-col font-sans selection:bg-rose-100 selection:text-rose-900">
      {/* Top Marketing Navigation Bar */}
      <Navbar
        appName={APP_METADATA.name}
        logoSrc="/logo.png"
        primaryColor={APP_METADATA.primaryColor}
        navLinks={[
          { label: "Practice Studio", href: "/workspace" },
          { label: "Capabilities", href: "#features" },
          { label: "Mastery Levels", href: "#tiers" },
          { label: "Developer API", href: "#api" },
          { label: "Pricing", href: "#pricing" },
        ]}
        ctaLabel="Open Practice Studio"
        ctaHref="/workspace"
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        {/* Subtle Brand Ambient Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-500/15 via-amber-500/5 to-transparent pointer-events-none -z-10" />

        <div className="text-center max-w-3xl mx-auto space-y-5">
          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-900 text-xs font-semibold shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-rose-600 animate-pulse" />
            <span>SENSIFAI AI ENGINE · PEDIATRIC SPEECH ARTICULATION & PROGRESS REPORTING</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.14]">
            Playful Speech-Therapy <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-rose-600 via-amber-500 to-rose-700 bg-clip-text text-transparent">
              Home Practice With Progress Reports
            </span>
          </h1>

          {/* Clean Plain-Text Subheadline */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Turn routine speech drills into delightful voice-guided audio games. Ingest child vocalizations during guided target-sound games, evaluate phoneme articulation accuracy in real time, and compile objective progress reports for clinicians in under sixty seconds.
          </p>

          {/* Hero CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/workspace"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm shadow-md transition-all duration-150 hover:shadow-lg"
            >
              <Sparkles className="h-4 w-4" />
              <span>Open Practice Studio</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
            <Link
              href="#features"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-200 shadow-2xs transition-all duration-150"
            >
              <Eye className="h-4 w-4 text-slate-500" />
              <span>Explore Capabilities</span>
            </Link>
          </div>

          {/* Trust Metrics Strip */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto border-t border-slate-200">
            {APP_METADATA.stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="font-mono text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Product UI Frame */}
        <div className="mt-12 sm:mt-16 max-w-5xl mx-auto rounded-2xl border border-slate-200 bg-white p-2 sm:p-3 shadow-2xl">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-100 bg-slate-50 rounded-t-xl">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <div className="mx-auto font-mono text-[11px] text-slate-400 bg-white px-4 py-0.5 rounded-md border border-slate-200 truncate max-w-xs sm:max-w-md">
              https://speechtherapy-playlab.sensifai.com/workspace
            </div>
          </div>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-b-xl bg-slate-900">
            <Image
              src="/images/platform-ui.png"
              alt="SpeechTherapy PlayLab Workspace UI"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section id="features" className="py-16 md:py-24 bg-white border-y border-slate-100 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold">
              <Award className="h-3.5 w-3.5" />
              <span>CORE CAPABILITIES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Clinical Rigor Wrapped in Playful Games
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Designed in partnership with pediatric speech-language pathologists to keep children motivated while delivering objective phonetic telemetry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {APP_METADATA.features.map((feature) => (
              <div
                key={feature.id}
                className="group rounded-2xl border border-slate-200 bg-[#FFFDFB] p-5 space-y-4 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                    <Image
                      src={feature.imageSrc}
                      alt={feature.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="pt-2 flex items-center text-xs font-semibold text-rose-600 group-hover:text-rose-700">
                  <span>Explore in Studio</span>
                  <ArrowRight className="h-3 w-3 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mastery Levels / Operational Tiers Section */}
      <section id="tiers" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold">
              <Layers className="h-3.5 w-3.5" />
              <span>PROGRESSION FRAMEWORK</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Phoneme Mastery & Articulation Tiers
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Automated classification tiers aligned with clinical speech therapy developmental standards and acoustic resonance benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {APP_METADATA.operationalTiers.map((tier, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs relative overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{ backgroundColor: tier.color }}
                />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-bold"
                      style={{
                        backgroundColor: `${tier.color}15`,
                        color: tier.color,
                      }}
                    >
                      Stage {idx + 1}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{tier.tier}</h3>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {tier.label}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {tier.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B Headless REST API Section */}
      <section id="api" className="py-16 md:py-24 bg-slate-900 text-white px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold font-mono">
              <Terminal className="h-3.5 w-3.5" />
              <span>HEADLESS B2B REST API</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Clinic Electronic Health Record Integration
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Integrate pediatric speech evaluation directly into your clinical practice management software, telehealth portal, or school therapy tracking platform with dedicated application keys.
            </p>
          </div>

          {/* Zero Logto ID Leakage Callout */}
          <div className="max-w-3xl mx-auto rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 sm:p-5 flex items-start gap-3.5">
            <ShieldCheck className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-emerald-300">
                Strict Zero Account Identity Leakage Guarantee
              </h4>
              <p className="text-xs text-emerald-200/80 leading-relaxed">
                SpeechTherapy PlayLab isolates all B2B API integrations using cryptographically generated application tokens. Personal Logto user identities, account subs, and internal credentials are never exposed in endpoints, headers, or payloads.
              </p>
            </div>
          </div>

          {/* Two-Column Code & Spec View */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* cURL Request */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                <span className="text-[11px] text-slate-300 uppercase font-semibold">cURL Request</span>
                <span className="text-emerald-400">POST /api/v1/process</span>
              </div>
              <pre className="text-rose-300 overflow-x-auto leading-relaxed">
{`curl -X POST https://speechtherapy-playlab.sensifai.com/api/v1/process \\
  -H "Authorization: Bearer stp_live_8f3a9e..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "childAlias": "Leo M.",
    "targetPhoneme": "/r/ - Vocalic R",
    "wordsTested": ["Rocket", "Star", "Carrot"],
    "sessionDurationSeconds": 195
  }'`}
              </pre>
            </div>

            {/* JSON Response */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                <span className="text-[11px] text-slate-300 uppercase font-semibold">Structured JSON Telemetry</span>
                <span className="text-rose-400">200 OK</span>
              </div>
              <pre className="text-emerald-300 overflow-x-auto leading-relaxed">
{`{
  "success": true,
  "reportId": "STP-20261118-4921",
  "result": {
    "childAlias": "Leo M.",
    "targetPhoneme": "/r/ - Vocalic R",
    "overallAccuracyPct": 93.3,
    "overallTier": "Mastery Level (90%+ Accuracy)",
    "starsEarned": 3,
    "gentleFeedback": "Terrific articulation! Great retroflex tongue elevation.",
    "clinicianReport": {
      "weeklyTrend": "+18% accuracy increase",
      "recommendedNextStep": "Advance to 2-word carrier phrases"
    }
  },
  "timestamp": "2026-11-18T07:00:00Z"
}`}
              </pre>
            </div>
          </div>

          {/* Endpoints Table */}
          <div className="max-w-4xl mx-auto rounded-xl border border-slate-800 bg-slate-950 overflow-hidden text-xs">
            <div className="px-5 py-3 border-b border-slate-800 font-semibold text-slate-300">
              Public B2B REST Endpoints
            </div>
            <div className="divide-y divide-slate-800/80">
              <div className="px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-rose-900/50 text-rose-300 font-mono text-[11px]">GET</span>
                  <span className="font-mono text-slate-200">/api/v1/standards</span>
                </div>
                <span className="text-slate-400 text-xs">Public speech articulation standards & ASHA developmental norms catalog</span>
              </div>
              <div className="px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-emerald-900/50 text-emerald-300 font-mono text-[11px]">POST</span>
                  <span className="font-mono text-slate-200">/api/v1/keys</span>
                </div>
                <span className="text-slate-400 text-xs">Provision dedicated application tokens for your clinic portal</span>
              </div>
              <div className="px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-rose-900/50 text-rose-300 font-mono text-[11px]">POST</span>
                  <span className="font-mono text-slate-200">/api/v1/process</span>
                </div>
                <span className="text-slate-400 text-xs">Automated speech therapy practice evaluation with structured telemetry</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Prepaid Pricing */}
      <section id="pricing" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-semibold">
            <Activity className="h-3.5 w-3.5" />
            <span>TRANSPARENT USAGE PRICING</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Pay Only for Practice Sessions Completed
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            No recurring monthly platform fees or seat licensing. Practice evaluations are metered transparently at five euro cents each directly from your Sensifai prepaid wallet.
          </p>

          <div className="pt-4 max-w-md mx-auto rounded-2xl border-2 border-rose-600 bg-white p-8 shadow-xl space-y-6 text-left">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Pay-As-You-Go Evaluation</h3>
                <p className="text-xs text-slate-500">Atomic metering per practice session</p>
              </div>
              <div className="text-right">
                <div className="font-mono text-3xl font-extrabold text-rose-600">€0.05</div>
                <div className="text-[11px] text-slate-400">per evaluation</div>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-600 border-t border-slate-100 pt-4">
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span>Full acoustic formant and phoneme articulation analysis</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span>Gentle close and try-again gamified encouragement</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span>Weekly clinician progress summary and next-step advice</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span>Headless B2B REST API access with dedicated application keys</span>
              </li>
            </ul>

            <Link
              href="/workspace"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm transition-colors shadow-sm"
            >
              <span>Get Started in Practice Studio</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-100 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/70 text-slate-700 text-xs font-semibold">
              <HelpCircle className="h-3.5 w-3.5" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Everything You Need to Know
            </h2>
          </div>

          <div className="space-y-4">
            {APP_METADATA.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-white p-5 space-y-2 shadow-2xs"
              >
                <h4 className="font-semibold text-slate-900 text-sm sm:text-base">
                  {faq.q}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-12 bg-white border-t border-slate-200 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-6 h-6 rounded-md overflow-hidden">
              <Image src="/logo.png" alt="Logo" fill className="object-cover" />
            </div>
            <span className="font-semibold text-slate-700">SpeechTherapy PlayLab</span>
            <span>·</span>
            <span>Sensifai AI Marketplace Series 2</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/workspace" className="hover:text-rose-600 transition-colors">
              Practice Studio
            </Link>
            <Link href="#api" className="hover:text-rose-600 transition-colors">
              Developer API
            </Link>
            <Link href="#pricing" className="hover:text-rose-600 transition-colors">
              Pricing
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

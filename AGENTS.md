# AGENTS.md — SpeechTherapy PlayLab (speechtherapy-playlab)

Operating manual for AI agents in this repository. Workspace skills live in
`.agents/skills/` and activate by task context — load the matching skill before coding.

## Source of Truth

`PROJECT.md` is the single source of truth (features, domain theme, acceptance criteria,
marketplace metadata). Never contradict `PROJECT.md`.

## Stack & Drop-In Platform Templates

Next.js 14 (App Router) + TypeScript. Platform integration in `src/lib/sensifai/`:
- `src/lib/sensifai/auth.ts` — Logto OIDC Authorization Code + PKCE, state validation, localhost + canonical `https://speechtherapy-playlab.sensifai.com` redirect resolution (`getSafeBaseUrl`), HttpOnly cookies. ZERO mock logins, ZERO hardcoded fallback users.
- `src/lib/sensifai/gatekeeper.ts` — `X-API-Key` client with `cache: "no-store"`, timeout protection, and 429/5xx exponential backoff.
- `src/lib/sensifai/usage.ts` — `deductAndSyncWallet()` pre-checks balance (402 when <= 0), submits immediate usage (`recordUsageImmediate`), and polls Gatekeeper across short intervals so NATS JetStream worker commits the deduction before returning `wallet: updatedWallet` to the UI.
- `src/lib/sensifai/entitlement.ts` — Subscription status verification (`active`/`trialing` vs `404`/`canceled`).
- `src/lib/sensifai/webhook.ts` — `Sensifai-Signature` HMAC-SHA256 verification, 5-minute replay window, and `Idempotency-Key` deduplication.
- `src/lib/sensifai/ai.ts` — Centralized LiteLLM Gateway client (`https://llm.sensifai.com`). Dynamically queries `/v1/models` to select the **latest Gemini model** (`resolveLatestGeminiModel()`), with automatic failover and `extractSafeJson()` so routes never crash on markdown-fenced JSON.
- `src/lib/sensifai/theme.ts` — Domain-adaptive color palette & CSS variable generator (`resolveAppPalette()`, `getThemeCssVariables()`).
- `src/lib/sensifai/api-keys.ts` — Cryptographically minted application tokens (`stp_live_<hex>`) with local persistence, validation, masking, and revocation.
- API Routes: `/api/auth/login`, `/api/auth/logout`, `/api/auth/me`, `/callback`, `/api/wallet`, `/api/webhooks/sensifai`, `/api/health`, `/api/billable-action`, `/api/v1/keys`, `/api/v1/standards`, `/api/v1/process`. All export `export const dynamic = "force-dynamic"; export const revalidate = 0;`.
- UI Components: `src/components/Navbar.tsx` (top marketing bar + mobile bottom bar + zero-revert wallet sync) and `src/components/AppShell.tsx` (desktop collapsible left-sidebar workspace + mobile native bottom tab bar + `AuthGateCard`).

## UI, UX & Visual Quality Gates (MANDATORY)

Read `.agents/skills/sensifai-design-system/SKILL.md` and `.agents/skills/sensifai-ui-ux-excellence/SKILL.md`:
- **Bespoke Domain Color & Archetype:** Apply `media_brand.primary_color` (#E11D48 - Rose & Tactile Playful Therapy) and `media_brand.ui_archetype` (playful) from `PROJECT.md` via `src/lib/sensifai/theme.ts`. Never ship a generic clone.
- **Dedicated `/workspace` Route (Never in Landing Page):** The application workspace/dashboard lives inside `src/app/workspace/page.tsx` (and re-exported to `src/app/dashboard/page.tsx`). The landing page (`src/app/page.tsx`) MUST remain a pure high-converting marketing surface with showcase previews and CTAs directing to `/workspace`. NEVER embed `AppShell` as an internal section of `src/app/page.tsx`!
- **Desktop Left Sidebar + Mobile Native Bottom Bar:** The workspace/dashboard MUST use `AppShell.tsx` providing a collapsible **Left Sidebar Menu on Desktop (`>= 1024px`)** with a pinned live Prepaid Wallet card at the bottom, and a **Native-App Fixed Bottom Navigation Bar (`h-16`) on Mobile (`< 1024px`)**.
- **Dual Visuals (Scene Photos + Real UI Screenshots):** Run `node scripts/generate-media.mjs` and `.agents/skills/sensifai-media-generation/SKILL.md`. Both photorealistic domain scene images (`media/cover.png`, `public/images/hero.jpg`, `public/images/feature-1..3.jpg` with ZERO baked-in text) AND real desktop screenshots of the running app (`media/platform-mockup.png`, `public/images/platform-ui.png` inside a browser/device frame) are mandatory.
- **Transparent Logo:** `media/logo.png` and `public/logo.png` must have a 100% transparent alpha channel (strip solid white background pixels programmatically).
- **100% English UI & Zero Model Names:** Zero Persian/Arabic characters in `.tsx` files. Never display internal model names (`Gemini`, `2.5`, `3.8`, `OpenAI`) in UI copy — use "Sensifai AI Engine".
- **Docker-Resilient Fonts:** Never use `next/font/google` in `layout.tsx`. Load `DM Sans` and `JetBrains Mono` via `<link>` tags in `<head>` with CSS variable fallbacks in `globals.css`.
- **Mandatory AI Disclaimer:** Always render `<AIDisclaimer />` directly below the primary AI execution/action button.
- **Clean Plain-Text Descriptions:** No raw markdown syntax, unrendered tags, or broken formatting in description fields or metadata.
- **Headless B2B REST API & Zero Logto ID Leakage:** Complete REST endpoints under `/api/v1/` (`keys`, `standards`, `process`), CORS preflight, dedicated application keys, and strict zero leakage of personal Logto user ID (`wckiqf9jo9gs`).

## Credential & Token Gate

- Dedicated LiteLLM Virtual Key (`AI_GATEWAY_KEY`) is auto-provisioned via `POST https://llm.sensifai.com/key/generate` (or `node scripts/marketplace-manage.mjs`).
- Dedicated Sensifai App API Key (`SENSIFAI_API_KEY`) is issued per application.
- For `SENSIFAI_ACCESS_TOKEN` (needed for Marketplace registration & Logto provisioning): if not already provided in the prompt or `.env`, check browser tool or ask user from `https://sensifai.com/api/auth/agent-authorize`.

## End-to-End Verification & Deployment

1. Run `node scripts/test-sensifai.mjs` — all automated audits and live tests (Codebase/English UI, Cache Protection, OIDC PKCE, Live Gatekeeper Balance, Live Wallet Deduction, Webhooks, Latest Gemini AI call) must PASS.
2. Run `npm run build` — 0 TypeScript/Next.js errors.
3. Capture live desktop (`1280px`), tablet (`768px`), and mobile (`375px`) screenshots (`media/platform-mockup.png`, `public/images/platform-ui.png`) and write `REVIEW.md`.
4. Deliver `Dockerfile` (`RUN npm ci --include=dev`, `standalone` output), `docker-compose.yml` (`expose:` only, NEVER `ports:`), `.dockerignore`, and `GET /api/health`.
5. Register/update and publish via `node scripts/marketplace-manage.mjs` (which registers both `https://speechtherapy-playlab.sensifai.com/callback` and `http://localhost:3000/callback` and writes all keys to `.env`).

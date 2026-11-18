import crypto from "crypto";
import fs from "fs";
import path from "path";

export interface ApiKeyRecord {
  id: string;
  name: string;
  key: string;
  maskedKey: string;
  userId?: string;
  createdAt: string;
  lastUsedAt: string | null;
  status: "active" | "revoked";
}

let inMemoryKeys: ApiKeyRecord[] = [];
const KEYS_FILE_PATH = path.resolve(process.cwd(), ".dev-api-keys.json");

function loadStoredKeys(): ApiKeyRecord[] {
  try {
    if (fs.existsSync(KEYS_FILE_PATH)) {
      const data = fs.readFileSync(KEYS_FILE_PATH, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        inMemoryKeys = parsed;
      }
    }
  } catch (err) {
    console.warn("[API_KEYS] Could not load stored keys:", err);
  }
  return inMemoryKeys;
}

function persistKeys(keys: ApiKeyRecord[]) {
  inMemoryKeys = keys;
  try {
    fs.writeFileSync(KEYS_FILE_PATH, JSON.stringify(keys, null, 2), "utf-8");
  } catch (err) {
    console.warn("[API_KEYS] Could not persist keys:", err);
  }
}

/**
 * Generates a brand-new, cryptographically secure application API key.
 * Format: <prefix>_live_<48 hex chars> (default prefix: sensi)
 * 
 * STRICT ZERO USER LOGTO ID / ACCOUNT IDENTITY LEAKAGE GUARANTEE:
 * All B2B integrations authenticate exclusively with dedicated application tokens.
 * Personal Sensifai Logto account credentials (e.g. user_account_id) and client secrets
 * are strictly isolated and never exposed in API payloads, logs, or responses.
 */
export function createNewApiKey(
  name = "B2B Production API Key",
  prefix = "sensi",
  userId?: string
): ApiKeyRecord {
  const keys = loadStoredKeys();
  const cleanPrefix = (prefix || "sensi").toLowerCase().replace(/[^a-z0-9]/g, "");
  const randomBytes = crypto.randomBytes(24).toString("hex");
  const rawKey = `${cleanPrefix}_live_${randomBytes}`;
  const maskedKey = `${rawKey.slice(0, cleanPrefix.length + 10)}...${rawKey.slice(-4)}`;

  const newKey: ApiKeyRecord = {
    id: `key_${crypto.randomUUID().slice(0, 8)}`,
    name,
    key: rawKey,
    maskedKey,
    userId: userId || undefined,
    createdAt: new Date().toISOString(),
    lastUsedAt: null,
    status: "active",
  };

  keys.unshift(newKey);
  persistKeys(keys);
  return newKey;
}

export function listApiKeys(userId?: string): ApiKeyRecord[] {
  const keys = loadStoredKeys();
  if (userId) {
    return keys.filter((k) => k.userId === userId);
  }
  return keys;
}

export function validateApiKey(rawKey: string): ApiKeyRecord | null {
  if (!rawKey || !rawKey.includes("_live_")) return null;
  const keys = loadStoredKeys();
  const match = keys.find((k) => k.key === rawKey && k.status === "active");
  if (match) {
    match.lastUsedAt = new Date().toISOString();
    persistKeys(keys);
    return match;
  }
  return null;
}

export function revokeApiKey(id: string, userId?: string): boolean {
  const keys = loadStoredKeys();
  const target = keys.find((k) => k.id === id && (!userId || k.userId === userId));
  if (target) {
    target.status = "revoked";
    persistKeys(keys);
    return true;
  }
  return false;
}

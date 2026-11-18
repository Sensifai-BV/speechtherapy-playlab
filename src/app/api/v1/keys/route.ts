export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/sensifai/auth";
import {
  listApiKeys,
  createNewApiKey,
  revokeApiKey,
} from "@/lib/sensifai/api-keys";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, X-API-Key, Content-Type, X-Sensifai-Customer-Id",
    },
  });
}

/**
 * REST API for Application Developer Keys
 * GET    /api/v1/keys - List active/revoked API keys (with masked secrets)
 * POST   /api/v1/keys - Generate a brand-new dedicated application key
 * DELETE /api/v1/keys - Revoke an existing API key
 *
 * STRICT ZERO LOGTO ID LEAKAGE:
 * Never exposes or returns personal Logto IDs (user_account_id) or client secrets.
 * Strictly enforces authentication: only authenticated users can mint or view keys.
 */
export async function GET(req: NextRequest) {
  try {
    const sub = getUserIdFromRequest(req);
    if (!sub) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication required to view developer API keys. Please sign in.",
          code: "UNAUTHORIZED",
          login_url: "/api/auth/login",
        },
        { status: 401, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const keys = listApiKeys(sub);
    const sanitized = keys.map((k) => ({
      id: k.id,
      name: k.name,
      maskedKey: k.maskedKey,
      createdAt: k.createdAt,
      lastUsedAt: k.lastUsedAt,
      status: k.status,
    }));

    return NextResponse.json(
      {
        success: true,
        keys: sanitized,
        total: sanitized.length,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: "Failed to list API keys", message: err.message },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const sub = getUserIdFromRequest(req);
    if (!sub) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication required. Please sign in with your Sensifai account to generate an API key.",
          code: "UNAUTHORIZED",
          login_url: "/api/auth/login",
        },
        { status: 401, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const body = await req.json().catch(() => ({}));
    const name = String(body.name || "B2B Production API Key").trim();
    const prefix = String(body.prefix || "stp").trim();

    const newKeyRecord = createNewApiKey(name, prefix, sub);

    return NextResponse.json(
      {
        success: true,
        message:
          "API Key created successfully. Store it safely, as full secret is only shown once.",
        apiKey: newKeyRecord.key,
        id: newKeyRecord.id,
        name: newKeyRecord.name,
        createdAt: newKeyRecord.createdAt,
      },
      {
        status: 201,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: "Failed to generate API key", message: err.message },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const sub = getUserIdFromRequest(req);
    if (!sub) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication required to revoke developer API keys.",
          code: "UNAUTHORIZED",
        },
        { status: 401, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing required query parameter: id" },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const revoked = revokeApiKey(id, sub);
    if (!revoked) {
      return NextResponse.json(
        { success: false, error: "API Key not found or already revoked" },
        { status: 404, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `API Key ${id} has been permanently revoked.`,
      },
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: "Failed to revoke API key", message: err.message },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}

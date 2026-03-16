import { NextRequest, NextResponse } from 'next/server';

// Vercel KV REST API — set KV_REST_API_URL and KV_REST_API_TOKEN in env vars.
// npm install @vercel/kv is NOT required; we use the REST API directly via fetch.
const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

const REACTION_KEYS = ['quick', 'fire', 'soccer', 'hire', 'target'] as const;
type ReactionKey = typeof REACTION_KEYS[number];

function isReactionKey(k: unknown): k is ReactionKey {
  return typeof k === 'string' && (REACTION_KEYS as readonly string[]).includes(k);
}

async function kvGet(key: string): Promise<number> {
  if (!KV_URL || !KV_TOKEN) return 0;
  try {
    const res = await fetch(`${KV_URL}/get/${key}`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
      next: { revalidate: 0 },
    });
    if (!res.ok) return 0;
    const json = await res.json() as { result: string | null };
    return json.result ? parseInt(json.result, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

async function kvIncr(key: string): Promise<number> {
  if (!KV_URL || !KV_TOKEN) return 0;
  try {
    const res = await fetch(`${KV_URL}/incr/${key}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
    });
    if (!res.ok) return 0;
    const json = await res.json() as { result: number };
    return json.result ?? 0;
  } catch {
    return 0;
  }
}

export async function GET() {
  if (!KV_URL || !KV_TOKEN) {
    // Graceful fallback — return zeros so client falls back to localStorage
    const counts: Record<ReactionKey, number> = { quick: 0, fire: 0, soccer: 0, hire: 0, target: 0 };
    return NextResponse.json({ counts });
  }

  try {
    const values = await Promise.all(
      REACTION_KEYS.map(k => kvGet(`reaction:${k}`))
    );
    const counts = Object.fromEntries(
      REACTION_KEYS.map((k, i) => [k, values[i]])
    ) as Record<ReactionKey, number>;
    return NextResponse.json({ counts });
  } catch {
    const counts: Record<ReactionKey, number> = { quick: 0, fire: 0, soccer: 0, hire: 0, target: 0 };
    return NextResponse.json({ counts });
  }
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const key = (body as Record<string, unknown>).key;
  if (!isReactionKey(key)) {
    return NextResponse.json({ error: 'Invalid reaction key' }, { status: 400 });
  }

  if (!KV_URL || !KV_TOKEN) {
    const counts: Record<ReactionKey, number> = { quick: 0, fire: 0, soccer: 0, hire: 0, target: 0 };
    return NextResponse.json({ counts });
  }

  try {
    await kvIncr(`reaction:${key}`);
    const values = await Promise.all(
      REACTION_KEYS.map(k => kvGet(`reaction:${k}`))
    );
    const counts = Object.fromEntries(
      REACTION_KEYS.map((k, i) => [k, values[i]])
    ) as Record<ReactionKey, number>;
    return NextResponse.json({ counts });
  } catch {
    const counts: Record<ReactionKey, number> = { quick: 0, fire: 0, soccer: 0, hire: 0, target: 0 };
    return NextResponse.json({ counts });
  }
}

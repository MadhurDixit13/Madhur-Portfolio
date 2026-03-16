import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) return NextResponse.json({ image: null });

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; portfolio-bot/1.0)' },
      next: { revalidate: 86400 }, // cache 24h
    });
    const html = await res.text();
    // Try both property orderings
    const m =
      html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/) ??
      html.match(/<meta\s+content="([^"]+)"\s+property="og:image"/);
    return NextResponse.json({ image: m?.[1] ?? null });
  } catch {
    return NextResponse.json({ image: null });
  }
}

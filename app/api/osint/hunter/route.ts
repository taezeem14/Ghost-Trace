import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get('domain');

  const apiKey = process.env.HUNTER_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ available: false, reason: "API key not configured" }, { status: 403 });
  }

  if (!domain) {
    return NextResponse.json({ error: "Domain parameter is required" }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.hunter.io/v2/domain-search?domain=${encodeURIComponent(domain)}&api_key=${apiKey}`);
    if (!response.ok) {
      throw new Error(`Hunter API error: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to fetch from Hunter API" }, { status: 500 });
  }
}

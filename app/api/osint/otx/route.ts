import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const indicator = searchParams.get('indicator');
  const type = searchParams.get('type') || 'IPv4'; // IPv4, domain, hostname, etc.

  const apiKey = process.env.OTX_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ available: false, reason: "API key not configured" }, { status: 403 });
  }

  if (!indicator) {
    return NextResponse.json({ error: "Indicator parameter is required" }, { status: 400 });
  }

  try {
    const response = await fetch(`https://otx.alienvault.com/api/v1/indicators/${type}/${encodeURIComponent(indicator)}/general`, {
      headers: {
        'X-OTX-API-KEY': apiKey
      }
    });

    if (!response.ok) {
      throw new Error(`OTX API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to fetch from OTX API" }, { status: 500 });
  }
}

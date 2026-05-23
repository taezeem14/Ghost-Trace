import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');

  const apiKey = process.env.URLSCAN_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ available: false, reason: "API key not configured" }, { status: 403 });
  }

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
  }

  try {
    const response = await fetch(`https://urlscan.io/api/v1/search/?q=${encodeURIComponent(query)}`, {
      headers: {
        'API-Key': apiKey
      }
    });
    if (!response.ok) throw new Error(`urlscan API error: ${response.status}`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to fetch from urlscan API" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const apiKey = process.env.URLSCAN_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ available: false, reason: "API key not configured" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { url, visibility } = body;

    if (!url) {
      return NextResponse.json({ error: "URL is required in body" }, { status: 400 });
    }

    const response = await fetch('https://urlscan.io/api/v1/scan/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': apiKey
      },
      body: JSON.stringify({ url, visibility: visibility || 'public' })
    });

    if (!response.ok) throw new Error(`urlscan API error: ${response.status}`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to submit to urlscan API" }, { status: 500 });
  }
}

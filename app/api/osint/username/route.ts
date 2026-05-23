import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  const apiUrl = process.env.SHERLOCK_API_URL;

  if (!apiUrl) {
    return NextResponse.json({ available: false, reason: "Sherlock API URL not configured" }, { status: 403 });
  }

  if (!username) {
    return NextResponse.json({ error: "Username parameter is required" }, { status: 400 });
  }

  try {
    const response = await fetch(`${apiUrl}/search?username=${encodeURIComponent(username)}`);
    if (!response.ok) {
      throw new Error(`Sherlock API error: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to fetch from Sherlock API" }, { status: 500 });
  }
}

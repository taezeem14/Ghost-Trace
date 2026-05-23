import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ip = searchParams.get('ip');

  if (!ip) {
    return NextResponse.json({ error: "IP parameter is required" }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.hackertarget.com/nmap/?q=${encodeURIComponent(ip)}`);
    if (!response.ok) {
      throw new Error(`HackerTarget API error: ${response.status}`);
    }
    const data = await response.text();
    return NextResponse.json({ result: data });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to fetch portscan" }, { status: 500 });
  }
}

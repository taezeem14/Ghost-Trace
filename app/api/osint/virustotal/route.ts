import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const resource = searchParams.get('resource');
  const type = searchParams.get('type') || 'domain'; // 'domain', 'ip', 'url'

  const apiKey = process.env.VIRUSTOTAL_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ available: false, reason: "API key not configured" }, { status: 403 });
  }

  if (!resource) {
    return NextResponse.json({ error: "Resource parameter is required" }, { status: 400 });
  }

  try {
    let endpoint = '';
    if (type === 'domain') endpoint = `https://www.virustotal.com/api/v3/domains/${encodeURIComponent(resource)}`;
    else if (type === 'ip') endpoint = `https://www.virustotal.com/api/v3/ip_addresses/${encodeURIComponent(resource)}`;
    else if (type === 'url') {
        const urlId = Buffer.from(resource).toString('base64url');
        endpoint = `https://www.virustotal.com/api/v3/urls/${urlId}`;
    }
    else {
        return NextResponse.json({ error: "Invalid type parameter" }, { status: 400 });
    }

    const response = await fetch(endpoint, {
      headers: {
        'x-apikey': apiKey
      }
    });
    
    if (!response.ok) {
      throw new Error(`VirusTotal API error: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to fetch from VirusTotal API" }, { status: 500 });
  }
}

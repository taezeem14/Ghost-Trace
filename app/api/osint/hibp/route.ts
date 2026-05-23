import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');
  const email = searchParams.get('email');

  if (!domain && !email) {
    return NextResponse.json({ error: 'Domain or Email parameter is required' }, { status: 400 });
  }

  try {
    if (email) {
      const apiKey = process.env.HIBP_API_KEY;
      if (!apiKey) {
        return NextResponse.json({ available: false, reason: "API key not configured" });
      }
      
      const response = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}?truncateResponse=false`, {
        headers: {
          'hibp-api-key': apiKey,
          'user-agent': 'GhostTrace-OSINT'
        }
      });
      
      if (response.status === 404) {
        return NextResponse.json({ available: true, data: [] }); // No breaches found
      }
      if (!response.ok) {
        throw new Error(`HIBP API returned status: ${response.status}`);
      }
      
      const data = await response.json();
      return NextResponse.json({ available: true, data });
    }

    if (domain) {
      const response = await fetch(`https://haveibeenpwned.com/api/v3/breaches?domain=${encodeURIComponent(domain)}`);
      if (response.status === 404) {
        return NextResponse.json({ available: true, data: [] });
      }
      if (!response.ok) {
        throw new Error(`HIBP API returned status: ${response.status}`);
      }
      const data = await response.json();
      return NextResponse.json({ available: true, data });
    }
  } catch (error: any) {
    return NextResponse.json({ available: false, error: error.message }, { status: 500 });
  }
}

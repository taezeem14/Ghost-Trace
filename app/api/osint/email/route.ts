import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email parameter is required" }, { status: 400 });
    }

    const url = new URL(req.url);
    const origin = url.origin;

    const headers = new Headers();
    const clientKeys = req.headers.get('x-api-keys');
    if (clientKeys) {
      headers.set('x-api-keys', clientKeys);
    }

    // Extract domain from email for Hunter check
    const domainMatch = email.split('@')[1];
    const hunterPromise = domainMatch
      ? fetch(`${origin}/api/osint/hunter?domain=${encodeURIComponent(domainMatch)}`, { headers })
      : Promise.resolve(null);

    // Run parallel fetches for email lookups
    const [hibpRes, hunterRes] = await Promise.allSettled([
      fetch(`${origin}/api/osint/hibp?email=${encodeURIComponent(email)}`, { headers }),
      hunterPromise
    ]);

    const hibp = hibpRes.status === 'fulfilled' && hibpRes.value.ok ? await hibpRes.value.json() : null;
    const hunter = hunterRes.status === 'fulfilled' && hunterRes.value !== null && hunterRes.value.ok ? await hunterRes.value.json() : null;

    // Calculate threat score based on breach exposure
    let malware = 0;
    let phishing = 0;
    let spam = 0;
    let vulnerability = 0;
    let anomalies = 0;

    if (hibp && Array.isArray(hibp.data) && hibp.data.length > 0) {
      // Scale threat score based on number of breaches
      anomalies += Math.min(hibp.data.length * 15, 75);
    }

    const threatScore = Math.min(malware + phishing + spam + vulnerability + anomalies, 100);

    return NextResponse.json({
      success: true,
      data: {
        breaches: hibp?.data || [],
        hunter: hunter?.data || hunter || {}
      },
      threatScore
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to execute email scan" }, { status: 500 });
  }
}

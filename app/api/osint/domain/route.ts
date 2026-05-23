import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { domain } = await req.json();

    if (!domain) {
      return NextResponse.json({ error: "Domain parameter is required" }, { status: 400 });
    }

    const url = new URL(req.url);
    const origin = url.origin;

    const headers = new Headers();
    const clientKeys = req.headers.get('x-api-keys');
    if (clientKeys) {
      headers.set('x-api-keys', clientKeys);
    }

    // Run fetches in parallel using origin URL mapping
    const [whoisRes, dnsRes, sslRes, subdomainsRes, techRes, hibpRes] = await Promise.allSettled([
      fetch(`${origin}/api/osint/whois?domain=${encodeURIComponent(domain)}`, { headers }),
      fetch(`${origin}/api/osint/dns?domain=${encodeURIComponent(domain)}`, { headers }),
      fetch(`${origin}/api/osint/ssl?domain=${encodeURIComponent(domain)}`, { headers }),
      fetch(`${origin}/api/osint/subdomains?domain=${encodeURIComponent(domain)}`, { headers }),
      fetch(`${origin}/api/osint/tech?url=${encodeURIComponent(`http://${domain}`)}`, { headers }),
      fetch(`${origin}/api/osint/hibp?domain=${encodeURIComponent(domain)}`, { headers })
    ]);

    const whois = whoisRes.status === 'fulfilled' && whoisRes.value.ok ? await whoisRes.value.json() : null;
    const dns = dnsRes.status === 'fulfilled' && dnsRes.value.ok ? await dnsRes.value.json() : null;
    const ssl = sslRes.status === 'fulfilled' && sslRes.value.ok ? await sslRes.value.json() : null;
    const subdomains = subdomainsRes.status === 'fulfilled' && subdomainsRes.value.ok ? await subdomainsRes.value.json() : null;
    const tech = techRes.status === 'fulfilled' && techRes.value.ok ? await techRes.value.json() : null;
    const hibp = hibpRes.status === 'fulfilled' && hibpRes.value.ok ? await hibpRes.value.json() : null;

    // Calculate threat score indicators
    let malware = 0;
    let phishing = 0;
    let spam = 0;
    let vulnerability = 0;
    let anomalies = 0;

    // Evaluate SSL
    if (ssl && !ssl.valid) {
      vulnerability += 40;
    }
    
    // Evaluate breaches
    if (hibp && Array.isArray(hibp.data) && hibp.data.length > 0) {
      anomalies += Math.min(hibp.data.length * 10, 50);
    }

    // Evaluate DNS issues (no records)
    if (!dns || (dns.A && dns.A.length === 0)) {
      anomalies += 20;
    }

    const threatScore = Math.min(malware + phishing + spam + vulnerability + anomalies, 100);

    return NextResponse.json({
      success: true,
      data: {
        whois: whois?.data || whois || {},
        dns: dns?.data || dns || {},
        ssl: ssl?.data || ssl || {},
        subdomains: subdomains?.data || subdomains || {},
        tech: tech?.data || tech || {},
        breaches: hibp?.data || []
      },
      threatScore
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to execute domain scan" }, { status: 500 });
  }
}

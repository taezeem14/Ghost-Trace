import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { ip } = await req.json();

    if (!ip) {
      return NextResponse.json({ error: "IP parameter is required" }, { status: 400 });
    }

    const url = new URL(req.url);
    const origin = url.origin;

    const headers = new Headers();
    const clientKeys = req.headers.get('x-api-keys');
    if (clientKeys) {
      headers.set('x-api-keys', clientKeys);
    }

    // Run parallel fetches for IP intel
    const [geoRes, asnRes, shodanRes, abuseRes, vtRes, portscanRes, traceRes] = await Promise.allSettled([
      fetch(`${origin}/api/osint/ipgeo?ip=${encodeURIComponent(ip)}`, { headers }),
      fetch(`${origin}/api/osint/asn?ip=${encodeURIComponent(ip)}`, { headers }),
      fetch(`${origin}/api/osint/shodan?ip=${encodeURIComponent(ip)}`, { headers }),
      fetch(`${origin}/api/osint/abuseipdb?ip=${encodeURIComponent(ip)}`, { headers }),
      fetch(`${origin}/api/osint/virustotal?ip=${encodeURIComponent(ip)}`, { headers }),
      fetch(`${origin}/api/osint/portscan?ip=${encodeURIComponent(ip)}`, { headers }),
      fetch(`${origin}/api/osint/traceroute?ip=${encodeURIComponent(ip)}`, { headers })
    ]);

    const geo = geoRes.status === 'fulfilled' && geoRes.value.ok ? await geoRes.value.json() : null;
    const asn = asnRes.status === 'fulfilled' && asnRes.value.ok ? await asnRes.value.json() : null;
    const shodan = shodanRes.status === 'fulfilled' && shodanRes.value.ok ? await shodanRes.value.json() : null;
    const abuse = abuseRes.status === 'fulfilled' && abuseRes.value.ok ? await abuseRes.value.json() : null;
    const vt = vtRes.status === 'fulfilled' && vtRes.value.ok ? await vtRes.value.json() : null;
    const portscan = portscanRes.status === 'fulfilled' && portscanRes.value.ok ? await portscanRes.value.json() : null;
    const traceroute = traceRes.status === 'fulfilled' && traceRes.value.ok ? await traceRes.value.json() : null;

    // Calculate threat score
    let malware = 0;
    let phishing = 0;
    let spam = 0;
    let vulnerability = 0;
    let anomalies = 0;

    // AbuseIPDB score
    if (abuse && abuse.abuseConfidenceScore) {
      const conf = abuse.abuseConfidenceScore;
      if (conf > 50) {
        malware += 40;
      } else if (conf > 10) {
        spam += 15;
      }
    }

    // VirusTotal score
    if (vt && vt.data && vt.data.attributes && vt.data.attributes.last_analysis_stats) {
      const stats = vt.data.attributes.last_analysis_stats;
      if (stats.malicious > 0) {
        malware += Math.min(stats.malicious * 20, 50);
      }
      if (stats.suspicious > 0) {
        phishing += Math.min(stats.suspicious * 15, 30);
      }
    }

    // Shodan ports
    if (shodan && shodan.ports && shodan.ports.length > 0) {
      vulnerability += Math.min(shodan.ports.length * 5, 20);
    }

    const threatScore = Math.min(malware + phishing + spam + vulnerability + anomalies, 100);

    return NextResponse.json({
      success: true,
      data: {
        geo: geo?.data || geo || {},
        asn: asn?.data || asn || {},
        shodan: shodan?.data || shodan || {},
        abuseipdb: abuse?.data || abuse || {},
        virustotal: vt?.data || vt || {},
        portscan: portscan?.data || portscan || {},
        traceroute: traceroute?.data || traceroute || {}
      },
      threatScore
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to execute IP scan" }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');
  const email = searchParams.get('email');

  if (!domain && !email) {
    return NextResponse.json({ error: 'Domain or Email parameter is required' }, { status: 400 });
  }

  const apiKey = process.env.HIBP_API_KEY;

  try {
    if (email) {
      if (apiKey) {
        const response = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}?truncateResponse=false`, {
          headers: { 'hibp-api-key': apiKey, 'user-agent': 'GhostTrace-OSINT' }
        });
        if (response.status === 404) return NextResponse.json({ available: true, data: [], source: 'hibp' });
        if (!response.ok) throw new Error(`HIBP API returned status: ${response.status}`);
        const data = await response.json();
        return NextResponse.json({ available: true, data, source: 'hibp' });
      } else {
        // Fallback to XposedOrNot
        const response = await fetch(`https://api.xposedornot.com/v1/check-email/${encodeURIComponent(email)}`);
        if (response.status === 404) return NextResponse.json({ available: true, data: [], source: 'xposedornot' });
        if (!response.ok) throw new Error(`XposedOrNot API returned status: ${response.status}`);
        const json = await response.json();
        
        let breaches: string[] = [];
        if (json.breaches && Array.isArray(json.breaches)) {
          breaches = json.breaches.map((b: any) => Array.isArray(b) ? b[0] : b);
        } else if (json.SearchableOnXposedOrNot?.breaches) {
          breaches = json.SearchableOnXposedOrNot.breaches;
        }
        
        const mappedData = breaches.map(b => ({
          Name: b,
          Title: b,
          Domain: 'Unknown',
          BreachDate: 'Unknown',
          PwnCount: 0,
          Description: 'Identified via XposedOrNot',
          DataClasses: []
        }));
        
        return NextResponse.json({ available: true, data: mappedData, source: 'xposedornot' });
      }
    }

    if (domain) {
      if (apiKey) {
        const response = await fetch(`https://haveibeenpwned.com/api/v3/breaches?domain=${encodeURIComponent(domain)}`);
        if (response.status === 404) return NextResponse.json({ available: true, data: [], source: 'hibp' });
        if (!response.ok) throw new Error(`HIBP API returned status: ${response.status}`);
        const data = await response.json();
        return NextResponse.json({ available: true, data, source: 'hibp' });
      } else {
        // Fallback to XposedOrNot breaches list
        const response = await fetch(`https://api.xposedornot.com/v1/breaches`);
        if (!response.ok) throw new Error(`XposedOrNot API returned status: ${response.status}`);
        const json = await response.json();
        
        const allBreaches = json.exposedBreaches || [];
        const domainBreaches = allBreaches.filter((b: any) => 
          b.domain?.toLowerCase() === domain.toLowerCase() || 
          b.domain?.toLowerCase().includes(domain.toLowerCase())
        );

        const mappedData = domainBreaches.map((b: any) => ({
          Name: b.breachID || 'Unknown',
          Title: b.breachID || 'Unknown',
          Domain: b.domain || domain,
          BreachDate: b.breachedDate || 'Unknown',
          PwnCount: b.exposedRecords || 0,
          Description: b.exposureDescription || 'Identified via XposedOrNot',
          DataClasses: b.exposedData ? (Array.isArray(b.exposedData) ? b.exposedData : b.exposedData.split(';')) : []
        }));

        return NextResponse.json({ available: true, data: mappedData, source: 'xposedornot' });
      }
    }
  } catch (error: any) {
    return NextResponse.json({ available: false, error: error.message }, { status: 500 });
  }
}

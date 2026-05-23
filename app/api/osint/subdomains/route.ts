import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain parameter is required' }, { status: 400 });
  }

  const apiKey = process.env.SECURITYTRAILS_API_KEY;

  if (apiKey) {
    try {
      const response = await fetch(`https://api.securitytrails.com/v1/domain/${domain}/subdomains`, {
        headers: {
          'APIKEY': apiKey,
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        const subdomains = data.subdomains.map((sub: string) => `${sub}.${domain}`);
        return NextResponse.json({ available: true, source: 'securitytrails', data: subdomains });
      }
    } catch (e) {
      // Fallback
    }
  }

  // Fallback to crt.sh
  try {
    const response = await fetch(`https://crt.sh/?q=%.${domain}&output=json`);
    if (response.ok) {
      const data = await response.json();
      const subdomains = [...new Set(data.map((entry: any) => entry.name_value.toLowerCase()))];
      return NextResponse.json({ available: true, source: 'crt.sh', data: subdomains });
    }
    throw new Error('Failed to fetch from crt.sh');
  } catch (error: any) {
    return NextResponse.json({ available: false, error: error.message }, { status: 500 });
  }
}

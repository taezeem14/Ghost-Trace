import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://crt.sh/?q=%.${domain}&output=json`);
    if (!response.ok) {
      throw new Error(`crt.sh API returned status: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json({ available: true, data });
  } catch (error: any) {
    return NextResponse.json({ available: false, error: error.message }, { status: 500 });
  }
}

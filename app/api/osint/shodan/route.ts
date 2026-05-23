import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ip = searchParams.get('ip');

  if (!ip) {
    return NextResponse.json({ error: 'IP parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://internetdb.shodan.io/${ip}`);
    if (response.status === 404) {
      return NextResponse.json({ available: true, data: null, message: 'No data found for this IP' });
    }
    if (!response.ok) {
      throw new Error(`Shodan InternetDB API returned status: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json({ available: true, data });
  } catch (error: any) {
    return NextResponse.json({ available: false, error: error.message }, { status: 500 });
  }
}

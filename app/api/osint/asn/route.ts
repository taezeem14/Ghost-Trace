import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ip = searchParams.get('ip');

  if (!ip) {
    return NextResponse.json({ error: 'IP parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.bgpview.io/ip/${ip}`);
    
    if (!response.ok) {
      throw new Error(`BGPView API returned status: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json({ available: true, data });
  } catch (error: any) {
    return NextResponse.json({ available: false, error: error.message }, { status: 500 });
  }
}

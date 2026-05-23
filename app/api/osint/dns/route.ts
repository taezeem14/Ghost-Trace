import { NextResponse } from 'next/server';
import dns from 'dns/promises';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain parameter is required' }, { status: 400 });
  }

  try {
    const records: any = {};
    const types = ['A', 'AAAA', 'MX', 'TXT', 'NS', 'CNAME', 'SOA'];
    
    await Promise.allSettled(
      types.map(async (type) => {
        try {
          const res = await dns.resolve(domain, type);
          records[type] = res;
        } catch (e) {
          // Record type might not exist
        }
      })
    );

    return NextResponse.json({ available: true, data: records });
  } catch (error: any) {
    return NextResponse.json({ available: false, error: error.message }, { status: 500 });
  }
}

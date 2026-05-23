import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
    
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    const text = await response.text();
    const headers = response.headers;

    const detectedTech: string[] = [];

    // Basic Header Fingerprinting
    const serverHeader = headers.get('server');
    if (serverHeader) {
      if (serverHeader.toLowerCase().includes('nginx')) detectedTech.push('Nginx');
      if (serverHeader.toLowerCase().includes('apache')) detectedTech.push('Apache');
      if (serverHeader.toLowerCase().includes('cloudflare')) detectedTech.push('Cloudflare');
      if (serverHeader.toLowerCase().includes('litespeed')) detectedTech.push('LiteSpeed');
      if (serverHeader.toLowerCase().includes('iis')) detectedTech.push('IIS');
    }

    const xPoweredBy = headers.get('x-powered-by');
    if (xPoweredBy) {
      if (xPoweredBy.toLowerCase().includes('php')) detectedTech.push('PHP');
      if (xPoweredBy.toLowerCase().includes('express')) detectedTech.push('Express');
      if (xPoweredBy.toLowerCase().includes('next.js')) detectedTech.push('Next.js');
      if (xPoweredBy.toLowerCase().includes('asp.net')) detectedTech.push('ASP.NET');
    }

    // Basic HTML Meta-tag and content fingerprinting
    if (text.includes('content="WordPress')) detectedTech.push('WordPress');
    if (text.includes('wp-content/')) detectedTech.push('WordPress');
    if (text.includes('id="__next"')) detectedTech.push('Next.js');
    if (text.includes('data-reactroot')) detectedTech.push('React');
    if (text.includes('Vue.js') || text.includes('data-v-')) detectedTech.push('Vue.js');
    if (text.includes('ng-app') || text.includes('ng-version')) detectedTech.push('Angular');
    if (text.includes('cdn.shopify.com')) detectedTech.push('Shopify');

    return NextResponse.json({
        url,
        technologies: [...new Set(detectedTech)],
        headers: Object.fromEntries(headers.entries())
    });

  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to fingerprint URL" }, { status: 500 });
  }
}

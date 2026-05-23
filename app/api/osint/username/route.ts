import { NextResponse } from 'next/server';

const PLATFORMS = [
  { name: 'GitHub', url: 'https://github.com/{}' },
  { name: 'GitLab', url: 'https://gitlab.com/{}' },
  { name: 'Twitter', url: 'https://twitter.com/{}' },
  { name: 'Reddit', url: 'https://www.reddit.com/user/{}' },
  { name: 'Pinterest', url: 'https://www.pinterest.com/{}/' },
  { name: 'Spotify', url: 'https://open.spotify.com/user/{}' },
  { name: 'Steam', url: 'https://steamcommunity.com/id/{}' },
  { name: 'SoundCloud', url: 'https://soundcloud.com/{}' },
  { name: 'Medium', url: 'https://medium.com/@{}' },
  { name: 'Dev.to', url: 'https://dev.to/{}' },
  { name: 'Behance', url: 'https://www.behance.net/{}' },
  { name: 'Linktree', url: 'https://linktr.ee/{}' },
  { name: 'Vimeo', url: 'https://vimeo.com/{}' },
  { name: 'Keybase', url: 'https://keybase.io/{}' },
  { name: 'Patreon', url: 'https://www.patreon.com/{}' },
  { name: 'DockerHub', url: 'https://hub.docker.com/u/{}' },
  { name: 'npm', url: 'https://www.npmjs.com/~{}' },
  { name: 'CodePen', url: 'https://codepen.io/{}' },
  { name: 'DailyMotion', url: 'https://www.dailymotion.com/{}' },
  { name: 'BuyMeACoffee', url: 'https://www.buymeacoffee.com/{}' }
];

export async function POST(req: Request) {
  try {
    const { username } = await req.json();

    if (!username) {
      return NextResponse.json({ error: "Username parameter is required" }, { status: 400 });
    }

    // If SHERLOCK_API_URL is configured, use it
    const apiUrl = process.env.SHERLOCK_API_URL;
    if (apiUrl && apiUrl !== 'http://localhost:8080') {
      try {
        const response = await fetch(`${apiUrl}/search?username=${encodeURIComponent(username)}`);
        if (response.ok) {
          const data = await response.json();
          return NextResponse.json({ available: true, data: { username, foundOn: data } });
        }
      } catch (e) {
        // Fallback to native if it fails
      }
    }

    // Native Fallback Execution
    const foundOn: Array<{ site: string; url: string }> = [];
    
    // Process in batches of 5 to avoid overwhelming network
    const BATCH_SIZE = 5;
    for (let i = 0; i < PLATFORMS.length; i += BATCH_SIZE) {
      const batch = PLATFORMS.slice(i, i + BATCH_SIZE);
      const promises = batch.map(async (platform) => {
        const targetUrl = platform.url.replace('{}', encodeURIComponent(username));
        try {
          const response = await fetch(targetUrl, {
            method: 'GET',
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            signal: AbortSignal.timeout(4000)
          });
          
          if (response.status === 200) {
            foundOn.push({ site: platform.name, url: targetUrl });
          }
        } catch (e) {
          // Ignore timeouts or network errors
        }
      });
      
      await Promise.allSettled(promises);
    }

    return NextResponse.json({ 
      available: true, 
      data: { username, foundOn }
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to execute username scan" }, { status: 500 });
  }
}

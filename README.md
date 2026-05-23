# GhostTrace 👻✨

> "When you need to vibe check an IP address fr fr."

GhostTrace is a **goated** OSINT reconnaissance platform built for when you need to catch shady domains in 4K. We aggregated 20+ real OSINT APIs into one cinematic, cyberpunk UI so you can stop having 12 tabs open like a boomer. No cap, this is the most bussin' threat intel surface you'll ever use.

## Main Character Energy (Features) 💅

- **Big W Integrations**: Pulls real data from VirusTotal, Shodan, AbuseIPDB, SecurityTrails, AlienVault OTX, HaveIBeenPwned, and more. 
- **Graph Vibe Checks**: We use React Flow to automatically build infrastructure relationship graphs. It's giving "I see everything."
- **GhostShell Terminal**: A built-in terminal that actually works. Type `whois google.com` and watch it cook.
- **Threat Scoring**: Computes a 0-100 composite risk score. If it's red, that domain is taking a fat L.
- **Ethical Flex**: Intrusive scans (like port scanning) are strictly gated behind an `AuthorizationGate`. We respect boundaries out here—stay out of jail and touch grass.

## Stack 🥞
It's built with the latest drip:
- **Next.js 14** (App Router because we aren't stuck in 2021)
- **TypeScript 5** (strict mode, respectfully)
- **Tailwind CSS 3.4** (with custom ghost-* color tokens, aesthetic AF)
- **Zustand** (for state that lives rent-free in your browser)
- **Framer Motion** (for those buttery smooth micro-animations)

## How to let it cook 🍳

1. **Clone the repo** (obviously)
2. **Install the dependencies**:
   ```bash
   pnpm install
   ```
3. **Set up the vibes (.env)**:
   Copy `.env.local.example` to `.env.local`. 
   *Pro tip: The app degrades gracefully. If you don't have an API key, it just tells you it's not configured instead of crashing like a toxic ex.*
4. **Run it**:
   ```bash
   pnpm dev
   ```
   *Server's up on `localhost:3000`. Prepare to be amazed.*

## The Plug (APIs You Need) 🔌

The app degrades gracefully. If you don't have an API key, it just tells you it's not configured instead of crashing like a toxic ex. 

**Free Real Estate (No Keys Needed):**
- WHOIS, DNS & SSL Checker
- `crt.sh` (Subdomains)
- Shodan InternetDB (Free IP lookup)
- `ip-api.com` (Geolocation)
- BGPView (ASN lookup)
- HackerTarget (Port scan / Traceroute free tier)

**Premium Drip (Requires Keys in `.env.local`):**
- **VirusTotal**: For that deep malware analysis.
- **AbuseIPDB**: To catch those malicious IPs in 4K.
- **SecurityTrails**: The ultimate subdomain plug.
- **AlienVault OTX**: Threat pulses.
- **URLScan.io**: Screenshotting sketchy sites safely.
- **Hunter.io**: Finding corporate emails.
- **HaveIBeenPwned**: Checking if your email is on the dark web.

*Just copy `.env.local.example` to `.env.local` and paste whatever keys you have. We don't judge.*

## Vercel Deployment (Yes, it's compatible) 🚀

Is it Vercel compatible? **100% yes. No cap.** 
We built this with Next.js 14 App Router and serverless API routes. There are no heavy long-running background processes or weird native binaries that Vercel hates. Everything is stateless and fetched on demand.

### How to push to production:
1. Push your code to a GitHub repo.
2. Go to [Vercel](https://vercel.com), hit **"Add New Project"**, and import your repo.
3. In the environment variables section, paste in your API keys (the ones from your `.env.local`).
4. Click **Deploy**. That's literally it. Your OSINT dashboard is now live and living rent-free on Vercel's servers.

## Eco-Astral Mode (Lag Fix) 🌿

If your old laptop is fighting for its life, click the **leaf icon** 🍃 in the header. It's literally a cheat code for performance:

- **Deletes the Starfield Render Loop**: Stops the Canvas particle animation in its tracks. No more GPU crying.
- **Cancels Backdrop Filters**: Drops all the resource-heavy `backdrop-blur` GPU filters across the entire app.
- **Applies Solid Colors**: Swaps out glassmorphic cards for solid high-contrast cards. Still looks clean, just less ✨.
- **Kills CRT Overlay**: Removes the scanline overlay that was flexing on your framerate.

Your preference is saved to `localStorage` so it remembers you're on that eco grind. Click the leaf again to go back to full drip mode when you're ready.

## Disclaimer 🚨
This tool is for bug bounty hunters, researchers, and pentesting systems *you actually own or have permission to test*. Do NOT use this to stalk people. That's weird behavior. Periodt.

---

*Made with 🖤 and entirely too much caffeine.*

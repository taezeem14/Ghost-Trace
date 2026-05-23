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

## Disclaimer 🚨
This tool is for bug bounty hunters, researchers, and pentesting systems *you actually own or have permission to test*. Do NOT use this to stalk people. That's weird behavior. Periodt.

---

*Made with 🖤 and entirely too much caffeine.*

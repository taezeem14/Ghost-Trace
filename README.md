<div align="center">
  <h1>GhostTrace</h1>
  <p><b>OSINT and reconnaissance tooling with a clean, modern interface.</b></p>
  <p>
    <a href="#overview">Overview</a> •
    <a href="#features">Features</a> •
    <a href="#environment-variables">Environment</a> •
    <a href="#performance-mode">Performance</a> •
    <a href="#deployment">Deployment</a>
  </p>
</div>

---

## Overview
GhostTrace is a production-grade, Vercel-compatible OSINT platform for security researchers, bug bounty hunters, and defenders who need fast surface mapping without unnecessary friction. It focuses on practical reconnaissance workflows, live intelligence views, and a polished cyber UI that still feels usable.

**Topics:** `osint` `reconnaissance` `cybersecurity` `nextjs` `bug-bounty` `pentesting` `react` `typescript`

## Features
- Real data sources, not placeholder demos.
- GhostShell terminal for interactive recon workflows in the browser.
- Infrastructure graph views for IPs, domains, ASNs, and related assets.
- Threat scoring and telemetry panels for faster triage.
- Built for modern Next.js deployment on Vercel.

## Environment Variables
GhostTrace works out of the box for several workflows, but the full experience improves with API keys. Add the following to your `.env.local` file:

```env
# Free or keyless sources already supported
# - XposedOrNot for breach checks
# - Native username enumeration
# - crt.sh for subdomains
# - HackerTarget for port scans and traceroutes

# Optional but recommended
SECURITY_TRAILS_API_KEY=your_key_here
VIRUSTOTAL_API_KEY=your_key_here
ABUSEIPDB_API_KEY=your_key_here
URLSCAN_API_KEY=your_key_here
HUNTER_API_KEY=your_key_here
```

## Performance Mode
If your machine starts sounding like it is negotiating with gravity, enable Eco-Astral mode from the top header.

It reduces visual load by disabling the starfield animation, removing expensive backdrop blur, and switching heavy translucent surfaces to solid cards. The goal is simple: keep the experience sharp without making the browser work overtime.

## Deployment
GhostTrace is ready for Vercel.

1. Fork or clone the repository.
2. Create a new project in [Vercel](https://vercel.com).
3. Import the GhostTrace repo.
4. Add the environment variables from the section above.
5. Deploy.

Vercel should auto-detect the Next.js setup and build the app without extra platform-specific config.

## Ethics
Use this tool only on systems you own or have explicit permission to assess.

- Authorized bug bounty recon.
- Pentesting scoped systems.
- Auditing your own digital footprint.

Do not use GhostTrace for stalking, unauthorized surveillance, or any activity outside a legitimate security workflow.

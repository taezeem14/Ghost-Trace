<div align="center">
  <h1>💀 GhostTrace 💀</h1>
  <p><b>Real OSINT Intelligence & Reconnaissance Platform. No cap.</b></p>
  <p>
    <a href="#features">Features</a> •
    <a href="#api-keys-needed-the-sauce">APIs</a> •
    <a href="#eco-astral-mode-lag-fix">Eco-Astral Mode</a> •
    <a href="#deploying-to-vercel-w">Deployment</a>
  </p>
</div>

---

## 📖 Short Description
GhostTrace is a production-grade, Vercel-compatible OSINT (Open Source Intelligence) platform. It’s basically a cheat code for bug bounty hunters, ethical hackers, and security researchers to map out attack surfaces, hunt down subdomains, and track digital footprints—all wrapped in a sick cyberpunk UI. 

**Topics:** `osint` `reconnaissance` `cybersecurity` `nextjs` `bug-bounty` `pentesting` `react` `typescript`

---

## 🚀 Features (Why it slaps)
- **Real APIs Only:** No fake mocked data. It pulls actual OSINT from the wild.
- **GhostShell Terminal:** Integrated command-line interface directly in your browser.
- **Visual Infrastructure Graph:** ReactFlow nodes that map out IPs, domains, and ASNs visually.
- **Vercel Compatible:** Zero weird Python backends to host. Everything runs on Next.js serverless edge.
- **Threat Scoring:** Calculates risk levels (0-100) based on real threat intel.

---

## 🔑 API Keys Needed (The Sauce)
GhostTrace is designed to be plug-and-play, but to unlock God Mode, you'll need some API keys. Drop these into your `.env.local` file:

```env
# 🟢 FREE / KEYLESS (Already built-in, no key required)
# - XposedOrNot (Breaches) - Replaced HIBP!
# - Native Username Sherlock Engine (Parallel scanning)
# - crt.sh (Subdomains)
# - HackerTarget (Port scans, Traceroutes)

# 🟡 OPTIONAL BUT RECOMMENDED (Get these keys to go crazy)
SECURITY_TRAILS_API_KEY=your_key_here     # God-tier subdomain enumeration
VIRUSTOTAL_API_KEY=your_key_here          # Malware and threat intel scoring
ABUSEIPDB_API_KEY=your_key_here           # IP reputation
URLSCAN_API_KEY=your_key_here             # Screenshot and DOM analysis
HUNTER_API_KEY=your_key_here              # Email hunting
```

---

## 🌿 Eco-Astral Mode (Lag Fix)
If your old laptop is fighting for its life and the fans sound like a jet engine, **click the leaf icon 🍃 in the top header**. 

**What it does:**
- **Deletes the Starfield Render Loop:** Stops the `<canvas>` animation in its tracks.
- **Cancels Backdrop Filters:** Drops the resource-heavy GPU blur/glassmorphism filters.
- **Applies Solid Colors:** Switches out transparent cards for solid high-contrast dark cards.

It's literally a cheat code for performance. It goes from 30% GPU usage to 0%.

---

## ☁️ Deploying to Vercel (W)
Since we ripped out the weird Python dependencies and fixed the Next.js configs (`next.config.mjs`), this app is 100% Vercel-ready.

1. Fork/Clone this repo.
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your GhostTrace repository.
4. **Environment Variables:** Paste your API keys from the section above into Vercel's Environment Variables panel.
5. Click **Deploy**.

*Vercel will auto-detect the Next.js setup. Once it builds (takes about 2 mins), you'll get a live URL.*

---

## ⚠️ Ethical Scope (Don't catch a case)
This tool is for **Ethical Use Only**. 
- Bug bounty reconnaissance.
- Pentesting systems you own or have explicit permission to test.
- Auditing your own digital footprint.

Do NOT use this for stalking, unauthorized surveillance, or doing illegal stuff. The UI enforces a strict "I have authorization" gate before running heavy scans. Be smart.

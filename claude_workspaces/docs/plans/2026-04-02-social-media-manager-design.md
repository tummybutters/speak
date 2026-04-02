# Social Media Manager Workspace — Design Doc
**Date:** 2026-04-02
**Status:** Approved

## Overview

A cloud-based, 24/7 social media manager sold as a done-for-you workspace for solo real estate agents. Each client gets a persistent Claude Code instance running on a VPS, accessible via Telegram for both on-demand requests and autonomous scheduled operations. The workspace handles content creation, visual generation, posting/scheduling, competitor intelligence, lead harvesting, and metrics tracking — all without the client needing to touch a computer.

---

## Architecture

**Option A (selected):** Claude Code + Telegram + MCP Stack

One Claude Code process per client on a VPS (e.g. Fly.io or DigitalOcean). Telegram is the sole human interface. All integrations are MCPs or direct APIs configured at the workspace level. Client context persists in `CLAUDE.md` and `memory/` files.

---

## Workspace Structure

```
social-media-manager/
├── CLAUDE.md              # Client config: brand voice, market, schedule, platforms
├── memory/
│   ├── brand.md           # Tone, colors, target audience, key messages
│   ├── content-log.md     # Published posts + performance notes
│   ├── leads.md           # Scraped commenters/likers flagged as potential clients
│   └── ideas.md           # Content idea backlog
├── content/
│   ├── drafts/            # Posts pending Telegram approval
│   └── published/         # Archive of published content
├── scripts/
│   ├── daily.sh           # Cron: morning idea generation + competitor check
│   └── weekly.sh          # Cron: metrics report + content calendar fill
└── .mcp.json              # All MCP configs (posting, scraping, analytics)
```

`CLAUDE.md` is the agent's brain per client — it holds brand voice, target market (e.g. "San Diego coastal real estate"), posting schedule, connected platforms, and standing instructions (e.g. "always include a CTA to DM for a free home valuation").

---

## Telegram Interface & Autonomous Loop

### On-demand (human-triggered)
Client messages the Telegram bot in plain English:
- "Post a carousel about 3 reasons to buy in Pacific Beach right now"
- "Scrape @competitor's last 20 posts and tell me what's working"
- "How is my Ocean Beach listing video doing?"
- "Show me this week's Instagram metrics"
- "Generate 5 content ideas for this week"

Agent drafts content, sends a preview to Telegram for approval, then posts on confirmation.

### Autonomous (cron-triggered)
- **Daily** (`daily.sh`): fires each morning — checks competitor activity, pulls trending local topics, appends ideas to `memory/ideas.md`, flags anything urgent to Telegram
- **Weekly** (`weekly.sh`): fires Monday morning — pulls all platform metrics, generates a performance digest, drafts the week's content calendar, sends summary to Telegram

### Approval gate
All content requires a Telegram confirmation ("approve" / "edit" / "skip") before going live. Fully autonomous posting can be unlocked per client once trust is established.

---

## Integration Layer

| Capability | Tool | Notes |
|---|---|---|
| Post/schedule to FB, IG, LinkedIn, TikTok, X | Blotato MCP (default) | Swappable for Buffer API, Ayrshare, or direct platform APIs |
| Carousel/infographic templates | Blotato MCP | Claude picks template + fills with content |
| Custom property images | Nano Banana Pro 2 API | For visuals beyond templates — listing shots, neighborhood imagery |
| Video from listing photos | Blotato video templates + Nano Banana | Slideshow-style listing videos |
| Competitor scraping (IG, LinkedIn, Reddit, Nextdoor) | Apify MCP | One actor per platform |
| Like/commenter harvesting | Apify MCP | Engagers on competitor posts stored as leads |
| Instagram metrics | Instagram Graph API | Reach, saves, follows, per-post and totals |
| TikTok metrics | TikTok Analytics API | Views, watch time, follower growth, per-video and totals |
| YouTube metrics | YouTube Data API | Views, CTR, retention, per-video and totals |
| Avatar videos (phase 2) | HeyGen or Synthesia API | Onboarding-gated — client submits 2-min video, agent generates scripts + renders |

---

## Content Creation Pipeline

1. **Idea sourcing** — Apify scrapes competitor activity and trending local topics. Agent surfaces top angles to Telegram. Client picks or says "generate your own."

2. **Content generation** — Claude writes platform-specific copy respecting character limits and brand voice. For carousels: slide-by-slide script (headline, body, CTA). For video: short script tied to listing photos or market stats.

3. **Visual creation** — Carousel/infographic via posting platform templates or Nano Banana API. Listing video from photos via video template. Avatar video (phase 2): Claude writes script → HeyGen/Synthesia renders.

4. **Approval + publish** — Draft + visual preview sent to Telegram. Client approves, edits, or skips. Scheduler posts with caption and hashtags.

---

## Metrics & Intelligence

### Weekly automated report (Telegram, every Monday)
- Instagram: reach, saves, profile visits, follower delta, top 3 posts
- TikTok: views, watch time, follower growth, top videos
- YouTube: views, CTR, average view duration, subscriber delta
- AI summary: best performing content + recommendations

### On-demand metrics
- Totals per platform at any time
- Specific post or video performance on request ("how is my Ocean Beach listing video doing?")
- Cross-platform comparisons ("which platform is growing fastest?")
- Content type analysis ("what gets the most saves?")

### Competitor intelligence (weekly)
- Apify pulls last 7 days from tracked competitor accounts
- Agent summarizes: posting frequency, content types, engagement rates, viral posts
- Stored in `memory/` and surfaced in weekly report

### Lead intelligence
- Apify harvests likers/commenters on competitor posts in client's market
- Agent filters for likely buyers/sellers
- Adds to `memory/leads.md` with profile links and context
- Weekly digest: "X new potential leads identified this week"

---

## Onboarding Checklist (per client)

1. Clone workspace template
2. Fill `CLAUDE.md` with client details (brand voice, market, platforms, schedule)
3. Connect social accounts in posting platform
4. Add API keys to `.mcp.json`
5. Set cron schedule on VPS
6. Hand client their Telegram bot link
7. (Phase 2) Client submits 2-min video for avatar setup in HeyGen/Synthesia

---

## Phasing

**Phase 1 (MVP):** Telegram interface + content generation + Blotato posting + Apify scraping + metrics reporting

**Phase 2:** Avatar video generation via HeyGen/Synthesia

**Out of scope for now:** multi-client dashboard, billing automation, white-label Telegram bot branding

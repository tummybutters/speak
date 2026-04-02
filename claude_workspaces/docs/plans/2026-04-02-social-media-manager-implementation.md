# Social Media Manager Workspace — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a deployable, per-client workspace template that runs as a 24/7 Claude Code social media manager for solo real estate agents, operated via Telegram.

**Architecture:** One Claude Code process per client on a VPS. Telegram is the human interface for both on-demand commands and delivery of autonomous scheduled outputs. All integrations are MCPs or direct API calls configured in `.mcp.json`. Client identity and brand voice live in `CLAUDE.md` and `memory/` files that persist across sessions.

**Tech Stack:** Claude Code, Telegram (MCP), Blotato MCP (posting/scheduling), Apify MCP (scraping), Instagram Graph API, TikTok Analytics API, YouTube Data API v3, Nano Banana Pro 2 API (image generation), bash (cron scripts), Node.js or Python for any glue scripts

---

## Phase 1 MVP Scope

- Workspace template structure
- `CLAUDE.md` agent instructions template
- MCP configuration template
- Telegram bot setup
- Cron automation scripts
- Content creation prompt library
- Apify scraping workflows
- Metrics tracking workflows
- Onboarding script

---

### Task 1: Create Workspace Template Directory Structure

**Files:**
- Create: `workspaces/social-media-manager/CLAUDE.md`
- Create: `workspaces/social-media-manager/memory/brand.md`
- Create: `workspaces/social-media-manager/memory/content-log.md`
- Create: `workspaces/social-media-manager/memory/leads.md`
- Create: `workspaces/social-media-manager/memory/ideas.md`
- Create: `workspaces/social-media-manager/content/drafts/.gitkeep`
- Create: `workspaces/social-media-manager/content/published/.gitkeep`
- Create: `workspaces/social-media-manager/scripts/daily.sh`
- Create: `workspaces/social-media-manager/scripts/weekly.sh`
- Create: `workspaces/social-media-manager/.mcp.json`

**Step 1: Create the directory tree**

```bash
mkdir -p workspaces/social-media-manager/{memory,content/{drafts,published},scripts,prompts}
touch workspaces/social-media-manager/content/drafts/.gitkeep
touch workspaces/social-media-manager/content/published/.gitkeep
```

**Step 2: Verify structure**

```bash
find workspaces/social-media-manager -type f -o -type d | sort
```

Expected: all directories present, `.gitkeep` files in place

**Step 3: Commit**

```bash
git add workspaces/
git commit -m "feat(workspace): scaffold social media manager directory structure"
```

---

### Task 2: Write CLAUDE.md Agent Instructions Template

**Files:**
- Create: `workspaces/social-media-manager/CLAUDE.md`

This is the most important file — it tells the Claude Code agent who the client is and how to behave in every situation.

**Step 1: Write CLAUDE.md**

```markdown
# Social Media Manager — [CLIENT_NAME]

## Identity
You are the dedicated social media manager for [CLIENT_NAME], a real estate agent
specializing in [MARKET] (e.g. "San Diego coastal properties, $800K–$2M range").

Your job is to grow their brand, generate leads, and keep their social presence
active and engaging — 24/7.

## Brand Voice
- Tone: [e.g. "Warm, knowledgeable, local expert. Never salesy."]
- Perspective: [e.g. "Insider who genuinely loves this neighborhood"]
- Emoji usage: [e.g. "Minimal — 1-2 per post max"]
- Always end with: [e.g. "DM me for a free home valuation"]
- Avoid: [e.g. "Corporate jargon, pressure tactics, generic market stats"]

## Target Audience
- Primary: [e.g. "Move-up buyers ages 35–55, families, professionals relocating to San Diego"]
- Secondary: [e.g. "Homeowners in Pacific Beach, Mission Hills, North Park considering selling"]

## Active Platforms
- Instagram: [@handle] — carousels, reels, stories
- Facebook: [page name] — listings, market updates, community posts
- LinkedIn: [profile] — professional market insights
- TikTok: [@handle] — short video tours, local neighborhood content
- YouTube: [@handle] — full property tours, market update videos

## Posting Schedule
- Instagram: [e.g. "Tuesday + Thursday 9am, Saturday 11am PST"]
- Facebook: [e.g. "Monday + Wednesday + Friday 10am PST"]
- LinkedIn: [e.g. "Tuesday 8am PST"]
- TikTok: [e.g. "Wednesday + Sunday 7pm PST"]

## Content Mix (weekly target)
- 2x market insight / local knowledge posts
- 2x listing or property showcase
- 1x community/lifestyle post (restaurants, events, neighborhood)
- 1x social proof (testimonial, milestone, behind the scenes)
- 1x educational (buying/selling tips)

## Competitor Accounts to Track
- Instagram: [@competitor1, @competitor2]
- Track for: posting frequency, content types, engagement patterns

## Standing Instructions
1. Always read memory/brand.md before creating any content
2. Log every published post to memory/content-log.md with date, platform, content type, and engagement after 48 hours
3. Save all new lead profiles to memory/leads.md
4. Never post without Telegram approval unless the client has explicitly enabled autonomous posting
5. If a scrape surfaces a viral post in the client's market, flag it to Telegram immediately
6. When asked about metrics, pull live data — never use cached or estimated numbers

## Telegram Commands You Should Recognize
- "generate ideas" → surface 5 content ideas from memory/ideas.md + recent scrapes
- "draft [topic]" → create a post draft and send to Telegram for approval
- "carousel [topic]" → draft a carousel with slide-by-slide script + visual brief
- "post [topic] now" → draft, get approval, then post immediately
- "scrape competitors" → run Apify on tracked accounts, summarize findings
- "find leads" → run Apify lead harvesting on competitor engagers
- "metrics [platform]" → pull current metrics for that platform
- "metrics [post/video name]" → pull metrics for that specific piece of content
- "weekly report" → generate full cross-platform performance report
- "content calendar" → show or fill the next 7 days of scheduled content
```

**Step 2: Verify the file reads cleanly**

```bash
cat workspaces/social-media-manager/CLAUDE.md
```

**Step 3: Commit**

```bash
git add workspaces/social-media-manager/CLAUDE.md
git commit -m "feat(workspace): add CLAUDE.md agent instructions template"
```

---

### Task 3: Write Memory File Templates

**Files:**
- Create: `workspaces/social-media-manager/memory/brand.md`
- Create: `workspaces/social-media-manager/memory/content-log.md`
- Create: `workspaces/social-media-manager/memory/leads.md`
- Create: `workspaces/social-media-manager/memory/ideas.md`

**Step 1: Write brand.md**

```markdown
# Brand Reference

## Visual Identity
- Primary color: [hex]
- Secondary color: [hex]
- Font style: [e.g. "Clean, modern sans-serif"]
- Photo style: [e.g. "Bright, airy, natural light. No heavy filters."]
- Logo: [link or file path]

## Key Messages
- [e.g. "I've lived in Pacific Beach for 12 years — I know every block"]
- [e.g. "I close deals fast because I know what buyers want before they do"]
- [e.g. "My clients get off-market access"]

## Hashtag Sets
### Listing posts
#[neighborhood] #[city]realestate #[city]homes #justlisted #[agentname]realestate

### Market updates
#[city]market #realestate2025 #homebuying #sellyourhome

### Community
#[neighborhood]life #[city]living #[neighborhood]local

## Bio Links
- Linktree/bio link: [url]
- Booking link: [url]
- MLS search: [url]
```

**Step 2: Write content-log.md**

```markdown
# Content Log

## Format
| Date | Platform | Type | Title/Topic | URL | 48h Reach | 48h Saves | 48h Comments | Notes |
|------|----------|------|-------------|-----|-----------|-----------|--------------|-------|

## Log
<!-- Agent appends rows here after each post -->
```

**Step 3: Write leads.md**

```markdown
# Lead Intelligence

## Format
Each lead entry:
- **Profile:** [username/URL]
- **Platform:** [Instagram/LinkedIn/etc]
- **Source:** [which competitor account they engaged with]
- **Signal:** [what they liked/commented — why they're a lead]
- **Date found:** [YYYY-MM-DD]
- **Status:** [new / contacted / not a fit]

## Leads
<!-- Agent appends entries here from Apify scrapes -->
```

**Step 4: Write ideas.md**

```markdown
# Content Ideas Backlog

## Format
- **[Date added]** | **[Source]** | **[Platform]** | Idea description

## Ideas
<!-- Agent appends ideas from competitor scrapes, trending topics, client input -->
```

**Step 5: Commit**

```bash
git add workspaces/social-media-manager/memory/
git commit -m "feat(workspace): add memory file templates (brand, content-log, leads, ideas)"
```

---

### Task 4: Write .mcp.json Configuration Template

**Files:**
- Create: `workspaces/social-media-manager/.mcp.json`
- Create: `workspaces/social-media-manager/.env.example`

**Step 1: Write .mcp.json**

```json
{
  "mcpServers": {
    "blotato": {
      "type": "http",
      "url": "https://api.blotato.com/mcp",
      "headers": {
        "blotato-api-key": "${BLOTATO_API_KEY}"
      }
    },
    "apify": {
      "type": "http",
      "url": "https://mcp.apify.com",
      "headers": {
        "Authorization": "Bearer ${APIFY_API_TOKEN}"
      }
    },
    "telegram": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-telegram"],
      "env": {
        "TELEGRAM_BOT_TOKEN": "${TELEGRAM_BOT_TOKEN}",
        "TELEGRAM_CHAT_ID": "${TELEGRAM_CHAT_ID}"
      }
    }
  }
}
```

**Step 2: Write .env.example**

```bash
# Posting & Scheduling
BLOTATO_API_KEY=your_blotato_api_key_here

# Scraping
APIFY_API_TOKEN=your_apify_token_here

# Telegram
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here

# Analytics
YOUTUBE_API_KEY=your_youtube_data_api_key
INSTAGRAM_ACCESS_TOKEN=your_instagram_graph_api_token
INSTAGRAM_ACCOUNT_ID=your_instagram_business_account_id
TIKTOK_ACCESS_TOKEN=your_tiktok_analytics_token

# Image Generation
NANO_BANANA_API_KEY=your_nano_banana_api_key
```

**Step 3: Add .env to .gitignore — verify it is already there, if not add it**

```bash
grep -q "\.env$" .gitignore || echo ".env" >> .gitignore
```

**Step 4: Commit**

```bash
git add workspaces/social-media-manager/.mcp.json workspaces/social-media-manager/.env.example
git commit -m "feat(workspace): add MCP config template and .env.example"
```

---

### Task 5: Write Cron Automation Scripts

**Files:**
- Create: `workspaces/social-media-manager/scripts/daily.sh`
- Create: `workspaces/social-media-manager/scripts/weekly.sh`
- Create: `workspaces/social-media-manager/scripts/setup-cron.sh`

**Step 1: Write daily.sh**

This script fires every morning. It triggers Claude Code to run an autonomous morning check.

```bash
#!/bin/bash
# daily.sh — Morning intelligence run
# Cron: 0 7 * * * /path/to/workspace/scripts/daily.sh

WORKSPACE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LOG_FILE="$WORKSPACE_DIR/scripts/logs/daily-$(date +%Y%m%d).log"
mkdir -p "$WORKSPACE_DIR/scripts/logs"

cd "$WORKSPACE_DIR"

PROMPT="Good morning. Run the daily morning routine:
1. Check memory/ideas.md for any content scheduled for today
2. Run a quick Apify scrape of the tracked competitor accounts (last 24 hours only)
3. Identify any viral or high-engagement posts from competitors — flag to Telegram if found
4. Surface the top 3 content ideas for today based on what you find
5. If there are any posts scheduled for today in the content calendar, prepare drafts and send to Telegram for approval
6. Report back to Telegram with a brief morning summary

Be concise. Keep the Telegram summary to 5 lines max."

claude --dangerously-skip-permissions -p "$PROMPT" >> "$LOG_FILE" 2>&1
```

**Step 2: Write weekly.sh**

```bash
#!/bin/bash
# weekly.sh — Monday weekly report and planning
# Cron: 0 8 * * 1 /path/to/workspace/scripts/weekly.sh

WORKSPACE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LOG_FILE="$WORKSPACE_DIR/scripts/logs/weekly-$(date +%Y%m%d).log"
mkdir -p "$WORKSPACE_DIR/scripts/logs"

cd "$WORKSPACE_DIR"

PROMPT="Good morning — it's Monday. Run the full weekly routine:
1. Pull metrics from all active platforms (Instagram, TikTok, YouTube, Facebook):
   - Total reach, follows gained, top 3 posts by engagement
   - Compare to last week if data exists in memory/content-log.md
2. Run Apify competitor scrape for the full past week on all tracked accounts
   - Summarize their posting frequency, content types, and any standout posts
3. Run Apify lead harvesting on competitor posts from the past week
   - Add new potential leads to memory/leads.md
   - Count: how many new leads found
4. Draft a content calendar for the next 7 days based on:
   - What performed well last week
   - Gaps in content mix from CLAUDE.md
   - Ideas in memory/ideas.md
5. Send a full weekly report to Telegram covering all of the above
6. Send the draft content calendar to Telegram for approval

Format the Telegram report clearly with sections. Keep it scannable."

claude --dangerously-skip-permissions -p "$PROMPT" >> "$LOG_FILE" 2>&1
```

**Step 3: Write setup-cron.sh**

```bash
#!/bin/bash
# setup-cron.sh — Install cron jobs for this workspace
# Run once during onboarding: bash scripts/setup-cron.sh

WORKSPACE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DAILY_SCRIPT="$WORKSPACE_DIR/scripts/daily.sh"
WEEKLY_SCRIPT="$WORKSPACE_DIR/scripts/weekly.sh"

chmod +x "$DAILY_SCRIPT" "$WEEKLY_SCRIPT"

# Add cron jobs (7am daily, 8am Monday)
(crontab -l 2>/dev/null; echo "0 7 * * * $DAILY_SCRIPT") | crontab -
(crontab -l 2>/dev/null; echo "0 8 * * 1 $WEEKLY_SCRIPT") | crontab -

echo "Cron jobs installed:"
crontab -l | grep -E "(daily|weekly)\.sh"
```

**Step 4: Make scripts executable and verify**

```bash
chmod +x workspaces/social-media-manager/scripts/*.sh
ls -la workspaces/social-media-manager/scripts/
```

**Step 5: Commit**

```bash
git add workspaces/social-media-manager/scripts/
git commit -m "feat(workspace): add daily/weekly cron automation scripts"
```

---

### Task 6: Write Prompt Library for Content Types

**Files:**
- Create: `workspaces/social-media-manager/prompts/carousel.md`
- Create: `workspaces/social-media-manager/prompts/market-update.md`
- Create: `workspaces/social-media-manager/prompts/listing.md`
- Create: `workspaces/social-media-manager/prompts/community.md`
- Create: `workspaces/social-media-manager/prompts/video-script.md`

These are reusable prompt templates the agent references when creating each content type.

**Step 1: Write carousel.md**

```markdown
# Carousel Post Prompt Template

Use this template when creating a carousel post for Instagram or Facebook.

## Instructions for the agent
1. Read memory/brand.md for visual style and hashtags
2. Create 5–8 slides maximum
3. Each slide: one clear idea, 10 words or fewer for the headline, 1–2 sentences of body
4. Slide 1: hook — bold claim or surprising stat
5. Last slide: CTA (save this post / DM for more / link in bio)
6. Write a visual brief for each slide (what image or graphic to show)
7. Write the caption (first line = hook, body = tease the carousel, end with CTA + hashtags)
8. Send the full draft to Telegram for approval before generating visuals

## Output format

**SLIDE 1 — HOOK**
Headline: [10 words max]
Body: [1–2 sentences]
Visual: [brief description for image generation]

**SLIDE 2–N**
Headline: [10 words max]
Body: [1–2 sentences]
Visual: [brief description]

**SLIDE LAST — CTA**
Headline: [action]
Visual: [brand asset or simple CTA graphic]

---
CAPTION:
[Hook line]
[2–3 sentences teasing the content]
[CTA]
[Hashtags from memory/brand.md]
```

**Step 2: Write market-update.md**

```markdown
# Market Update Post Prompt Template

Use for weekly/monthly market stat posts. Works for Instagram, Facebook, LinkedIn.

## Instructions for the agent
1. Pull current MLS data or use recent stats from a web search
2. Make it local and specific — name the neighborhood/zip code
3. Lead with the most surprising or actionable stat
4. Translate stats into what they mean for buyers and sellers
5. Keep LinkedIn version more analytical, Instagram version more visual/punchy
6. Always include a CTA relevant to the stat (e.g. if inventory is low: "thinking of selling?")

## Output format
Platform: [Instagram / Facebook / LinkedIn]
Hook: [surprising stat or bold statement]
Body: [2–3 sentences translating the stat]
CTA: [one clear action]
Visual brief: [what chart, graphic, or photo to pair with this]
Caption: [full post copy with hashtags]
```

**Step 3: Write listing.md**

```markdown
# Listing Post Prompt Template

Use when promoting a specific property.

## Instructions for the agent
1. Ask the client for: address (or neighborhood), beds/baths, price, 3 key features, 2–3 photo URLs or descriptions
2. Lead with lifestyle, not specs — sell the feeling of living there
3. Include the practical details but make them secondary
4. For Instagram: focus on the best single photo or video clip
5. For carousel: lead photo + 4–6 feature shots + neighborhood shot + CTA slide
6. Always include price, beds/baths, and a link to the full listing

## Output format
Property: [address/neighborhood]
Hook: [lifestyle lead — what's the dream of living here]
Key features: [3 bullets, benefit-focused]
Specs: [beds/baths/sqft/price]
CTA: [DM / link in bio / open house date]
Visual brief: [which photos to use for which slides]
Caption: [full post copy]
```

**Step 4: Write community.md**

```markdown
# Community / Lifestyle Post Prompt Template

Use for neighborhood content — restaurants, events, local spots, market vibe.

## Instructions for the agent
1. These posts build trust and local authority — not sales
2. Speak as a genuine local, not a marketer
3. Tag local businesses when possible
4. Use first-person perspective from CLAUDE.md
5. Best formats: "hidden gems", "locals guide", "things I love about [neighborhood]"
6. Instagram and TikTok perform best for this content type

## Output format
Topic: [specific place, event, or neighborhood angle]
Hook: [local insider opener]
Body: [2–4 sentences — specific details, not generic praise]
Tag: [@localbusiness if applicable]
CTA: [save this / share with someone moving here / etc]
Caption: [full post copy with hashtags]
```

**Step 5: Write video-script.md**

```markdown
# Short Video Script Prompt Template

Use for TikTok, Instagram Reels, YouTube Shorts (60–90 seconds max).

## Instructions for the agent
1. First 3 seconds = hook — must stop the scroll
2. Structure: hook → problem/tension → insight/value → CTA
3. Write for spoken delivery — short sentences, natural rhythm
4. Include B-roll notes (what to show on screen while talking)
5. End with a single clear CTA
6. Keep total runtime to 60–90 seconds (roughly 150–225 words spoken)

## Output format
Title: [for YouTube/TikTok title]
Hook (0–3s): [opening line — bold, visual, or surprising]
Setup (3–15s): [problem or context]
Value (15–50s): [the insight, tip, or tour]
CTA (50–60s): [one action to take]
B-roll notes: [what to show at each section]
Caption: [short TikTok/IG caption with hashtags]
Thumbnail concept: [for YouTube — what image + text overlay]
```

**Step 6: Commit**

```bash
git add workspaces/social-media-manager/prompts/
git commit -m "feat(workspace): add content prompt library (carousel, market-update, listing, community, video)"
```

---

### Task 7: Write Apify Scraping Workflows

**Files:**
- Create: `workspaces/social-media-manager/prompts/scrape-competitors.md`
- Create: `workspaces/social-media-manager/prompts/scrape-leads.md`

**Step 1: Write scrape-competitors.md**

```markdown
# Competitor Intelligence Scrape

Run this when asked to scrape competitors or during the daily/weekly routine.

## Instructions for the agent

Use the Apify MCP to run the following actors:

### Instagram competitors
Actor: `apify/instagram-scraper`
Input:
```json
{
  "usernames": ["[from CLAUDE.md competitor list]"],
  "resultsLimit": 20,
  "scrapePostsUntilDate": "[7 days ago]"
}
```

### Reddit (local subreddits)
Actor: `trudax/reddit-scraper`
Input:
```json
{
  "subreddits": ["[city]realestate", "[neighborhood]", "[city]"],
  "searchQueries": ["real estate", "buying home", "moving to [city]"],
  "maxItems": 50
}
```

### Nextdoor (via web scrape)
Actor: `apify/web-scraper` on nextdoor.com posts in client's target neighborhoods

### LinkedIn
Actor: `apify/linkedin-post-search-scraper`
Input: search for posts about [city] real estate in past 7 days

## Analysis instructions
After running scrapes, analyze:
1. Which content formats are getting the most engagement (carousels vs video vs single image)?
2. What topics are resonating (market stats, listings, lifestyle, tips)?
3. Any posts with unusually high engagement — what made them pop?
4. Posting frequency of each competitor
5. Any content gaps — topics they're NOT covering that we could own

## Output
- Add top 3 content ideas to memory/ideas.md
- Flag any viral posts (>2x their average engagement) to Telegram immediately
- Save full analysis to memory/content-log.md under "Competitor Intel [date]"
- Send a brief Telegram summary (5 bullets max)
```

**Step 2: Write scrape-leads.md**

```markdown
# Lead Harvesting Scrape

Run weekly or on demand. Finds potential buyers/sellers in the client's market.

## Instructions for the agent

### Step 1: Get recent posts from competitor accounts
Use `apify/instagram-scraper` to get the last 10–20 posts from each competitor.
Extract all post shortcodes/URLs.

### Step 2: Harvest engagers
For each post, use `apify/instagram-post-scraper` to get:
- Likers (if accessible)
- Commenters (username + comment text)

### Step 3: Filter for leads
A profile is a potential lead if:
- Comment suggests buying/selling intent ("love this", "what's the price?", "is this still available?", "we're looking in this area")
- Profile bio mentions relocation, job change, growing family
- Local account (check bio for city/neighborhood mentions)
- Not another real estate agent

### Step 4: Save to memory/leads.md
Format each lead:
- Profile URL
- Platform
- Source post
- Signal (what they said/liked)
- Date found
- Status: new

### Step 5: Report
Send Telegram: "Found [N] new potential leads this week. [Top 2–3 most promising with brief context]"
```

**Step 3: Commit**

```bash
git add workspaces/social-media-manager/prompts/
git commit -m "feat(workspace): add Apify scraping workflow prompts"
```

---

### Task 8: Write Metrics Tracking Workflows

**Files:**
- Create: `workspaces/social-media-manager/prompts/metrics.md`

**Step 1: Write metrics.md**

```markdown
# Metrics Tracking

## On-demand: single platform totals
When asked "metrics [platform]":
Pull current account-level metrics and report to Telegram.

### Instagram
Use Instagram Graph API:
GET https://graph.facebook.com/v19.0/{INSTAGRAM_ACCOUNT_ID}/insights
?metric=reach,impressions,profile_views,follower_count,accounts_engaged
&period=week
&access_token={INSTAGRAM_ACCESS_TOKEN}

Report: followers total, follower change this week, reach, impressions, top post

### TikTok
Use TikTok Analytics API:
GET https://open.tiktokapis.com/v2/research/user/stats/
Headers: Authorization: Bearer {TIKTOK_ACCESS_TOKEN}

Report: followers, video views, profile views, follower change this week

### YouTube
Use YouTube Data API v3:
GET https://www.googleapis.com/youtube/v3/channels
?part=statistics&mine=true&key={YOUTUBE_API_KEY}

Report: subscribers, total views, view change this week, top video

## On-demand: specific post or video
When asked about a specific piece of content by name or topic:
1. Search memory/content-log.md for the post
2. Pull current metrics from the platform API using the post/video ID stored in the log
3. Report: reach, saves, comments, shares, view duration (video), follower conversion

### Instagram post metrics
GET https://graph.facebook.com/v19.0/{POST_ID}/insights
?metric=reach,saved,comments,shares,likes
&access_token={INSTAGRAM_ACCESS_TOKEN}

### YouTube video metrics
GET https://www.googleapis.com/youtube/v3/videos
?part=statistics&id={VIDEO_ID}&key={YOUTUBE_API_KEY}

### TikTok video metrics
GET https://open.tiktokapis.com/v2/video/query/
(use stored video_id from content-log.md)

## Weekly report format (Telegram)
```
WEEKLY REPORT — [date range]

INSTAGRAM
• Followers: [total] ([+/-N] this week)
• Reach: [N]
• Top post: "[title]" — [reach] reach, [saves] saves

TIKTOK
• Followers: [total] ([+/-N])
• Views this week: [N]
• Top video: "[title]" — [N] views

YOUTUBE
• Subscribers: [total] ([+/-N])
• Views this week: [N]
• Top video: "[title]" — [N] views

LEADS FOUND THIS WEEK: [N]
POSTS PUBLISHED: [N]

RECOMMENDATION: [1–2 sentences on what to do more of based on data]
```
```

**Step 2: Commit**

```bash
git add workspaces/social-media-manager/prompts/metrics.md
git commit -m "feat(workspace): add metrics tracking workflow with API endpoints"
```

---

### Task 9: Write Onboarding Script

**Files:**
- Create: `workspaces/social-media-manager/scripts/onboard.sh`
- Create: `workspaces/social-media-manager/README.md`

**Step 1: Write onboard.sh**

```bash
#!/bin/bash
# onboard.sh — Run once to set up a new client workspace
# Usage: bash scripts/onboard.sh

WORKSPACE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$WORKSPACE_DIR/.env"
ENV_EXAMPLE="$WORKSPACE_DIR/.env.example"

echo "=== Social Media Manager Onboarding ==="
echo ""

# Copy .env.example if .env doesn't exist
if [ ! -f "$ENV_FILE" ]; then
  cp "$ENV_EXAMPLE" "$ENV_FILE"
  echo "Created .env from .env.example"
  echo "NEXT: Fill in all API keys in $ENV_FILE"
  echo ""
fi

# Check for required env vars
echo "Checking environment variables..."
REQUIRED_VARS=(BLOTATO_API_KEY APIFY_API_TOKEN TELEGRAM_BOT_TOKEN TELEGRAM_CHAT_ID)
MISSING=0
for var in "${REQUIRED_VARS[@]}"; do
  if grep -q "^${var}=your_" "$ENV_FILE" 2>/dev/null; then
    echo "  MISSING: $var"
    MISSING=1
  else
    echo "  OK: $var"
  fi
done

if [ $MISSING -eq 1 ]; then
  echo ""
  echo "Fill in missing values in .env before continuing."
  exit 1
fi

# Install cron jobs
echo ""
echo "Installing cron jobs..."
bash "$WORKSPACE_DIR/scripts/setup-cron.sh"

echo ""
echo "=== Onboarding complete ==="
echo ""
echo "NEXT STEPS:"
echo "1. Edit CLAUDE.md — fill in client name, market, platforms, brand voice"
echo "2. Edit memory/brand.md — fill in visual identity and hashtags"
echo "3. Connect social accounts in Blotato dashboard"
echo "4. Send a test message to the Telegram bot"
echo "5. Run: claude -p 'Introduce yourself and confirm all MCPs are connected'"
```

**Step 2: Write README.md**

```markdown
# Social Media Manager Workspace

24/7 Claude Code social media manager for real estate agents. Operates via Telegram.

## Onboarding a new client

1. Clone this template to a new directory
2. Copy `.env.example` to `.env` and fill in all API keys
3. Edit `CLAUDE.md` — client name, market, brand voice, platforms, schedule
4. Edit `memory/brand.md` — visual identity, hashtags, key messages
5. Run `bash scripts/onboard.sh`
6. Connect client's social accounts in Blotato (or chosen posting platform)
7. Hand client their Telegram bot link

## Client Telegram commands

| Command | What it does |
|---|---|
| `generate ideas` | Surface 5 content ideas |
| `draft [topic]` | Create a post draft for approval |
| `carousel [topic]` | Create a carousel with slide scripts |
| `post [topic] now` | Draft → approve → post immediately |
| `scrape competitors` | Run competitor intelligence scrape |
| `find leads` | Run lead harvesting on competitor engagers |
| `metrics [platform]` | Pull current platform metrics |
| `metrics [post name]` | Pull metrics for a specific post/video |
| `weekly report` | Full cross-platform performance report |
| `content calendar` | Show or fill next 7 days |

## File reference

| File | Purpose |
|---|---|
| `CLAUDE.md` | Agent identity, brand voice, standing instructions |
| `memory/brand.md` | Visual identity, hashtags, key messages |
| `memory/content-log.md` | Published post archive + performance data |
| `memory/leads.md` | Potential client leads from scrapes |
| `memory/ideas.md` | Content idea backlog |
| `prompts/` | Reusable prompt templates per content type |
| `scripts/daily.sh` | Morning automation (runs via cron 7am daily) |
| `scripts/weekly.sh` | Monday report + planning (runs via cron 8am Mon) |

## Phase 2 (future)
- HeyGen/Synthesia avatar video generation
- Multi-client dashboard
- Blotato → alternative posting platform swap
```

**Step 3: Make onboard.sh executable**

```bash
chmod +x workspaces/social-media-manager/scripts/onboard.sh
```

**Step 4: Commit**

```bash
git add workspaces/social-media-manager/scripts/onboard.sh workspaces/social-media-manager/README.md
git commit -m "feat(workspace): add onboarding script and README"
```

---

### Task 10: End-to-End Smoke Test

**Goal:** Verify the workspace can be cloned for a test client and the agent can handle a basic command.

**Step 1: Copy workspace to a test client directory**

```bash
cp -r workspaces/social-media-manager workspaces/test-client-demo
```

**Step 2: Fill in minimal CLAUDE.md for the test client**

Edit `workspaces/test-client-demo/CLAUDE.md` — replace all `[PLACEHOLDER]` values with a fake test client:
- Name: "Alex Rivera Real Estate"
- Market: "San Diego, CA — Pacific Beach and Mission Beach"
- Brand voice: "Casual, local, knowledgeable. Minimal emojis."

**Step 3: Start Claude Code in the test workspace and run a smoke test**

```bash
cd workspaces/test-client-demo
claude -p "Read CLAUDE.md and memory/brand.md, then draft a single Instagram post about why winter is actually a great time to buy in San Diego. Send me the draft here for review."
```

Expected: Claude reads the files, generates a post in the brand voice, asks for approval before doing anything else.

**Step 4: Test a metrics command (dry run — no real API keys)**

```bash
claude -p "Tell me what steps you would take to pull my Instagram metrics for this week. Don't make any API calls — just describe the plan."
```

Expected: Claude describes the Instagram Graph API call, the specific metrics it would pull, and how it would format the Telegram report.

**Step 5: Clean up test client**

```bash
rm -rf workspaces/test-client-demo
```

**Step 6: Final commit**

```bash
git add -A
git commit -m "feat(workspace): social media manager MVP template complete"
```

---

## Deployment Notes (for reference when deploying)

- **VPS:** DigitalOcean $6/mo droplet or Fly.io free tier is sufficient for one client
- **Claude Code on server:** `npm install -g @anthropic-ai/claude-code` then `claude login`
- **Telegram bot:** Create via @BotFather, get token, get chat ID by messaging the bot and hitting `https://api.telegram.org/bot{TOKEN}/getUpdates`
- **Blotato:** Create account at blotato.com, connect client social accounts, copy MCP setup command from Settings → APIs
- **Apify:** Create account at apify.com, get API token from Settings → Integrations
- **Instagram Graph API:** Requires Facebook Developer account + Instagram Business account connected to a Facebook Page
- **YouTube Data API:** Google Cloud Console → enable YouTube Data API v3 → create API key
- **TikTok Analytics API:** Apply at developers.tiktok.com — requires business account

# Deploying this site (free)

This is a plain static site — 4 HTML pages, one CSS file, one JS file. No build step,
no framework, no dependencies to install. Any static host works. Two free options:

## Option A — Netlify Drop (fastest, no account needed to preview)

1. Go to https://app.netlify.com/drop
2. Drag the whole `site` folder onto the page.
3. Netlify gives you a live URL immediately (something like `random-name-123.netlify.app`).
4. To keep it long-term and get a custom domain, create a free Netlify account and claim
   the site — otherwise unclaimed drops expire.

## Option B — GitHub Pages (best for a permanent, ownable URL)

1. Create a GitHub repo (e.g. `portfolio`).
2. Add the contents of the `site` folder to the repo root.
3. In the repo, go to Settings → Pages → Source, and set it to deploy from the `main`
   branch, root folder.
4. GitHub gives you a URL like `yourusername.github.io/portfolio`.
5. Optional: point a custom domain at it via Settings → Pages → Custom domain.

Either option is genuinely free with no time limit for a small static site like this.

## No password gate right now

The site is currently fully open — no password, content renders directly. `gate.js` is
included in this folder but nothing links to it, so it's safe to upload alongside the
other files or leave out; it won't affect anything either way.

If you want to add password-gating back later (recommended before sharing this widely,
since some content is only lightly genericized rather than fully scrubbed of internal
detail), let me know and we'll debug why it silently failed to load last time — likely a
browser extension blocking a script named `gate.js` — before re-enabling it.

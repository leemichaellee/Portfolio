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

## The password gate — read this before sharing the link

Each case study page has a "Private / interview version" section gated behind a
password (currently: `fieldnotes26`, set in each page's `.gate-box` element).

This is **soft protection, not real security** — the password and gated content are
both shipped to the browser (base64-encoded, not encrypted), so anyone who inspects the
page source can extract them. It's fine for keeping casual visitors from stumbling onto
interview-only detail. It is not fine for information you'd be genuinely harmed by a
stranger reading. Keep anything truly sensitive (exact dollar figures under NDA, internal
system names, etc.) out of the gated content entirely and share it verbally in interviews
instead — this is already how the placeholder content in each page's private section is framed.

To change the password: pick a new one, then run (in Terminal):

```
echo -n 'yournewpassword' | base64
```

Paste the output into the `data-password="..."` attribute on the `.gate-box` div in
each HTML file you want to update.

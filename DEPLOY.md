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

## Password gate is on

Every page is now behind a password prompt — the real content is stored encoded in the
page and only rendered after the correct password is entered, then remembered in the
browser (localStorage) so it's not asked again on that device.

**Current password: `colombiacoferment`**

This is implemented in `access.js`, loaded by every page. It's a light deterrent (keeps
the site out of search engines and casual link-sharing), not real security — anyone who
views page source can extract the password and content. Don't rely on it for anything
you'd be genuinely harmed by someone leaking.

To change the password later: run `echo -n 'yournewpassword' | base64` in a terminal and
paste the result into `PASSWORD_B64` near the top of `access.js`.

There's a leftover, unused `gate.js` file in this folder (an earlier version of this same
mechanism, replaced by `access.js` because a filename containing "gate" is a known false
positive for some ad-blocker filter lists — it silently failed to load last time). Nothing
references it anymore; it's safe to delete before uploading, or just leave it, either way.

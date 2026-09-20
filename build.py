#!/usr/bin/env python3
"""
Wrap case-study bodies in the site's password-gate shell.

Every page on this site stores its real content base64-encoded inside a
<script type="text/plain" id="site-content-payload"> tag; access.js decodes it
after the password is entered. This script takes a plain HTML body from src/
and emits the gated page at the repo root, matching the existing pages exactly.

    python3 build.py
"""

import base64
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).parent
SRC = ROOT / "src"

SHELL = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="icon" href="assets/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="assets/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="192x192" href="assets/favicon-192.png">
<link rel="apple-touch-icon" href="assets/apple-touch-icon.png">
<link rel="stylesheet" href="styles.css">
</head>
<body id="top">

<div id="site-gate-overlay" class="site-gate-overlay">
  <div class="site-gate-box">
    <p class="eyebrow">Private portfolio</p>
    <h1>Enter password</h1>
    <p class="gate-note">This portfolio is shared privately. Enter the password you were given to continue.</p>
    <form class="gate-form" id="site-gate-form">
      <input type="password" id="site-gate-input" placeholder="Password" required autofocus autocapitalize="off" autocorrect="off" spellcheck="false">
      <button type="submit">Enter</button>
    </form>
    <p class="gate-error" id="site-gate-error">Incorrect password — try again, or reach out for access.</p>
  </div>
</div>

<script type="text/plain" id="site-content-payload">{payload}</script>
<div id="site-content" hidden></div>

<script src="cursor.js"></script>
<script src="access.js"></script>
</body>
</html>
"""

PAGES = [
    ("decoder", "Plain-English Decoder — Michael Lee",
     "A reader for documents written to protect someone else. Every plain sentence anchored to the clause it came from."),
    ("split", "Split — Michael Lee",
     "A dinner bill splitter built around shared items, proportional tax and tip, and the leftover penny."),
    ("inbox-cleaner", "Inbox Cleaner — Michael Lee",
     "Gmail triage by sender instead of by message, designed so bulk destruction feels safe."),
]

# ---- new index.html section -------------------------------------------------

SIDE_PROJECTS = """
<section class="additional-work">
  <div data-reveal>
    <div class="section-eyebrow">
      <span class="accent-dot"></span>
      <span>Designed &amp; Built Solo</span>
    </div>
    <h2>Side projects</h2>
  </div>

  <div class="archive-grid" data-reveal-stagger>
    <a class="archive-card" href="decoder.html">
      <div class="thumb"><img src="assets/decoder-hero.png" alt="Plain-English Decoder preview"></div>
      <div>
        <h4>Plain-English Decoder</h4>
        <p class="desc">Anchored translation for documents you're about to sign</p>
      </div>
    </a>
    <a class="archive-card" href="split.html">
      <div class="thumb"><img src="assets/split-hero.png" alt="Split preview"></div>
      <div>
        <h4>Split</h4>
        <p class="desc">Bill splitting that reconciles to the cent</p>
      </div>
    </a>
    <a class="archive-card" href="inbox-cleaner.html">
      <div class="thumb"><img src="assets/cleaner-hero.png" alt="Inbox Cleaner preview"></div>
      <div>
        <h4>Inbox Cleaner</h4>
        <p class="desc">Gmail triage by sender, with a real undo</p>
      </div>
    </a>
  </div>
</section>
"""


def decode_payload(path):
    html = path.read_text()
    m = re.search(r'id="site-content-payload">(.*?)</script>', html, re.S)
    if not m:
        raise SystemExit(f"no payload found in {path.name}")
    return html, m.group(1).strip(), base64.b64decode(m.group(1).strip()).decode()


def encode(body):
    return base64.b64encode(body.encode()).decode()


def build_case_studies():
    for slug, title, desc in PAGES:
        body = (SRC / f"{slug}.body.html").read_text()
        out = ROOT / f"{slug}.html"
        out.write_text(SHELL.format(title=title, desc=desc, payload=encode(body)))
        print(f"  built {out.name}  ({len(body):,} bytes body)")


def build_index():
    path = ROOT / "index.html"
    html, old_b64, body = decode_payload(path)

    if "Side projects" in body:
        # idempotent: replace the existing block rather than appending another
        body = re.sub(
            r'\n<section class="additional-work">\s*<div data-reveal>\s*<div class="section-eyebrow">\s*'
            r'<span class="accent-dot"></span>\s*<span>Designed &amp; Built Solo</span>.*?</section>\n',
            SIDE_PROJECTS, body, flags=re.S)
    else:
        anchor = '<section class="additional-work">'
        i = body.index(anchor)
        body = body[:i] + SIDE_PROJECTS.strip() + "\n\n" + body[i:]

    path.write_text(html.replace(old_b64, encode(body)))
    print(f"  updated index.html (side projects section)")


if __name__ == "__main__":
    print("Building case study pages…")
    build_case_studies()
    build_index()
    print("Done. Password unchanged (see access.js).")

/* ===========================================================
   Site-wide password gate.

   How it works: every page's real content is stored base64-encoded
   inside a <script type="text/plain" id="site-content-payload"> tag,
   NOT in the visible DOM. Nothing renders until the correct password
   is entered, at which point the payload is decoded and injected into
   #site-content. Once unlocked, the browser remembers via localStorage
   so you don't have to re-enter the password on every page.

   IMPORTANT — read before relying on this for anything truly sensitive:
   This keeps the site out of search engines, off-the-cuff link sharing,
   and casual browsing. It is NOT real security. The password (base64,
   not encrypted) and the encoded content both ship to the browser in
   the page source — anyone reasonably technical who inspects it can
   extract both without ever typing the password. Don't put information
   here you'd be genuinely harmed by a specific person deciding to leak
   or screenshot, even if they're someone you gave the password to.

   To change the password: from a terminal, run
     echo -n 'yournewpassword' | base64
   and paste the result into PASSWORD_B64 below, on every page (or just
   in this shared file, since all pages load it).
   =========================================================== */

(function () {
  var STORAGE_KEY = "portfolio_unlocked_v1";
  var PASSWORD_B64 = "ZmllbGRub3RlczI2"; // "fieldnotes26" — change me, see DEPLOY.md

  function b64decode(str) {
    try {
      return new TextDecoder().decode(Uint8Array.from(atob(str), function (c) {
        return c.charCodeAt(0);
      }));
    } catch (e) {
      return "";
    }
  }

  function reveal() {
    var overlay = document.getElementById("site-gate-overlay");
    var payload = document.getElementById("site-content-payload");
    var content = document.getElementById("site-content");
    if (payload && content && !content.dataset.filled) {
      content.innerHTML = b64decode(payload.textContent.trim());
      content.dataset.filled = "1";
    }
    if (overlay) overlay.hidden = true;
    if (content) content.hidden = false;
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem(STORAGE_KEY) === "1") {
      reveal();
      return;
    }

    var form = document.getElementById("site-gate-form");
    var input = document.getElementById("site-gate-input");
    var error = document.getElementById("site-gate-error");
    var correct = b64decode(PASSWORD_B64);

    if (!form || !input) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (input.value === correct) {
        localStorage.setItem(STORAGE_KEY, "1");
        reveal();
      } else if (error) {
        error.style.display = "block";
      }
    });
  });
})();

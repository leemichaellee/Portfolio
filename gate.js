/* ===========================================================
   Soft password gate for private / interview-detail sections.

   IMPORTANT — read before relying on this:
   This is presentation-layer obfuscation, NOT real security.
   The password and the gated content are both shipped to the
   browser (base64-encoded, not encrypted) inside the page's
   source. Anyone reasonably technical who inspects the page
   source or network payload can extract both. Do not put
   anything here you would be genuinely harmed by a stranger
   reading — keep truly sensitive figures (exact dollar amounts,
   internal system names, anything under NDA) out of this file
   entirely and share those verbally in interviews instead.

   What this DOES do: keep casual visitors from stumbling onto
   interview-only detail, and let you share a single link + a
   password with a specific recruiter/hiring manager without
   needing a backend.

   To change a page's password: edit the data-password attribute
   on that page's .gate-box element. It must be base64-encoded —
   from a terminal: node -e "console.log(btoa('yourpassword'))"
   or `echo -n 'yourpassword' | base64`.
   =========================================================== */

function b64decode(str) {
  try {
    return new TextDecoder().decode(Uint8Array.from(atob(str), (c) => c.charCodeAt(0)));
  } catch (e) {
    return "";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".gate-box").forEach(function (box) {
    const form = box.querySelector(".gate-form");
    const input = form ? form.querySelector('input[type="password"]') : null;
    const error = box.querySelector(".gate-error");
    const content = box.querySelector(".gate-content");
    const payload = box.querySelector(".gate-payload");
    const correctRaw = box.getAttribute("data-password") || "";
    const correct = b64decode(correctRaw);

    if (!form || !input || !content) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (input.value.trim() !== "" && input.value === correct) {
        if (payload) {
          content.innerHTML = b64decode(payload.textContent.trim());
        }
        content.hidden = false;
        box.classList.add("unlocked");
        form.hidden = true;
        if (error) error.style.display = "none";
      } else {
        if (error) error.style.display = "block";
      }
    });
  });
});

// Scroll-reveal utility (v2 motion system, ported from Figma)
// Elements marked [data-reveal] or [data-reveal-stagger] fade + slide up
// the first time they enter the viewport, then stay revealed.
(function () {
  var els = document.querySelectorAll("[data-reveal], [data-reveal-stagger]");
  if (!els.length) return;

  if (!("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("is-revealed"); });
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  els.forEach(function (el) { io.observe(el); });
})();

/* ===========================================================
   Custom cursor — 42px liquid-glass dot.

   Only activates on fine-pointer devices (mouse/trackpad); touch
   devices are left completely alone. Falls back gracefully — if
   this script fails to load for any reason, the native cursor is
   still visible since we only hide it once this script confirms
   a fine pointer is present.
   =========================================================== */
(function () {
  if (!window.matchMedia || !window.matchMedia("(pointer: fine)").matches) return;

  document.documentElement.classList.add("has-custom-cursor");

  var dot = document.createElement("div");
  dot.className = "cursor-dot";
  document.body.appendChild(dot);

  var targetX = window.innerWidth / 2;
  var targetY = window.innerHeight / 2;
  var currentX = targetX;
  var currentY = targetY;
  var visible = false;

  function render() {
    currentX += (targetX - currentX) * 0.2;
    currentY += (targetY - currentY) * 0.2;
    dot.style.transform =
      "translate(" + currentX + "px, " + currentY + "px) translate(-50%, -50%)";
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  window.addEventListener("mousemove", function (e) {
    targetX = e.clientX;
    targetY = e.clientY;
    if (!visible) {
      visible = true;
      dot.style.opacity = "1";
    }
  });

  document.addEventListener("mouseleave", function () {
    dot.style.opacity = "0";
  });

  window.addEventListener("mousedown", function () {
    dot.classList.add("is-active");
  });
  window.addEventListener("mouseup", function () {
    dot.classList.remove("is-active");
  });

  var hoverTargets = "a, button, .pill, input, textarea, select, [role='button'], [data-cursor-hover]";

  document.addEventListener("mouseover", function (e) {
    if (e.target.closest && e.target.closest(hoverTargets)) {
      dot.classList.add("is-hovering");
    }
  });
  document.addEventListener("mouseout", function (e) {
    if (e.target.closest && e.target.closest(hoverTargets)) {
      dot.classList.remove("is-hovering");
    }
  });
})();

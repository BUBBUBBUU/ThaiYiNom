(function () {
  const slides = Array.from(document.querySelectorAll(".slide"));
  const dotsWrap = document.getElementById("dots");
  const pageNow = document.getElementById("pageNow");
  const pageTotal = document.getElementById("pageTotal");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  let current = 0;
  const total = slides.length;
  pageTotal.textContent = total;

  // build dot indicators
  const dotEls = slides.map((_, i) => {
    const b = document.createElement("button");
    b.className = "dot-btn";
    b.setAttribute("aria-label", "ไปสไลด์ " + (i + 1));
    b.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(b);
    return b;
  });

  function render() {
    slides.forEach((s, i) => {
      s.classList.remove("active", "prev", "next");
      if (i === current) s.classList.add("active");
      else if (i < current) s.classList.add("prev");
      else s.classList.add("next");
    });
    dotEls.forEach((d, i) => d.classList.toggle("on", i === current));
    pageNow.textContent = current + 1;
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === total - 1;
  }

  function goTo(i) {
    if (i < 0 || i >= total) return;
    current = i;
    render();
  }

  prevBtn.addEventListener("click", () => goTo(current - 1));
  nextBtn.addEventListener("click", () => goTo(current + 1));

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "PageDown") goTo(current + 1);
    if (e.key === "ArrowLeft" || e.key === "PageUp") goTo(current - 1);
  });

  // touch swipe
  let touchStartX = null;
  const stage = document.getElementById("stage");
  stage.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener("touchend", (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) goTo(current + 1);
      else goTo(current - 1);
    }
    touchStartX = null;
  }, { passive: true });

  render();
})();

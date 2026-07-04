const TYPEWRITER_TEXT = "I build detections that catch what signatures miss.";
const TYPE_SPEED_MS = 45;
const TYPE_START_DELAY_MS = 1500;

function typewrite(el, text, speed) {
  let i = 0;
  function step() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i += 1;
      setTimeout(step, speed);
    }
  }
  step();
}

function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = TYPEWRITER_TEXT;
    return;
  }
  setTimeout(() => typewrite(el, TYPEWRITER_TEXT, TYPE_SPEED_MS), TYPE_START_DELAY_MS);
}

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
});

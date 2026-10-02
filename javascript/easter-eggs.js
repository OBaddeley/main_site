// Easter eggs 🕹
//  1. Konami code (↑ ↑ ↓ ↓ ← → ← → B A) toggles "arcade mode": a striped retro
//     sun rises in the header and the synthwave grid scrolls. Forces the neon
//     theme while on, without saving it as the visitor's theme. Lasts for the
//     browser session (restored on each page by theme-init.js).
//  2. Click the site name 5 times quickly for a burst of magic sprinkles —
//     a nod to the Magic Sprinkler bot.
// Styles live in the "Easter eggs" section of stylesheets/theme.css.
(function () {
  const root = document.documentElement;

  // Status message, also announced to screen readers
  const toast = document.createElement('div');
  toast.className = 'egg-toast';
  toast.setAttribute('role', 'status');
  document.body.appendChild(toast);
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3000);
  }

  // applyTheme is defined in dark-light-toggle.js (keeps the toggle button in sync)
  function setDark(isDark) {
    if (typeof applyTheme === 'function') applyTheme(isDark);
    else root.classList.toggle('dark', isDark);
  }

  // ---------- 1. Konami code ----------
  const konami = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'].join(' ');
  let recentKeys = [];

  // "forced" = arcade mode switched the theme to dark, so switch it back after
  let arcadeState = null;
  try { arcadeState = sessionStorage.getItem('arcade'); } catch (e) {}
  let forcedDark = arcadeState === 'forced';

  function saveArcade(value) {
    try {
      if (value) sessionStorage.setItem('arcade', value);
      else sessionStorage.removeItem('arcade');
    } catch (e) {}
  }

  document.addEventListener('keydown', (event) => {
    recentKeys.push(event.key.toLowerCase());
    recentKeys = recentKeys.slice(-10);
    if (recentKeys.join(' ') === konami) {
      recentKeys = [];
      toggleArcade();
    }
  });

  function toggleArcade() {
    root.classList.remove('arcade-restored');
    const isOn = root.classList.toggle('arcade');
    if (isOn) {
      forcedDark = !root.classList.contains('dark');
      if (forcedDark) setDark(true);
      saveArcade(forcedDark ? 'forced' : 'on');
      showToast('🕹 CHEAT ACTIVATED — +1UP');
    } else {
      if (forcedDark && root.classList.contains('dark')) setDark(false);
      forcedDark = false;
      saveArcade(null);
      showToast('🕹 GAME OVER — arcade mode off');
    }
  }

  // ---------- 2. Magic sprinkles ----------
  const name = document.querySelector('.project-name');
  const sprinkles = ['🌈', '🦄', '🍄', '✨', '🌷', '🧚', '🍭', '🌻', '🐞', '💖'];
  let clicks = 0;
  let clickTimer;

  if (name) {
    // Stop rapid clicks from selecting the text
    name.addEventListener('mousedown', (event) => {
      if (event.detail > 1) event.preventDefault();
    });

    name.addEventListener('click', () => {
      clicks += 1;
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => { clicks = 0; }, 800);
      if (clicks >= 5) {
        clicks = 0;
        burst();
      }
    });
  }

  function burst() {
    const rect = name.getBoundingClientRect();
    const centreX = rect.left + rect.width / 2;
    const centreY = rect.top + rect.height / 2;
    const count = 24;

    for (let i = 0; i < count; i += 1) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
      const distance = 120 + Math.random() * 140;
      const sprinkle = document.createElement('span');
      sprinkle.className = 'sprinkle';
      sprinkle.setAttribute('aria-hidden', 'true');
      sprinkle.textContent = sprinkles[i % sprinkles.length];
      sprinkle.style.left = centreX + 'px';
      sprinkle.style.top = centreY + 'px';
      sprinkle.style.setProperty('--x', Math.cos(angle) * distance + 'px');
      sprinkle.style.setProperty('--y', Math.sin(angle) * distance + 'px');
      sprinkle.style.setProperty('--r', Math.round(Math.random() * 360 - 180) + 'deg');
      sprinkle.addEventListener('animationend', () => sprinkle.remove());
      document.body.appendChild(sprinkle);
    }
  }
})();

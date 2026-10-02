// The starting theme is set on <html> by the inline snippet in each page's <head>
// (before first paint, so there is no flash). This file wires up the button and
// keeps following the device setting until the visitor makes their own choice.
//
// Theme order: saved choice > device setting > dark.
// Picking the same theme the device would give clears the saved choice,
// so the site goes back to following the device.
const root = document.documentElement;
const toggleButton = document.getElementById('theme-toggle');
const deviceLight = window.matchMedia('(prefers-color-scheme: light)');

function getSaved() {
  try { return localStorage.getItem('theme'); } catch (e) { return null; }
}

function setSaved(theme) {
  try {
    if (theme) localStorage.setItem('theme', theme);
    else localStorage.removeItem('theme');
  } catch (e) {}
}

function applyTheme(isDark) {
  root.classList.toggle('dark', isDark);
  toggleButton.textContent = isDark ? '☀' : '☾';
  toggleButton.setAttribute('aria-pressed', String(isDark));
}

toggleButton.addEventListener('click', () => {
  const isDark = !root.classList.contains('dark');
  const deviceIsDark = !deviceLight.matches;
  applyTheme(isDark);
  setSaved(isDark === deviceIsDark ? null : (isDark ? 'dark' : 'light'));
});

// Follow live device changes (e.g. automatic switching at sunset)
deviceLight.addEventListener('change', (event) => {
  if (!getSaved()) applyTheme(!event.matches);
});

applyTheme(root.classList.contains('dark'));

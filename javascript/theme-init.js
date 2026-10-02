// Apply the theme before first paint to avoid a flash.
// Loaded in <head> without defer/async so it runs before the page renders.
// Order: saved choice, else device setting, else dark.
// Also restores Konami "arcade mode" (see easter-eggs.js) for the rest of the
// browser session, so it survives moving between pages.
(function () {
  var root = document.documentElement;
  var savedTheme = null;
  var arcade = null;
  try { savedTheme = localStorage.getItem('theme'); } catch (e) {}
  try { arcade = sessionStorage.getItem('arcade'); } catch (e) {}
  var useLight = savedTheme ? savedTheme === 'light' : window.matchMedia('(prefers-color-scheme: light)').matches;
  if (!useLight || arcade) root.classList.add('dark');
  // "arcade-restored" skips the sun-rise animation on each new page
  if (arcade) root.classList.add('arcade', 'arcade-restored');
})();

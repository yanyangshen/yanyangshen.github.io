// Yanyang Shen personal website · v2
// Set to false if you want to remove the opening animation entirely.
const ENABLE_INTRO = true;

// Old single-page links shared earlier should still work after the multi-page update.
if (document.body.dataset.page === 'home') {
  const previousAnchors = {
    '#life': 'life.html',
    '#research': 'research.html',
    '#projects': 'research.html#projects-heading',
    '#cv': 'cv.html'
  };
  if (previousAnchors[window.location.hash]) {
    window.location.replace(previousAnchors[window.location.hash]);
  }
}

document.querySelectorAll('.year').forEach(el => { el.textContent = String(new Date().getFullYear()); });

const introActive = document.documentElement.classList.contains('play-intro');
if (introActive) {
  if (!ENABLE_INTRO) {
    document.documentElement.classList.remove('play-intro');
  } else {
    try { sessionStorage.setItem('ys-intro-seen', '1'); } catch (e) { /* optional */ }
    const finishIntro = () => document.documentElement.classList.remove('play-intro');
    const overlay = document.querySelector('.opening-screen');
    if (overlay) overlay.addEventListener('animationend', (event) => {
      if (event.animationName === 'intro-exit') finishIntro();
    });
    // Fallback so users are never trapped behind the animation.
    window.setTimeout(finishIntro, 2600);
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' || event.key === 'Enter') finishIntro();
    }, { once: true });
  }
}

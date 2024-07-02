const togglerId = 'darkModeToggle';
const toggleClass = 'dark';
const storageBodyClass = 'bodyClass';
const themeTransitionVar = '--standard-theme-transition';
const themeTransitionVal = '0.4s ease-in-out';

function loadCss(cssFileName) {
  var cssLink = document.createElement('link');
  cssLink.rel = 'stylesheet';
  cssLink.type = 'text/css';
  cssLink.href = cssFileName;
  document.getElementsByTagName('head')[0].appendChild(cssLink);
}

/**
 * create toggle button element
 */
function createToggle() {
  var toggler = document.createElement('div');
  toggler.id = togglerId;
  toggler.addEventListener('click', function () {
    document.body.classList.toggle(toggleClass);
    localStorage.setItem(storageBodyClass, document.body.classList);
  });

  document.body.appendChild(toggler);
}

/**
 * set body class if one is in local storage
 * @returns void
 */
function loadTheme() {
  const bodyClass = localStorage.getItem(storageBodyClass);
  if (bodyClass == null) return;
  document.body.classList = bodyClass;
}

/**
 * set `--standard-theme-transition` css variable
 */
function setTransitionTime() {
  document.documentElement.style.setProperty(
    themeTransitionVar,
    themeTransitionVal,
  );
}

loadCss('/css/darkmode.css');
loadTheme();
createToggle();
window.addEventListener('load', setTransitionTime, false);

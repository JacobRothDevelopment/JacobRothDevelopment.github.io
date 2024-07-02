const cssFileName = '/css/debugFlag.css';
const flagId = 'debugFlag';
const prodUrl = 'https://jacobrothdevelopment.github.io/';

function addDebugFlagStyles() {
  var cssLink = document.createElement('link');
  cssLink.rel = 'stylesheet';
  cssLink.type = 'text/css';
  cssLink.href = cssFileName;
  document.getElementsByTagName('head')[0].appendChild(cssLink);
}

function createDebugFlag() {
  var flag = document.createElement('a');
  flag.href = `${prodUrl}${window.location.pathname}`;
  flag.target = '_blank';
  flag.id = flagId;

  document.body.appendChild(flag);
}

// if host is local, give flag for prod
if (window.location.hostname === 'localhost') {
  addDebugFlagStyles();
  createDebugFlag();
}

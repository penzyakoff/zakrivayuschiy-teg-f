function changeTheme(theme) {
  document.documentElement.className = '';
  if (theme === 'auto') {
    applyAutoTheme();
  } else {
    document.documentElement.classList.add(`theme-${theme}`);
  }
  localStorage.setItem('theme', theme);
}

function applyAutoTheme() {
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (prefersDarkScheme) {
    document.documentElement.classList.add('theme-dark');
  } else {
    document.documentElement.classList.add('theme-light');
  }
}

(function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    changeTheme(savedTheme);
  } else {
    changeTheme('auto');
  }
})();

window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', (e) => {
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'auto') {
    applyAutoTheme();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const themeButtons = document.querySelectorAll('.theme-menu__button');
  
  function setDisabled(theme) {
    themeButtons.forEach((item) => {
      if (item.getAttribute('data-theme') === theme) {
        item.setAttribute('disabled', true);
      } else {
        item.removeAttribute('disabled');
      }
    });
  }
  
  const currentTheme = localStorage.getItem('theme') || 'auto';
  setDisabled(currentTheme);

  themeButtons.forEach((button) => {
    button.onclick = () => {
      const selectedTheme = button.getAttribute('data-theme');
      changeTheme(selectedTheme);
      setDisabled(selectedTheme);
    };
  });
});

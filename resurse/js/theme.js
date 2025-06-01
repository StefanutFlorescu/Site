const themeSelect = document.getElementById('theme-select');
const themeIcon = document.getElementById('theme-icon');

const themeIcons = {
  light: 'fas fa-sun',
  dark: 'fas fa-moon',
  golden: 'fas fa-star'
};

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeIcon.className = themeIcons[theme] || 'fas fa-sun';
}

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);
  themeSelect.value = savedTheme;
});


themeSelect.addEventListener('change', () => {
  const newTheme = themeSelect.value;
  applyTheme(newTheme);
});

const toggleButton = document.getElementById('mode-toggle');
const body = document.body;
const storageKey = 'colorMode';

// Function to set the mode
function setMode(mode) {
  if (mode === 'light') {
    body.classList.add('light-mode');
  } else {
    body.classList.remove('light-mode');
  }
}

// Check localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedMode = localStorage.getItem(storageKey);
  if (savedMode) {
    setMode(savedMode);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    // Optional: detect OS preference if no preference is saved
    setMode('light');
  }
});

// Toggle mode and save to localStorage
toggleButton.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  let currentMode = body.classList.contains('light-mode') ? 'light' : 'dark';
  localStorage.setItem(storageKey, currentMode);
});

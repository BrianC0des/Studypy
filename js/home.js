const sidebar = document.querySelector(".sidebar");
const sidebarClose = document.querySelector("#sidebar-close");
const menu = document.querySelector(".menu-content");
const menuItems = document.querySelectorAll(".submenu-item");
const subMenuTitles = document.querySelectorAll(".submenu .menu-title");
sidebarClose.addEventListener("click", () => sidebar.classList.toggle("close"));
menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    menu.classList.add("submenu-active");
    item.classList.add("show-submenu");
    menuItems.forEach((item2, index2) => {
      if (index !== index2) {
        item2.classList.remove("show-submenu");
      }
    });
  });
});
subMenuTitles.forEach((title) => {
  title.addEventListener("click", () => {
    menu.classList.remove("submenu-active");
  });
});

// Search & Filter for Learning Platorms
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const genreSelect = document.getElementById('genre-filter');
  const clearBtn = document.getElementById('clear-filters');
  const tools = Array.from(document.querySelectorAll('.Tools'));
  const noResults = document.getElementById('no-results');

  function normalize(text = '') {
    return text.toString().toLowerCase().trim();
  }

  function filterTools() {
    const q = normalize(searchInput?.value || '');
    const genre = genreSelect?.value || 'all';
    let visible = 0;

    tools.forEach(el => {
      const title = normalize(el.querySelector('h2')?.textContent || '');
      const desc = normalize(el.querySelector('h5')?.textContent || '');
      const data = (el.dataset.genres || '').toLowerCase();
      const matchesSearch = q === '' || title.includes(q) || desc.includes(q);
      const matchesGenre = genre === 'all' || data.split(',').map(s => s.trim()).includes(genre);
      if (matchesSearch && matchesGenre) {
        el.style.display = '';
        visible++;
      } else {
        el.style.display = 'none';
      }
    });

    if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
  }

  if (searchInput && genreSelect) {
    searchInput.addEventListener('input', filterTools);
    genreSelect.addEventListener('change', filterTools);
    clearBtn?.addEventListener('click', () => {
      searchInput.value = '';
      genreSelect.value = 'all';
      filterTools();
      searchInput.focus();
    });
    filterTools();
  }
});




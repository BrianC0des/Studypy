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

  // Inject category badges into each tool card based on data-genres
  function renderBadges() {
    tools.forEach(el => {
      // avoid duplicate badges on re-run
      if (el.querySelector('.tools-badges')) return;
      const data = (el.dataset.genres || 'uncategorized').toLowerCase();
      const parts = data.split(',').map(s => s.trim()).filter(Boolean);
      const container = document.createElement('div');
      container.className = 'tools-badges';

      // primary badge = first item
      const primary = document.createElement('span');
      primary.className = 'badge badge--primary';
      primary.textContent = parts[0] ? parts[0].replace(/\b\w/g, c => c.toUpperCase()) : 'General';
      container.appendChild(primary);

      // sub badges
      parts.slice(1).forEach(sub => {
        const subBadge = document.createElement('span');
        subBadge.className = 'badge badge--sub';
        subBadge.textContent = sub.replace(/\b\w/g, c => c.toUpperCase());
        container.appendChild(subBadge);
      });

      // insert badges at top of card, before the title link if present
      const titleLink = el.querySelector('.card-link');
      if (titleLink) el.insertBefore(container, titleLink);
      else el.prepend(container);
    });
  }

  renderBadges();

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




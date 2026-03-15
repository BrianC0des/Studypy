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
  const tools = Array.from(document.querySelectorAll('.Tools'));
  const noResults = document.getElementById('no-results');

  const genreMap = {
    'html': 'html',
    'css': 'css',
    'responsive': 'responsive',
    'web development': 'webdev',
    'deployment': 'deployment',
    'javascript': 'javascript',
    'frameworks': 'framework',
    'devops': 'devops',
    'performance': 'performance',
    'testing': 'testing',
    'accessibility': 'accessibility',
    'all': 'all'
  };

  function getActiveGenre() {
    const activeTab = document.querySelector('.tab.active');
    const tabText = (activeTab?.textContent || '').toLowerCase().trim();
    return genreMap[tabText] || 'all';
  }

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
    const genre = getActiveGenre();
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

  if (searchInput) {
    searchInput.addEventListener('input', filterTools);
    filterTools();
  }

  // Tab functionality for genre selection
  const tabButtons = document.querySelectorAll('.tab');

  function updateActiveTab() {
    tabButtons.forEach(btn => {
      const genre = genreMap[btn.textContent.trim().toLowerCase()] || 'all';
      if (genre === getActiveGenre()) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all tabs
      tabButtons.forEach(btn => btn.classList.remove('active'));
      // Add active to clicked tab
      button.classList.add('active');
      // Trigger filter after tab change
      filterTools();
    });
  });

  // Initialize active tab + filter state
  updateActiveTab();
  filterTools();
});




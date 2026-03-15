const sidebar = document.querySelector(".sidebar");

if (sidebar && !window.__studypySidebarInit) {
  window.__studypySidebarInit = true;

  // Sync body class with current sidebar state
  const syncSidebarState = () => {
    document.body.classList.toggle(
      "sidebar-collapsed",
      sidebar.classList.contains("close")
    );
  };

  // Apply correct class on first load
  syncSidebarState();

  // Single toggle listener on the sidebar button
  const sidebarToggle = document.querySelector(".sidebar-toggle");
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("close");
      syncSidebarState();
    });
  }

  // ── Submenu: click to open/close (works in both expanded & collapsed states) ──
  const iocnLinks = document.querySelectorAll(".iocn-link");

  iocnLinks.forEach((iocnLink) => {
    const link = iocnLink.querySelector("a");
    if (!link) return;

    // Inject a chevron arrow icon if one isn't already there
    if (!iocnLink.querySelector(".arrow")) {
      const arrow = document.createElement("i");
      arrow.className = "bx bxs-chevron-down arrow";
      iocnLink.appendChild(arrow);
    }

    // Toggle the parent <li>'s showMenu class on click
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const parentLi = iocnLink.closest("li");
      if (!parentLi) return;

      const isOpen = parentLi.classList.contains("showMenu");

      // Close all other open submenus first
      document.querySelectorAll(".nav-links li.showMenu").forEach((li) => {
        li.classList.remove("showMenu");
      });

      // Toggle current one
      if (!isOpen) {
        parentLi.classList.add("showMenu");
      }
    });
  });
}




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





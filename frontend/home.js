const sidebar = document.querySelector(".sidebar");

if (sidebar) {
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

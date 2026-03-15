const sidebar = document.querySelector(".sidebar");

if (sidebar) {
  const sidebarClose = document.querySelector("#sidebar-close");
  if (sidebarClose) {
    sidebarClose.addEventListener("click", () => sidebar.classList.toggle("close"));
  }

  // Keep compatibility with previous submenu markup if those nodes exist.
  const menu = document.querySelector(".menu-content");
  const menuItems = document.querySelectorAll(".submenu-item");
  const subMenuTitles = document.querySelectorAll(".submenu .menu-title");

  if (menu && menuItems.length && subMenuTitles.length) {
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
  }

  const arrows = document.querySelectorAll(".arrow");
  arrows.forEach((arrowEl) => {
    arrowEl.addEventListener("click", (event) => {
      const arrowParent = event.currentTarget.closest("li");
      if (arrowParent) {
        arrowParent.classList.toggle("showMenu");
      }
    });
  });

  const sidebarBtn = document.querySelector(".sidebar-toggle");
  if (sidebarBtn) {
    sidebarBtn.addEventListener("click", () => {
      sidebar.classList.toggle("close");
    });
  }
}

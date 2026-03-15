const sidebar = document.querySelector(".sidebar");

if (sidebar) {
  const syncSidebarState = () => {
    document.body.classList.toggle("sidebar-collapsed", sidebar.classList.contains("close"));
  };

  syncSidebarState();

  const sidebarClose = document.querySelector("#sidebar-close");
  if (sidebarClose) {
    sidebarClose.addEventListener("click", () => {
      sidebar.classList.toggle("close");
      syncSidebarState();
    });
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

  const iocnLinks = document.querySelectorAll(".iocn-link");
  iocnLinks.forEach((iocnLink) => {
    const link = iocnLink.querySelector("a");
    if (!link) {
      return;
    }

    link.addEventListener("click", (event) => {
      event.preventDefault();
      const parentLi = iocnLink.closest("li");
      if (!parentLi) {
        return;
      }

      parentLi.classList.toggle("showMenu");
    });
  });

  const sidebarBtn = document.querySelector(".sidebar-toggle");
  if (sidebarBtn) {
    sidebarBtn.addEventListener("click", () => {
      sidebar.classList.toggle("close");
      syncSidebarState();
    });
  }
}

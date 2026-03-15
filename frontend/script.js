(function () {
  const scriptUrl = document.currentScript?.src || window.location.href;
  const navUrl = new URL('nav.html', scriptUrl).href;

  function isRelativeUrl(url) {
    if (!url) return false;
    // Ignore hashes, absolute paths, protocol-relative, and schemes (http:, mailto:, etc.)
    return !url.startsWith('#') && !url.startsWith('/') && !/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(url);
  }

  fetch(navUrl)
    .then(res => res.text())
    .then(html => {
      const container = document.createElement('div');
      container.innerHTML = html;

      // Fix relative paths so they resolve relative to nav.html (not the current page)
      const mappings = [
        { selector: 'a[href]', attr: 'href' },
        { selector: 'img[src]', attr: 'src' },
        { selector: 'link[href]', attr: 'href' },
        { selector: 'script[src]', attr: 'src' },
      ];

      mappings.forEach(({ selector, attr }) => {
        container.querySelectorAll(selector).forEach(el => {
          const value = el.getAttribute(attr);
          if (isRelativeUrl(value)) {
            try {
              el.setAttribute(attr, new URL(value, navUrl).href);
            } catch (e) {
              // ignore invalid URLs
            }
          }
        });
      });

      const placeholder = document.getElementById('navbar-placeholder');
      if (placeholder) placeholder.innerHTML = container.innerHTML;
    })
    .catch(err => console.error('Failed to load navbar:', err));
})();
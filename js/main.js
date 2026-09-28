(() => {
  "use strict";

  const pages = {
    home: "/",
    about: "/about/",
    contact: "/contact/",
    history: "/history/",
    kit: "/kit/",
    projects: "/projects/",
    interests: "/interests/"
  };

  function initialize() {
    // Update navigation and old links such as about.html.
    document.querySelectorAll("a[href], a[data-page]").forEach(link => {
      if (link.hasAttribute("download")) return;

      const href = link.getAttribute("href") || "";
      let page = link.dataset.page;
      let suffix = "";

      if (!page) {
        // Leave external links, email links and anchors alone.
        if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(href)) return;

        const oldLink = href.match(
          /^(?:\.\/)?(index|home|about|contact|history|kit|projects|interests)\.html([?#].*)?$/i
        );

        if (!oldLink) return;

        page = oldLink[1].toLowerCase();
        suffix = oldLink[2] || "";
        if (page === "index") page = "home";
      }

      if (!Object.prototype.hasOwnProperty.call(pages, page)) return;

      link.setAttribute("href", pages[page] + suffix);
    });

    // Highlight the current navigation link.
    const normalize = path =>
      path.replace(/index\.html$/, "").replace(/\/$/, "") || "/";

    document.querySelectorAll("nav a[href]").forEach(link => {
      const destination = new URL(link.href, window.location.href);
      const active =
        destination.origin === window.location.origin &&
        normalize(destination.pathname) ===
          normalize(window.location.pathname);

      link.classList.toggle("active", active);

      if (active) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    // Mobile menu.
    const menu = document.querySelector(".menu");
    const nav =
      document.querySelector(".header-nav") ||
      document.querySelector("nav");

    if (menu && nav) {
      if (!nav.id) nav.id = "main-navigation";

      menu.setAttribute("aria-controls", nav.id);

      function setMenu(open) {
        nav.classList.toggle("open", open);
        menu.setAttribute("aria-expanded", String(open));
      }

      setMenu(nav.classList.contains("open"));

      menu.addEventListener("click", () => {
        setMenu(!nav.classList.contains("open"));
      });

      nav.addEventListener("click", event => {
        if (event.target.closest("a")) setMenu(false);
      });

      document.addEventListener("keydown", event => {
        if (event.key === "Escape" && nav.classList.contains("open")) {
          setMenu(false);
          menu.focus();
        }
      });
    }
  }

  function hideLoader() {
    window.setTimeout(() => {
      const loader = document.querySelector(".loader");
      if (loader) loader.classList.add("hide");
    }, 300);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, {
      once: true
    });
  } else {
    initialize();
  }

  if (document.readyState === "complete") {
    hideLoader();
  } else {
    window.addEventListener("load", hideLoader, { once: true });
  }
})();

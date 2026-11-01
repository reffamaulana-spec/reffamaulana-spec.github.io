(function () {
  "use strict";

  var config = window.PORTFOLIO_CONFIG || { links: {}, skills: {}, gallery: [] };

  function hrefFor(key, value) {
    if (!value) return "";
    if (key === "email" && value.indexOf("mailto:") !== 0) return "mailto:" + value;
    return value;
  }

  function labelFor(value) {
    return String(value).replace(/^mailto:/, "").replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  }

  function applyLinks() {
    document.querySelectorAll("[data-link]").forEach(function (el) {
      var key = el.getAttribute("data-link");
      var value = config.links ? config.links[key] : "";
      var href = hrefFor(key, value);

      if (href) {
        el.setAttribute("href", href);
        el.removeAttribute("aria-disabled");
        el.classList.remove("is-disabled");
        return;
      }

      if (el.hasAttribute("data-hide-empty")) {
        el.hidden = true;
        return;
      }

      el.removeAttribute("href");
      el.removeAttribute("target");
      el.setAttribute("aria-disabled", "true");
      el.setAttribute("tabindex", "-1");
      el.classList.add("is-disabled");
    });

    document.querySelectorAll("[data-text]").forEach(function (el) {
      var key = el.getAttribute("data-text");
      var value = config.links ? config.links[key] : "";
      el.textContent = value ? labelFor(value) : el.getAttribute("data-fallback") || "";
    });
  }

  function renderSkills() {
    document.querySelectorAll("[data-list]").forEach(function (container) {
      var path = container.getAttribute("data-list").split(".");
      var items = config;
      path.forEach(function (part) {
        items = items ? items[part] : null;
      });

      container.textContent = "";

      if (!items || !items.length) {
        var placeholder = document.createElement("span");
        placeholder.className = "chip chip--placeholder";
        placeholder.textContent = "[isi di config.js]";
        container.appendChild(placeholder);
        return;
      }

      items.forEach(function (name) {
        var chip = document.createElement("span");
        chip.className = "chip";
        chip.textContent = name;
        container.appendChild(chip);
      });
    });
  }

  function renderGallery() {
    var container = document.querySelector("[data-gallery]");
    if (!container) return;
    container.textContent = "";

    (config.gallery || []).forEach(function (item, index) {
      var figure = document.createElement("figure");
      figure.className = "gallery__item reveal";
      figure.style.setProperty("--delay", index * 0.06 + "s");
      figure.style.margin = "0";

      if (item.src) {
        var img = document.createElement("img");
        img.src = item.src;
        img.alt = item.alt || "";
        img.loading = "lazy";
        if (item.position) img.style.objectPosition = item.position;
        figure.appendChild(img);

        if (item.caption) {
          var caption = document.createElement("figcaption");
          caption.className = "gallery__caption";
          caption.textContent = item.caption;
          figure.appendChild(caption);
        }
      } else {
        figure.textContent = "[ " + (item.alt || "foto") + " ]";
      }

      container.appendChild(figure);
    });
  }

  function setupNav() {
    var header = document.getElementById("header");
    var toggle = document.getElementById("navToggle");
    var list = document.getElementById("navList");
    if (!header || !toggle || !list) return;

    function closeMenu() {
      list.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Buka menu navigasi");
    }

    toggle.addEventListener("click", function () {
      var open = list.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Tutup menu navigasi" : "Buka menu navigasi");
    });

    list.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
        toggle.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (!header.contains(event.target)) closeMenu();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) closeMenu();
    });

    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function setupActiveLinks() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));
    var map = {};
    links.forEach(function (link) {
      map[link.getAttribute("href").slice(1)] = link;
    });

    var sections = Object.keys(map)
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);

    if (!("IntersectionObserver" in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          link.classList.remove("is-active");
          link.removeAttribute("aria-current");
        });
        var active = map[entry.target.id];
        if (active) {
          active.classList.add("is-active");
          active.setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(function (section) { observer.observe(section); });
  }

  function setupReveal() {
    var items = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    items.forEach(function (el) { observer.observe(el); });
  }

  function setYear() {
    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  }

  function init() {
    applyLinks();
    renderSkills();
    renderGallery();
    setupNav();
    setupActiveLinks();
    setupReveal();
    setYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

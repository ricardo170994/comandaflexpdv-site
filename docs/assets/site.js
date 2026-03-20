document.documentElement.classList.add("js");

const yearNode = document.querySelector("#current-year");
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  const setMenuState = (open) => {
    siteNav.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
      setMenuState(false);
    }
  });
}

const animateCounter = (element) => {
  if (element.dataset.animated === "true") {
    return;
  }

  const target = Number(element.dataset.counter || "0");
  if (!Number.isFinite(target)) {
    return;
  }

  element.dataset.animated = "true";

  const duration = 1200;
  const startTime = performance.now();
  const formatter = new Intl.NumberFormat("pt-BR");

  const step = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.max(0, Math.round(target * eased));
    element.textContent = formatter.format(value);

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
};

const revealNodes = document.querySelectorAll("[data-reveal]");
const counterNodes = document.querySelectorAll("[data-counter]");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  revealNodes.forEach((node) => revealObserver.observe(node));

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.6,
    },
  );

  counterNodes.forEach((node) => counterObserver.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
  counterNodes.forEach((node) => animateCounter(node));
}

const moduleTabs = Array.from(document.querySelectorAll(".module-tab"));
const modulePanels = Array.from(document.querySelectorAll("[data-module-panel]"));

if (moduleTabs.length && modulePanels.length) {
  let currentIndex = Math.max(
    0,
    moduleTabs.findIndex((tab) => tab.classList.contains("is-active")),
  );
  let autoRotate = true;

  const activateModule = (moduleId) => {
    moduleTabs.forEach((tab, index) => {
      const active = tab.dataset.module === moduleId;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;

      if (active) {
        currentIndex = index;
      }
    });

    modulePanels.forEach((panel) => {
      const active = panel.dataset.modulePanel === moduleId;
      panel.hidden = !active;
      panel.classList.toggle("is-active", active);

      if (active) {
        panel.classList.add("is-visible");
      }
    });
  };

  moduleTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      autoRotate = false;
      activateModule(tab.dataset.module || "");
    });
  });

  const modulesShell = document.querySelector(".modules-shell");
  if (modulesShell) {
    modulesShell.addEventListener("mouseenter", () => {
      autoRotate = false;
    });
  }

  const tablist = document.querySelector(".module-tabs");
  if (tablist) {
    tablist.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
        return;
      }

      autoRotate = false;
      event.preventDefault();

      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (currentIndex + direction + moduleTabs.length) % moduleTabs.length;
      const nextTab = moduleTabs[nextIndex];

      activateModule(nextTab.dataset.module || "");
      nextTab.focus();
    });
  }

  window.setInterval(() => {
    if (!autoRotate || document.hidden) {
      return;
    }

    const nextIndex = (currentIndex + 1) % moduleTabs.length;
    activateModule(moduleTabs[nextIndex].dataset.module || "");
  }, 6800);
}

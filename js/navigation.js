
/* ============================================================
   CloudRecall AI — Navigation
   Accessible mobile menu and in-page navigation
   ============================================================ */

export function initNavigation() {
  const toggle = document.querySelector("#nav-toggle");
  const navLinks = document.querySelector("#nav-links");

  if (!toggle || !navLinks) {
    console.warn("CloudRecall AI: Navigation elements were not found.");
    return;
  }

  const mobileQuery = window.matchMedia("(max-width: 760px)");

  function isMenuOpen() {
    return toggle.getAttribute("aria-expanded") === "true";
  }

  function openMenu() {
    if (!mobileQuery.matches) return;

    navLinks.classList.add("is-open");
    document.body.classList.add("menu-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close navigation menu");
    toggle.textContent = "×";
  }

  function closeMenu({ returnFocus = false } = {}) {
    navLinks.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
    toggle.textContent = "☰";

    if (returnFocus) {
      toggle.focus();
    }
  }

  toggle.addEventListener("click", () => {
    if (isMenuOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close the mobile menu after a navigation link is selected.
  navLinks.addEventListener("click", (event) => {
    const link = event.target.closest("a");

    if (link && mobileQuery.matches) {
      closeMenu();
    }
  });

  // Escape closes the menu and returns focus to the menu button.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isMenuOpen()) {
      closeMenu({ returnFocus: true });
    }
  });

  // Keep the menu state consistent when the viewport changes.
  function handleViewportChange() {
    if (!mobileQuery.matches) {
      closeMenu();
    }
  }

  if (typeof mobileQuery.addEventListener === "function") {
    mobileQuery.addEventListener("change", handleViewportChange);
  } else {
    // Compatibility fallback for older browsers.
    mobileQuery.addListener(handleViewportChange);
  }

  // Start with a predictable, closed state.
  closeMenu();
}

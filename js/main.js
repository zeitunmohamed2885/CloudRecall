
import { initNavigation } from "./navigation.js";

function initApp() {
  initNavigation();

  console.info("CloudRecall AI: Homepage initialized.");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp, {
    once: true,
  });
} else {
  initApp();
}


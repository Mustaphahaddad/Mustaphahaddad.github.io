window.theme = (() => {
  const storageKey = "theme";

  function getStoredTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  }

  function getSystemTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function getCurrentTheme() {
    return document.documentElement.getAttribute("data-theme") || getStoredTheme() || getSystemTheme();
  }

  function apply(theme) {
    const next = theme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem(storageKey, next);
    } catch {
    }
    return next;
  }

  function toggle() {
    return apply(getCurrentTheme() === "dark" ? "light" : "dark") === "dark";
  }

  function getIsDark() {
    return getCurrentTheme() === "dark";
  }

  return {
    apply,
    toggle,
    getIsDark
  };
})();

// File: wwwroot/js/meetingInterop.js

window.meetingInterop = (function () {
  let outsideHandler = null;

  // Anything inside these should NOT trigger "outside click" exit/save
  const INSIDE_EDIT_SELECTORS = [
    ".meeting-card",
    ".meeting-input-card",
    ".meeting-attendees",
    ".meeting-title-edit",
    ".meeting-delete-popup"
  ];

  function isInsideEditableArea(evt) {
    const t = evt.target;
    if (!t) return false;

    // composedPath is best (handles shadow dom / labels / inputs)
    const path = (typeof evt.composedPath === "function") ? evt.composedPath() : null;
    if (path && path.length) {
      for (const node of path) {
        if (node && node.closest) {
          for (const sel of INSIDE_EDIT_SELECTORS) {
            if (node.closest(sel)) return true;
          }
        }
      }
    }

    // fallback
    if (t.closest) {
      for (const sel of INSIDE_EDIT_SELECTORS) {
        if (t.closest(sel)) return true;
      }
    }

    return false;
  }

  function registerOutsideClick(dotNetRef, rootId) {
    // remove previous if any
    unregisterOutsideClick();

    outsideHandler = function (evt) {
      // Ignore right-click
      if (evt.button === 2) return;

      // If click is inside the editable UI, do nothing
      if (isInsideEditableArea(evt)) return;

      // Otherwise, treat it as outside-edit click
      dotNetRef.invokeMethodAsync("OnOutsideClick");
    };

    // Capture=true is OK now because we filter correctly
    document.addEventListener("pointerdown", outsideHandler, true);
  }

  function unregisterOutsideClick() {
    if (outsideHandler) {
      document.removeEventListener("pointerdown", outsideHandler, true);
      outsideHandler = null;
    }
  }

  function registerUndoShortcut(dotNetRef) {
    document.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        dotNetRef.invokeMethodAsync("OnUndoShortcut");
      }
    });
  }

  return {
    registerOutsideClick,
    unregisterOutsideClick,
    registerUndoShortcut
  };
})();

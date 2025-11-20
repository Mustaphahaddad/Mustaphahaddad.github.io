window.meetingInterop = (function () {
    let outsideHandler = null;
    let undoHandler = null;

    return {
        registerOutsideClick: function (dotNetRef, rootId) {
            if (outsideHandler) {
                document.removeEventListener('click', outsideHandler, true);
            }

            const safeSelectors = [
                '.meeting-card',
                '.meeting-input-card',
                '.attendee-item',
                '.attendee-item input[type="checkbox"]',
                '.meeting-title-edit',
                '.meeting-title-input',
                '.meeting-date-input'
            ].join(',');

            outsideHandler = function (ev) {
                let el = ev.target;

                if (!(el instanceof Element)) {
                    el = el.parentElement;
                }
                if (!el) return;

                if (el.closest(safeSelectors)) {
                    return;
                }

                dotNetRef.invokeMethodAsync('OnOutsideClick');
            };

            document.addEventListener('click', outsideHandler, true);
        },

        registerUndoShortcut: function (dotNetRef) {
            if (undoHandler) {
                document.removeEventListener('keydown', undoHandler);
            }

            undoHandler = function (ev) {
                if ((ev.ctrlKey || ev.metaKey) && ev.key === 'z') {
                    ev.preventDefault();
                    dotNetRef.invokeMethodAsync('OnUndoShortcut');
                }
            };

            document.addEventListener('keydown', undoHandler);
        },

        openDatePicker: function (element) {
            // element is the <input type="date"> coming from Blazor @ref
            if (!element) return;

            // Modern browsers (Chromium, Edge, recent Firefox mobile) support showPicker
            if (typeof element.showPicker === 'function') {
                element.showPicker();
            } else {
                // Fallback: focus + click
                element.focus();
                element.click();
            }
        }
    };
})();

window.appDateInput = window.appDateInput || {};

window.appDateInput.open = function (input) {
    if (!input) return;

    // Chrome/Edge support showPicker()
    if (typeof input.showPicker === "function") {
        input.showPicker();
    } else {
        // Fallback: focus the input (on some devices this will still show a picker)
        input.focus();
    }
};

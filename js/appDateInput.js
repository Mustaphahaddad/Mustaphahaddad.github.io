// wwwroot/js/appDateInput.js
window.appDateInput = {
    /**
     * Opens the browser's native date picker for the given <input type="date"> element.
     */
    open: function (element) {
        try {
            if (!element) {
                return;
            }

            // المتصفحات الحديثة (Chromium / Edge / بعض Safari) تدعم showPicker()
            if (typeof element.showPicker === "function") {
                element.showPicker();
            } else {
                // fallback: على الأقل فوكس + كليك
                element.focus();
                element.click();
            }
        } catch (err) {
            console.warn("appDateInput.open failed:", err);
        }
    }
};

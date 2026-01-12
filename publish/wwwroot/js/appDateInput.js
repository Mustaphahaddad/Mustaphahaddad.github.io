// wwwroot/js/appDateInput.js
window.appDateInput = {

    open: function (element) {
        try {
            if (!element) {
                return;
            }

            if (typeof element.showPicker === "function") {
                element.showPicker();
            } else {
                element.focus();
                element.click();
            }
        } catch (err) {
            console.warn("appDateInput.open failed:", err);
        }
    }
};


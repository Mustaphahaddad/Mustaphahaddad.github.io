
window.meetingInterop = (function () {
    let outsideHandler = null;

    function registerOutsideClick(dotNetRef, elementId) {

        if (outsideHandler) {
            document.removeEventListener("mousedown", outsideHandler);
            outsideHandler = null;
        }

        outsideHandler = function (e) {
            const root = document.getElementById(elementId);
            if (!root) {
                return;
            }

            if (root.contains(e.target)) {
                return;
            }

      
            dotNetRef.invokeMethodAsync("OnOutsideClick")
                .catch(err => {
                    console.warn("OnOutsideClick failed (probably disposed):", err);
                });
        };

        document.addEventListener("mousedown", outsideHandler);
    }

    function unregisterOutsideClick() {
        if (outsideHandler) {
            document.removeEventListener("mousedown", outsideHandler);
            outsideHandler = null;
        }
    }

  
    function registerUndoShortcut(dotNetRef) {
    
    }


    function openDatePicker(element) {
        try {
            if (element && typeof element.showPicker === "function") {
                element.showPicker();
            }
        } catch {
        }
    }

    return {
        registerOutsideClick,
        unregisterOutsideClick,
        registerUndoShortcut,
        openDatePicker
    };
})();

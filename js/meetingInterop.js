// File: wwwroot/js/meetingInterop.js

window.meetingInterop = (function () {
    let outsideHandler = null;
    let undoHandler = null;

    function registerOutsideClick(dotNetRef, elementId) {
        // Clean up any previous handler
        if (outsideHandler) {
            document.removeEventListener("mousedown", outsideHandler);
            outsideHandler = null;
        }

        outsideHandler = function (e) {
            const root = document.getElementById(elementId);
            if (!root) {
                return;
            }

            // If click is inside, ignore
            if (root.contains(e.target)) {
                return;
            }

            // Call into .NET – swallow errors if component was disposed
            dotNetRef
                .invokeMethodAsync("OnOutsideClick")
                .catch(err => {
                    console.warn(
                        "Outside click callback failed (probably disposed):",
                        err
                    );
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
        if (undoHandler) {
            document.removeEventListener("keydown", undoHandler);
            undoHandler = null;
        }

        undoHandler = function (e) {
            // Ctrl+Z or Cmd+Z
            if ((e.ctrlKey || e.metaKey) && e.key === "z") {
                dotNetRef
                    .invokeMethodAsync("OnUndoShortcut")
                    .catch(err => {
                        console.warn(
                            "Undo callback failed (probably disposed):",
                            err
                        );
                    });
            }
        };

        document.addEventListener("keydown", undoHandler);
    }

    function unregisterUndoShortcut() {
        if (undoHandler) {
            document.removeEventListener("keydown", undoHandler);
            undoHandler = null;
        }
    }

    return {
        registerOutsideClick,
        unregisterOutsideClick,
        registerUndoShortcut,
        unregisterUndoShortcut
    };
})();

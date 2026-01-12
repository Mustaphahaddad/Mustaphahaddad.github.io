// wwwroot/js/rowTooltip.js
window.rowTip = (function () {
    let tipEl = null;

    function ensureTooltip() {
        if (tipEl) {
            return tipEl;
        }

        // Try to find existing element
        tipEl = document.getElementById("row-tooltip");
        if (!tipEl) {
            tipEl = document.createElement("div");
            tipEl.id = "row-tooltip";
            tipEl.className = "row-tooltip";
            document.body.appendChild(tipEl);
        }
        return tipEl;
    }

    function show(html, clientX, clientY) {
        if (!html) {
            hide();
            return;
        }

        const el = ensureTooltip();

        // Inject HTML (نحتاج innerHTML عشان <br> و <span class="tt-deadline tt-blink"> يشتغلوا)
        el.innerHTML = html;

        // Position near mouse
        const margin = 12;
        let left = clientX + margin;
        let top = clientY + margin;

        // Force layout to get size
        el.style.opacity = "0";
        el.style.display = "block";

        const rect = el.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // If it goes out of screen on the right, put it to the left
        if (left + width + margin > vw) {
            left = clientX - width - margin;
        }
        // If out of bottom, move up
        if (top + height + margin > vh) {
            top = clientY - height - margin;
        }

        el.style.left = left + "px";
        el.style.top = top + "px";
        el.style.opacity = "1";
    }

    function hide() {
        if (!tipEl) return;
        tipEl.style.opacity = "0";
        // نتركه في DOM عشان نعيد استعماله، بس نخفيه
    }

    return {
        show,
        hide
    };
})();

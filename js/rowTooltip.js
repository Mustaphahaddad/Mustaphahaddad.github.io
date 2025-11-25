// wwwroot/js/rowTooltip.js
window.rowTip = (function () {
    let tipEl;

    function ensureTip() {
        if (tipEl) return tipEl;

        tipEl = document.createElement("div");
        tipEl.id = "row-tooltip";
        tipEl.className = "row-tooltip";
        tipEl.style.position = "fixed";
        tipEl.style.zIndex = "9999";
        tipEl.style.display = "none";

        document.body.appendChild(tipEl);
        return tipEl;
    }

    function positionTip(x, y) {
        const el = ensureTip();
        const padding = 12;

        // basic position near cursor
        let left = x + 16;
        let top = y + 16;

        const vw = window.innerWidth || document.documentElement.clientWidth;
        const vh = window.innerHeight || document.documentElement.clientHeight;

        // keep inside viewport
        const rect = el.getBoundingClientRect();
        if (left + rect.width + padding > vw) {
            left = vw - rect.width - padding;
        }
        if (top + rect.height + padding > vh) {
            top = vh - rect.height - padding;
        }

        el.style.left = left + "px";
        el.style.top = top + "px";
    }

    return {
        show: function (html, x, y) {
            const el = ensureTip();

            // 👇 المهم هنا: innerHTML وليس textContent
            el.innerHTML = html;

            el.style.display = "block";
            positionTip(x, y);
        },

        hide: function () {
            if (!tipEl) return;
            tipEl.style.display = "none";
        }
    };
})();

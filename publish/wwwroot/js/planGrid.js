(function () {
    window.planGrid = {
      getColumnIndex: function (gridId, clientX) {
        const grid = document.getElementById(gridId);
        if (!grid) return -1;
  
        const rect = grid.getBoundingClientRect();
        const x = clientX - rect.left;

        if (x < 0 || x > rect.width) return -1;
  
        let cols = parseInt(grid.getAttribute("data-cols"), 10);
        if (!cols || cols <= 0) {

          cols = grid.querySelectorAll(".day-bg").length || 1;
        }
  
        const colWidth = rect.width / cols;
        const index = Math.floor(x / colWidth) + 1;
  
        if (index < 1 || index > cols) return -1;
        return index;
      }
    };
  })();
  
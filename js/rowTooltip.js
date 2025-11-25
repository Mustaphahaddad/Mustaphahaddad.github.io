(function () {
  const ID = "row-tooltip";
  let el = null;

  function ensure() {
    if (el && document.body.contains(el)) return el;
    el = document.getElementById(ID);
    if (!el) {
      el = document.createElement("div");
      el.id = ID;
      el.setAttribute("role", "tooltip");
      el.style.position = "fixed";   
      el.style.zIndex = "9999";
      el.style.display = "none";    
      el.style.pointerEvents = "none";
      document.body.appendChild(el);
    }
    return el;
  }

  function show(text, x, y) {
    const tip = ensure();
    if (!text) { hide(); return; }


    tip.innerHTML = text;

    const offset = 14;
    tip.style.left = (x + offset) + "px";
    tip.style.top  = (y + offset) + "px";

  
    tip.style.display = "block";
    tip.classList.add("is-visible");
  }

  function hide() {
    const tip = ensure();
    tip.style.display = "none";
    tip.classList.remove("is-visible");
  }

  window.rowTip = { show, hide };
})();
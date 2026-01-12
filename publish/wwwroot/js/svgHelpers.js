//------------------svgHelpers.js--------------------------

window.svgHelpers = {
    getSvgPoint: function (svgElement, clientX, clientY) {
        const pt = svgElement.createSVGPoint();
        pt.x = clientX;
        pt.y = clientY;
        const svgP = pt.matrixTransform(svgElement.getScreenCTM().inverse());
        return { x: svgP.x, y: svgP.y };
    }
};
window.svgHelpers = window.svgHelpers || {};

window.svgHelpers.getSvgPoint = window.svgHelpers.getSvgPoint || function (svg, clientX, clientY) {
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const svgPt = pt.matrixTransform(svg.getScreenCTM().inverse());
    return { x: svgPt.x, y: svgPt.y };
};

window.svgHelpers.focusSvg = function (svgElement) {
    if (svgElement && typeof svgElement.focus === "function") {
        svgElement.focus();
    }
};
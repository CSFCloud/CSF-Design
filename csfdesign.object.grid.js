csfdesign.define("csf/event/gridresize", {
    require: [],
    on: "resize",
    condition: ".-event-grid-resize .block[data-csftheme-block-ratio]",
    process: function(n, b) {
        var r = b.getAttribute("data-csftheme-block-ratio");
        $(b).css("height", b.offsetWidth * r);
    }
});
csfdesign.define("csf/object/grid", {
    require: ["csf/event/gridresize"],
    condition: "csf-grid, .grid",
    process: function(n, e) {
        $(e).addClass("_grid");
        $(e).addClass("-event-grid-resize");
    }
});
csfdesign.define("csf/object/block", {
    require: [],
    condition: "csf-block, .block",
    process: function(n, e) {
        $(e).addClass("_grid-block");
    }
});
csfdesign.define("csf/object/wrapper", {
    require: [],
    condition: "csf-wrapper, .wrapper",
    process: function(n, e) {
        $(e).addClass("_grid-wrapper");
    }
});
csfdesign.define("csf/object/block/link", {
    require: [],
    condition: "._grid-block>a",
    process: function(n, e) {
        e.className = e.parentElement.className.replace("block", "");
        $(e).addClass("_block-a");
        $(e.parentElement).addClass("clickable");
    }
});
csfdesign.define("csf/object/card", {
    require: [],
    condition: "csf-card",
    process: function(n, e) {
        $(e).addClass("_grid-card");
    }
});

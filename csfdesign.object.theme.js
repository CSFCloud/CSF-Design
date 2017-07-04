csfdesign.define("csf/object/background", {
    require: [],
    condition: ".csftheme[data-csftheme-background]",
    process: function(n, e) {
        $(e).css("background-color", e.getAttribute("data-csftheme-background"));
        e.removeAttribute("data-csftheme-background");
    }
});
csfdesign.define("csf/object/color", {
    require: [],
    condition: ".csftheme[data-csftheme-color]",
    process: function(n, e) {
        $(e).css("color", e.getAttribute("data-csftheme-color"));
        e.removeAttribute("data-csftheme-color");
    }
});
csfdesign.define("csf/event/backgroundresize", {
    require: [],
    on: "resize",
    class: "-event-background-resize",
    process: function(n, e) {
        $(e).css("top", 0);
        $(e).css("left", 0);
        $(e).css("width", $(e.parentElement).innerWidth()+1 + "px");
        $(e).css("height", $(e.parentElement).innerHeight()+1 + "px");
    }
});
csfdesign.define("csf/object/triangle", {
    require: ["csf/event/backgroundresize"],
    condition: ".csftheme[data-csftheme-background-triangle]",
    process: function(n, e) {
        var width = 500;
        var height = 500;
        var cell_size = 200;
        var variance = 1;
        var x_colors = e.getAttribute("data-csftheme-background-triangle");

        if (e.hasAttribute("data-csftheme-background-triangle-size")) {
            var a = Number(e.getAttribute("data-csftheme-background-triangle-size"));
            if (a != NaN) {
                width = a;
                height = a;
            }
        }

        if (e.hasAttribute("data-csftheme-background-triangle-cellsize")) {
            var a = Number(e.getAttribute("data-csftheme-background-triangle-cellsize"));
            if (a != NaN) {
                cell_size = a;
            }
        }

        var pattern = Trianglify({
            width: width,
            height: height,
            cell_size: cell_size,
            variance: variance,
            x_colors: x_colors,
        });

        var bg = document.createElement("div");
        bg.className = "_bg -event-background-resize";
        $(bg).append(pattern.canvas());
        $(e).prepend(bg);

        e.removeAttribute("data-csftheme-background-triangle");
    }
});

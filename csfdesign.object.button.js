csfdesign.define("csf/object/button", {
    require: [],
    condition: "csf-button,.csftheme[data-csftheme-button-style]",
    process: function(n, e) {
        var style = "raised";
        if (e.hasAttribute("data-csftheme-button-style")) {
            style = e.getAttribute("data-csftheme-button-style");
        }
        var c = "#2196f3";
        if (e.hasAttribute("data-csftheme-button-color")) {
            c = e.getAttribute("data-csftheme-button-color");
        }
        if (style == "link") {
            var brd = document.createElement("div");
            brd.className = "_border";
            $(e).append(brd);
            $(e).css("color", c);
            $(e).addClass("_button-link");
        }
        if (style == "uwp") {
            $(e).addClass("_button-uwp");
        }
        if (style == "flat") {
            $(e).addClass("_button-flat");
            $(e).css("color", c);
        }
        if (style == "raised") {
            $(e).addClass("_button-raised");
            $(e).css("background-color", c);
        }
        e.removeAttribute("data-csftheme-button-style");
    }
});
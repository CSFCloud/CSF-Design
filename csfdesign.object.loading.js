csfdesign.define("csf/object/loader", {
    require: [],
    condition: "csf-loader",
    process: function(n, e) {
        var style = "winload";
        if (e.hasAttribute("data-csftheme-loading-style")) {
            style = e.getAttribute("data-csftheme-loading-style");
        }
        var c = "white";
        if (e.hasAttribute("data-csftheme-loading-color")) {
            c = e.getAttribute("data-csftheme-loading-color");
        }

        if (style == "winload") {
            $(e).addClass("_loading-win");
            $(e).html("");

            if (e.hasAttribute("data-csftheme-loading-small")) {
                $(e).addClass("_small");
            }

            for (var i = 0; i < 5; i++) {
                var div = document.createElement("div");
                div.className = "_loaderpoint";
                e.appendChild(div);

                var after = document.createElement("div");
                after.className = "_divafter";
                $(after).css("background-color", c);
                div.appendChild(after);
            }
        }

        e.removeAttribute("data-csftheme-loading-style");
    }
});

csfdesign.define("csf/function/flyout/show", {
    require: [],
    run: function(options) {
        if (typeof(options) == "undefined") {
            console.error("options needed");
            return;
        }
        if (typeof(options.id) == "undefined") {
            console.error("options.id needed");
            return;
        }
        if (typeof(options.target) == "undefined") {
            console.error("options.target needed");
            return;
        }
        var flyout = $(".-flyout-id-" + options.id);
        var container = $(".-flyout-container-" + options.id);
        var target = options.target;
        var viewportOffset = target.getBoundingClientRect();
        var top = viewportOffset.top;
        var left = viewportOffset.left;
        var ctwidth = container.innerWidth();
        var ctheight = container.innerHeight();

        container.removeClass("_hidden");
        container.addClass("_visible");

        left = Math.max(0, Math.min(left, ctwidth - flyout.outerWidth()));
        top = Math.max(0, Math.min(top, ctheight - flyout.outerHeight()));

        flyout.css("top", top);
        flyout.css("left", left);
    }
});
csfdesign.define("csf/function/flyout/hide", {
    require: [],
    run: function(options) {
        if (typeof(options) == "undefined") {
            console.error("options needed");
            return;
        }
        if (typeof(options.id) == "undefined") {
            console.error("options.id needed");
            return;
        }
        var container = $(".-flyout-container-" + options.id);
        $(container).removeClass("_visible");
        $(container).addClass("_hidden");
    }
});
csfdesign.define("csf/object/flyout", {
    require: ["csf/function/flyout/show", "csf/function/flyout/hide"],
    condition: "[data-csftheme-flyout]",
    process: function(n, e) {
        var id = e.getAttribute("data-csftheme-flyout");
        e.removeAttribute("data-csftheme-flyout");

        $(e).css("top", 0);
        $(e).css("left", 0);
        $(e).addClass("_flyout");
        $(e).addClass("-flyout-id-" + id);

        var cnt = document.createElement("div");
        cnt.className = "_flyout-container _hidden -flyout-container-" + id;
        $(cnt).on("click", csfflyout_clickhide);
        document.body.appendChild(cnt);
        $(e).appendTo(cnt);
    }
});

function csfflyout_clickhide() {
    if (!$(event.target).hasClass("_flyout-container")) {
        return;
    }
    $(this).removeClass("_visible");
    $(this).addClass("_hidden");
}

csfdesign.define("csf/event/header/scroll", {
    require: [],
    on: "scroll",
    class: "-event-header-scroll",
    process: function(n, e) {
        var scroll_top = $(window).scrollTop();
        var menu_title = $("._menu-title");
        if (scroll_top > 64) {
            $(e).addClass("-locked-top");
            menu_title.addClass("-locked-top");
        } else {
            $(e).removeClass("-locked-top");
            menu_title.removeClass("-locked-top");
        }
    }
});
csfdesign.define("csf/event/header/resize", {
    require: [],
    on: "resize",
    class: "-event-header-menu-resize",
    process: function(n, e) {

    }
});
csfdesign.define("csf/object/header", {
    require: ["csf/event/header/scroll", "csf/event/header/resize"],
    condition: "csf-header",
    process: function(n, e) {
        $(e).addClass("-event-header-scroll");
        $(e).addClass("_header");
        $(e).children("ul").each(function(n2, ul) {
            var menu = document.createElement("div");
            menu.className = "_header-menu -event-header-menu-resize";

            $(ul).children("li").each(function(n3, li) {
                var btn = document.createElement("a");
                btn.className = "_header-menu-button";
                btn.innerHTML = li.innerHTML;
                if (li.hasAttribute("onclick")) {
                    btn.setAttribute("onclick", li.getAttribute("onclick"));
                }
                if (li.hasAttribute("href")) {
                    btn.setAttribute("href", li.getAttribute("href"));
                }
                if (li.hasAttribute("data-onclick")) {
                    btn.setAttribute("onclick", li.getAttribute("data-onclick"));
                }
                if (li.hasAttribute("data-href")) {
                    btn.setAttribute("href", li.getAttribute("data-href"));
                }
                if (li.hasAttribute("data-id")) {
                    btn.setAttribute("id", li.getAttribute("data-id"));
                }
                menu.appendChild(btn);
            });

            e.appendChild(menu);
            $(ul).remove();
        });
    }
});

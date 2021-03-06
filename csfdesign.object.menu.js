csfdesign.define("csf/object/menu", {
    require: [],
    condition: "csf-menu",
    process: function(n, e) {
        var style = "slider";
        if (e.hasAttribute("data-csftheme-menu")) {
            style = e.getAttribute("data-csftheme-menu");
        }

        $(e).addClass("_menu-cover");
        $(e).addClass("_closed");
        $(e).addClass("_disable-select");

        if (style == "slider") {
            $(e).addClass("_menu-type-slider");
            if (e.hasAttribute("data-csftheme-menu-dark")) {
                e.removeAttribute("data-csftheme-menu-dark");
                $(e).addClass("_dark-menu");
            }
            if (e.hasAttribute("data-csftheme-menu-themecolor") || e.hasAttribute("data-csftheme-menu-gradient")) {
                $(e).addClass("_colored-menu");
            }
        } else if (style == "bubble") {
            $(e).addClass("_menu-type-bubble");
        }

        var slider = document.createElement("div");
        if (style == "slider") {
            slider.className = "_menu-slider";
            if (e.hasAttribute("data-csftheme-menu-themecolor")) {
                e.removeAttribute("data-csftheme-menu-themecolor");
                $(slider).css("background-color", csfdesign.getMainColor());
                // linear-gradient(45deg, #1686d9 0%, #8fd3c5 100%)
            }
            if (e.hasAttribute("data-csftheme-menu-gradient")) {
                var grad = e.getAttribute("data-csftheme-menu-gradient");
                e.removeAttribute("data-csftheme-menu-gradient");
                $(slider).css("background", grad);
                // linear-gradient(45deg, #1686d9 0%, #8fd3c5 100%)
            }
        } else if (style == "bubble") {
            slider.className = "_menu-fullscreen";
        }

        $(e).children(".menu-title").each(function(n, e) {
            var title = document.createElement("div");
            title.className = "_menu-title";
            title.innerHTML = e.innerHTML;
            slider.appendChild(title);

            var border = document.createElement("div");
            border.className = "_menu-title-border";
            slider.appendChild(border);
        });

        $(e).children("ul").each(function(n2, cat) {
            $(cat).children("li").each(function(n3, c) {
                var category = null;
                $(c).children("ul").each(function(n4, subcat) {
                    category = document.createElement("div");
                    category.className = "_menu-submenu _hidden _sumenu-id-" + n3;
                    if ($(subcat).hasClass("open")) {
                        $(category).removeClass("_hidden");
                    }
                    $(subcat).children("li").each(function(n5, sc) {
                        var btn = document.createElement("a");
                        btn.className = "_menu-button _submenu";
                        btn.innerHTML = sc.innerHTML;
                        if (sc.hasAttribute("onclick")) {
                            btn.setAttribute("onclick", sc.getAttribute("onclick"));
                        }
                        if (sc.hasAttribute("href")) {
                            btn.setAttribute("href", sc.getAttribute("href"));
                        }
                        if (sc.hasAttribute("data-onclick")) {
                            btn.setAttribute("onclick", sc.getAttribute("data-onclick"));
                        }
                        if (sc.hasAttribute("data-href")) {
                            btn.setAttribute("href", sc.getAttribute("data-href"));
                        }
                        category.appendChild(btn);
                    })
                });
                $(c).children("ul").remove();

                var btn = document.createElement("a");
                btn.className = "_menu-button";
                btn.innerHTML = c.innerHTML;
                if (c.hasAttribute("onclick")) {
                    btn.setAttribute("onclick", c.getAttribute("onclick"));
                }
                if (c.hasAttribute("href")) {
                    btn.setAttribute("href", c.getAttribute("href"));
                }
                if (c.hasAttribute("data-onclick")) {
                    btn.setAttribute("onclick", c.getAttribute("data-onclick"));
                }
                if (c.hasAttribute("data-href")) {
                    btn.setAttribute("href", c.getAttribute("data-href"));
                }
                if ($(c).hasClass("selected")) {
                    $(btn).addClass("_menu-button-selected");
                }
                slider.appendChild(btn);

                if (category !== null) {
                    btn.setAttribute("onclick", "csfmenu_toggleSubmenu("+n3+")");
                    slider.appendChild(category);
                }
            });
        });

        e.innerHTML = "";

        var bg = document.createElement("div");
        bg.className = "_bg _menu-background";
        bg.onclick = csfmenu_toggleslider;
        if (e.hasAttribute("data-csftheme-menu-background")) {
            $(bg).css("background-color", e.getAttribute("data-csftheme-menu-background"));
        } else {
            if (style == "bubble") {
                $(bg).css("background-color", csfdesign.getMainColor());
            }
        }
        $(e).prepend(bg);

        e.appendChild(slider);

        var hamburger = document.createElement("button");
        hamburger.className = "_hamburger-button";
        hamburger.onclick = csfmenu_toggleslider;
        //document.body.appendChild(hamburger);

        for (var i = 0; i < 3; i++) {
            var spn = document.createElement("span");
            hamburger.appendChild(spn);
        }

        if ($("csf-header").hasClass("light")) {
            $(hamburger).addClass("_black-lines");
        }

        //$("csf-header").append(hamburger);
        $(document.body).append(hamburger);
    }
});

function csfmenu_toggleSubmenu(id) {
    $("._sumenu-id-" + id).toggleClass("_hidden");
}

function csfmenu_toggleslider() {
    $("._menu-cover").each(function(n, e) {
        if ($(e).hasClass("_closed")) {
            $(e).addClass("_opening");
            $(e).removeClass("_closed");

            $("._hamburger-button").addClass("_open");

            window.setTimeout(function() {
                $(e).addClass("_open");
                $(e).removeClass("_opening");
            }, 10);
        } else if ($(e).hasClass("_open")) {
            $(e).removeClass("_open");
            $(e).addClass("_closing");

            $("._hamburger-button").removeClass("_open");

            window.setTimeout(function() {
                $(e).addClass("_closed");
                $(e).removeClass("_closing");
            }, 400);
        }
    });
}

csfdesign.define("csf/event/menu/scroll", {
    require: [],
    on: "scroll",
    run: csfmenu_resize
});

function csfmenu_resize() {
    var menu_title = $("._menu-title");
    var header_bar = $("._header");

    if (menu_title.length > 0 && header_bar.length > 0) {
        menu_title.css("height", header_bar.height() + "px");
    }
}

csfdesign.define("csf/event/screencenter", {
    require: [],
    on: "resize",
    class: "-event-screen-center",
    process: function(n, e) {
        var pt = e.parentElement;
        $(e).css("left", (pt.offsetWidth - e.offsetWidth) / 2);
        $(e).css("top", (pt.offsetHeight - e.offsetHeight) / 2);
    }
});
csfdesign.define("csf/function/dialog/close", {
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
        var container = $(".-dialog-container-" + options.id);
        $(container).removeClass("_visible");
        $(container).addClass("_hidden");
    }
});
csfdesign.define("csf/function/dialog/open", {
    require: ["csf/function/dialog/close"],
    run: function(options) {
        if (typeof(options) == "undefined") {
            console.error("options needed");
            return;
        }
        if (typeof(options.id) == "undefined") {
            console.error("options.id needed");
            return;
        }
        var dialog = $(".-dialog-id-" + options.id);
        var container = $(".-dialog-container-" + options.id);

        dialog.find("._dialog-button-container").html("");
        if (typeof(options.buttons) == "object") {
            for (var i = 0; i < options.buttons.length; i++) {
                var b = options.buttons[i];
                if (typeof(b.title) == "string" && (typeof(b.onclick) == "string" || typeof(b.onclick) == "function")) {
                    var btn = document.createElement("button");
                    btn.innerHTML = b.title;
                    btn.className = "_dialog-button";
                    dialog.find("._dialog-button-container").append(btn);
                    if (typeof(b.onclick) == "function") {
                        btn.onclick = b.onclick;
                    } else {
                        if (b.onclick == "close_dialog") {
                            //btn.onclick = "csfdesign.closeDialog({id: '"+options.id+"'})";
                            btn.onclick = function() {
                                csfdesign.call("csf/function/dialog/close", {
                                    id: options.id
                                });
                            }
                        }
                    }
                    if (typeof(b.color) == "string") {
                        $(btn).css("color", b.color);
                    }
                }
            }
        }

        if (typeof(options.width) == "number") {
            $(dialog).css("width", options.width + "px");
        } else {
            $(dialog).css("width", "");
        }

        if (typeof(options.height) == "number") {
            $(dialog).css("height", options.height + "px");
        } else {
            $(dialog).css("height", "");
        }

        container.removeClass("_hidden");
        container.addClass("_visible");

        csfdesign.update("all");
    }
});
csfdesign.define("csf/object/dialog", {
    require: ["csf/event/screencenter", "csf/function/dialog/open", "csf/function/dialog/close"],
    condition: "[data-csftheme-dialog]",
    process: function(n, e) {
        var id = e.getAttribute("data-csftheme-dialog");
        e.removeAttribute("data-csftheme-dialog");

        $(e).addClass("_dialog");
        $(e).addClass("-dialog-id-" + id);
        $(e).addClass("-event-screen-center");

        var cnt = document.createElement("div");
        cnt.className = "_dialog-container _hidden -dialog-container-" + id;
        document.body.appendChild(cnt);
        $(e).appendTo(cnt);

        var buttons = document.createElement("div");
        buttons.className = "_dialog-button-container";
        $(e).append(buttons);

        if (e.hasAttribute("data-csftheme-dialog-title")) {
            var title = document.createElement("h2");
            title.className = "_dialog-title";
            title.innerHTML = e.getAttribute("data-csftheme-dialog-title");
            e.removeAttribute("data-csftheme-dialog-title");
            $(e).prepend(title);
        }
    }
});

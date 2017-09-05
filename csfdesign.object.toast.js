csfdesign.define("csf/function/toast/hide", {
    require: [],
    run: function(obj) {
        $(obj).addClass("_closing");
        window.setTimeout(function() {
            $(obj).remove();
        }, 400);
    }
})
csfdesign.define("csf/function/toast/show", {
    require: ["csf/function/toast/hide"],
    run: function(options) {
        if (typeof(options) == "undefined") {
            console.error("options needed");
            return;
        }
        if (typeof(options.text) != "string") {
            console.error("options.text needed");
            return;
        }
        if ($("._toast-container").length == 0) {
            var cnt = document.createElement("div");
            $(cnt).addClass("_toast-container");
            document.body.appendChild(cnt);
        }
        var cnt = $("._toast-container");

        var toast = document.createElement("div");
        $(toast).addClass("_toast");
        toast.innerHTML = options.text;
        cnt.append(toast);

        var hide_time = 1000;
        if (typeof(options.hide) == "number") {
            hide_time = options.hide;
        }
        if (options.hide !== false) {
            window.setTimeout(function() {
                csfdesign.call("csf/function/toast/hide", toast);
            }, hide_time);
        }

        if (typeof(options.buttons) == "object") {
            for (var i = 0; i < options.buttons.length; i++) {
                var b = options.buttons[i];
                if (typeof(b.title) == "string" && (typeof(b.onclick) == "string" || typeof(b.onclick) == "function")) {
                    var btn = document.createElement("button");
                    btn.className = "_dialog-button";
                    btn.innerHTML = b.title;
                    if (typeof(b.onclick) == "function") {
                        btn.onclick = function() {
                            b.onclick(toast)
                        };
                    } else {
                        if (b.onclick == "dismiss") {
                            btn.onclick = function() {
                                csfdesign.call("csf/function/toast/hide", toast);
                            }
                        }
                    }
                    $(toast).append(btn);
                }
            }
        }
    }
});

csfdesign.define("csf/object/bubble_effect", {
    require: [],
    condition: "csf-button,.csftheme[data-csftheme-button-style],.csf-bubble",
    process: function(n, e) {
        $(e).css("position", "relative");

        var overlay = document.createElement("div");
        overlay.className = "_csf-bubble-overlay";
        $(overlay).css("position", "absolute");
        $(overlay).css("top", "0");
        $(overlay).css("left", "0");
        $(overlay).css("width", "100%");
        $(overlay).css("height", "100%");
        $(overlay).css("overflow", "hidden");
        $(e).append(overlay);

        $(overlay).on("mousedown", csfeffect_bubble_mouse_down);
        $(overlay).on("mouseup", csfeffect_bubble_mouse_up);
        $(overlay).on("mouseleave", csfeffect_bubble_mouse_up);
    }
});

function csfeffect_bubble_mouse_down(event) {
    if (event.target.className != "_csf-bubble-overlay") {
        return;
    }

    var posX = $(this).offset().left,
        posY = $(this).offset().top;

    var bubble = document.createElement("div");
    bubble.className = "_csf-bubble-bubble";
    $(bubble).css("position", "absolute");
    $(bubble).css("left", (event.pageX - posX) + "px");
    $(bubble).css("top", (event.pageY - posY) + "px");
    $(bubble).css("width", "0px");
    $(bubble).css("height", "0px");
    $(bubble).css("margin", "0px");
    $(bubble).css("padding", "0px");
    $(bubble).css("border-radius", "100%");
    $(bubble).css("background-color", "white");
    $(bubble).css("opacity", "0.3");
    $(bubble).css("transition", "width 0.8s, height 0.8s, margin 0.8s, opacity 0.8s");
    $(event.target).append(bubble);

    window.setTimeout(function () {
        var sugar = Math.sqrt(event.target.offsetWidth * event.target.offsetWidth + event.target.offsetHeight * event.target.offsetHeight) * 2;
        $(bubble).css("width", sugar + "px");
        $(bubble).css("height", sugar + "px");
        $(bubble).css("margin-left", "-"+(sugar/2)+"px");
        $(bubble).css("margin-top", "-"+(sugar/2)+"px");
    }, 1);
}

function csfeffect_bubble_mouse_up(event) {
    var remove = function(pr) {
        pr.css("opacity", "0");
        window.setTimeout(function () {
            pr.remove();
        }, 800);
    }

    if (event.target.className == "_csf-bubble-overlay") {
        remove($(event.target).find("._csf-bubble-bubble"));
    }
    if (event.target.className == "_csf-bubble-bubble") {
        remove($(event.target));
    }
}

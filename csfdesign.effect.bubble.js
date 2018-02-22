csfdesign.define("csf/object/bubble_effect", {
    require: [],
    condition: "csf-button,.csftheme[data-csftheme-button-style],.csf-bubble",
    process: function(n, e) {
        /*$(e).css("position", "relative");

        var overlay = document.createElement("div");
        overlay.className = "_csf-bubble-overlay";
        $(e).append(overlay);

        var bubble = document.createElement("div");
        bubble.className = "_csf-bubble-bubble";
        $(overlay).append(bubble);

        overlay.addEventListener("mousedown", csfeffect_bubble_mouse_down);
        overlay.addEventListener("mouseup", csfeffect_bubble_mouse_up);
        overlay.addEventListener("mouseleave", csfeffect_bubble_mouse_up);*/
    }
});

function csfeffect_bubble_mouse_down(event) {
    console.log("OnMouseDown", event);

    if (event.target.className == "_csf-bubble-overlay") {
        var posX = $(this).offset().left,
            posY = $(this).offset().top;

        var target = event.target;
        var radius = Math.sqrt(target.offsetWidth * target.offsetWidth + target.offsetHeight * target.offsetHeight) * 2;

        var bubble = $(event.target).find("._csf-bubble-bubble");
        bubble.css("left", (event.pageX - posX) + "px");
        bubble.css("top", (event.pageY - posY) + "px");
        bubble.addClass("_animate");
    }
}

function csfeffect_bubble_mouse_up(event) {
    var remove = function(pr) {
        pr.removeClass("_animate");
        /*pr.css("opacity", "0");
        window.setTimeout(function () {
            pr.removeClass("_animate");
        }, 800);*/
    }

    console.log("OnMouseUp", event);

    var tar = $(event.target);

    if (tar.hasClass("_csf-bubble-overlay")) {
        console.log("Overlay");
        remove($(event.target).find("._csf-bubble-bubble"));
    }
    if (tar.hasClass("_csf-bubble-bubble")) {
        console.log("Bubble");
        remove($(event.target));
    }
}

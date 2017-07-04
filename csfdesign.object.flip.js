csfdesign.define("csf/object/flipbox", {
    require: [],
    condition: "csf-flipview",
    process: function(n, e) {
        $(e).addClass("_flipview-container");
        if (e.hasAttribute("width")) {
            $(e).css("width", e.getAttribute("width") + "px");
            e.removeAttribute("width");
        } else {
            $(e).css("width", "100%");
        }
        if (e.hasAttribute("height")) {
            $(e).css("width", e.getAttribute("height") + "px");
            e.removeAttribute("height");
        } else {
            $(e).css("height", "500px");
        }

        $(e).children("csf-flippage").each(function(n2, e2) {
            if (n2 == 0) {
                $(e2).addClass("_visible");
            }
        });

        var left = document.createElement("div");
        left.className = "_flipview-button _left";
        left.innerHTML = "&#xE012;";
        left.onclick = function() {
            csfflipview_change(e, -1);
        };
        $(e).append(left);

        var right = document.createElement("div");
        right.className = "_flipview-button _right";
        right.innerHTML = "&#xE013;";
        right.onclick = function() {
            csfflipview_change(e, 1);
        };
        $(e).append(right);

        csfflipview_change(e, 0);
    }
});

function csfflipview_change(fctn, dir) {
    var current = 0;
    var max = -1;
    $(fctn).children("csf-flippage").each(function(n2, e2) {
        if ($(e2).hasClass("_visible")) {
            current = n2;
        }
        max = n2;
    });

    var endless = $(fctn).hasClass("_endless");

    console.log(current);
    if (endless) {
        current += dir;
        console.log(current);
        while (current < 0) {
            current += (max+1);
        }
        console.log(current);
        while (current > max) {
            current -= (max+1);
        }
        console.log(current);
    } else {
        current = Math.max(0, Math.min(max, current + dir));
    }
    console.log(current);

    $(fctn).children("csf-flippage").each(function(n2, e2) {
        if (n2 == current) {
            $(e2).addClass("_visible");
        } else {
            $(e2).removeClass("_visible");
        }
    });

    if (current <= 0 && !endless) {
        $(fctn).find("._flipview-button._left").hide();
    } else {
        $(fctn).find("._flipview-button._left").show();
    }

    if (current >= max && !endless) {
        $(fctn).find("._flipview-button._right").hide();
    } else {
        $(fctn).find("._flipview-button._right").show();
    }
}

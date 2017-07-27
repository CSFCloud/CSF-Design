csfdesign.define("csf/object/background", {
    require: [],
    condition: "[data-csftheme-background]",
    process: function(n, e) {
        $(e).css("background-color", e.getAttribute("data-csftheme-background"));
        e.removeAttribute("data-csftheme-background");
    }
});
csfdesign.define("csf/object/color", {
    require: [],
    condition: ".csftheme[data-csftheme-color]",
    process: function(n, e) {
        $(e).css("color", e.getAttribute("data-csftheme-color"));
        e.removeAttribute("data-csftheme-color");
    }
});
csfdesign.define("csf/event/backgroundresize", {
    require: [],
    on: "resize",
    class: "-event-background-resize",
    process: function(n, e) {
        $(e).css("top", 0);
        $(e).css("left", 0);
        $(e).css("width", $(e.parentElement).innerWidth()+1 + "px");
        $(e).css("height", $(e.parentElement).innerHeight()+1 + "px");
    }
});
csfdesign.define("csf/object/triangle", {
    require: ["csf/event/backgroundresize"],
    condition: "[data-csftheme-background-triangle]",
    process: function(n, e) {
        var width = 500;
        var height = 500;
        var cell_size = 200;
        var variance = 1;
        var x_colors = e.getAttribute("data-csftheme-background-triangle");

        if (e.hasAttribute("data-csftheme-background-triangle-size")) {
            var a = Number(e.getAttribute("data-csftheme-background-triangle-size"));
            if (a != NaN) {
                width = a;
                height = a;
            }
            e.removeAttribute("data-csftheme-background-triangle-size");
        }

        if (e.hasAttribute("data-csftheme-background-triangle-cellsize")) {
            var a = Number(e.getAttribute("data-csftheme-background-triangle-cellsize"));
            if (a != NaN) {
                cell_size = a;
            }
            e.removeAttribute("data-csftheme-background-triangle-cellsize");
        }

        var pattern = Trianglify({
            width: width,
            height: height,
            cell_size: cell_size,
            variance: variance,
            x_colors: x_colors,
        });

        var bg = document.createElement("div");
        bg.className = "_bg -event-background-resize";
        $(bg).append(pattern.canvas());
        $(e).prepend(bg);

        e.removeAttribute("data-csftheme-background-triangle");
    }
});
csfdesign.define("csf/event/acrylicresize", {
    require: [],
    on: "resize",
    class: "-event-acrylic-background-resize",
    process: function(n, e) {
        /*var id = e.getAttribute("data-acrylic-id");

        var ths = $(".acrylicthis-" + id)[0];

        console.log(ths);

        var poffs = $(ths.parentElement).offset();
        var offs = $(ths).offset();

        $(e).css("top", (offs.top - poffs.top) + "px");
        $(e).css("left", (offs.left - poffs.left) + "px");
        $(e).css("width", ths.offsetWidth + "px");
        $(e).css("height", ths.offsetHeight + "px");*/

        /*var canvas = $(".acryliccanvas-" + id)[0];
        $(canvas).hide();

        html2canvas(ths.parentElement, {
            onrendered: function(newcanvas) {
                newcanvas.style = canvas.style;
                newcanvas.className = canvas.className;
                canvas.parentElement.appendChild(newcanvas);
                $(canvas).remove();
            }
        });*/
    }
});
csfdesign.define("csf/object/acrylic", {
    require: ["csf/event/acrylicresize"],
    condition: "[data-csftheme-background-acrylic]",
    process: function(n, e) {

        html2canvas(e.parentElement, {
            onrendered: function(canvas) {
                var id = csfdesign.uuid();

                var prt = e.parentElement;

                var poffs = $(prt).offset();
                var offs = $(e).offset();

                var cnt = document.createElement("div");
                cnt.className = "_background-container -event-acrylic-background-resize";
                $(cnt).css("top", (offs.top - poffs.top) + "px");
                $(cnt).css("left", (offs.left - poffs.left) + "px");
                $(cnt).css("width", e.offsetWidth + "px");
                $(cnt).css("height", e.offsetHeight + "px");
                $(prt).prepend(cnt);

                $(cnt).addClass("acryliccnt-"+id);
                cnt.setAttribute("data-acrylic-id", id);
                $(e).addClass("acrylicthis-"+id);
                $(canvas).addClass("acryliccanvas-"+id);

                cnt.appendChild(canvas);
                canvas.className = "_background-acrylic";

                $(canvas).css("top", -(offs.top - poffs.top) + "px");
                $(canvas).css("left", -(offs.left - poffs.left) + "px");
                $(canvas).css("width", prt.offsetWidth + "px");
                $(canvas).css("height", prt.offsetHeight + "px");
            }
        });

        e.removeAttribute("data-csftheme-background-acrylic");
    }
});

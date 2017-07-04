csfdesign.define("csf/event/icon/resize", {
    require: [],
    on: "resize",
    class: "-event-icon-size-update",
    process: function(n, e) {
        var style = window.getComputedStyle(e.parentElement, null).getPropertyValue('font-size');
        var fontSize = parseFloat(style);
        $(e).css("width", fontSize + "px");
        $(e).css("height", fontSize + "px");
    }
});
csfdesign.define("csf/object/icon", {
    require: ["csf/event/icon/resize"],
    condition: "span.icon",
    process: function(n, e) {
        var iconcode = e.innerHTML;
        var style = window.getComputedStyle(e.parentElement, null).getPropertyValue('font-size');
        var fontSize = parseFloat(style);
        $(e).css("width", fontSize + "px");
        $(e).css("height", fontSize + "px");

        if (iconcode.length == 1) {
            $(e).addClass("_icon-char -event-icon-size-update");
        } else {
            $(e).addClass("_icon-img -event-icon-size-update");
            $(e).html("");
            $(e).css("background-image", "url('https://design.csfcloud.com/icon/"+iconcode+".png')");
        }
        $(e).removeClass("icon");
    }
});

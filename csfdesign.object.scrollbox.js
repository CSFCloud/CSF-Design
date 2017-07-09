csfdesign.define("csf/object/scrollbox", {
    require: [],
    condition: "csf-scrollbox",
    process: function(n, e) {
        $(e).addClass("_scrollbox");
        $(e).children("csf-scrollbox-header").addClass("_scrollbox-header");
        $(e).children("csf-scrollbox-header").css("top", 0);

        e.setAttribute("lastscrollpos", 0);
        $(e).on("scroll", csfscrollbox_scroll);
    }
});

function csfscrollbox_scroll() {
    var lastscroll = this.getAttribute("lastscrollpos");
    var scrollnow = $(this).scrollTop();

    var header = $(this).children("._scrollbox-header");

    if (scrollnow > lastscroll) {
        // down
        header.css("position", "absolute");
    } else {
        // up
        header.css("position", "sticky");
    }

    //header.css("top", scrollnow);

    this.setAttribute("lastscrollpos", scrollnow);
}

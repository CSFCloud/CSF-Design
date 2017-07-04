csfdesign.define("csf/object/list", {
    require: [],
    condition: "csf-list",
    process: function(n, e) {
        $(e).addClass("_list-container");
        $(e).children("li").each(function(n2, l) {
            $(l).addClass("_list-element");
        });
    }
});

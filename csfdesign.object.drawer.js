csfdesign.define("csf/object/drawer", {
    require: [],
    condition: ".drawer, csf-drawer",
    process: function(n, e) {
        $(e).removeClass("drawer");
        $(e).addClass("_drawer");
    }
});

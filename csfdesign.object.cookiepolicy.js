csfdesign.define("csf/function/cookie/show", {
    require: [],
    run: function(options) {
        if (typeof(options) == "undefined") {
            console.error("options needed");
            return;
        }
        if (typeof(options.text) != "string") {
            options.text = "This website uses cookies to ensure you get the best experience on our website.";
        }

        var dtn = csfcookiepolicy_get_cookie("csf-cookie");
        if (dtn !== "accepted") {
            console.log("Showing cookie consent...");
            csfdesign.call("csf/function/toast/show", {
                text: options.text,
                hide: false,
                buttons: [
                    {
                        title: "OK",
                        onclick: function(toast) {
                            csfdesign.call("csf/function/toast/hide", toast);
                            csfcookiepolicy_set_cookie("csf-cookie", "accepted");
                        }
                    }
                ]
            });
        } else {
            console.log("Cookie policy accepted!");
        }
    }
});

function csfcookiepolicy_get_cookie(key) {
    var name = key + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return null;
}

function csfcookiepolicy_set_cookie(key, data) {
    var d = new Date();
    d.setTime(d.getTime() + (365*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = ""+key+"="+data+";"+expires+"";
}

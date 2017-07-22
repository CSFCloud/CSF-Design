"use strict";
class CSFDesign {
    constructor () {
        this.objects = [];
        this.events = [];
        this.functions = [];
        this.debug = false;
        this.maincolor = "#2196f3";
    }

    valid(d, t) {
        if (typeof(t) == "undefined") {
            return (typeof(d) != "undefined");
        } else if (typeof(t) == "string") {
            return (typeof(d) == t);
        } else if (typeof(d) == "object") {
            return (typeof(d) in t);
        } else {
            return false;
        }
    }

    define(name, data) {
        //console.log("defining " + name);
        if (!this.valid(name) || !this.valid(data) || !this.valid(data.require)) {
            console.error("Nat valid parameters");
            return;
        }
        var namedata = name.split("/");
        if (namedata.length < 3) {
            console.error("Nat valid name");
            return;
        }

        for (var i = 0; i < data.require.length; i++) {
            var rname = data.require[i];
            var rnamedata = rname.split("/");
            if (rnamedata.length < 3) {
                console.error("Invalid requirement name: " + rname);
                return;
            }
            if (rnamedata[1] == "object") {
                if (!this.valid(this.objects[rname], "object")) {
                    console.error("Requirement not found: " + rname);
                    return;
                }
            } else if (rnamedata[1] == "event") {
                if (!this.valid(this.events[rname], "object")) {
                    console.error("Requirement not found: " + rname);
                    return;
                }
            } else if (rnamedata[1] == "function") {
                if (!this.valid(this.functions[rname], "object")) {
                    console.error("Requirement not found: " + rname);
                    return;
                }
            } else {
                console.error("Requirement not found: " + rname);
                return;
            }
        }

        if (namedata[1] == "object") {
            this.objects[name] = data;
        } else if (namedata[1] == "event") {
            this.events[name] = data;
        } else if (namedata[1] == "function") {
            this.functions[name] = data;
        }
        //console.log("new definition: " + name);
    }

    loadPage() {
        for (var index in this.objects){
            var current = this.objects[index];
            try {
                if (this.valid(current.load, "function")) {
                    current.load();
                }
            } catch (e) {
                console.log("Error found in " + index + ": " + e);
            }
        }
        this.scan(document.body.parentElement);
    }

    scan(dom) {
        console.log("loading page");
        for (var index in this.objects){
            var current = this.objects[index];
            try {
                if (this.valid(current.condition, "string") && this.valid(current.process, "function")) {
                    $(dom).find(current.condition).each(current.process);
                }
            } catch (e) {
                console.log("Error found in " + index + ": " + e);
            }
        }
    }

    uuid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    call() {
        if (arguments.length < 1) {
            console.error("Not enought arguments");
            return;
        }
        var name = arguments[0];
        if (!this.valid(this.functions[name])) {
            console.error("Not valid function: " + name);
            return;
        }
        var newargs = [];
        for (var i = 1; i < arguments.length; i++) {
            newargs[i - 1] = arguments[i];
        }
        if (this.valid(this.functions[name].run, "function")) {
            this.functions[name].run.apply(this, newargs);
        }
    }

    update(on) {
        if (typeof(on) == "undefined") {
            on = "all";
        }
        for (var index in this.events) {
            var current = this.events[index];
            try {
                if (current.on == on || (on == "all" && (current.on == "resize" || current.on == "scroll"))) {
                    if (this.valid(current.run, "function")) {
                        current.run();
                    }
                    if (this.valid(current.class, "string") && this.valid(current.process, "function")) {
                        $("."+current.class).each(current.process);
                    }
                    if (this.valid(current.condition, "string") && this.valid(current.process, "function")) {
                        $(current.condition).each(current.process);
                    }
                }
            } catch (e) {
                console.log("Error found in " + index + ": " + e);
            }
        }
    }

    getMainColor() {
        return this.maincolor;
    }

    setMainColor(clr) {
        this.maincolor = clr;
    }
}

window.csfdesign = new CSFDesign();
$(function() {
    $(document.body).addClass("_js-enabled");

    csfdesign.loadPage();

    window.csfdesign.update("ready");

    $(window).on("resize", function() {
        window.csfdesign.update("resize");
    });

    $(window).on("scroll", function() {
        window.csfdesign.update("scroll");
    });

    $(window).on("load ready", function() {
        window.csfdesign.update();

        window.setTimeout(function() {
            window.csfdesign.update();
            window.csfdesign.update("resize");
        }, 1000);

        $(document.body).addClass("_page-loaded");
    });
});

window.onload = function () {
    window.csfdesign.update("onload");
}

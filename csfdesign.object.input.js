csfdesign.define("csf/object/input", {
    require: [],
    condition: "input.csftheme[type!='submit'][type!='reset']",
    process: function(n, e) {
        var id = csfdesign.uuid();
        var c = "#2196f3";
        if (e.hasAttribute("data-csftheme-input-color")) {
            c = e.getAttribute("data-csftheme-input-color");
        }
        var cnt = document.createElement("div");
        cnt.className = "_input-container";
        $(cnt).addClass("inputcontainer_" + id);
        $(cnt).css("width", Math.max(e.offsetWidth, 200) + "px");
        $(cnt).css("color", c);
        $(cnt).css("border-color", c);

        var inp = document.createElement("input");
        inp.type = e.type;
        inp.id = "input_" + id;
        var INPUT_ID = "input_" + id;
        inp.setAttribute("data-csf-input-id", "input_" + id);
        if (typeof(e.id) !== undefined && e.id != "") {inp.id = e.id; INPUT_ID = e.id;};
        if (typeof(e.name) !== undefined) {inp.name = e.name;}
        if (typeof(e.value) !== undefined) {inp.value = e.value;}
        if (typeof(e.checked) !== undefined) {inp.checked = e.checked;}
        if (e.disabled === true) {
            $(cnt).addClass("_disabled");
            inp.disabled = true;
        }
        if (e.readOnly === true) {
            $(cnt).addClass("_disabled");
            inp.readOnly = true;
        }
        cnt.appendChild(inp);
        e.parentElement.insertBefore(cnt, e);

        if (e.type == "text" || e.type == "number" || e.type == "email") {
            inp.className = "_input";

            var lab = document.createElement("label");
            lab.className = "_input_label";
            $(lab).addClass("inputlabel_" + id);
            lab.htmlFor = INPUT_ID;
            cnt.appendChild(lab);
            if (e.hasAttribute("placeholder")) {
                lab.innerHTML = e.getAttribute("placeholder");
            }
            if (e.hasAttribute("data-placeholder")) {
                lab.innerHTML = e.getAttribute("data-placeholder");
            }

            $(inp).on("ready click keyup change focus focusout", csfinputs_textinputchange);
            csfinputs_textinputchange(inp);
        } else if (e.type == "checkbox") {
            inp.className = "_checkbox";

            var box = document.createElement("div");
            box.setAttribute("data-csf-input-id", "checkbox_" + id);
            box.className = "_checkbox-box";
            cnt.appendChild(box);

            var lab = document.createElement("label");
            lab.className = "_checkbox-label";
            $(lab).addClass("checkboxlabel_" + id);
            lab.htmlFor = INPUT_ID;
            cnt.appendChild(lab);
            if (e.hasAttribute("placeholder")) {
                lab.innerHTML = e.getAttribute("placeholder");
            }
            if (e.hasAttribute("data-placeholder")) {
                lab.innerHTML = e.getAttribute("data-placeholder");
            }

            var tick = document.createElement("div");
            tick.className = "_checkbox-tick tick_" + id;
            cnt.appendChild(tick);

            var boxbehind = document.createElement("div");
            boxbehind.className = "_checkbox-bg bg_" + id;
            $(boxbehind).css("background-color", c);
            cnt.appendChild(boxbehind);

            $(inp).on("change", csfinputs_checkboxchange);
            $(box).on("ready click", csfinputs_checkboxclick);
            csfinputs_checkboxchange(inp);
        } else if (e.type == "radio") {
            inp.className = "_radio";

            var box = document.createElement("div");
            box.setAttribute("data-csf-input-id", "radio_" + id);
            box.className = "_radio-box";
            cnt.appendChild(box);

            var lab = document.createElement("label");
            lab.className = "_radio-label";
            $(lab).addClass("radiolabel_" + id);
            lab.htmlFor = INPUT_ID;
            cnt.appendChild(lab);
            if (e.hasAttribute("placeholder")) {
                lab.innerHTML = e.getAttribute("placeholder");
            }
            if (e.hasAttribute("data-placeholder")) {
                lab.innerHTML = e.getAttribute("data-placeholder");
            }


            var boxbehind = document.createElement("div");
            boxbehind.className = "_radio-bg bg_" + id;
            $(boxbehind).css("background-color", c);
            cnt.appendChild(boxbehind);

            $(inp).change(csfinputs_checkboxchange);
            $(box).on("ready click", csfinputs_radioclick);
            csfinputs_checkboxchange(inp);
        } else if (e.type == "chips") {

        }
        $(e).remove();
    }
});
csfdesign.define("csf/object/textarea", {
    require: [],
    condition: "textarea",
    process: function(n, e) {
        $(e).addClass("_textarea");
    }
});

function csfinputs_textinputchange(obj) {
    if (typeof(obj) == "undefined" || typeof(obj.getAttribute) == "undefined") {
        obj = this;
    }
    var uuid = obj.getAttribute("data-csf-input-id").split("_")[1];
    if ($(obj).val() != "") {
        $(".inputcontainer_" + uuid).addClass("_not-empty");
    } else {
        $(".inputcontainer_" + uuid).removeClass("_not-empty");
    }
    if ($(obj).is(':focus')) {
        $(".inputcontainer_" + uuid).addClass("_focus");
    } else {
        $(".inputcontainer_" + uuid).removeClass("_focus");
    }
    if ($(obj).prop('disabled') || $(obj).prop('readonly')) {
        $(".inputcontainer_" + uuid).addClass("_disabled");
    } else {
        $(".inputcontainer_" + uuid).removeClass("_disabled");
    }
}

function csfinputs_checkboxchange(obj) {
    if (typeof(obj) == "undefined" || typeof(obj.getAttribute) == "undefined") {
        obj = this;
        if (obj.type == "radio") {
            csfinputs_radioupdate(obj.name);
            return;
        }
    }
    var uuid = obj.getAttribute("data-csf-input-id").split("_")[1];
    var cb = $(obj.parentElement).children("input")[0];
    if (cb.checked) {
        $(".inputcontainer_" + uuid).addClass("_checked");
        $(".inputcontainer_" + uuid)
    } else {
        $(".inputcontainer_" + uuid).removeClass("_checked");
    }
}

function csfinputs_checkboxclick(obj) {
    if (typeof(obj) == "undefined" || typeof(obj.getAttribute) == "undefined") {
        obj = this;
    }
    var uuid = obj.getAttribute("data-csf-input-id").split("_")[1];
    var cb = $(obj.parentElement).children("input")[0];
    cb.checked = !cb.checked;
    csfinputs_checkboxchange(obj);
}

function csfinputs_radioclick(obj) {
    if (typeof(obj) == "undefined" || typeof(obj.getAttribute) == "undefined") {
        obj = this;
    }
    var uuid = obj.getAttribute("data-csf-input-id").split("_")[1];
    var cb = $(obj.parentElement).children("input")[0];
    cb.checked = true;
    csfinputs_radioupdate(cb.name);
}

function csfinputs_radioupdate(name) {
    $('input[name="'+name+'"]').each(function (n, e) {
        csfinputs_checkboxchange(e);
    });
}

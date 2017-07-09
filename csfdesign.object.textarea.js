csfdesign.define("csf/object/textarea", {
    require: [],
    condition: "textarea.csftheme",
    process: function (n, e) {
        var id = csfdesign.uuid();
        var cnt = document.createElement("div");
        cnt.className = "_textarea-container";
        $(cnt).addClass("textareacontainer_" + id);

        var label = document.createElement("label");
        label.className = "_textarea-label _disable-select";
        $(label).addClass("textarealabel_" + id);
        if (e.hasAttribute("placeholder")) {
            label.innerHTML = e.getAttribute("placeholder");
        }
        if (e.hasAttribute("data-placeholder")) {
            label.innerHTML = e.getAttribute("data-placeholder");
        }
        e.removeAttribute("placeholder");
        $(cnt).append(label);

        $(cnt).insertBefore(e);
        $(e).appendTo(cnt);
        $(e).addClass("textarea_" + id);
        e.setAttribute("data-csf-textarea-id", "textarea_" + id);
        cnt.setAttribute("data-csf-textarea-id", "textarea_" + id);
        $(e).removeClass("csftheme");

        $(e).on("ready click keyup change focus focusout", csftextarea_textinputchange);
        $(cnt).on("click", csftextarea_textinputclick);
        csftextarea_textinputchange(e);
    }
});

function csftextarea_textinputclick() {
    var uuid = this.getAttribute("data-csf-textarea-id").split("_")[1];
    $(".textarea_" + uuid).focus();
}

function csftextarea_textinputchange(obj) {
    if (typeof(obj) == "undefined" || typeof(obj.getAttribute) == "undefined") {
        obj = this;
    }
    var uuid = obj.getAttribute("data-csf-textarea-id").split("_")[1];

    if ($(obj).val() != "") {
        $(".textareacontainer_" + uuid).addClass("_not-empty");
    } else {
        $(".textareacontainer_" + uuid).removeClass("_not-empty");
    }
    if ($(obj).is(':focus')) {
        $(".textareacontainer_" + uuid).addClass("_focus");
        $(".textareacontainer_" + uuid).css("border-color", csfdesign.getMainColor());
        $(".textareacontainer_" + uuid).css("color", csfdesign.getMainColor());
    } else {
        $(".textareacontainer_" + uuid).removeClass("_focus");
        $(".textareacontainer_" + uuid).css("border-color", "gray");
        $(".textareacontainer_" + uuid).css("color", "black");
    }
}

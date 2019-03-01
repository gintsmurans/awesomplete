/* global Awesomplete, $:true, $$:true */
$ = Awesomplete.query;
$$ = Awesomplete.queryAll;

document.addEventListener("DOMContentLoaded", function() {
    var nav = $("nav");
    $$("section > h1").forEach(function (h1) {
        if (h1.parentNode.id) {
            Awesomplete.create("a", {
                href: "#" + h1.parentNode.id,
                textContent: h1.textContent.replace(/\(.+?\)/g, ""),
                inside: nav
            });
        }
    });

    $$("input.awesomplete").forEach(function (el) {
        new Awesomplete(el, {});
    });
});